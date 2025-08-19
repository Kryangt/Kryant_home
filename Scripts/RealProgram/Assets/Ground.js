import { GrObject } from "../../../libs/CS559-Framework/GrObject.js"
import * as T from "../../../libs/CS559-Three/build/three.module.js";

export class Ground extends GrObject
{
    constructor()
    {
        let group = new T.Group()
        let plane = new T.TextureLoader().load("/Scripts/RealProgram/textures/monopolyMap.jpg")

        let planeMesh = new T.Mesh(
            new T.PlaneGeometry(40, 40, 64),
            new T.MeshStandardMaterial({map: plane})
        )

        let ground = new T.Mesh(
            new T.BoxGeometry(55, 0.5, 55),
            new T.MeshStandardMaterial({color: "#DADADA"})
        )

        let ambientLight = new T.AmbientLight("white", 2);
        
        group.add(ambientLight)
        group.add(ground)
        ground.add(planeMesh)
        planeMesh.rotateX(-90 * Math.PI/180)
        planeMesh.position.set(0, 0.5, 0)
        group.position.set(0, -0.25, 0)
        super("Ground", group)
    }
}