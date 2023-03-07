import React, {useEffect} from "react";
import { orderListRequest } from "../Actions/orderActions";
import { tokensListRequest } from '../Actions/tokenActions';
import { Grid} from "@mui/material";
import Layouts from "../layouts";
import { useDispatch } from "react-redux";
import OrderList from "../sections/order/orderTableList";
import { useNavigate } from "react-router-dom";

const Order = () => {
  const dispatch = useDispatch();

  const navigate= useNavigate();

  useEffect(() => {
    let session = sessionStorage.getItem('token')
    if (session === null) {
      navigate('/') 
    }
    const getOrderList = async () => {
     await dispatch(orderListRequest());
    }

    getOrderList();
    
     const getTokensList = async () => {
      await dispatch(tokensListRequest());
     }
     getTokensList();
    
  }, [dispatch, navigate]);

  return (
    <>
    <Grid container spacing={2} sx={{ padding: '48px 24px' }}>
        <OrderList />
      </Grid>
    </>
  )
}

export default Layouts(Order);