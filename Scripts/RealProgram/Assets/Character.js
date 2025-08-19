import { GrObject } from "../../../libs/CS559-Framework/GrObject.js"
import * as T from "../../../libs/CS559-Three/build/three.module.js";
import { Dice } from "./Dice.js";

export class Character extends GrObject
{
    static numOfCharacter = 0

    static walkingNo = 0;

    characerNo;
    pointAt;

    totalMoney = 1200;
    static pause = false;

    multiplier = 1;
    constructor(color, points, param = {})
    {
        let Humangroup = new T.Group();
        let group = new T.Group();
        //Leg
        let leg = new T.Mesh(
            new T.BoxGeometry(0.25, 1.25, 0.25),
            new T.MeshStandardMaterial({color: "black"})
        )

        let rightLeg = leg.clone();
        let leftLeg = leg.clone();

        let rightLegGroup = new T.Group();
        rightLegGroup.add(rightLeg)
        rightLeg.translateY(-0.75)
        Humangroup.add(rightLegGroup)
        rightLegGroup.translateX(0.15)
        rightLegGroup.translateY(0.75)

        let leftLegGroup = new T.Group();
        Humangroup.add(leftLegGroup)
        leftLegGroup.translateX(-0.15)
        leftLegGroup.add(leftLeg)
        leftLeg.translateY(-0.75)
        leftLegGroup.translateY(0.75)

        let body = new T.Mesh(
            new T.BoxGeometry(0.7, 0.75, 0.3),
            new T.MeshStandardMaterial({color: color})
        )

        Humangroup.add(body)
        body.translateY(0.95)

        //build shoulder
        let shoulder = new T.Mesh(
            new T.BoxGeometry(0.25, 0.25, 0.25),
            new T.MeshStandardMaterial({color: color})
        )


        let leftShoulderGroup = new T.Group();
        let leftShoulder = shoulder.clone();
        leftShoulder.translateX(-0.45)
        leftShoulderGroup.add(leftShoulder)
        leftShoulderGroup.translateY(1.22)


        let RightShoulderGroup = new T.Group();
        let rightShoulder= shoulder.clone();
        rightShoulder.translateX(0.45)
        RightShoulderGroup.add(rightShoulder)
        RightShoulderGroup.translateY(1.22)


        Humangroup.add(leftShoulderGroup)
        Humangroup.add(RightShoulderGroup)

        let arm = new T.Mesh(
            new T.BoxGeometry(0.15, 0.5, 0.15),
            new T.MeshStandardMaterial({color: "#E3B9A4"})
        )

        arm.translateY(-0.35)
        
        let leftArm = arm.clone();
        let rightArm = arm.clone();
        leftShoulder.add(leftArm)
        rightShoulder.add(rightArm)

        let head = new T.Mesh(
            new T.BoxGeometry(0.4, 0.4, 0.25),
            new T.MeshStandardMaterial({color: "#E3B9A4"})
        )
        Humangroup.add(head)
        head.translateY(1.5)

        group.add(Humangroup)
        super(`Character_${Character.numOfCharacter}`, group, [
            ["Speed", 1, 8, 5]
        ])
        group.position.set(17.5, 1.75, 17.5)
        group.translateY(3)
        group.rotateY(-90 * Math.PI/180)
        this.characerNo = Character.numOfCharacter;

        this.pointAt = 0
        this.points = points
        this.character = group
        this.speed = 0.05
        this.color = color

                // Store references to the legs and arms
        this.rightLeg = rightLegGroup;
        this.leftLeg = leftLegGroup;
        this.rightArm = RightShoulderGroup;
        this.leftArm = leftShoulderGroup;
        
                // Walking animation properties
        this.walkAngle = 0; // Current angle of the walking motion
        this.walkDirection = 1; // 1 for forward, -1 for backward

        this.dices = []
        Humangroup.translateY(-4)
        this.Humangroup = Humangroup

        Character.highlightName.push(`Character_${Character.numOfCharacter}`)

        Character.numOfCharacter++;
    }

    getDice(wordObject)
    {
        wordObject.forEach((obj)=>{
            if(obj instanceof Dice) this.dices.push(obj);
        })
    }

    stepWorld(ms)
    {
        //determine if the character should walk
        if(Character.walkingNo == this.characerNo && !Character.pause )
        {
            //get the number of point need across
            if(this.numOfPointsNeed == undefined)
            {
                this.numOfPointsNeed = Dice.getNumber() * this.multiplier

                //the multiplier can only be used for one round
                this.multiplier = 1
                //pass it to the dice
                this.dices?.forEach((dice)=>{
                    dice.diceIndex = this.numOfPointsNeed
                })
            }

            if(this.numOfPointsNeed == 0)
            {
                if(this.truck != undefined)
                    {
                        this.character.remove(this.truck)
                        this.Humangroup.visible = true
                        this.truck = undefined
                    }
                //when the numOfPoints are 0, the point should stop, and update the walkingNo
                Character.walkingNo = (Character.walkingNo + 1) % Character.numOfCharacter;
                //change the color of the point if it is undefined and "purchasable"
                let thisPoint = this.points[this.pointAt]
                thisPoint.color = this.color
                thisPoint.trigger(this.characerNo, this, this.highlightName);


                this.numOfPointsNeed = undefined


                this.rightLeg.rotation.x = 0;
                this.leftLeg.rotation.x = 0;
                this.rightArm.rotation.x = 0;
                this.leftArm.rotation.x = 0;

            }else
            {
                //get the location of the next point
                let nextPoint = (this.pointAt + 1) % (this.points.length);
                let nextPointPosit = new T.Vector3();
                this.points[nextPoint].objects[0].getWorldPosition(nextPointPosit);

                let characterPosit = new T.Vector3();
                this.character.getWorldPosition(characterPosit)

                //determine if current location is within the target point
                if(characterPosit.x <= nextPointPosit.x + 0.25 && 
                    characterPosit.x >= nextPointPosit.x - 0.25 &&
                    characterPosit.z <= nextPointPosit.z + 0.25 &&
                    characterPosit.z >= nextPointPosit.z - 0.25)
                    {
                        
                        //if yes, numOfPoints - 1, and determine if the point is turning point
                        this.pointAt = nextPoint;
                        this.numOfPointsNeed -= 1;
                        if(this.points[this.pointAt].isTurningPoint) 
                        {
                            this.character.rotateY(-90 * Math.PI/180)
                        }

                    }else
                {
                    //if not, the step forward at local z
                    this.character.translateZ(this.speed)

                    this.walkAngle += this.walkDirection * 0.05; 
                    if (this.walkAngle > 0.5 || this.walkAngle < -0.5) {
                        this.walkDirection *= -1; 
                    }

                    this.rightLeg.rotation.x = this.walkAngle;
                    this.leftLeg.rotation.x = -this.walkAngle;
                    this.rightArm.rotation.x = -this.walkAngle * 0.5; 
                    this.leftArm.rotation.x = this.walkAngle * 0.5;
                }
            }
        }
    }
    update(paramValues)
    {
        this.speed = paramValues[0]/100
    }
}