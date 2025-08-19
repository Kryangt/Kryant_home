import { GrObject } from "../../../libs/CS559-Framework/GrObject.js"
import { shaderMaterial } from "../../../libs/CS559-Framework/shaderHelper.js";
import * as T from "../../../libs/CS559-Three/build/three.module.js";

export class Dice extends GrObject
{

    static numOfDice = 0;
    static diceIndex = 1;
    static manual
    static finalIndex = 1;
    constructor()
    {
        //build a big plane as geometry

        let group = new T.Group();

        let diceGeometry = new T.PlaneGeometry(3, 2);

        //load six faces
        let one = new T.TextureLoader().load("Monopoly_Textures/Dice/one.png");
        let two = new T.TextureLoader().load("Monopoly_Textures/Dice/two.png");
        let three = new T.TextureLoader().load("Monopoly_Textures/Dice/three.png");
        let four = new T.TextureLoader().load("Monopoly_Textures/Dice/four.png");
        let five = new T.TextureLoader().load("Monopoly_Textures/Dice/five.png");
        let six = new T.TextureLoader().load("Monopoly_Textures/Dice/six.png");


        let diceMaterial = new shaderMaterial("Shader/DiceVertex.vs", "Shader/DiceFragment.fs", {
            side: T.DoubleSide,
            uniforms: {
                horizontal: {value: 3},
                vertical: {value: 2},
                one: {value: one},
                two: {value: two},
                three: {value: three},
                four: {value: four},
                five: {value: five},
                six: {value: six},
            }
        })

        let dice = new T.Mesh(diceGeometry, diceMaterial)

        group.add(dice);

        //highlight part
        let highlightGeometry = new T.PlaneGeometry(3, 2);

        let randomIndex = Math.floor(Math.random() * 5) + 1;

        let highlightMaterial = new shaderMaterial("Shader/DiceHighlight.vs", "Shader/DiceHighlight.fs",{
            transparent: true,
            side: T.DoubleSide,
            uniforms:{
                horizontal: {value: 3},
                vertical: {value: 2},
                random: {value: Dice.finalIndex}
            }
        })

        let highlightMesh = new T.Mesh(highlightGeometry, highlightMaterial)

        group.add(highlightMesh)

        let diceGroup = new T.Group();
        diceGroup.add(group)
        highlightMesh.translateZ(0.05)

        group.translateY(10)

   
        group.scale.set(3,3,3)

        for (let i = 90; i < 360; i+= 90)
        {
            let newDice = group.clone();
            newDice.rotateOnWorldAxis(new T.Vector3(0, 1, 0), i* Math.PI/180)
            newDice.translateZ(4.5)
            diceGroup.add(newDice)
        }
        group.translateZ(4.5)
        super(`Dice`, diceGroup, [
            ["Is Manual (0: random >1: manually control)", 0, 1, 1],
            ["Number", 1, 6, 1]
        ]);
    
        this.diceGroup = diceGroup
        this.highlightMesh = highlightMesh
        Dice.manual = 0;
    }

    static getNumber()
    {
        if(Dice.manual)
        {
            Dice.finalIndex = Dice.manulIndex
        }else
        {
            Dice.finalIndex = Math.floor(Math.random() * 5) + 1
        }

        return Dice.finalIndex
    }
    stepWorld(ms)
    {
        this.highlightMesh.material.uniforms.random.value = this.diceIndex;
    }

    update(paramValues)
    {
        Dice.manual = 0
        Dice.manulIndex = Math.floor(paramValues[1])
    }
}