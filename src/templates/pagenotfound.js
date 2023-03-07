import React, { useEffect } from 'react'
import Layouts from "../layouts";
import { Box, Button, Typography } from "@mui/material";
import NotFound from '../assets/images/not.png'
import LoginIcon from '@mui/icons-material/Login';
import {Link } from "react-router-dom";
const PageNotFound = () => {
    useEffect(() => {
      sessionStorage.clear();
    })
    return (
        <>
            <Box sx={{
                        display: 'flex',
                        flexDirection:'column',
                       alignItems:'center',
                        backgroundColor: 'transparent',

                    }}>
                <Box id="wrapper"
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        backgroundColor: 'transparent',
                        padding: '100px 10px'

                    }}>
                    <img  src={NotFound} alt='' />
                    <Box
                    >
                        <Typography sx={{
                            fontSize:'100px'
                        }}>
                        404
                        </Typography>
                        <Typography sx={{
                            fontSize:'50px',
                            color:'#0960c1'
                        }}>
                        Session Expired
                        </Typography>
                        
                    </Box>


                </Box >
                <Link
                component="button"
                to="/"
                style={{
                    textDecoration:'none'
                   }}
              >
                   <Button variant="outlined"  startIcon={<LoginIcon />}>
                    Go To Login
                </Button>

              </Link>
               
            </Box>

        </>
    )
}

export default Layouts(PageNotFound)