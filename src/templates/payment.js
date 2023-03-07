import React, {useEffect} from "react";
import { Grid} from "@mui/material";
import Layouts from "../layouts";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { paymentListRequest } from '../Actions/paymentActions'
import PaymentList from "../sections/Payment/paymentList";

const Payment = () => {

  const navigate= useNavigate();
const dispatch = useDispatch();
  useEffect(() => {
    let session = sessionStorage.getItem('token')
    if (session === null) {
      navigate('/') 
    }
    const getPaymentList = async () => {
    await dispatch(paymentListRequest());
    
     }
     getPaymentList();
  },[navigate, dispatch])

  return (
    <>
      <Grid container spacing={2} sx={{ padding: '30px 24px' }}>
        <PaymentList/>
        {/* <AddPayment /> */}
      </Grid>
    </>
  )
}

export default Layouts(Payment);