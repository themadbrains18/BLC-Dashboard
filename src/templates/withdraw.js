import React, {useEffect} from "react";
import { withdrawListRequest } from "../Actions/withdrawActions";
import { tokensListRequest } from '../Actions/tokenActions';
import { Grid} from "@mui/material";
import Layouts from "../layouts";
import { useDispatch } from "react-redux";
import WithdrawList from "../sections/withdraw/withdrawTableList";
import { useNavigate } from "react-router-dom";

const Withdraw = () => {
  const dispatch = useDispatch();

  const navigate= useNavigate();

  useEffect(() => {
    let session = sessionStorage.getItem('token')
    if (session === null) {
      navigate('/') 
    }
    const getWithdrawList = async () => {
      await dispatch(withdrawListRequest());
    }

    getWithdrawList();
    const getTokensList = async () => {
      await dispatch(tokensListRequest());
     }
     getTokensList();
    
  }, [dispatch, navigate]);

  return (
    <>
    <Grid container spacing={2} sx={{ padding: '48px 24px' }}>
        <WithdrawList />
      </Grid>
    </>
  )
}

export default Layouts(Withdraw);