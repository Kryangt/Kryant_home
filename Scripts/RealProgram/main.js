import { Character } from "./Assets/Character.js";
import { Ground } from "./Assets/Ground.js";
import { TurningPoint } from "./Assets/TurningPoint.js";
import { DetectionPoint } from "./Assets/DetectionPoint.js";
import {Tracks, Train} from "./Assets/TrackAndTrain.js";
import * as T from "../../libs/CS559-Three/build/three.module.js";
import { Dice } from "./Assets/Dice.js";
import { AutoUI } from "../../libs/CS559-Framework/AutoUI.js";

export function main(world, highlightName)
{
    world.add(new Ground())

    let turningPoint1 = new DetectionPoint(new T.Vector3(17.25, 0, 17.25),world)
 

    let points = [turningPoint1]
    //add detection points


    let startingPoint = 12.8;

    for(let i = 0; i < 9; i += 1)
    {   
        let newDetectionPoint = new DetectionPoint(new T.Vector3(startingPoint - (i * 3.2), 0, 17.25), world)
        points.push(newDetectionPoint)
        world.add(newDetectionPoint)
    }

    let turningPoint2 = new DetectionPoint(new T.Vector3(-17.25, 0, 17.25),world)

    points.push(turningPoint2)

    for(let i = 0; i < 9; i += 1)
    {   
        let newDetectionPoint = new DetectionPoint(new T.Vector3(-17.25, 0, startingPoint - (i * 3.2)), world)
        points.push(newDetectionPoint)
        world.add(newDetectionPoint)
    }


    let turningPoint3 = new DetectionPoint(new T.Vector3(-17.25, 0, -17.25),world)
    points.push(turningPoint3)
    startingPoint = -12.8;
    for(let i = 0; i < 9; i += 1)
    {   
        let newDetectionPoint = new DetectionPoint(new T.Vector3(startingPoint + (i * 3.2), 0, -17.25), world)
        points.push(newDetectionPoint)
        world.add(newDetectionPoint)
    }

    let turningPoint4 = new DetectionPoint(new T.Vector3(17.25, 0, -17.25), world)
    points.push(turningPoint4)
    for(let i = 0; i < 9; i += 1)
    {   
        let newDetectionPoint = new DetectionPoint(new T.Vector3(17.25, 0, startingPoint + (i * 3.2)),world)
        points.push(newDetectionPoint)
        world.add(newDetectionPoint)
    }


    world.add(turningPoint1)
    world.add(turningPoint2)
    world.add(turningPoint3)
    world.add(turningPoint4)

    turningPoint1.isTurningPoint= true;
    turningPoint2.isTurningPoint = true;
    turningPoint3.isTurningPoint = true;
    turningPoint4.isTurningPoint = true;

    let characterSets = [];
    Character.highlightName = highlightName
    let Character1 = new Character("red", points, {x : 0.05})
    characterSets.push(Character1)
    let Character2 = new Character("Green", points, {x : 0.05})
    characterSets.push(Character2)
    let Character3 = new Character("Blue", points, {x : 0.05})
    characterSets.push(Character3)

    world.add(Character1)
    world.add(Character2)
    world.add(Character3)

    let dice = new Dice();
    world.add(dice)

    assignment(points)

    characterSets.forEach((character)=>{
        character.getDice(world.objects)
    })

    let tracks = new Tracks(points, highlightName)


    world.add(tracks)
}


function assignment(points)
{
    //-1. salary
    //0. houses
    //1. Community Chest
    //2. Income Tax
    //3. Railroad
    //4. Chance
    //5. Jail
    //6.blank
    //7. car
    //label some special points that are not purchaseable

    propertyAssign(points, 0, false, -1, 0);
    propertyAssign(points, 1, true, 0, 60);
    propertyAssign(points, 2, false, 1, 0);
    propertyAssign(points, 3, true, 0, 190);
    propertyAssign(points, 4, true, 2, 150);
    propertyAssign(points, 5, true, 3, 200);
    propertyAssign(points, 6, true, 0, 120);
    propertyAssign(points, 7, false, 4, 0);
    propertyAssign(points, 8, true, 0, 130);
    propertyAssign(points, 9, true, 0, 150);
    propertyAssign(points, 10, false, 6, 0);
    propertyAssign(points, 11, true, 0, 140);
    propertyAssign(points, 12, true, 7, 150);
    propertyAssign(points, 13, true, 0, 160);
    propertyAssign(points, 14, true, 0, 140);
    propertyAssign(points, 15, true, 3, 200);
    propertyAssign(points, 16, true, 0, 180);
    propertyAssign(points, 17, false, 1, 0);
    propertyAssign(points, 18, true, 0, 200);
    propertyAssign(points, 19, true, 0, 200);
    propertyAssign(points, 20, false, 6, 0);
    propertyAssign(points, 21, true, 0, 200);
    propertyAssign(points, 22, false, 4, 0);
    propertyAssign(points, 23, true, 0, 200);
    propertyAssign(points, 24, true, 0, 260);
    propertyAssign(points, 25, true, 3, 60);
    propertyAssign(points, 26, true, 0, 260);
    propertyAssign(points, 27, true, 0, 260);
    propertyAssign(points, 28, true, 6, 130);
    propertyAssign(points, 29, true, 0, 230);
    propertyAssign(points, 30, false, 5, 0);
    propertyAssign(points, 31, true, 0, 300);
    propertyAssign(points, 32, true, 0, 300);
    propertyAssign(points, 33, false, 1, 0);
    propertyAssign(points, 34, true, 0, 250);
    propertyAssign(points, 35, true, 3, 200);
    propertyAssign(points, 36, false, 4, 0);
    propertyAssign(points, 37, true, 0, 200);
    propertyAssign(points, 38, true, 2, 200);
    propertyAssign(points, 39, true, 0, 350);
}


function propertyAssign(points, index, purchasable, property, price)
{
    points[index].purchasable = purchasable;
    points[index].property =  property;
    points[index].price = price;
}