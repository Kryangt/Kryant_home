import { GrObject } from "../../../libs/CS559-Framework/GrObject.js"
import * as T from "../../../libs/CS559-Three/build/three.module.js";

export class TurningPoint extends GrObject
{
    static pointNum = 0;
    purchasable; //0: houses that can be brought, 1: Turningpoint, 2: chance 3: Luxury Tax 4: Income Tax 5: Community Chest 6: 
    constructor(location)
    {
        let turningPoint = new T.Mesh(
            new T.BoxGeometry(5, 2, 5),
            new T.MeshStandardMaterial({color: "white", transparent: true, opacity: 0})
        )

        super(`TurningPoint_${TurningPoint.pointNum}`, turningPoint)
        TurningPoint.pointNum++;
        turningPoint.position.set(location.x, location.y, location.z)
        this.location = location
        this.isTurningPoint = true
        this.color;
        this.turningPoint = turningPoint
        this.purchasable = false;
    }

    stepWorld()
    {
        if(this.color != undefined)
        {
            this.turningPoint.material.color.set(this.color);
        }
    }
}