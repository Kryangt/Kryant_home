import { useEffect, useState, useRef, use} from "react";
import { protraitRender } from "../../Scripts/1";
import {Snowman} from "../../Scripts/snowman";
import { CyberTruck } from "../../Scripts/cybertruck";
import React from "react";
import Grid from "@mui/material/Grid"
import Button from "@mui/material/Button"
import Stack from "@mui/material/Stack"
import { Box } from "@mui/material";
import Typography from '@mui/material/Typography';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material/styles';
import { Monopoly } from "../../Scripts/monopoly";
import {Donuts} from "../../Scripts/Donut";

    export function Gallery() {
        
        const canvas1 = useRef(null)
        const canvas2 = useRef(null)
        const canvas3 = useRef(null)
        const canvas4 = useRef(null)
        const boxRef = useRef(null)
        useEffect(() => {
            const canvas1Current = canvas1.current;
            const canvas2Current = canvas2.current;
            const canvas3Current = canvas3.current;
            const canvas4Current = canvas4.current;
            const box = boxRef.current
            if(canvas1Current && canvas2Current&& canvas3Current && canvas4Current) {
                // Clear canvas before starting new animation
                canvas1Current.width = 0.95 * box.clientWidth
                canvas1Current.height = 0.95 * box.clientHeight

                canvas2Current.width = 0.95 * box.clientWidth
                canvas2Current.height = 0.95 * box.clientHeight

                canvas3Current.width = 0.95 * box.clientWidth
                canvas3Current.height = 0.95 * box.clientHeight

                canvas4Current.width = box.clientWidth
                canvas4Current.height = box.clientHeight
                Snowman(canvas1Current);
                CyberTruck(canvas2Current)
                Monopoly(canvas3Current);
                protraitRender(canvas4Current);
            }
            }, [])


        return (
            <Box sx = {{flexGrow: 1}}>
                <Grid container columns = {{xs: 4, sm: 8, md: 12, lg: 12}} spacing = {{xs: 1, sm: 1, md: 1}}>
                    <Grid size= {{xs:4, sm: 2, md: 3, lg: 3}} sx = {{height: "80vh"}}>
                        <Stack>
                            <Box ref = {boxRef} display = "flex" justifyContent = "center" alignItems = "center"   sx={{
                                height: "40vh",
                                transition: "transform 0.3s ease, filter 0.3s ease",
                                "&:hover": {
                                    transform: "scale(1.2)",
                                    backgroundColor: "#e0e0e0",
                                    zIndex: 10,
                                },
                            }}>
                                <canvas ref= {canvas1} ></canvas>
                            </Box>
                            <Box display = "flex" justifyContent = "center" alignItems = "center" sx = {{ height: "40vh"}}>
                               
                            </Box>
                        </Stack>
                    </Grid>
                    <Grid  size= {{xs:4, sm: 2, md: 3, lg: 3}}>
                        <Box display = "flex" justifyContent = "center" alignItems = "center" sx = {{ height: "40vh"}}>
                               
                        </Box>
                        <Box ref = {boxRef} display = "flex" justifyContent = "center" alignItems = "center"   sx={{
                                height: "40vh",
                                transition: "transform 0.3s ease, filter 0.3s ease",
                                "&:hover": {
                                    transform: "scale(1.2)",
                                    backgroundColor: "#e0e0e0",
                                    zIndex: 10,
                                },
                            }}>                            
                            <canvas ref= {canvas2}></canvas>
                        </Box>
                    </Grid>
                    <Grid size= {{xs:4, sm: 2, md: 3, lg: 3}}>
                    <Box ref = {boxRef} display = "flex" justifyContent = "center" alignItems = "center"   sx={{
                                height: "40vh",
                                transition: "transform 0.3s ease, filter 0.3s ease",
                                "&:hover": {
                                    transform: "scale(1.2)",
                                    backgroundColor: "#e0e0e0",
                                    zIndex: 10,
                                },
                            }}>
                            <canvas ref= {canvas3}></canvas>
                        </Box>
                        <Box display = "flex" justifyContent = "center" alignItems = "center" sx = {{height: "40vh"}}>
                               
                        </Box>
                    </Grid>
                    <Grid size= {{xs:4, sm: 2, md: 3, lg: 3}}>
                    <Box display = "flex" justifyContent = "center" alignItems = "center" sx = {{height: "40vh"}}>
                    </Box>
                    <Box ref = {boxRef} display = "flex" justifyContent = "center" alignItems = "center"   sx={{
                                height: "40vh",
                                transition: "transform 0.3s ease, filter 0.3s ease",
                                "&:hover": {
                                    transform: "scale(1.2)",
                                    backgroundColor: "#e0e0e0",
                                    zIndex: 10,
                                },
                            }}>                        
                            <canvas ref= {canvas4}></canvas>
                    </Box>
                    </Grid>
                </Grid> 
            </Box>
        )
    }