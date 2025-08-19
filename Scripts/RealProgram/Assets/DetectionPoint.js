import { GrObject } from "../../../libs/CS559-Framework/GrObject.js"
import * as T from "../../../libs/CS559-Three/build/three.module.js";
import { TurningPoint } from "./TurningPoint.js";
import { OBJLoader } from "../../../libs/CS559-Three/examples/jsm/loaders/OBJLoader.js";
import { MTLLoader } from "../../../libs/CS559-Three/examples/jsm/loaders/MTLLoader.js";
import { GLTFLoader } from "../../../libs/CS559-Three/examples/jsm/loaders/GLTFLoader.js";
import {FontLoader} from "../../../libs/CS559-Three/examples/jsm/loaders/FontLoader.js";
import {ArticulateHauler, Bulldozers, GrExcavator} from "./Construction.js"
import { Character } from "./Character.js";
import {Tracks, Train} from "./TrackAndTrain.js"
import { shaderMaterial } from "../../../libs/CS559-Framework/shaderHelper.js";

import {CyberTruck} from "./CyberTruck.js";

export class DetectionPoint extends GrObject
{
    static pointNum = 0;
    purchasable;
    property;
    color
    constructor(location, world)
    {
        let group = new T.Group();

        let detection = new T.Mesh(
            new T.BoxGeometry(0.5, 2, 0.5),
            new T.MeshStandardMaterial({color: "white", opacity: 0, transparent: true})
        )
        
        group.add(detection)
        super(`DetectionPoint_${DetectionPoint.pointNum}`, group)
        

        let rotationAngle = Math.floor(DetectionPoint.pointNum / 10) * 90 + 180; //let the positive z axis points inward
        group.rotateY((-rotationAngle) * Math.PI/180);

        DetectionPoint.pointNum++;
        group.position.set(location.x, location.y, location.z);
        this.location = location;
        this.isTurningPoint = false;
        this.color;
        this.detectionPoint = detection
        this.property = 0;
        this.purchasable = true;
        this.owner;
        this.signal = 0;
        this.world = world
        this.group = group
        this.popupTexts = []; 
    }

    //signal 1: build buildings

    trigger(id, character, highlightNames) {
        //when call the function, the character is on the detection point
        //determine the behaviors
        switch(this.property)
        {
            case 0: 
                this.handleHouse(id, character)
                break;
            case 3:
                this.handleRailway(id, character, highlightNames)
                break;
            case 1:
                character.totalMoney += this.price
                break;
            case 2:
                character.totalMoney -= this.price
                break;
            case 4:
                this.handleChance(id, character)
                break;
        } 
        return this.price;
    }

    handleChance(id, character)
    {
        character.multiplier = 2;
        let cyber = new CyberTruck();
        character.character.add(cyber.truck)
        character.totalMoney -= this.price
        character.truck = cyber.truck
        character.Humangroup.visible = false;
    }

    handleHouse(id, character)
    {
        if(this.purchasable)
            {
                this.purchasable = false;
                this.owner = id;


                let buildingNum = Math.floor(Math.random() * 3) + 1; //ranging from 1-3
                //tell the stepWorld function to "build" the building
                this.loadObject(`/Scripts/RealProgram/Object/Building${buildingNum}/Texture.mtl`, `/Scripts/RealProgram/Object/Building${buildingNum}/object.gltf`, buildingNum)
                //load buildings
                Character.pause = true //pause the game to finish the animation
                this.signal = 1 

                character.totalMoney -= this.price

                //create a text geometry 
            }
    }

    handleRailway(id, character, highlightNames)
    {
        //get the references of other railway

        //should finish the animation then continue the game

        Character.pause = true

        this.signal = 2
        let endPoint = Tracks.setUp(this.location);
        let trainInstance = new Train(this.world, highlightNames);
        this.train = trainInstance.train
        this.trainInstance = trainInstance
        this.detectionPoint.add(this.train)
        this.world.add(trainInstance)
        trainInstance.run(this.location, endPoint, id, this.world.objects)

        character.totalMoney -= this.price
    }



    loadObject(MTLpath, OBJpath, buildingNum) {
        const glbLoader = new GLTFLoader();


        let flagPlane = new T.PlaneGeometry(2, 1, 100, 50)
        let uniforms = {
            time: {value: 0.0},
            amplitude: {value: 0.08},
            frequency: {value :10.0},
            color: {value: new T.Color(this.color)}
        }

        this.uniforms = uniforms

        let planeMaterial = new shaderMaterial("/Scripts/RealProgram/Shader/FlagVertex.vs", "/Scripts/RealProgram/Shader/FlagFragment.fs", {
            side: T.DoubleSide,
            uniforms: this.uniforms
        })

        let flagMesh = new T.Mesh(flagPlane, planeMaterial)
        let holder = new T.Mesh(
            new T.CylinderGeometry(0.2, 0.2, 5),
            new T.MeshStandardMaterial({color: "silver", side: T.DoubleSide, metalness: 0.8})
        )

        flagMesh.translateY(1.6)
        flagMesh.translateX(-0.8)
        holder.add(flagMesh)
        flagMesh.translateX(-0.05)

        this.flag = holder;
        glbLoader.load(
            OBJpath,
            (gltf) => {
                const obj = gltf.scene; // Extract the scene from the GLTF object
                this.resizeObj(obj, 4); // Pass the scene to resizeObj
                //build a flag with character's color

                switch(buildingNum)
                {
                    case 1: 
                        obj.position.set(-5, 0.1, -2)
                        break;
                    case 2:
                        obj.position.set(0.8, 0.1, -4)
                        break;
                    case 3:
                        obj.position.set(-0.2, 0.1, -5)
                }

                this.Object = obj;
            },
            undefined,
            (error) => {
                console.error("Failed to load GLB file:", OBJpath, error);
            }
        );
    }
    
    resizeObj(obj, targetSize)
    {
        const box = new T.Box3().setFromObject(obj)
        let size = new T.Vector3();
        box.getSize(size);
        const scale = new T.Vector3(
            targetSize / size.x,
            targetSize / size.y,
            targetSize/ size.z
        );
        

        obj.scale.set(scale.x, scale.y, scale.z);
    }


    timeElapsed
    contructionEquip = []; //controls the movement of equipment in local coordinate
    constructionGroups = []; //for initial poisition set and removal of each equipment 
    stepWorld(ms)
    {
        if(this.signal == 1)
        {
            if(this.timeElapsed == undefined)
            {
                let speed = 0.03
                this.timeElapsed = 0;
                //load construction objects
                let articulateHauler = new ArticulateHauler().wb_object;
                articulateHauler.velocity = speed
                let articulateGroup = new T.Group();
                articulateGroup.position.set(0.5, 0, -5)
                articulateGroup.add(articulateHauler) //for easier translate
                this.contructionEquip.push(articulateHauler)
                this.constructionGroups.push(articulateGroup)
                this.group.add(articulateGroup)

                //
                let bulldozers = new Bulldozers().wb_object;
                bulldozers.velocity = speed
                let bulldozersGroup = new T.Group();
                bulldozersGroup.position.set(-1, 0, -7)
                bulldozersGroup.add(bulldozers);
                this.constructionGroups.push(bulldozersGroup)
                this.contructionEquip.push(bulldozers)
                this.group.add(bulldozersGroup)

                //
                let excavator = new GrExcavator().wb_object;
                excavator.velocity = speed
                let excavatorGroup = new T.Group();
                excavatorGroup.position.set(-3, 0, -2)
                excavatorGroup.add(excavator);
                this.constructionGroups.push(excavatorGroup)
                this.contructionEquip.push(excavator)
                this.group.add(excavatorGroup)

            }else if(this.timeElapsed <=  2000)
            {
                //let articulateHauler move forward and backward
                this.contructionEquip.forEach((equip) =>{
                    if(equip.position.x > 1 || equip.position.x < 0)
                    {
                        equip.velocity *= -1;
                    }
                    equip.translateX(equip.velocity)
                })

                this.timeElapsed += ms;
            }else
            {
                this.group.add(this.Object)
                this.signal = -1 //consume the signal

                this.constructionGroups.forEach((equip)=>{
                    this.group.remove(equip)
                })
                this.timeElapsed = undefined;

                //place the flag
                this.flag.position.set(0,2.5, 2)
                this.group.add(this.flag)
                Character.pause = false;
            }

        }else if(this.signal == 2)
        {
            if(this.timeElapsed == undefined)
            {
                this.timeElapsed = 0;
            }else if(this.timeElapsed < 4000) //the total animation time the train takes
            {
                this.timeElapsed += ms
            }else
            {
                this.timeElapsed = undefined

                this.detectionPoint.remove(this.train)
                this.world.scene.remove(this.train)
                this.signal = -1
                Character.pause = false;
            }
        }

        if(this.uniforms != undefined)
        {
            this.uniforms.time.value += ms/1000;
        }
        
    }
}



