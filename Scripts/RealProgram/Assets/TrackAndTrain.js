import { GrObject } from "../../../libs/CS559-Framework/GrObject.js"
import { Character } from "./Character.js";
import * as T from "../../../libs/CS559-Three/build/three.module.js";

export class Tracks extends GrObject
{

    static currentLookAt;
    static futureLookAt;
    static pivotGroup;

    static trakcs;
    static endPoints;
    constructor(points, highlightName)
    {
        let trakcs = new T.Group();

        //iterate through points, obtain the location of railroads
        let endPoints = []
        
        let railroads = []
        points.forEach((point)=>{
            if(point.property == 3)
            {
                endPoints.push(new T.Vector3(point.location.x, point.location.y, point.location.z))
                railroads.push(point)
            }
        })

        console.log(endPoints)

        let pointsPath1 = [
            new T.Vector3(0, 0, 4),//
            endPoints[0]
        ]
        let curve1 = new T.CatmullRomCurve3(pointsPath1, true)
        let track1 = new T.Mesh(
            new T.TubeGeometry(curve1, 100, 1, 2),
            new T.MeshStandardMaterial({color: "#99a3a4", metalness: 1})
        )
        track1.translateY(-0.5)
        let track1Group= new T.Group();
        let track1Left = track1.clone()
        track1Left.translateX(-0.5)
        let track1Right = track1.clone();
        track1Right.translateX(0.5)
        track1Group.add(track1Left)
        track1Group.add(track1Right)
        trakcs.add(track1Group)

        for(let i = pointsPath1[0].z; i <= pointsPath1[1].z; i +=(pointsPath1[1].z - pointsPath1[0].z)/10)
        {
            let brick = new T.Mesh(
                new T.BoxGeometry(1, 0.6, 0.3),
                new T.MeshStandardMaterial({color: "#784212"})
            )
            brick.position.set(0, 0, i)
            track1Group.add(brick)
        }
        
        let pointsPath2 = [
            new T.Vector3(-4, 0, 0.01),
            endPoints[1]
        ]
        let curve2 = new T.CatmullRomCurve3(pointsPath2, true)
        let track2 = new T.Mesh(
            new T.TubeGeometry(curve2, 100, 1, 2),
            new T.MeshStandardMaterial({color: "#99a3a4", metalness: 1})
        )

        track2.translateY(-0.5)
        let track2Group= new T.Group();
        let track2Left = track2.clone()
        track2Left.translateZ(-0.5)
        let track2Right = track2.clone();
        track2Right.translateZ(0.5)
        track2Group.add(track2Left)
        track2Group.add(track2Right)
        trakcs.add(track2Group)

        for(let i = pointsPath2[0].x; i >= pointsPath2[1].x; i -=(pointsPath2[0].x - pointsPath2[1].x)/10)
        {
            let brick = new T.Mesh(
                new T.BoxGeometry(0.3, 0.6, 1),
                new T.MeshStandardMaterial({color: "#784212"})
            )
            brick.position.set(i, 0, 0)
            track2Group.add(brick)
        }


        let pointsPath3 = [
            new T.Vector3(0, 0, -4),//
            endPoints[2]
        ]
        let curve3 = new T.CatmullRomCurve3(pointsPath3, true)
        let track3 = new T.Mesh(
            new T.TubeGeometry(curve3, 100, 1, 2),
            new T.MeshStandardMaterial({color: "#99a3a4", metalness: 1})
        )

        track3.translateY(-0.5)
        let track3Group= new T.Group();
        let track3Left = track3.clone()
        track3Left.translateX(-0.5)
        let track3Right = track3.clone();
        track3Right.translateX(0.5)
        track3Group.add(track3Left)
        track3Group.add(track3Right)
        trakcs.add(track3Group)

        for(let i = pointsPath3[0].z; i >= pointsPath2[1].x; i +=(pointsPath3[1].z - pointsPath3[0].z)/10)
        {
            let brick = new T.Mesh(
                new T.BoxGeometry(1, 0.6, 0.3),
                new T.MeshStandardMaterial({color: "#784212"})
            )
            brick.position.set(0, 0, i)
            track3Group.add(brick)
        }



        let pointsPath4 = [
            new T.Vector3(4, 0 , 0.01),//
            endPoints[3]
        ]

        let curve4 = new T.CatmullRomCurve3(pointsPath4, true)
        let track4 = new T.Mesh(
            new T.TubeGeometry(curve4, 100, 1, 2),
            new T.MeshStandardMaterial({color: "#99a3a4", metalness: 1})
        )

        track4.translateY(-0.5)
        let track4Group= new T.Group();
        let track4Left = track4.clone()
        track4Left.translateZ(-0.5)
        let track4Right = track4.clone();
        track4Right.translateZ(0.5)
        track4Group.add(track4Left)
        track4Group.add(track4Right)
        trakcs.add(track4Group)

        for(let i = pointsPath4[0].x; i <= pointsPath4[1].x; i +=(pointsPath4[1].x - pointsPath4[0].x)/10)
        {
            let brick = new T.Mesh(
                new T.BoxGeometry(0.3, 0.6, 1),
                new T.MeshStandardMaterial({color: "#784212"})
            )
            brick.position.set(i, 0, 0)
            track4Group.add(brick)
        }

        //Make pivot group

        let pivotGroup = new T.Group();
        
        let path1 = [
            new T.Vector3(-0.5, 0, 4),
            new T.Vector3(-1, 0, 1),
            new T.Vector3(-4, 0, 0.51)
        ]
        let path2 = [
            new T.Vector3(0.5, 0, 4),
            new T.Vector3(0.3, 0, -0.49),
            new T.Vector3(-4, 0, -0.49)
        ]
        let path3 = [
            new T.Vector3(-0.5, 0, 4),
            new T.Vector3(-0.5, 0, 0),
            new T.Vector3(-0.5, 0, -4)
        ]
        let path4 = [
            new T.Vector3(0.5, 0, 4),
            new T.Vector3(0.5, 0, 0),
            new T.Vector3(0.5, 0, -4)
        ]
        let path5 = [
            new T.Vector3(-0.5, 0, 4),
            new T.Vector3(-0.3, 0, -0.49),
            new T.Vector3(4, 0, -0.49)
        ]
        let path6 = [
            new T.Vector3(0.5, 0, 4),
            new T.Vector3(1, 0, 1),
            new T.Vector3(4, 0, 0.51)
        ]
        let pivotCurve1 = new T.CatmullRomCurve3(path1, false)
        let pivotTrack1 = new T.Mesh(
            new T.TubeGeometry(pivotCurve1, 100, 1, 2),
            new T.MeshStandardMaterial({color: "#154360"})
        )
        pivotTrack1.translateY(-0.5)
        pivotGroup.add(pivotTrack1);

        let pivotCurve3= new T.CatmullRomCurve3(path3, false)
        let pivotTrack3 = new T.Mesh(
            new T.TubeGeometry(pivotCurve3, 100, 1, 2),
            new T.MeshStandardMaterial({color: "#e74c3c"})
        )
       // pivotGroup.add(pivotTrack3);
        pivotTrack3.translateY(-0.5)
        let pivotCurve4= new T.CatmullRomCurve3(path4, false)
        let pivotTrack4 = new T.Mesh(
            new T.TubeGeometry(pivotCurve4, 100, 1, 2),
            new T.MeshStandardMaterial({color: "#e74c3c"})
        )
       // pivotGroup.add(pivotTrack4);
        pivotTrack4.translateY(-0.5)
        let pivotCurve5= new T.CatmullRomCurve3(path5, false)
        let pivotTrack5 = new T.Mesh(
            new T.TubeGeometry(pivotCurve5, 100, 1, 2),
            new T.MeshStandardMaterial({color: "#e74c3c"})
        )
        //pivotGroup.add(pivotTrack5);
        pivotTrack5.translateY(-0.5)
        let pivotCurve6= new T.CatmullRomCurve3(path6, false)
        let pivotTrack6 = new T.Mesh(
            new T.TubeGeometry(pivotCurve6, 100, 1, 2),
            new T.MeshStandardMaterial({color: "#e74c3c"})
        )
       // pivotGroup.add(pivotTrack6);
        pivotTrack6.translateY(-0.5)
        let pivotCurve2= new T.CatmullRomCurve3(path2, false)
        let pivotTrack2 = new T.Mesh(
            new T.TubeGeometry(pivotCurve2, 100, 1, 2),
            new T.MeshStandardMaterial({color: "#154360"})
        )
        pivotGroup.add(pivotTrack2);
        pivotTrack2.translateY(-0.5)

        pivotGroup.lookAt(endPoints[1])
        trakcs.add(pivotGroup)
        //use look at to adjust the rotation
        super("Tracks", trakcs)

        Tracks.currentLookAt = endPoints[1]
        Tracks.futureLookAt = undefined;
        Tracks.pivotGroup = pivotGroup;
        Tracks.trakcs = trakcs
        Tracks.endPoints = endPoints

        highlightName.push("Tracks")
    }

    static setUp(futureLookAt)
    {
        Tracks.futureLookAt = futureLookAt
        //return the another end of the track
        let i = 0
        for (i = 0; i < Tracks.endPoints.length; i++) {
            if (Tracks.endPoints[i].equals(futureLookAt)) {
                break; // End the loop
            }
        }


        console.log(Tracks.endPoints)
        return Tracks.endPoints[ (i + 1) % Tracks.endPoints.length]
    }

    lastingTime
    stepWorld(ms)
    {
        if(Tracks.futureLookAt != undefined)
        {

            if(this.lastingTime == undefined)
            {
                this.lastingTime = 0
            }else if(this.lastingTime <= 1000)
            {
                let alpha = this.lastingTime / 1000 //last for 1 sec in total
                let point = new T.Vector3();
                point.x = (1-alpha) * Tracks.currentLookAt.x + alpha * Tracks.futureLookAt.x
                point.y = (1-alpha) * Tracks.currentLookAt.y + alpha * Tracks.futureLookAt.y
                point.z = (1-alpha) * Tracks.currentLookAt.z + alpha * Tracks.futureLookAt.z
                Tracks.pivotGroup.lookAt(point)
                this.lastingTime += ms
            }else
            {
                this.lastingTime = undefined
                Tracks.currentLookAt = Tracks.futureLookAt;
                Tracks.futureLookAt = undefined
            }

        }
    }
}





export class Train extends GrObject
{

    ready;
    static numOfTrain = 0
    curve;
    constructor(world, highlightName)
    {
        //build a train 
        
        let train = new T.Group();

        let base = new T.Mesh(
            new T.BoxGeometry(2.5, 0.25, 7),
            new T.MeshStandardMaterial({color: "#784212"})
        )

        let cone = new T.Mesh(
            new T.CylinderGeometry(1, 0.8, 3, 64, 64 ),
            new T.MeshStandardMaterial({color: "#85929e"})
        )


        cone.rotateX(90 * Math.PI/180)
        cone.translateZ(-0.7)
        cone.translateY(1.5)

        let coneDecoration = new T.Mesh(
            new T.CylinderGeometry(1.0, 1.0, 0.2, 64, 64, true),
            new T.MeshStandardMaterial({color:"black", side: T.DoubleSide})
        )
        coneDecoration.translateY(0.95)

        cone.add(coneDecoration)

        let coneDecoration2 = new T.Mesh(
            new T.CylinderGeometry(0.91, 0.91, 0.2, 64,64, true),
            new T.MeshStandardMaterial({color: "black", side: T.DoubleSide})
        )
        cone.add(coneDecoration2)

        let coneDecoration3 = new T.Mesh(
            new T.CylinderGeometry(0.85, 0.85, 0.2, 64,64,true),
            new T.MeshStandardMaterial({color: "black", side: T.DoubleSide})
        )
        cone.add(coneDecoration3)
        coneDecoration3.translateY(-0.95)

        let smokeStack = new T.Mesh(
            new T.CylinderGeometry(0.2, 0.2, 2),
            new T.MeshStandardMaterial({color: "black"})
        )
        train.add(smokeStack)
        smokeStack.position.set(0, 2, 2)
        let stackLower = new T.Mesh(
            new T.CylinderGeometry(0.4, 0.2, 0.2),
            new T.MeshStandardMaterial({color: "#17202a", side:T.DoubleSide})
        )
        stackLower.translateY(1)
        smokeStack.add(stackLower)

        let middleStack = new T.Mesh(
            new T.CylinderGeometry(0.4, 0.4, 0.2),
            new T.MeshStandardMaterial({color: "white"})
        )
        middleStack.translateY(0.2)
        stackLower.add(middleStack)

        let stackUpper = new T.Mesh(
            new T.CylinderGeometry(0.2, 0.4, 0.2),
            new T.MeshStandardMaterial({color: "#17202a", side:T.DoubleSide})
        )

        let roomGroup = new T.Group();
        train.add(roomGroup)
        roomGroup.translateZ(-0.6)
        let support = new T.Mesh(
            new T.BoxGeometry(0.2, 3, 0.2),
            new T.MeshStandardMaterial({color: "black"})
        )
        support.translateY(1.5)
        
        let support1 = support.clone();
        support1.translateX(-0.8)
        let support2 = support.clone();
        support2.translateX(0.8)
        let support3 = support.clone();
        support3.translateX(-0.8)
        support3.translateZ(-2.5)
        let support4 = support.clone();
        support4.translateX(0.8)
        support4.translateZ(-2.5)

        let planeHorizontal = new T.Mesh(
            new T.BoxGeometry(1.6, 2, 0.2),
            new T.MeshStandardMaterial({color: "#717d7e"})
        )
        planeHorizontal.translateY(1)
        let planeHorizontal1 = planeHorizontal.clone();
        let planeHorizontal2 = planeHorizontal.clone();
        planeHorizontal2.translateZ(-2.5)

        let planeVertical = new T.Mesh(
            new T.BoxGeometry(0.2, 2, -2.5),
            new T.MeshStandardMaterial({color: "#717d7e"})

        )
        planeVertical.translateY(1)
        planeVertical.translateZ(-1.25)
        let planeVertical1 = planeVertical.clone();
        planeVertical1.translateX(-0.8)
        let planeVertical2 = planeVertical.clone();
        planeVertical2.translateX(0.8)
        roomGroup.add(planeVertical1)
        roomGroup.add(planeVertical2)
        roomGroup.add(planeHorizontal1)
        roomGroup.add(planeHorizontal2)
        roomGroup.add(support1)
        roomGroup.add(support2)
        roomGroup.add(support3)
        roomGroup.add(support4)
        middleStack.add(stackUpper)
        stackUpper.translateY(0.2)
        train.translateY(0.8)

        let wheelGroup = new T.Group()
        let wheelBase = new T.Mesh(
            new T.BoxGeometry(2, 0.5, 6),
            new T.MeshStandardMaterial({color: "black"})
        )
        wheelGroup.translateY(-0.25)
        wheelGroup.add(wheelBase)

        let wheel = new T.Mesh(
            new T.CircleGeometry(0.4, 64),
            new T.MeshStandardMaterial({color: "black", side: T.DoubleSide})
        )
        wheel.rotateY(90 * Math.PI/180)
        wheel.translateY(-0.2)
        let wheelRight = new T.Group();
        wheelRight.translateX(1.1)
        wheelGroup.add(wheelRight)

        let wheel1 = wheel.clone();
        wheel1.translateX(-2)
        let wheel2 = wheel.clone();
        wheel2.translateX(1)
        let wheel3 = wheel.clone();
        wheel3.translateX(2)
        wheelRight.add(wheel1)
        wheelRight.add(wheel2)
        wheelRight.add(wheel3)

        let wheelLeft = wheelRight.clone();
        wheelLeft.translateX(-2.2)
        wheelGroup.add(wheelLeft)
        train.add(wheelGroup)
        train.add(base)
        train.add(cone)
        super(`Train_${Train.numOfTrain}`, train)
        train.scale.set(0.7, 0.7, 0.7)
        this.train = train
        this.ready = false
        Train.numOfTrain += 1;
        this.smokeStack = stackUpper
        this.world = world

    }

    run(startPoint, endPoint, id, objects)
    {
        //middle control point is always (0, 0 , 0)
        this.startPoint = startPoint.clone();
        this.startPoint.y = 1;
        this.middlePoint = new T.Vector3(0, 1, 0)
        this.endPoint = endPoint.clone();
        this.endPoint.y = 1
        this.ready = true
        this.curve = new T.CatmullRomCurve3([this.startPoint, this.middlePoint, this.endPoint], false);

        objects.forEach((obj)=>{
            if(obj instanceof Character)
            {
                if(obj.characerNo == id)
                {
                    this.character = obj;
                }
            }
        })
    }

    timeElapsed;
    stepWorld(ms)
    {
        if(this.ready && this.curve)
        {   
            if(this.timeElapsed == undefined) 
            {
                    this.timeElapsed = 0;

                    if (!this.particleGroup) {
                        this.particleGroup = new T.Group();
                        this.world.scene.add(this.particleGroup)
                    }
                    this.particleEmitTimer = 0;
            }
            else if(this.timeElapsed <4000)
            {
                let t = this.timeElapsed /  4000
                let position = this.curve.getPointAt(t);
                this.train.position.set(position.x, position.y, position.z)

                let tangent = this.curve.getTangent(t);
                let lookAtPos = position.add(tangent)

                this.character.character.position.set(position.x, position.y, position.z)
                this.character.character.translateY(4.75)
                this.train.lookAt(lookAtPos)

                this.particleEmitTimer += ms;
                if (this.particleEmitTimer >= 50) { // Emit a particle every 100ms
                    this.emitAsh();
                    this.particleEmitTimer = 0; // Reset the timer
                }
                this.updateParticles(ms);
    
                this.timeElapsed += ms;
            }else
            {
                //stop
                this.ready = false;
                this.timeElapsed = undefined
                this.character.pointAt = (this.character.pointAt + 10) % 40 //for convenience
                this.character.character.translateY(-1)
                this.character.character.position.x = this.endPoint.x
                this.character.character.position.z = this.endPoint.z
                this.character.character.rotateY(-90 * Math.PI/180)

                this.clearParticles()
            }
        }
    }

    emitAsh() {
        if (!this.particleGroup) return;
    
        // Create a new particle
        let particle = new T.Mesh(
            new T.SphereGeometry(0.1, 8, 8), // Small sphere for ash
            new T.MeshStandardMaterial({ color: "black", transparent: true, opacity: 1 })
        );
    
        //get the gloabal position of the smokestack

        let globPos = new T.Vector3
        this.smokeStack.getWorldPosition(globPos)
        
        particle.position.set(globPos.x, globPos.y, globPos.z)
        this.particleGroup.add(particle)
        // Add a custom property to track its lifetime
        particle.lifetime = 1000; // Lifetime in milliseconds
    }


    updateParticles(ms) {
        if (!this.particleGroup) return;
    
        this.particleGroup.children.forEach((particle, index) => {
            particle.position.y += 0.03;
    
            particle.material.opacity -= ms / particle.lifetime;
    
            if (particle.material.opacity <= 0) {
                this.particleGroup.remove(particle);
            }
        });
    }

    clearParticles() {
        if (this.particleGroup) {
            this.particleGroup.clear(); // Remove all particles
        }
    }
}