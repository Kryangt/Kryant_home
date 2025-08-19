import { GrObject } from "../libs/CS559-Framework/GrObject.js"
import { shaderMaterial } from "../libs/CS559-Framework/shaderHelper.js";
import * as T from "../libs/CS559-Three/build/three.module.js";

export class simpleDonut extends GrObject
{
    constructor()
    {
        let group = new T.Group();

        let donutGeo = new T.TorusGeometry(2, 1, 64,64)

        let red = 128
        let green = 0;
        let blue = 0;
        let donutMat = new shaderMaterial('./SimpleShader.vs', './SimpleShader.fs', {
            uniforms:{
                red: {value:red},
                green: {value: green},
                blue: {value: blue}
            }
        });

        let donut = new T.Mesh(
            donutGeo,
            donutMat
        )

        super("Simple donut", donut, [
            ["Red", 0, 128, 128],
            ["Green", 0, 128, 0],
            ["Blue", 0, 128, 0]
        ])
        donut.position.set(0, 4, 0)
        this.donut = donut;
        this.red = red;
        this.green = green;
        this.blue = blue
    }

    stepWorld(ms)
    {
        this.donut.rotation.x += ms/1000
        this.donut.rotation.y -= ms/1000
        this.donut.rotation.z *= ms/1000
    }
    update(paramValues)
    {
        this.red = paramValues[0]

        this.green = paramValues[1]
        this.blue = paramValues[2]
        this.donut.material.uniforms.red.value = this.red;
        this.donut.material.uniforms.green.value = this.green;
        this.donut.material.uniforms.blue.value = this.blue;
    }
}

export class GGXDonut extends GrObject
{
    constructor()
    {
        let group = new T.Group();

        let donutGeo = new T.TorusGeometry(4, 2, 64,64)

        let red = 128
        let green = 0;
        let blue = 0;


        let light1 = new T.DirectionalLight("#82e0aa",2)
        let light2 = new T.DirectionalLight("#7fb3d5",2)

        light2.position.set(2, 8, 0)
        light1.position.set(-2, 0, 0)
  

        let lightDirection1 = new T.Vector3().subVectors(light1.position, new T.Vector3(0, 4,0)).normalize()
        let lightDirection2 = new T.Vector3().subVectors(light2.position,new T.Vector3(0, 4,0)).normalize()

        let lightIntensity1 = 3.0;
        let lightIntensity2 = 2.0;

        let roughness = 0.3;
        let donutMat = new shaderMaterial('./GGXShader.vs', './GGXShader.fs', {
            uniforms:{
                red: {value:red},
                green: {value: green},
                blue: {value: blue},
                lightDirection1: {value: lightDirection1.normalize()},
                lightDirection2: {value: lightDirection2.normalize()},
                lightColor1: { value: new T.Color("orange")},
                lightColor2: { value: new T.Color("pink")},
                lightIntensity1: { value: lightIntensity1 }, // Intensity of light 1
                lightIntensity2: { value: lightIntensity2 },  // Intensity of light 2
                ambientIntensity: {value: new T.Vector3(0.2, 0.2, 0.2)},
                roughness: {value: roughness}
            }
        }); 

        let donut = new T.Mesh(
            donutGeo,
            donutMat
        )
        donut.position.set(0, 6, 0)
        group.add(donut)

        //light1.lookAt(donut.position)
        //group.add(light1)

       //light2.lookAt(donut.position)
        //group.add(light2)
        

        super("GGX Donut", group, [
            ["Red", 0, 128, 128],
            ["Green", 0, 128, 0],
            ["Blue", 0, 128, 0],
            ["Ambient Intensity", 0, 1, 0.2, 0.1],
            ["Light1 Intensity", 0, 1, 0.5, 0.1],
            ["Light2 Intensity", 0, 1, 0.5, 0.1],
            ["Roughness", 0, 1, 0.3, 0.1],
            ["Rotate", 0, 1, 1, 1]
        ])

        this.donut = donut;
        this.red = red;
        this.green = green;
        this.blue = blue;
        this.rotate = 1;
        this.roughness = roughness
    }

    stepWorld(ms)
    {
        if(this.rotate == 1)
        {
            this.donut.rotation.x += ms/1000
            this.donut.rotation.y -= ms/1000
            this.donut.rotation.z *= ms/1000
        }

    }
    update(paramValues)
    {
        this.donut.material.uniforms.red.value = paramValues[0];
        this.donut.material.uniforms.green.value = paramValues[1];
        this.donut.material.uniforms.blue.value = paramValues[2];
        let ambientInten = new T.Vector3(paramValues[3], paramValues[3], paramValues[3])
        this.donut.material.uniforms.ambientIntensity.value = ambientInten;
        this.donut.material.uniforms.lightIntensity1.value = paramValues[4];
        this.donut.material.uniforms.lightIntensity2.value = paramValues[5];
        this.roughness = paramValues[6];
        this.donut.material.uniforms.roughness.value = this.roughness;
        this.rotate = paramValues[7]
    }
}

export class LambertianDonuts extends GrObject
{
    constructor()
    {
        let group = new T.Group();

        let donutGeo = new T.TorusGeometry(2, 1, 64,64)

        let red = 128
        let green = 0;
        let blue = 0;


        let light1 = new T.DirectionalLight("#82e0aa",2)
        let light2 = new T.DirectionalLight("#7fb3d5",2)

        light2.position.set(2, 5, 0)
        light1.position.set(-2, 0, 0)
  

        let lightDirection1 = new T.Vector3().subVectors(light1.position, new T.Vector3(0, 4,0)).normalize()
        let lightDirection2 = new T.Vector3().subVectors(light2.position,new T.Vector3(0, 4,0)).normalize()

        let lightIntensity1 = 3.0;
        let lightIntensity2 = 2.0;
        let donutMat = new shaderMaterial('./LambertianShader.vs', './LambertianShader.fs', {
            uniforms:{
                red: {value:red},
                green: {value: green},
                blue: {value: blue},
                lightDirection1: {value: lightDirection1},
                lightDirection2: {value: lightDirection2},
                lightColor1: { value: new T.Color("orange")},
                lightColor2: { value: new T.Color("pink")},
                lightIntensity1: { value: lightIntensity1 }, // Intensity of light 1
                lightIntensity2: { value: lightIntensity2 },  // Intensity of light 2
                ambientIntensity: {value: new T.Vector3(0.2, 0.2, 0.2)}
            }
        }); 

        let donut = new T.Mesh(
            donutGeo,
            donutMat
        )
        donut.position.set(0, 4, 0)
        group.add(donut)

        //light1.lookAt(donut.position)
        //group.add(light1)

       //light2.lookAt(donut.position)
        //group.add(light2)
        

        super("Lambertian Donut", group, [
            ["Red", 0, 128, 128],
            ["Green", 0, 128, 0],
            ["Blue", 0, 128, 0],
            ["Ambient Intensity", 0, 1, 0.2, 0.1],
            ["light1 Intensity", 0, 1, 0.5, 0.1],
            ["light2 Intensity", 0, 1, 0.5, 0.1],
            ["Rotate", 0, 1, 1]
        ])

        this.donut = donut;
        this.red = red;
        this.green = green;
        this.blue = blue;
        this.rotate = 1;
    }

    stepWorld(ms)
    {
        if(this.rotate)
        {
            this.donut.rotation.x += ms/1000
            this.donut.rotation.y -= ms/1000
            this.donut.rotation.z *= ms/1000
        }

    }
    update(paramValues)
    {

        this.rotate = paramValues[6]
  
        this.donut.material.uniforms.red.value = paramValues[0];
        this.donut.material.uniforms.green.value = paramValues[1];
        this.donut.material.uniforms.blue.value = paramValues[2];
        let ambientInten = new T.Vector3(paramValues[3], paramValues[3], paramValues[3])
        this.donut.material.uniforms.ambientIntensity.value = ambientInten;
        this.donut.material.uniforms.lightIntensity1.value = paramValues[4];
        this.donut.material.uniforms.lightIntensity2.value = paramValues[5];
    }
}

export class GGXGeometricDonut extends GrObject
{
    constructor()
    {
        let group = new T.Group();

        let donutGeo = new T.TorusGeometry(4, 2, 64,64)

        let red = 128
        let green = 0;
        let blue = 0;


        let light1 = new T.DirectionalLight("#82e0aa",2)
        let light2 = new T.DirectionalLight("#7fb3d5",2)

        light2.position.set(2, 5, 0)
        light1.position.set(-2, 0, 0)
  

        let lightDirection1 = new T.Vector3().subVectors(light1.position, new T.Vector3(0, 4,0)).normalize()
        let lightDirection2 = new T.Vector3().subVectors(light2.position,new T.Vector3(0, 4,0)).normalize()

        let lightIntensity1 = 3.0;
        let lightIntensity2 = 2.0;

        let roughness = 0.5;
        let donutMat = new shaderMaterial('./GeometricShader.vs', './GeometricShader.fs', {
            uniforms:{
                red: {value:red},
                green: {value: green},
                blue: {value: blue},
                lightDirection1: {value: lightDirection1.normalize()},
                lightDirection2: {value: lightDirection2.normalize()},
                lightColor1: { value: new T.Color("orange")},
                lightColor2: { value: new T.Color("pink")},
                lightIntensity1: { value: lightIntensity1 }, // Intensity of light 1
                lightIntensity2: { value: lightIntensity2 },  // Intensity of light 2
                ambientIntensity: {value: new T.Vector3(0.2, 0.2, 0.2)},
                roughness: {value: roughness}
            }
        }); 

        let donut = new T.Mesh(
            donutGeo,
            donutMat
        )
        donut.position.set(0, 6, 0)
        group.add(donut)

        //light1.lookAt(donut.position)
        //group.add(light1)

       //light2.lookAt(donut.position)
        //group.add(light2)
        

        super("GGX+Geometric Donut", group, [
            ["Red", 0, 128, 128],
            ["Green", 0, 128, 0],
            ["Blue", 0, 128, 0],
            ["Ambient Intensity", 0, 1, 0.2, 0.1],
            ["Light1 Intensity", 0, 1, 0.5, 0.1],
            ["Light2 Intensity", 0, 1, 0.5, 0.1],
            ["Roughness", 0, 1, 0.5, 0.1],
            ["Rotate", 0, 1, 1, 1]
        ])

        this.donut = donut;
        this.red = red;
        this.green = green;
        this.blue = blue;
        this.rotate = 1;
        this.roughness = roughness
    }

    stepWorld(ms)
    {
        if(this.rotate == 1)
        {
            this.donut.rotation.x += ms/1000
            this.donut.rotation.y -= ms/1000
            this.donut.rotation.z *= ms/1000
        }

    }
    update(paramValues)
    {
        this.donut.material.uniforms.red.value = paramValues[0];
        this.donut.material.uniforms.green.value = paramValues[1];
        this.donut.material.uniforms.blue.value = paramValues[2];
        let ambientInten = new T.Vector3(paramValues[3], paramValues[3], paramValues[3])
        this.donut.material.uniforms.ambientIntensity.value = ambientInten;
        this.donut.material.uniforms.lightIntensity1.value = paramValues[4];
        this.donut.material.uniforms.lightIntensity2.value = paramValues[5];
        this.roughness = paramValues[6];
        this.donut.material.uniforms.roughness.value = this.roughness;
        this.rotate = paramValues[7]
    }
}


export class CompleteDonut extends GrObject
{
    constructor()
    {
        let group = new T.Group();

        let donutGeo = new T.TorusGeometry(4, 2, 64,64)

        let red = 128
        let green = 0;
        let blue = 0;


        let light1 = new T.DirectionalLight("#82e0aa",2)
        let light2 = new T.DirectionalLight("#7fb3d5",2)

        light2.position.set(2, 5, 0)
        light1.position.set(-2, 0, 0)
  

        let lightDirection1 = new T.Vector3().subVectors(light1.position, new T.Vector3(0, 4,0)).normalize()
        let lightDirection2 = new T.Vector3().subVectors(light2.position,new T.Vector3(0, 4,0)).normalize()

        let lightIntensity1 = 3.0;
        let lightIntensity2 = 2.0;

        let roughness = 0.5;
        let metalness = 0.0;
        let donutMat = new shaderMaterial('./CompleteShader.vs', './CompleteShader.fs', {
            uniforms:{
                red: {value:red},
                green: {value: green},
                blue: {value: blue},
                lightDirection1: {value: lightDirection1.normalize()},
                lightDirection2: {value: lightDirection2.normalize()},
                lightColor1: { value: new T.Color("orange")},
                lightColor2: { value: new T.Color("pink")},
                lightIntensity1: { value: lightIntensity1 }, // Intensity of light 1
                lightIntensity2: { value: lightIntensity2 },  // Intensity of light 2
                ambientIntensity: {value: new T.Vector3(0.2, 0.2, 0.2)},
                roughness: {value: roughness},
                metalness: {value: metalness}
            }
        }); 

        let donut = new T.Mesh(
            donutGeo,
            donutMat
        )
        donut.position.set(0, 6, 0)
        group.add(donut)

        //light1.lookAt(donut.position)
        //group.add(light1)

       //light2.lookAt(donut.position)
        //group.add(light2)
        

        super("Complete Donut", group, [
            ["Red", 0, 128, 128],
            ["Green", 0, 128, 0],
            ["Blue", 0, 128, 0],
            ["Ambient Intensity", 0, 1, 0.2, 0.1],
            ["Light1 Intensity", 0, 1, 0.5, 0.1],
            ["Light2 Intensity", 0, 1, 0.5, 0.1],
            ["Roughness", 0, 1, 0.5, 0.1],
            ["Rotate", 0, 1, 1, 1],
            ["Metalness", 0, 1, 0, 0.1]
        ])

        this.donut = donut;
        this.red = red;
        this.green = green;
        this.blue = blue;
        this.rotate = 1;
        this.roughness = roughness
        this.metalness = metalness
    }

    stepWorld(ms)
    {
        if(this.rotate == 1)
        {
            this.donut.rotation.x += ms/1000
            this.donut.rotation.y -= ms/1000
            this.donut.rotation.z *= ms/1000
        }

    }
    update(paramValues)
    {
        this.donut.material.uniforms.red.value = paramValues[0];
        this.donut.material.uniforms.green.value = paramValues[1];
        this.donut.material.uniforms.blue.value = paramValues[2];
        let ambientInten = new T.Vector3(paramValues[3], paramValues[3], paramValues[3])
        this.donut.material.uniforms.ambientIntensity.value = ambientInten;
        this.donut.material.uniforms.lightIntensity1.value = paramValues[4];
        this.donut.material.uniforms.lightIntensity2.value = paramValues[5];
        this.roughness = paramValues[6];
        this.donut.material.uniforms.roughness.value = this.roughness;
        this.rotate = paramValues[7]
        this.metalness = paramValues[8];
        this.donut.material.uniforms.metalness.value = this.metalness;
    }
}


export class PhysicalDonut extends GrObject
{
    constructor()
    {
        let group = new T.Group();

        let donutGeo = new T.TorusGeometry(4, 2, 64,64)

        let red = 128
        let green = 0;
        let blue = 0;


        let light1 = new T.DirectionalLight("#82e0aa",2)
        let light2 = new T.DirectionalLight("#7fb3d5",2)

        light2.position.set(-8, 8, 0)
        light1.position.set(-12, 0, 0)
  

        let lightDirection1 = new T.Vector3().subVectors(light1.position, new T.Vector3(-10, 6,0)).normalize()
        let lightDirection2 = new T.Vector3().subVectors(light2.position,new T.Vector3(-10, 6,0)).normalize()

        let lightIntensity1 = 3.0;
        let lightIntensity2 = 2.0;

        let roughness = 0.3;
        let metalness = 0.3;
        let donutMat = new shaderMaterial('./Physical.vs', './Physical.fs', {
            uniforms:{
                red: {value:red},
                green: {value: green},
                blue: {value: blue},
                lightDirection1: {value: lightDirection1.normalize()},
                lightDirection2: {value: lightDirection2.normalize()},
                lightColor1: { value: new T.Color("orange")},
                lightColor2: { value: new T.Color("pink")},
                lightIntensity1: { value: lightIntensity1 }, // Intensity of light 1
                lightIntensity2: { value: lightIntensity2 },  // Intensity of light 2
                ambientIntensity: {value: new T.Vector3(0.2, 0.2, 0.2)},
                roughness: {value: roughness},
                metalness: {value: metalness}
            }
        }); 

        let donut = new T.Mesh(
            donutGeo,
            donutMat
        )
        donut.position.set(-10, 6, 0)
        group.add(donut)

        //light1.lookAt(donut.position)
        //group.add(light1)

       //light2.lookAt(donut.position)
        //group.add(light2)
        

        super("Physical Donut", group, [
            ["Red", 0, 128, 128],
            ["Green", 0, 128, 0],
            ["Blue", 0, 128, 0],
            ["Ambient Intensity", 0, 1, 0.2, 0.1],
            ["Light1 Intensity", 0, 1, 0.5, 0.1],
            ["Light2 Intensity", 0, 1, 0.5, 0.1],
            ["Roughness", 0, 1, 0.3, 0.01],
            ["Rotate", 0, 1, 1, 1],
            ["Metalness", 0, 1, 0.3, 0.01]
        ])

        this.donut = donut;
        this.red = red;
        this.green = green;
        this.blue = blue;
        this.rotate = 1;
        this.roughness = roughness
        this.metalness = metalness
    }

    stepWorld(ms)
    {
        if(this.rotate == 1)
        {
            this.donut.rotation.x += ms/1000
            this.donut.rotation.y -= ms/1000
            this.donut.rotation.z *= ms/1000
        }

    }
    update(paramValues)
    {
        this.donut.material.uniforms.red.value = paramValues[0];
        this.donut.material.uniforms.green.value = paramValues[1];
        this.donut.material.uniforms.blue.value = paramValues[2];
        let ambientInten = new T.Vector3(paramValues[3], paramValues[3], paramValues[3])
        this.donut.material.uniforms.ambientIntensity.value = ambientInten;
        this.donut.material.uniforms.lightIntensity1.value = paramValues[4];
        this.donut.material.uniforms.lightIntensity2.value = paramValues[5];
        this.roughness = paramValues[6];
        this.donut.material.uniforms.roughness.value = this.roughness;
        this.rotate = paramValues[7]
        this.metalness = paramValues[8];
        this.donut.material.uniforms.metalness.value = this.metalness;
    }
}


export class SimplePhong extends GrObject
{
    constructor()
    {
        let group = new T.Group();

        let donutGeo = new T.TorusGeometry(4, 2, 64,64)

        let red = 128
        let green = 0;
        let blue = 0;


        let light1 = new T.DirectionalLight("#82e0aa",2)
        let light2 = new T.DirectionalLight("#7fb3d5",2)

        light2.position.set(12, 8, 0)
        light1.position.set(8, 0, 0)
  

        let lightDirection1 = new T.Vector3().subVectors(light1.position, new T.Vector3(10, 6,0)).normalize()
        let lightDirection2 = new T.Vector3().subVectors(light2.position,new T.Vector3(10, 6,0)).normalize()

        let lightIntensity1 = 3.0;
        let lightIntensity2 = 2.0;

        let shininess = 50;
        let donutMat = new shaderMaterial('./PhongShader.vs', './PhongShader.fs', {
            uniforms:{
                red: {value:red},
                green: {value: green},
                blue: {value: blue},
                lightDirection1: {value: lightDirection1.normalize()},
                lightDirection2: {value: lightDirection2.normalize()},
                lightColor1: { value: new T.Color("orange")},
                lightColor2: { value: new T.Color("pink")},
                lightIntensity1: { value: lightIntensity1 }, // Intensity of light 1
                lightIntensity2: { value: lightIntensity2 },  // Intensity of light 2
                ambientIntensity: {value: new T.Vector3(0.2, 0.2, 0.2)},
                shininess: {value : shininess}
            }
        }); 

        let donut = new T.Mesh(
            donutGeo,
            donutMat
        )
        donut.position.set(10, 6, 0)
        group.add(donut)

        //light1.lookAt(donut.position)
        //group.add(light1)

       //light2.lookAt(donut.position)
        //group.add(light2)
        

        super("Phong Donut", group, [
            ["Red", 0, 128, 128],
            ["Green", 0, 128, 0],
            ["Blue", 0, 128, 0],
            ["Ambient Intensity", 0, 1, 0.2, 0.1],
            ["Light1 Intensity", 0, 1, 0.5, 0.1],
            ["Light2 Intensity", 0, 1, 0.5, 0.1],
            ["Shineness", 0, 1000, 50, 0.01],
            ["Rotate", 0, 1, 1, 1],
        ])

        this.donut = donut;
        this.red = red;
        this.green = green;
        this.blue = blue;
        this.rotate = 1;
        this.shininess = shininess;
    }

    stepWorld(ms)
    {
        if(this.rotate == 1)
        {
            this.donut.rotation.x += ms/1000
            this.donut.rotation.y -= ms/1000
            this.donut.rotation.z *= ms/1000
        }

    }
    update(paramValues)
    {
        this.donut.material.uniforms.red.value = paramValues[0];
        this.donut.material.uniforms.green.value = paramValues[1];
        this.donut.material.uniforms.blue.value = paramValues[2];
        let ambientInten = new T.Vector3(paramValues[3], paramValues[3], paramValues[3])
        this.donut.material.uniforms.ambientIntensity.value = ambientInten;
        this.donut.material.uniforms.lightIntensity1.value = paramValues[4];
        this.donut.material.uniforms.lightIntensity2.value = paramValues[5];
        this.shininess = paramValues[6];
        this.donut.material.uniforms.shininess.value = this.shininess;
        this.rotate = paramValues[7]
    }
}