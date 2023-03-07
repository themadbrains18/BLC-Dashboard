import React,{useEffect} from "react";
import {  tokensListRequest } from "../Actions/tokenActions";
import { Grid} from "@mui/material";
import Layouts from "../layouts";
import { useDispatch } from "react-redux";
import TokenUsersList from "../sections/token/tokenUsersList";
import { useNavigate } from "react-router-dom";


const Token = () => {
  const dispatch = useDispatch();


  const navigate= useNavigate();

  useEffect(() => {
    let session = sessionStorage.getItem('token')
    if (session === null) {
      navigate('/') 
    }
    const getTokensList = async () => {
     await dispatch(tokensListRequest());
    }
    getTokensList();


    
  }, [dispatch, navigate]);

  return (
    <>
    <Grid container spacing={2} sx={{ padding: '48px 24px' }}>
 
        <TokenUsersList  />
    

      </Grid>
    </>
  )
}

export default Layouts(Token);