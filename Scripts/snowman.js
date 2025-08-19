// @ts-check

import * as T from "../libs/CS559-Three/build/three.module.js";
import { OrbitControls } from "../libs/CS559-Three/examples/jsm/controls/OrbitControls.js";
import { OBJLoader } from "../libs/CS559-Three/examples/jsm/loaders/OBJLoader.js";
import { MTLLoader } from "../libs/CS559-Three/examples/jsm/loaders/MTLLoader.js";
import { GLTFLoader } from "../libs/CS559-Three/examples/jsm/loaders/GLTFLoader.js";




export function Snowman(canvas){
    let renderer = new T.WebGLRenderer({
        canvas: canvas,
        preserveDrawingBuffer:true
    });
    renderer.setSize(canvas.width, canvas.height);

    // student does the rest.

    let scene = new T.Scene();
    let camera = new T.PerspectiveCamera(50, 1,1,1000);
    camera.position.y = 8;
    camera.position.x = 0;
    camera.position.z = 20;
    camera.lookAt(0, 3, 5)
    scene.add(camera)

    let sunLight = new T.DirectionalLight("#fdf2e9", 3.5);
    sunLight.position.set(10, 0, 0);


    let snowGround = new T.TextureLoader().load("../Textures/1/Snow bump.jpg")
    let groundBox = new T.BoxGeometry(20, 1, 20);
    let groundMesh = new T.Mesh(
            groundBox,
            new T.MeshStandardMaterial({roughness: 0.9, bumpMap: snowGround, bumpScale: 20})
        );

    groundMesh.position.y = -0.5;

    let soil = new T.TextureLoader().load("../Textures/1/Soil.jpg")
    soil.wrapS = T.RepeatWrapping;
    soil.wrapT = T.RepeatWrapping;

    let deepGround = new T.Mesh(
        new T.BoxGeometry(19.5, 5, 19.5),
        new T.MeshStandardMaterial({roughness: 0.9, map: soil})
    )
    deepGround.position.y = -2.6
    scene.add(deepGround)
    scene.add(groundMesh);

    sunLight.target = groundMesh;

    scene.add(sunLight)
    scene.add(new T.AmbientLight("white", 0.2));


    let controls = new OrbitControls(camera, renderer.domElement);

    //add snow man 1

    let snow1 = new T.Group();

    let bodySnow1 = new T.Mesh(
        new T.SphereGeometry(2, 64, 64),
        new T.MeshStandardMaterial({color: "white", bumpMap: snowGround, bumpScale: 5})
    )

    snow1.add(bodySnow1);
    snow1.position.y = 1;


    let headSnow1 = new T.Mesh(
        new T.SphereGeometry(1.5, 64, 64),
        new T.MeshStandardMaterial({color: "white", bumpMap: snowGround, bumpScale: 5})
    )
    headSnow1.position.y = 2.5
    bodySnow1.add(headSnow1)

    scene.add(snow1)

    let branch = new T.TextureLoader().load("../Textures/1/branch.jpg")
    branch.wrapS = T.MirroredRepeatWrapping;
    branch.wrapT = T.MirroredRepeatWrapping;

    branch.repeat.set(0.15, 0.15);

    let arm = new T.Mesh(
        new T.CylinderGeometry(0.05, 0.05, 5, 64, 64),
        new T.MeshStandardMaterial({map: branch, bumpMap:branch})
    );


    let rightarm = arm.clone();


    let subBranchLength = 0.75
    let subBranch = new T.Mesh(
        new T.CylinderGeometry(0.025, 0.025, subBranchLength, 64, 64),
        new T.MeshStandardMaterial({map: branch, bumpMap:branch})
    );

    let sub1 = subBranch.clone();
    rightarm.add(sub1)
    sub1.position.y = 2.25
    sub1.position.x = -0.2;
    sub1.rotateZ(45 * Math.PI / 180);

    let sub2 = subBranch.clone();
    rightarm.add(sub2)
    sub2.position.y = 2.25
    sub2.position.x = 0.15;
    sub2.rotateZ(-30 * Math.PI/180)

    let sub3 = subBranch.clone();
    rightarm.add(sub3)
    sub3.position.y = 1.15
    sub3.position.x = -0.25
    sub3.rotateZ(60 * Math.PI/180)
    /*
    const axesHelper = new T.AxesHelper(5);
    scene.add(axesHelper)
    */

    let sub4 = subBranch.clone();
    rightarm.add(sub4)
    sub4.position.y = 1.7
    sub4.position.x = 0.25
    sub4.rotateZ(-50* Math.PI/180)

    let leftarm = rightarm.clone();

    rightarm.rotateZ(-50 * Math.PI/180)
    rightarm.position.x = 2;
    rightarm.position.y = 1.5;
    snow1.add(rightarm)


    leftarm.rotateZ(50 * Math.PI /180)
    leftarm.position.x = -2;
    leftarm.position.y= 1.5;
    snow1.add(leftarm)

    //load nose
    let loader = new OBJLoader();
    let nose = loader.loadAsync("../Textures/1/Carrot.obj")

    nose.then((obj)=>{

        
        obj.scale.set(0.2, 0.2,0.2);
        obj.rotateX(-90 * Math.PI/ 180)

        obj.position.z = 2
        obj.rotateY(-30 * Math.PI/180)
        obj.position.y = 0.2;

        let texture = new T.TextureLoader().load("../Textures/1/CarrotTex.png")
        texture.wrapS = T.RepeatWrapping;
        texture.wrapT = T.RepeatWrapping;
        texture.repeat.set(5,5)

        obj.traverse((child) => {
            if (child.isMesh && child.material) {
                child.material.map = texture;
                child.material.needsUpdate = true;
                child.castShadow = true;
                child.receiveShadow = true;
            }
        });

        headSnow1.add(obj);
    }).catch(()=>
    {
        console.log("error");
    })

    //load glasses

    let glassesMaterial = new MTLLoader();
    glassesMaterial.load("../Textures/1/sunglasses.mtl", (material)=>
    {
        material.preload();

        let objLoader = new OBJLoader();
        objLoader.setMaterials(material);
        objLoader.loadAsync("../Textures/1/sunglasses.obj")
            .then((obj) => {
                obj.scale.set(10, 10, 10); 
                obj.position.set(0, 0.45, 0.5); 

                obj.traverse((child) => {
                    if (child.isMesh && child.material) {
                        child.castShadow = true;
                        child.receiveShadow = true;
                    }
                });
                headSnow1.add(obj);
            })
            .catch((error) => {
                alert("hi")
            });
    })



    scene.traverse(object => {
        if (object.isMesh && object.material) {
            object.castShadow = true;
            object.receiveShadow = true;
        }
    })


    renderer.shadowMap.enabled = true;
    let angle = 0;

    let snowParticle = new T.Mesh(
        new T.SphereGeometry(0.1),
        new T.MeshStandardMaterial({color: "white"})
    )

    let snows = [];
    let snowGroup = new T.Group();
    snowGroup.name = "snowGroup"
    for(let i = 0; i < 200; i++)
    {
        let snowSample = snowParticle.clone();

        snowSample.position.set(Math.random() * 20-10, Math.random() * 10, Math.random() * 20-10)

        snows.push(snowSample)
        snowGroup.add(snowSample)
    }
    scene.add(snowGroup)

    //put a hat

    let hatTop = new T.Mesh(
        new T.ConeGeometry(0.7, 2, 64),
        new T.MeshStandardMaterial({color: "red", roughness: 1})
    )
    hatTop.position.set(0, 1.75, 0);
    headSnow1.add(hatTop)
    hatTop.rotateZ(15 * Math.PI/180)
    hatTop.translateX(-0.5)

    //load cigarette
    let cigaretteLoader = new MTLLoader();
    cigaretteLoader.load("../Textures/1/Tobacco Pipe.mtl", (material)=>
    {
        material.preload();

        let loader = new OBJLoader();
        loader.setMaterials(material);
        loader.loadAsync("../Textures/1/Tobacco Pipe.obj").then((obj)=>{
            obj.scale.set(0.025,0.025,0.025)
            let quaternion = new T.Quaternion();
            //quaternion.setFromAxisAngle(new T.Vector3(0, 0, 1), Math.PI/2);

            //obj.applyQuaternion(quaternion);

            obj.rotateY(Math.PI/2)
            obj.translateX(-2)
            obj.translateY(-0.75)
            obj.traverse((child) => {
                child.castShadow = true;
                child.receiveShadow = true;
        });
            headSnow1.add(obj)
        }).catch(()=>{
            alert("error")
        })

    })


    let prev
    function animationLoop(timeStamp)
    {

        //let the light source move
        // Adjust the speed of the movement
        if(!isPause)
        {   
            angle += 0.001;
        }


        if(prev != undefined)
            {
                let delta = timeStamp - prev;
                if(delta > 4.2)
                {
                    //append snow sample
                    let snowSample = snowParticle.clone();
                    snowSample.position.set(Math.random() * 20-10, Math.random() * 20, Math.random() * 20-10)
                    if(!isPause)
                    {
                        snowGroup.add(snowSample)
                    }
                }
            }
        
            snowGroup.children.forEach((snowSample) => {
                if(isPause)
                {
                    snowSample.position.y -= 0;
                }else
                {
                    snowSample.position.y -= 0.01; // Move the snow particle down
                }
                if (snowSample.position.y < 0) {
                    snowGroup.remove(snowSample) // Reset the position if it goes below the ground
                }
            });

            prev = timeStamp;

        sunLight.position.set(10*Math.cos(angle), 10 * Math.sin(angle), 0);


        renderer.render(scene, camera)


        requestAnimationFrame(animationLoop)
    }

    let isPause = false;
    document.getElementById("pause")?.addEventListener("click", () => {
        isPause = !isPause;
    });
    requestAnimationFrame(animationLoop)
}
