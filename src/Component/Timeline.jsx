import React, { useEffect, useRef, useState } from "react";
import './Timeline.css';

export function Timeline(){
    const timelineRef = useRef(null);
    const [visible, setVisible] = useState(false);
  
    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect(); // Trigger only once
          }
        },
        { threshold: 0.3 } // 30% of element visible to trigger
      );
  
      if (timelineRef.current) {
        observer.observe(timelineRef.current);
      }
  
      return () => observer.disconnect();
    }, []);
   
    return (
        <div
        className={`timeline ${visible ? "animate" : ""}`}
        ref={timelineRef}>
                <div class = "container-left">
                    <img src = "Textures/dot.jpg"></img>
                    <div class = "text-box">
                        <h2>The Beginning</h2>
                        <p><small>2004.12.07</small></p>
                        <p>I was born 🎉</p>
                        <span class = "left-arrow"></span>
                    </div>

                </div>

                <div class = "container-right">
                    <img src = "Textures/dot.jpg"></img>
                    <div class = "text-box">
                        <h2>Elementary School</h2>
                        <p><small>2017.9.1</small></p>
                        <p>I left my homedown, which is a small town called Ruian in Wenzhou, and came to Shanghai for elementary School</p>
                        <span class = "right-arrow"></span>

                    </div>
                </div>

                <div class = "container-left">
                    <img src = "Textures/dot.jpg"></img>
                    <div class = "text-box">
                        <h2>First Job</h2>
                        <p><small>Summer period in 2020</small></p>
                        <p>I became a cater in a local restaurant, Qingjiangnan. My salary at the time is ￥17/hr, and I earned my first 1000 RMB in my life</p>
                        <span class = "left-arrow"></span>
                    </div>
                </div>

                <div class = "container-right">
                    <img src = "Textures/dot.jpg"></img>
                    <div class = "text-box">
                        <h2>Economic Club</h2>
                        <p><small>2021-2022 Fall</small></p>
                        <p>I was fascinated by the closed connections between various small markets in Microeconomics and also the influnce of political decisions upon on monetary and trading markets in Macroeconomics</p>
                        <span class = "right-arrow"></span>
                    </div>
                </div>

                <div class = "container-left">
                    <img src = "Textures/dot.jpg"></img>
                    <div class = "text-box">
                        <h2>Change in interests</h2>
                        <p><small>2022 Spring</small></p>
                        <p>The more I studies Economic, the more I felt the disconnection between theory and reality. At the same time, I wanted to learn something that I can feel, see, imagine, and even touch, which is "Computer Science" (to be honest, I don't know what is that at the time)</p>
                        <span class = "left-arrow"></span>
                    </div>
                </div>

                <div class = "container-right">
                    <img src = "Textures/dot.jpg"></img>
                    <div class = "text-box">
                        <h2>University</h2>
                        <p><small>2023.09.01</small></p>
                        <p>University of Wisconsin-Madison, my next life chapter begins!
                        </p>
                        <span class = "right-arrow"></span>
                    </div>
                </div>

                <div class = "container-left">
                    <img src = "Textures/dot.jpg"></img>
                    <div class = "text-box">
                        <h2>People and Robots Lab</h2>
                        <p><small>2025.02.14</small></p>
                        <p>Became a member in People and Robots Lab. Started to know about what is research and accumated experience of working with robots!</p>
                        <span class = "left-arrow"></span>
                    </div>
                </div>

        </div>
    )
}