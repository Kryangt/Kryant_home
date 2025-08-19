import { GrObject } from "../../../libs/CS559-Framework/GrObject.js"
import * as T from "../../../libs/CS559-Three/build/three.module.js";

export class ArticulateHauler extends GrObject
{
  constructor(para = {})
  {
    let hauler = new T.Group();
    let exSettings = {
        depth:0.5
    }
    //draw body

    let bodyGroup = new T.Group();
    let body = new T.Shape()
    body.moveTo(0, 0)
    body.lineTo(-0.5, 0)
    body.lineTo(-0.5, 0.5)
    body.lineTo(-0.25, 0.6)
    body.lineTo(-0.25, 0.75)
    body.lineTo(0, 0.75)
    body.lineTo(0, 0.15)
    body.lineTo(1.5, 0.15)
    body.lineTo(1.5, 0)
    body.lineTo(0, 0)

    let bodyMesh = new T.Mesh(
      new T.ExtrudeGeometry(body, exSettings),
      new T.MeshStandardMaterial({color: "#fad7a0"})
    )

    bodyGroup.add(bodyMesh)
    //draw connections

    let connectGroup = new T.Group()
    bodyGroup.add(connectGroup)

    connectGroup.position.set(1.5, 0.15, 0.25)
    
    let connectionMesh = new T.Mesh(
      new T.CylinderGeometry(0.05, 0.05, 0.5),
      new T.MeshStandardMaterial({color: "white"})
    )
    connectGroup.add(connectionMesh)
    hauler.add(bodyGroup)

    //draw the back
    let backGroup = new T.Group();
    connectGroup.add(backGroup)
    let buttom = new T.Mesh(
      new T.PlaneGeometry(0.75, 1.25, 64),
      new T.MeshStandardMaterial({color: "#fcf3cf", side: T.DoubleSide})
    )
    buttom.rotateY(90 * Math.PI/180)
    buttom.rotateX(90 * Math.PI/180)
    buttom.translateZ(-0.15)
    buttom.translateY(-0.6)
    backGroup.add(buttom)

    let side = new T.Mesh(
      new T.PlaneGeometry(1.25, 0.5),
      new T.MeshStandardMaterial({color: "#fcf3cf", side: T.DoubleSide})
    )
    backGroup.add(side)
    let side2 = side.clone()
    side.translateY(0.4)
    side.translateZ(0.375)
    side.translateX(-0.6)

    side2.translateY(0.4)
    side2.translateZ(-0.375)
    side2.translateX(-0.6)
    backGroup.add(side2)

    let front = new T.Mesh(
      new T.PlaneGeometry(0.75, 0.5),
      new T.MeshStandardMaterial({color: "#fcf3cf", side: T.DoubleSide})
    )

    front.rotateY (90 *Math.PI/180)


    front.translateY(0.4)
    let back = front.clone();
    back.translateZ(-1.2)


    backGroup.add(front)
    backGroup.add(back)

    let tierGroup = new T.Group()
    let tire = new T.Shape()
    tire.arc(0, 0, 0.2, 0, 360* Math.PI / 180)
    let tireMesh = new T.Mesh(
      new T.ExtrudeGeometry(tire, {depth: 0.2,   bevelEnabled: false}),
      new T.MeshStandardMaterial({color: "black"})
    )
  

    tireMesh.translateY(0.15)
    tireMesh.translateZ(-0.1)
    let tire1 = tireMesh.clone();
    let tire2 = tireMesh.clone();
    let tire3 = tireMesh.clone();
    tierGroup.add(tireMesh)
    tierGroup.add(tire1)
    tire1.translateZ(0.5)
    tierGroup.add(tire2)
    tire2.translateX(1)
    tierGroup.add(tire3)
    tire3.translateZ(0.5)
    tire3.translateX(1)
    hauler.add(tierGroup)
    bodyGroup.translateY(0.4)
    super(`ArticulateHauler`, hauler, [
      ["x", -10, 10, 0],
      ["z", -10, 10, 0],
      ["theta", 0, 360, 0],
      ["connection_lift", -45, 0 , 0],
      ["connection_theta", 0, 360, 0],
    ]);

    this.wb_object = hauler
    this.connect = connectGroup
    hauler.scale.set(1, 1, 1)
  }
}


export class Bulldozers extends GrObject
{
    constructor(param = {})
    {

      let exSettings = {
        depth: 0.025,
        bevelEnabled: true
      }
      let builldozer = new T.Group();
      //draw a base

      let base = new T.Shape();

      base.moveTo(0, 0.25);
      base.lineTo(0.25, 0.25);
      base.quadraticCurveTo(0.45, 0.125, 0.25, 0),
      base.lineTo(-0.25, 0)
      base.quadraticCurveTo(-0.45, 0.125, -0.25, 0.25)
      base.lineTo(0, 0.25);

      let tire = new T.Mesh(
        new T.ExtrudeGeometry(base,exSettings ),
        new T.MeshStandardMaterial({color: "black"})
      )

      tire.scale.set(1.5, 1,1)

      let tire2 = tire.clone();
      tire2.translateZ(-1)

      let tierGroup = new T.Group();
      tierGroup.add(tire2)
      tierGroup.add(tire)
      builldozer.add(tierGroup)


      //draw body
      let bodyGroup = new T.Group();

      let body = new T.Shape();
      body.moveTo(0, 0)
      body.lineTo( -0.75, 0)
      body.lineTo(-0.9, 0.45)
      body.lineTo(-0.75, 0.45)
      body.lineTo(-0.65, 0.25)
      body.lineTo(-0.25, 0.45)
      body.lineTo(-0.25, 0.9)
      body.lineTo(0.25, 0.9)
      body.lineTo(0.25, 0.45)
      body.lineTo(0.45, 0.45)
      body.lineTo(0.45, 0)
      let bodyMesh = new T.Mesh(
        new T.ExtrudeGeometry(body, {
          depth: 1
        }),
        new T.MeshStandardMaterial({color: "#2e4053"})
      )
      bodyGroup.translateZ(-1)
      bodyGroup.add(bodyMesh)
      builldozer.add(bodyGroup)


      //draw arm
      let armGroup = new T.Group();
      builldozer.add(armGroup)
      let arm = new T.Shape();
      arm.moveTo(0,0);
      arm.lineTo(-0.25, -0.25)
      arm.lineTo(-0.3, -0.2)
      arm.lineTo(-0.05, 0.05)
      let armMesh = new T.Mesh(
        new T.ExtrudeGeometry(arm, {
          depth: 0.05,
          bevelEnabled: false
        }),
        new T.MeshStandardMaterial({color: "#f2f3f4",  metalness: 0.8})
      )

      armMesh.scale.set(2, 2, 1)
      armGroup.position.set(-0.7, 0.5, 0)
      armGroup.add(armMesh)


      let armGroup2 = armGroup.clone();
      builldozer.add(armGroup2)
      armGroup2.translateZ(-1)


      let frontArmGroup = new T.Group()
      armGroup.add(frontArmGroup);
      frontArmGroup.position.set(-0.55, -0.45, 0)

      let frontArm = new T.Shape()
      frontArm.moveTo(0, 0)
      frontArm.lineTo(-0.15, 0);
      frontArm.lineTo(-0.15, 0.1)
      frontArm.lineTo(0,0.1)
      let frontArmMesh = new T.Mesh(
        new T.ExtrudeGeometry(frontArm, {
          depth: 0.05,
          bevelEnabled: false
        }),
        new T.MeshStandardMaterial({color: "#1b2631"})
      )


      frontArmGroup.add(frontArmMesh)
      
      let frontArmGroup2 = frontArmGroup.clone();
      armGroup2.add(frontArmGroup2)

      //draw basket
      let basketGroup = new T.Group();
      let basket = new T.Shape();
      basket.moveTo(0, 0)
      basket.quadraticCurveTo(-0.15, 0.2, -0.4, 0.35)
      basket.moveTo(0, 0)
      basket.quadraticCurveTo(-0.15, -0.2, -0.4, -0.35)

      let basketMesh = new T.Mesh(
        new T.ExtrudeGeometry(basket, {
          depth: 1,
        }),
        new T.MeshStandardMaterial({color: "#ba4a00"})
      )

      basketMesh.translateZ(-1)
      basketGroup.position.set(-0.15, 0, 0)
      basketGroup.add(basketMesh);
      frontArmGroup.add(basketGroup)



      builldozer.scale.set(1,1,1)
      builldozer.rotateY(120 * Math.PI/180)
      super(`Builldozer-1`, builldozer, [
        ["x", -10, 10, 0],
        ["z", -10, 10, 0],
        ["theta", 0, 360, 0],
        ["arm_rotate", -45, 0 , 1],
        ["forearm_rotate", 0, 90, 0],
        ["bucket_rotate", -90, 45, -41.8]
      ]);
      this.wb_object = builldozer;
      this.arm1 = armGroup
      this.arm2 = armGroup2;

      this.frontArm = frontArmGroup;
      this.frontArm2 = frontArmGroup2

      this.basket = basketGroup

    }
}



// A simple excavator
/**
 * @typedef ExcavatorProperties
 * @type {object}
 * @property {number} [x=0]
 * @property {number} [y=0]
 * @property {number} [z=0]
 * @property {number} [size=1]
 */
export class GrExcavator extends GrObject {
  /**
   * @param {ExcavatorProperties} params
   */

  static excavatorObCtr = 0
  constructor(params = {}) {
    let excavator = new T.Group();

    let exSettings = {
      steps: 2,
      depth: 0.4,
      bevelEnabled: true,
      bevelThickness: 0.2,
      bevelSize: 0.1,
      bevelSegments: 2
    };

    // As with the crane, we define the base (treads) of the excavator.
    // We draw a line, then extrude the line with ExtrudeGeometry,
    // to get the "cutout" style object.
    // Note, for this object, we translate each piece by 0.25 on the negative x-axis.
    // This makes rotation about the y-axis work nicely
    // (since the extrusion happens along +z, a y-rotation goes around an axis on the back face of the piece,
    //  rather than an axis through the center of the piece).
    /**@type THREE.Shape */
    let base_curve = new T.Shape();
    base_curve.moveTo(-1, 0);
    base_curve.lineTo(-1.2, 0.2);
    base_curve.lineTo(-1.2, 0.4);
    base_curve.lineTo(-1, 0.6);
    base_curve.lineTo(1, 0.6);
    base_curve.lineTo(1.2, 0.4);
    base_curve.lineTo(1.2, 0.2);
    base_curve.lineTo(1, 0);
    base_curve.lineTo(-1, 0);
    let base_geom = new T.ExtrudeGeometry(base_curve, exSettings);
    let excavator_mat = new T.MeshStandardMaterial({
      color: "white",
      metalness: 0.5,
      roughness: 0.7
    });
    let base = new T.Mesh(base_geom, excavator_mat);
    excavator.add(base);
    base.translateZ(-0.2);

    // We'll add the "pedestal" piece for the cab of the excavator to sit on.
    // It can be considered a part of the treads, to some extent,
    // so it doesn't need a group of its own.
    let pedestal_curve = new T.Shape();
    pedestal_curve.moveTo(-0.35, 0);
    pedestal_curve.lineTo(-0.35, 0.25);
    pedestal_curve.lineTo(0.35, 0.25);
    pedestal_curve.lineTo(0.35, 0);
    pedestal_curve.lineTo(-0.35, 0);
    let pedestal_geom = new T.ExtrudeGeometry(pedestal_curve, exSettings);
    let pedestal = new T.Mesh(pedestal_geom, excavator_mat);
    excavator.add(pedestal);
    pedestal.translateY(0.6);
    pedestal.translateZ(-0.2);

    // For the cab, we create a new group, since the cab should be able to spin on the pedestal.
    let cab_group = new T.Group();
    excavator.add(cab_group);
    cab_group.translateY(0.7);
    let cab_curve = new T.Shape();
    cab_curve.moveTo(-1, 0);
    cab_curve.lineTo(1, 0);
    cab_curve.lineTo(1.2, 0.35);
    cab_curve.lineTo(1, 0.75);
    cab_curve.lineTo(0.25, 0.75);
    cab_curve.lineTo(0, 1.5);
    cab_curve.lineTo(-0.8, 1.5);
    cab_curve.lineTo(-1, 1.2);
    cab_curve.lineTo(-1, 0);
    let cab_geom = new T.ExtrudeGeometry(cab_curve, exSettings);
    let cab = new T.Mesh(cab_geom, excavator_mat);
    cab_group.add(cab);
    cab.translateZ(-0.2);

    // Next up is the first part of the bucket arm.
    // In general, each piece is just a series of line segments,
    // plus a bit of extra to get the geometry built and put into a group.
    // We always treat the group as the "pivot point" around which the object should rotate.
    // It is helpful to draw the lines for extrusion with the zero at our desired "pivot point."
    // This minimizes the fiddling needed to get the piece placed correctly relative to its parent's origin.
    // The remaining few pieces are very similar to the arm piece.
    let arm_group = new T.Group();
    cab_group.add(arm_group);
    arm_group.position.set(-0.8, 0.5, 0);
    let arm_curve = new T.Shape();
    arm_curve.moveTo(-2.25, 0);
    arm_curve.lineTo(-2.35, 0.15);
    arm_curve.lineTo(-1, 0.5);
    arm_curve.lineTo(0, 0.25);
    arm_curve.lineTo(-0.2, 0);
    arm_curve.lineTo(-1, 0.3);
    arm_curve.lineTo(-2.25, 0);
    let arm_geom = new T.ExtrudeGeometry(arm_curve, exSettings);
    let arm_mat = new T.MeshStandardMaterial({
      color: "#888888",
      metalness: 0.6,
      roughness: 0.3
    });
    let arm = new T.Mesh(arm_geom, arm_mat);
    arm_group.add(arm);
    arm.translateZ(-0.2);

    let forearm_group = new T.Group();
    arm_group.add(forearm_group);
    forearm_group.position.set(-2.1, 0, 0);
    let forearm_curve = new T.Shape();
    forearm_curve.moveTo(-1.5, 0);
    forearm_curve.lineTo(-1.5, 0.1);
    forearm_curve.lineTo(0, 0.15);
    forearm_curve.lineTo(0.15, 0);
    forearm_curve.lineTo(-1.5, 0);
    let forearm_geom = new T.ExtrudeGeometry(forearm_curve, exSettings);
    let forearm = new T.Mesh(forearm_geom, arm_mat);
    forearm_group.add(forearm);
    forearm.translateZ(-0.2);

    let bucket_group = new T.Group();
    forearm_group.add(bucket_group);
    bucket_group.position.set(-1.4, 0, 0);
    let bucket_curve = new T.Shape();
    bucket_curve.moveTo(-0.25, -0.9);
    bucket_curve.lineTo(-0.5, -0.5);
    bucket_curve.lineTo(-0.45, -0.3);
    bucket_curve.lineTo(-0.3, -0.2);
    bucket_curve.lineTo(-0.15, 0);
    bucket_curve.lineTo(0.1, 0);
    bucket_curve.lineTo(0.05, -0.2);
    bucket_curve.lineTo(0.5, -0.7);
    bucket_curve.lineTo(-0.25, -0.9);
    let bucket_geom = new T.ExtrudeGeometry(bucket_curve, exSettings);
    let bucket = new T.Mesh(bucket_geom, arm_mat);
    bucket_group.add(bucket);
    bucket.translateZ(-0.2);


    
    excavator.scale.set(1, 1, 1)
    excavator.rotateY(210 * Math.PI/180)
    // note that we have to make the Object3D before we can call
    // super and we have to call super before we can use this
    // The parameters for sliders are also defined here.
    super(`Excavator-${GrExcavator.excavatorObCtr++}`, excavator);
    // As with the crane, we save the "excavator" group as the "whole object" of the GrExcavator class.
    // We also save the groups of each object that may be manipulated by the UI.
    this.wb_object = excavator;
    GrExcavator.excavatorObCtr += 1
    arm_group.rotation.z = -45 * Math.PI/180;
  }
}