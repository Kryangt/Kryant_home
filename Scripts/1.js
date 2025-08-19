
export function protraitRender(canvas)
{

    let animationID

    let context = canvas.getContext("2d")

    let previousT
    let centerX = canvas.width/2-50
    let lastDisplacement = centerX
    let centerY = canvas.height/2
    let scaleX = 1.25
    let scaleY = -1.25
    let count = 0
    let startTimestamp = null;
    function draw(timestamp)
    {
        if (startTimestamp === null) {
            startTimestamp = timestamp;
        }
        const localTime = timestamp - startTimestamp;

        context.clearRect(0,0, canvas.width, canvas.height);
        context.save();
        context.translate(centerX+50, centerY);

        context.scale(scaleX, scaleY);
        //assume the whole process of drawing the face is 3 seconds
        {
            if(previousT != undefined && localTime >= 3000 & localTime < 3500)
            {
                let delta = localTime / 1000 - previousT;
                centerX = -150* delta + centerX;

                if(scaleX >= 1 && scaleY <= -1)
                {
                    scaleX = scaleX - delta * 0.52 ;
                    scaleY = delta * 0.52 + scaleY
                }
            }
            previousT = localTime/1000;
            drawFace(localTime);
            drawEyes(localTime);
            drawHat(localTime);

            context.save();
            context.translate(20, 0)
            if(localTime > 7000 && mouseClick)
            {
                let mouse = mouses[(mouseIndex)% mouses.length];
                context.beginPath();
                context.moveTo(mouse[0][0], mouse[0][1])
                context.quadraticCurveTo(mouse[1][0], mouse[1][1], mouse[2][0], mouse[2][1])
                context.lineWidth = 3;
                context.stroke();
            }
            context.restore()
        }

        context.restore();

        context.save();
        context.translate(canvas.width/2-50, canvas.height/2);
        context.scale(1, -1);
            //this block of functions draw alphabets
            {
                drawLetters(localTime - 3500)
            }
        //drawTestCurve(pointSets1);
        //drawTestCurve(pointSets2);
        //drawTestCurve(pointSets3);
        // drawTestCurve(pointSets4);


        context.restore(); 
        animationID = requestAnimationFrame(draw);
    }

    let mouseOption1 = [[-0.67, -56.375], [-14.67, -57.375], [-28.67, -57.375]]
    let mouseOption2 = [[16, -47.386], [-11, -77.39], [-40, -49.36]]
    let mouseOption3 = [[10,-55.39], [-13, -35.39], [-39, -55.39]]
    let mouseOption4 = [[17,-56.39], [8, -75.39], [-9, -73.39]]
    let mouses = [mouseOption1, mouseOption2, mouseOption3, mouseOption4]
    let mouseIndex = 0;
    let mouseClick = false

    canvas.onclick = () =>
    {
        mouseClick = true;
        mouseIndex += 1;
    }


    let HMovingCurveSet = [[canvas.width, canvas.height], [82.67, -57.375] , [-400,200], [300,0]]
    let HstaticCurve = [[[82.67, -54.375], [80, -90.375], [82.67, -127.375]], 
    [[80, -90.375],[92, -90.375],[124.67, -90.375]], 
    [[122.67, -57.375], [124.67, -90.375], [122.67, -127.375]]]

    let iMovingCurveSet = [[canvas.width, Math.random(0, -canvas.height)], [114.67, -116.7] , [-50,-200], [-100,-60]]
    let istaticCurve = [[iMovingCurveSet[iMovingCurveSet.length-3], [110.67, -126.375], [103.67, -131.375]],
    [[104.67, -130.375], [90.67, -141.7],[102.67, -116.7]], 
    [[101.67, -117.7], [105.67, -110.7], [106.67, -103.375]],
    [[106.67, -104.7], [105.67, -91.7], [91.67, -105.708]],
    [[84.33, -110.7], [102.33, -96.7], [93.33, -91.7]]]


    let IMovingCurveSet = [[-canvas.width, Math.random(0, -canvas.height)], [7.67, -140.71] , [300,300], [300,-100]]
    let IstaticCurve = [[IMovingCurveSet[iMovingCurveSet.length-3], [28.67, -149.71], [50.67, -149.71]],
    [[27.33, -149.708], [28.33, -210.7], [32.33, -220.708]],
    [[-10.67, -223], [42.67,-219.05], [281.33, -215.05]]]

    let MMovingCurveSet = [[Math.random(0, -canvas.width), -canvas.height], [65.67, -218] , [300 ,200], [300,-400]]
    let MstaticCurve = [[MMovingCurveSet[MMovingCurveSet.length-3], [68.67, -186.385], [85.67, -218.39]],
    [[27.33, -169.708], [28.33, -210.7], [32.33, -220.708]],
    [[87.66, -218.39], [97.33, -180.38], [103.33, -218.39]]]

    let KMovingCurveSet = [[-canvas.width, canvas.height*2], [156, -216.06] , [-300,-50], [0,400]]
    let KstaticCurve = [[KMovingCurveSet[KMovingCurveSet.length-3], [155.67, -181.04], [151.67, -124.04]],
    [[154.67, -167.04],[183.67, -155.04],[188.67, -126.04]],
    [[154.67, -166.04],[194.67, -192.04],[195.67, -216.04]]]


    let YMovingCurveSet = [[(Math.random(0, canvas.width), -canvas.height)], [250.67, -216.72], [-300,50], [0,300]]
    let YstaticCurve = [[YMovingCurveSet[YMovingCurveSet.length-3], [250, -184.71], [249.67, -164.71]],
    [[249, -165.71],[240.67, -121.71],[214.67, -150.71]],
    [[249, -165.71],[266.67, -88.71],[288.67, -132.71]]]

    let HPointsTodraw = [[],[],[]]
    let iPointsTodraw = [[],[],[],[],[]]
    let IPointsTodraw = [[],[],[]]
    let MPointsTodraw = [[],[],[]]
    let KPointsTodraw = [[],[],[]]
    let YPointsTodraw = [[],[],[]]

    let HPoints = []
    let iPoints = [];
    let IPoints = [];
    let MPoints = [];
    let KPoints = [];
    let YPoints = [];
    let capacity = 20;
    function drawLetters(time)
    {
        context.save()
        
        context.save()

        context.translate(15, 40)
        drawMovingHermiteCurve(2000, 1500, time, HMovingCurveSet,HPoints)
        drawLettersH(time-1500, 0.8, HPointsTodraw, HstaticCurve)
        context.restore();

        context.save()
        context.translate(75, 50);
        drawMovingHermiteCurve(2000, 1500, time, iMovingCurveSet,iPoints)
        drawLettersH(time-1500, 0.8, iPointsTodraw, istaticCurve)
        context.restore();



        drawMovingHermiteCurve(2000, 1500, time-2500, IMovingCurveSet,IPoints)
        drawLettersH(time-4000, 1, IPointsTodraw, IstaticCurve)

        drawMovingHermiteCurve(2000, 1000, time - 2500, MMovingCurveSet,MPoints)
        drawLettersH(time-3500, 1, MPointsTodraw, MstaticCurve)

        context.save()
        //context.translate(0, 30)
        //context.scale(0.5, 0.5)
        drawMovingHermiteCurve(4000, 3000, time-3000, KMovingCurveSet,KPoints) 
        drawLettersH(time-6000, 1.25, KPointsTodraw, KstaticCurve)
        context.restore()

        context.save();
        //context.translate(0,30)
        //context.scale(0.5, 0.5  )
        drawMovingHermiteCurve(4000, 3000, time -3000, YMovingCurveSet,YPoints)
        drawLettersH(time-6000, 1.25, YPointsTodraw, YstaticCurve)
        context.restore();
    

        if(time > 5000)
        {
            context.beginPath()
            //context.arc(100, -50, 3.5, 0, 2* Math.PI)
            //context.fill();
            context.beginPath()
            context.moveTo(69,-158.7)
            context.lineTo(63.33, -172.7)
            context.lineWidth = 4;
            context.stroke();
        }
        context.restore();
    }



    function drawLettersH(time, lastingTime, pointsToDraw, staticCurve)
    {
        //letter H composed by three part | - |
        if(time/1000 > 0 && time/1000 <= lastingTime)
            {        
                let HFunctions = []
                createHatFunctions(staticCurve, HFunctions);
                
                let arcLengths = [] //reset arclengths
                calculateArcLengths(HFunctions, arcLengths);
                //calculate totalLength for reparametrization
                let totalDistance = 0;
            
                arcLengths.forEach((arcLength) =>{
                    totalDistance += arcLength[0]
                })
        
                let t = time / 1000 //convert to second
                let s = t * totalDistance / lastingTime    //how fard does traveled at time t
        
                let currentArcLength = 0;
                let previousLength = 0;
                for(let i = 0; i < arcLengths.length; ++i)
                {
                    currentArcLength += arcLengths[i][0];
                
                    if(s <= currentArcLength)
                    {
                        let u = convertStoU((s - previousLength), i, arcLengths);
                        pointsToDraw[i].push(HFunctions[i](u));
                        break;
                    }
                    previousLength = currentArcLength;
                }

    
                pointsToDraw.forEach((points)=>{
                    if(points.length != 0)
                    {
                        drawHatDynamically(points)
                    }
                })
        }else if(time/1000 > 0)
        {
            drawStaticSet(staticCurve);
        }
    }


    function drawMovingHermiteCurve(totalTime, movingTime, currTime, controlPoints, points)
    {
        if(currTime >= 0 && currTime <= totalTime)
            {
        //set up the starting point(curve start) and end point (where the letter locates)
        let HFunction = []; 
        createHermite(controlPoints, HFunction)
            
        //calculate the arcLength, and do numerical approximation
        let arcInfo = []; 
            calculateArcLengths(HFunction, arcInfo);
        //depends on time stamp,draw 10 or 20 points each time
        let totalDistance = arcInfo[0][0];
        
        let t = currTime / 1000; // convert ms to second, and also -4000 is that I want to begin with 0
        
        let s = t * totalDistance / (movingTime/1000) //the process lasts 2 seconds
        
        let u = convertStoU(s, 0, arcInfo);
        
        let currPoint = HFunction[0](u);
        if(points.length >= capacity)
        {
            //delete the tail points, which is the first elemnt
            points.shift();
        }
            //when the curve touches the end point, diminishing (i.e, delete the last few points each frame)
            points.push(currPoint);
            drawHatDynamically(points);
        }
    }
    /**
     * CreateHermite -- given end and start points with their tangent, randomly generate a curve
     * the curve is: (2t^3- 3t^2+1)P0 + (-2t^2+3t^2)P1 + (t^3-2t^2+t)M0+(t^3 - t^2)M1
     * @param {Array} controlPoints 
     * @param {Array} functionSet 
     */
    function createHermite (controlPoints, functionSet)
    {
        let startPoint = controlPoints[0];
        let endPoint = controlPoints[1];
        let startTangent = controlPoints[2];
        let endTangent = controlPoints[3];
        functionSet.push((u)=>{
                return [(2*Math.pow(u,3)-3*Math.pow(u,2) + 1)*startPoint[0] + 
                (-2*Math.pow(u,3) + 3*Math.pow(u,2))*endPoint[0] + 
                (Math.pow(u,3)- 2*Math.pow(u,2)+u)*startTangent[0] + (Math.pow(u,3)-Math.pow(u,2))*endTangent[0],
                (2*Math.pow(u,3)-3*Math.pow(u,2) + 1)*startPoint[1] + 
                (-2*Math.pow(u,3) + 3*Math.pow(u,2))*endPoint[1] + 
                (Math.pow(u,3)- 2*Math.pow(u,2)+u)*startTangent[1] + (Math.pow(u,3)-Math.pow(u,2))*endTangent[1]]
            })
    }

    function drawTestCurve(pointSets)
    {
        context.save();
        context.strokeStyle = "black"
        context.beginPath();
        context.arc(pointSets[0][0], pointSets[0][1], pointRadius, 0, 2 * Math.PI)
        context.stroke();
        context.beginPath();
        context.arc(pointSets[1][0], pointSets[1][1], pointRadius, 0, 2 * Math.PI)
        context.stroke();
        context.beginPath();
        context.arc(pointSets[2][0], pointSets[2][1], pointRadius, 0, 2 * Math.PI)
        context.stroke();
        context.beginPath();
        context.moveTo(pointSets[0][0], pointSets[0][1], pointRadius, 0, 2 * Math.PI)
        context.quadraticCurveTo(pointSets[1][0], pointSets[1][1], pointSets[2][0], 
            pointSets[2][1])
        context.stroke()

        context.restore();
    }

    let pointRadius = 5;
    let pointSets1 = [
        [0, 0],
        [50, 0],
        [-50, 0]
    ]
    let pointSets2 = [
        [0, -20],
        [50, -20],
        [-50, -20]
    ]

    let pointSets3 = [
        [0, 20],
        [50, 20],
        [-50, 20]
    ]

    let pointSets4 = [
        [0, 40],
        [50, 40],
        [-50, 40]
    ]
    let testPointSets = [pointSets1, pointSets2, pointSets3, pointSets4]
    let pointIndex = 0;
    let setIndex = 0;
    let isDragging = false;
    canvas.onmousedown = (event)=>{
        let mouseX = event.clientX - canvas.getBoundingClientRect().left;
        let mouseY = event.clientY - canvas.getBoundingClientRect().top;

        mouseX = (mouseX - (canvas.width/2-50)) / 1;
        mouseY = (mouseY - (canvas.height/2)) / -1;

        testPointSets.forEach((pointset, sIndex) =>{
            pointset.forEach((point, index)=>
                {
                    if(mouseX > point[0] - pointRadius&&
                        mouseX < point[0] + pointRadius &&
                        mouseY > point[1] - pointRadius &&
                        mouseY < point[1] + pointRadius
                    )
                    {
                        //the mouse is within the point
                        if(!isDragging)
                        {
                            isDragging = true;
                        }
            
                        pointIndex = index;
                        setIndex = sIndex;
                    }
                })
        })
    }

    canvas.onmousemove = (event)=>{
        if(isDragging)
        {
            let mouseX = event.clientX - canvas.getBoundingClientRect().left;
            let mouseY = event.clientY - canvas.getBoundingClientRect().top;

            mouseX = (mouseX - (canvas.width / 2 - 50)) / 1;
            mouseY = (mouseY - (canvas.height / 2)) / -1;

            testPointSets[setIndex][pointIndex][0] = mouseX;
            testPointSets[setIndex][pointIndex][1]  = mouseY;

            console.log("Curve: " + setIndex)
            console.log("Start Point: X: " + testPointSets[setIndex][0][0] + " Y: " + testPointSets[setIndex][0][1])
            console.log("Control Point: X: " + testPointSets[setIndex][1][0] + " Y: " +testPointSets[setIndex][1][1])
            console.log("End Point: X: " + testPointSets[setIndex][2][0]+ " Y: " + testPointSets[setIndex][2][1])
        }
    }

    canvas.onmouseup = ()=>{
        isDragging = false;
        pointIndex = 0;
    }


    let arcLengths = [] //this table used to record the length of each arc 
    // and numerical points within each curve

    let pointsToDraw = []

    let hatFunctions = []

    let LeftSidePpoints = [[-120.67, 88.96], [-126.67, 62.96], [-100.67, 23.96]]
    let ButtomSidePpoints = [[-100.67, 23.96], [2.67, 7.96], [116.67, 33.96]]
    let RightSidePpoints = [[116.67, 33.96], [142.33, 52.29], [141.33, 88.29]]
    let UpSidePpoints = [[141.33, 88.29], [-1.33, 128.96], [-120.67, 88.96]]
    let TopSidePpoints = [[-110.67, 88.96], [-1.33, 299.29], [120.67, 93.29]]
    let controlPointSets = [LeftSidePpoints, ButtomSidePpoints, RightSidePpoints, 
        UpSidePpoints]

    let topHatPoints = []; 
    function drawHat(localTime)
    {
        if(localTime/1000 <= 2)
        {
                    
            hatFunctions = []
            createHatFunctions(controlPointSets, hatFunctions);
            arcLengths = [] //reset arclengths
            calculateArcLengths(hatFunctions, arcLengths);
            //calculate totalLength for reparametrization
            let totalDistance = 0;
        
            arcLengths.forEach((arcLength) =>{
                totalDistance += arcLength[0]
            })

        
            let t = localTime / 1000 //convert to second
            let s = t * totalDistance / 2     //how fard does traveled at time t

            
            let currentArcLength = 0;
            let previousLength = 0;
            for(let i = 0; i < arcLengths.length; ++i)
            {
                currentArcLength += arcLengths[i][0];
            
                if(s <= currentArcLength)
                {
                    let u = convertStoU((s - previousLength), i, arcLengths);
                    pointsToDraw.push(hatFunctions[i](u));
                    break;
                }
                previousLength = currentArcLength;
            }
            drawHatDynamically(pointsToDraw);
        }else if(localTime /1000 <= 3)
        {

            controlPointSets.forEach((controlPoint)=>
                {
                    context.save();
                    context.beginPath();
                    context.moveTo(controlPoint[0][0],controlPoint[0][1] )
                    context.quadraticCurveTo(controlPoint[1][0], controlPoint[1][1], 
                        controlPoint[2][0], controlPoint[2][1])
                    context.strokeStyle = "black";
                    context.lineWidth = 4;
                    context.stroke();
                    context.restore()
                })
            
            //draw the top dynamically while draw other parts statically
            let topControlSet = [TopSidePpoints];
            let topHatFunction = [];
            let topArcLength = []
            createHatFunctions(topControlSet, topHatFunction);
            
            calculateArcLengths(topHatFunction, topArcLength);
            let totalDistance = topArcLength[0][0] //the curve total length
            let t = (localTime - 2000) / 1000 //convert ms to s
            let s = t * totalDistance;
        
        
            //points at this t, which will conected later
            let u = convertStoU(s, 0, topArcLength);

            topHatPoints.push(topHatFunction[0](u));
            
            drawHatDynamically(topHatPoints);

        }else
        {
            drawStaticSet(controlPointSets)
            drawHatTop();
        }


    }
    function drawStaticSet(controlPointSets)
    {
        controlPointSets.forEach((controlPoint)=>
            {
                context.save();
                context.beginPath();
                context.moveTo(controlPoint[0][0],controlPoint[0][1] )
                context.quadraticCurveTo(controlPoint[1][0], controlPoint[1][1], 
                    controlPoint[2][0], controlPoint[2][1])
                context.strokeStyle = "black";
                context.lineWidth = 4;
                context.stroke();
                context.restore()
            })
    }

    /**
     * drawHatDynamically -- Takes 2-D array and connects all point in the array
     * 
     * @param{Array} points -- 2-D array contains all points coordinatres
     */
    function drawHatDynamically(points)
    {

            context.save();
            context.beginPath();
            context.moveTo(points[0][0],points[0][1])
            for(let i = 1; i < points.length; ++i)
            {
                context.lineTo(points[i][0], points[i][1])
            }
            context.strokeStyle = "black";
            context.lineWidth = 4;
            context.stroke();
            context.restore();
    }


    /**
     * createHatFunctions -- This function stores bezier curve functions into the functionArray
     * 
     * @param{Array} controPointSet -- controlPoints
     * @param{Array} functionArray -- where to store the functions
     */
    function createHatFunctions(controlPointSet, functionArray)
    {
        controlPointSet.forEach((controlPoints)=>{
            functionArray.push(function(u){
                let P0 = controlPoints[0];
                let P1 = controlPoints[1];
                let P2 = controlPoints[2]
                return [Math.pow((1-u),2)*P0[0] + 2*(1-u)*u*P1[0] + Math.pow(u, 2)*P2[0], 
                Math.pow((1-u),2)*P0[1] + 2*(1-u)*u*P1[1] + Math.pow(u, 2)*P2[1]]
            })
        })
    }


    /**
     * calculateArcLengths -- for each function in the functions array, 
     * we calculate the length of the curve (each function represents a curve)
     * and stored in the arcLengths array
     * 
     * @param{Array} functions -- Function of curves
     * @param{Array} arcLengths -- array to store curve info
     */
    function calculateArcLengths(functions, arcLengths)
    {
        functions.forEach((Function)=>{
            arcLengths.push(numericalMeasurement(Function)) //pass each curve function to numerical Measurement
        })
    }

    /**
     * convertStoU -- a function that can map distance to u which ranges [0, 1]
     * 
     * @param{Number} s --distance tralved
     * @param{Number} segMentNo -- which curve is currently at
     * @param{Number} arcLengths -- arrays store all the curves
     */
    function convertStoU(s, segMentNo, arcLengths){
        let segment = arcLengths[segMentNo]; //[arclength, [table]]
        let u = 0;
        //segment[1] is the table that records points
        for(let i = 0; i < segment[1].length-1; ++i)
        {
        let p0 = segment[1][i].arcLength;
        let t0 = segment[1][i].t;
        let p1 = segment[1][i+1].arcLength;
        let t1 = segment[1][i+1].t;
        if(s >= p0 && s <= p1)
        {
            //we need to interpolate to find the u
            let ratio = (s - p0) / (p1 - p0);
    
            u = t0 + ratio*(t1-t0)
            return u;
        }
        }
        return 1;
    }   

    /** 
     * numericalMeasurement -- A general function which approximates arc length by ploting
     * appropriate number of points. 
     * 
     * @param{Function} curve function
     * @returns{Array} the arclength and table of points

    */
    function numericalMeasurement(curveFunction)
    {
        let previous;
        let arcLength = 0;
        let tableOfPoints = []
        for(let i = 0; i < 1; i += 1/100)
        {
            let current = curveFunction(i); //calculate [x,y] at the point i
            if(previous != undefined)
            {
                let distance = Math.sqrt(
                    Math.pow((current[0] - previous[0]),2) +
                    Math.pow((current[1] - previous[1]), 2)
                )

                arcLength += distance
            }

            let tableElement = {t: i, arcLength: arcLength}
            tableOfPoints.push(tableElement)
            previous = current
        }

        return [arcLength, tableOfPoints];
    }



    function drawHatTop()
    {
        context.save();
        context.beginPath();
        context.moveTo(TopSidePpoints[0][0],TopSidePpoints[0][1] )
        context.quadraticCurveTo(TopSidePpoints[1][0], TopSidePpoints[1][1], 
            TopSidePpoints[2][0], TopSidePpoints[2][1])
        context.strokeStyle = "black";
        context.lineWidth = 4;
        context.stroke();
        context.fill();
        context.restore()
    }
    function drawEyes(localTime)
    {
        context.save()
        drawRightEye(localTime);
        //draw left eyes
        context.restore()

        context.save()
        //draw right eyes
        drawLeftEye(localTime)
        context.restore()
    }

    let eyeCoefficientx//where the left eye located
    let eyeCoefficienty = Math.PI
    function drawRightEye(localTime)
    {
        //should be a localTime
        
        //calculate eyeCoefficientx
        //target X(1) = -25

        eyeCoefficientx = -25 + (canvas.width/2 +10)
        let t = (localTime) / 1000; //limit to 0 - 1 range 
        context.strokeStyle = "black";
        let eyePosition
        if(t <= 1)
        {
            eyePosition = eyeMovement(t, 1);
            //draw the eye at this motion
        }else
        {
            eyePosition = eyeMovement(1, 1);
        }
        context.beginPath()
        context.arc(eyePosition[0], eyePosition[1], 5, 0, 2 * Math.PI)
        context.stroke();
        context.fill();
    }

    function drawLeftEye(localTime)
    {
        //should be a localTime
        
        //calculate eyeCoefficientx
        //target X(1) = -25

        eyeCoefficientx = (canvas.width/2+10) - 55 
        let t = (localTime) / 1000; //limit to 1 - 2 range 
        context.strokeStyle = "black";
        let eyePosition 
        if(t <=1 )
        {
            eyePosition = eyeMovement(0, 0);
        }
        else if(t > 1 && t <= 2)
        {
            eyePosition = eyeMovement(t-1, 0);
            //draw the eye at this motion
        }else
        {
            eyePosition = eyeMovement(1, 0);
        }
        context.beginPath()
        context.arc(eyePosition[0], eyePosition[1], 5, 0, 2 * Math.PI)
        context.stroke();
        context.fill();
    }

    function eyeMovement(t, isLeft)
    {
        let amplification = 20;
        let xPosition
        let yPosition
        if(isLeft)
        {
            xPosition = (-canvas.width/ 2 - 10) + eyeCoefficientx*t
            yPosition = (amplification*Math.sin(eyeCoefficienty*t*4))
        }else{
            xPosition = (canvas.width/2 + 60) - (eyeCoefficientx + 50)*t
            yPosition = (amplification*Math.sin(eyeCoefficienty*t*4))
        }

        return [xPosition, yPosition]
    }

    let startPoint = [10, 40]
    let previousPoint = startPoint
    let coeffX = 100//how to avoid the curve to be different for different devices
    let coeffY = 140;
    let points = [startPoint]
    function drawFace(localTime)
    {
        let t = (localTime / 1000) - 1;
        //change the coordinate system to normal
        context.save()
        if(t < 1)
        {
            drawFaceDynamic(t); //we apply drawFace function
        }else
        {
            //draw the complete parabola
            drawStatic();
        }
        context.restore();
    }


    function drawStatic()
    {
        context.strokeStyle = "black"
        context.lineWidth = 3;
        context.moveTo(points[0][0], points[0][1])
        context.beginPath();
        for(let i = 1; i < points.length; ++i)
        {
            context.lineTo(points[i][0], points[i][1])
        }
        context.stroke();

    }

    let facePreviousT = 0
    function drawFaceDynamic(t)
    {
        //get the current Point
        //calculate the step x
        let currentX = previousPoint[0] + coeffX * (t - facePreviousT);
        let currentY =  previousPoint[1] + (2*coeffY*facePreviousT)*(t - facePreviousT);

        facePreviousT = t;

        points.push([currentX, currentY]);
        context.strokeStyle = "black"
        context.lineWidth = 3;

        context.moveTo(points[0][0], points[0][1])
        context.beginPath();
        //make connect to all the points in the list
        for(let i = 1; i < points.length; ++i)
        {
            context.lineTo(points[i][0], points[i][1])
        }
        context.stroke();
        previousPoint = [currentX, currentY] //update previous point

    }

    animationID = requestAnimationFrame(draw);

    return () => {
        cancelAnimationFrame(animationID)
        console.log("Animation canceled");
    };
}