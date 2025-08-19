import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrWorld } from "../libs/CS559-Framework/GrWorld.js";
import { OrbitControls } from "../libs/CS559-Three/examples/jsm/controls/OrbitControls.js";
import {CompleteDonut} from "./Donuts.js"
import {AutoUI} from "../libs/CS559-Framework/AutoUI.js"

export function Donuts(canvas)
{
    let renderer = new T.WebGLRenderer({
        canvas: canvas,
        preserveDrawingBuffer:true
    });
    renderer.setSize(canvas.width, canvas.height);
    let lookfrom = new T.Vector3(0,10, 30)
    let lookAt = new T.Vector3(0, 0, 0)
    let world = new GrWorld({groundplane: 0, renderer: renderer, lookfrom: lookfrom, lookat : lookAt});

    let simpledonut = new CompleteDonut();
    let r_ui = new AutoUI(simpledonut, 1,  canvas, 1, true)
    world.add(simpledonut)
    world.go();
}

