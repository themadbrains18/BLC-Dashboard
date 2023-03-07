import React, { useEffect } from 'react'
import { Grid } from '@mui/material'
import AddPayment from '../sections/Payment/addPayment'
import Layouts from "../layouts";
import { useNavigate } from 'react-router-dom';


const PaymentAdd = () => {

  const navigate = useNavigate()

  const abc = () => {
    navigate('/payment')
  }


  useEffect(() => {
    let session = sessionStorage.getItem('token')
    if (session === null) {
      navigate('/')
    }
  }, [navigate])
  return (
    <>
      <Grid container spacing={2} sx={{ padding: '48px 24px' }}>
        <AddPayment abc={abc} />
      </Grid>
    </>
  )
}


export default Layouts(PaymentAdd)