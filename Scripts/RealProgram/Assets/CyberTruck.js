import { GrObject } from "../../../libs/CS559-Framework/GrObject.js"
import * as T from "../../../libs/CS559-Three/build/three.module.js";

export class CyberTruck extends GrObject
{
    constructor()
    {

        let texturebody = new T.TextureLoader().load("Monopoly_Textures/carBody.jpg")

        texturebody.wrapS = T.RepeatWrapping;
        texturebody.wrapT = T.RepeatWrapping;

        texturebody.repeat.set(1,1)
        let truck = new T.Group()
        
        let truckGeo = new T.Shape()
        truckGeo.moveTo(0,0)
        truckGeo.lineTo(-0.65, 0)
        truckGeo.lineTo(-0.9, 0)
        truckGeo.lineTo(-1, 0.1)
        truckGeo.lineTo(-1.2, 0.25)
        truckGeo.lineTo(-1.5, 0.25)
        truckGeo.lineTo(-1.65, 0.1)
        truckGeo.lineTo(-1.7, 0)
        truckGeo.lineTo(-1.8, 0)
        truckGeo.lineTo(-1.8, 0.45)
        truckGeo.lineTo(0, 0.45)
        truckGeo.lineTo(0, 0.75)
        truckGeo.lineTo(1.5, 0.3)
        truckGeo.lineTo(1.5, 0.15)
        truckGeo.lineTo(1.35, 0.15)
        truckGeo.lineTo(1.2, 0.25)
        truckGeo.lineTo(0.8, 0.25)
        truckGeo.lineTo(0.7, 0.1)
        truckGeo.lineTo(0.7, 0)

        let truckMesh = new T.Mesh(
            new T.ExtrudeGeometry(truckGeo, {
                depth: 0.7,
                bevelSegments: 2
            }),
            new T.MeshStandardMaterial({map: texturebody, lightMap: texturebody, metalness: 0.8, roughness: 0.2})
        )

        let support  = new T.Shape()
        support.moveTo(-1.7, 0.45)
        support.lineTo(-1.85, 0.45)
        support.lineTo(-0.75, 0.9)
        support.lineTo(0, 0.715)
        support.lineTo(0, 0.65)
        support.lineTo(-0.75, 0.85)
        support.lineTo(-1.7, 0.45)

        let supportMesh = new T.Mesh(
            new T.ExtrudeGeometry(support, {
                depth: 0.05,
                bevelEnabled: false
            }),
            new T.MeshStandardMaterial()
        )

        let supportMesh2 = supportMesh.clone()
        supportMesh.translateY(0.08)
        supportMesh.translateZ(0.7)
        supportMesh2.translateY(0.08)
        supportMesh2.translateZ(-0.1)
        truck.add(supportMesh)
        truck.add(supportMesh2)
        truck.add(truckMesh)

        //build front
        let front = new T.Shape();
        front.moveTo(-1.85, 0.45)
        front.lineTo(-0.75, 0.9)
        front.lineTo(0, 0.715)
        front.lineTo(0, 0.45)

        let frontMesh = new T.Mesh(
            new T.ExtrudeGeometry(front, {depth: 0.8, bevelEnabled: false}),
            new T.MeshStandardMaterial({color: "black", transparent: true, opacity: 0.8})
        )

        //rearview glaases
        let glasses = new T.Mesh(
            new T.BoxGeometry(0.01, 0.1, 0.2),
            new T.MeshBasicMaterial()  //why only basic material?
        )
        
        let glassesProtect = new T.Mesh(
            new T.BoxGeometry(0.01, 0.15, 0.25),
            new T.MeshStandardMaterial({color: "black", roughness: 1})
        )

        let glassSupport = new T.Mesh(
            new T.BoxGeometry(0.01, 0.01, 0.13  ),
            new T.MeshStandardMaterial({color: "black", roughness: 1})
        )

        
        let glassSupport2 = new T.Mesh(
            new T.BoxGeometry(0.01, 0.16, 0.01  ),
            new T.MeshStandardMaterial({color: "black", roughness: 1})
        )

        glassSupport2.translateY(-0.065)
        glassSupport2.translateZ(-0.03)
        glassSupport.add(glassSupport2)
        glasses.add(glassSupport)
        glassSupport.translateZ(-0.15)
        glasses.add(glassesProtect)
        glassesProtect.translateX(-0.005)
        glasses.translateZ(1)
        glasses.translateX(-1.6)
        glasses.translateY(0.68)


        let glasses2 = glasses.clone();
        glasses2.scale.set(1, 1, -1)

        glasses2.translateZ(-1.3)
        truck.add(glasses2)

        //build tire
        let tire = new T.Shape()
        tire.moveTo(0 , 0)
        tire.arc(-1.3, 0, 0.3, 0, 360 * Math.PI/180)

        let tireMesh = new T.Mesh(
            new T.ExtrudeGeometry(tire, {depth: 0.2, bevelEnabled: false}),
            new T.MeshStandardMaterial({color: "black"})
        )

        tireMesh.translateY(-0.1)
        let tire1 = tireMesh.clone()
        tire1.translateZ(-0.2)
        let tire2 = tireMesh.clone()
        tire2.translateZ(0.7)

        let tire3 = tireMesh.clone()
        tire3.translateZ(-0.2)
        tire3.translateX(2.3)

        let tire4 = tireMesh.clone()
        tire4.translateX(2.3)
        tire4.translateZ(0.7)
        truck.add(tire1)
        truck.add(tire2)
        truck.add(tire3)
        truck.add(tire4)

        
        frontMesh.scale.set(1, 1, 1)
        frontMesh.translateZ(-0.05)
        frontMesh.translateY(0.03)
        truck.add(frontMesh)
        truck.add(glasses)

        super("CyberTruck", truck)

        truck.scale.set(1,1, 1)
        truck.position.set(0, -4.03, 0)
        truck.rotateY(90 * Math.PI/180)
        this.truck = truck
    }   

}