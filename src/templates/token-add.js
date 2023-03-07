import React, { useEffect } from 'react'
import { Grid } from '@mui/material'
import TokenForm from '../sections/token/tokenForm'
import Layouts from "../layouts";
import { useNavigate } from 'react-router-dom';


const TokenAdd = () => {

  const navigate = useNavigate()

  const abc = () => {
    navigate('/token')
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
        <TokenForm abc={abc} tokenid="" />
      </Grid>
    </>
  )
}


export default Layouts(TokenAdd)