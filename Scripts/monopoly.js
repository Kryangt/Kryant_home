/*jshint esversion: 6 */
// @ts-check

/**
 * Graphics Town Framework - "Main" File
 *
 * This is the main file - it creates the world, populates it with
 * objects and behaviors, and starts things running
 *
 * The initial distributed version has a pretty empty world.
 * There are a few simple objects thrown in as examples.
 *
 * It is the students job to extend this by defining new object types
 * (in other files), then loading those files as modules, and using this
 * file to instantiate those objects in the world.
 */

import { GrWorld } from "../libs/CS559-Framework/GrWorld.js";
import { WorldUI } from "../libs/CS559-Framework/WorldUI.js";
import * as T from "../libs/CS559-Three/build/three.module.js";
import {main} from "./RealProgram/main.js";

/**m
 * The Graphics Town Main -
 * This builds up the world and makes it go...
 */

// make the world
export function Monopoly(canvas){

    let renderer = new T.WebGLRenderer({
            canvas: canvas,
            preserveDrawingBuffer:true
    });

    let lookfrom = new T.Vector3(30, 30, 40);
    let lookAt = new T.Vector3(0, 0, 0);
    renderer.setSize(canvas.width, canvas.height);
    let world = new GrWorld({
        renderer: renderer,
        lookfrom: lookfrom,
        lookat: lookAt,
    });
    
    let highlightName = []
    
    main(world, highlightName);
    
    
    let texture = new T.CubeTextureLoader().load(["/Scripts/RealProgram/textures/Environment/px.png",
        "/Scripts/RealProgram/textures/Environment/nx.png",
        "/Scripts/RealProgram/textures/Environment/py.png",
        "/Scripts/RealProgram/textures/Environment/ny.png",
        "/Scripts/RealProgram/textures/Environment/pz.png",
        "/Scripts/RealProgram/textures/Environment/nz.png"
    ])
    world.scene.background = texture
    ///////////////////////////////////////////////////////////////
    // build and run the UI
    // only after all the objects exist can we build the UI
    // @ts-ignore       // we're sticking a new thing into the world
    // now make it go!// now make it go!
    world.go();
}
