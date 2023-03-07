import React, {useEffect} from "react";
import { Grid} from "@mui/material";
import Layouts from "../layouts";
import SupportUsersList from "../sections/support/supportUsersList";
import Cards from "../sections/support/cards";
import { useNavigate } from "react-router-dom";

const Support = () => {

  const navigate= useNavigate();

  useEffect(() => {
    let session = sessionStorage.getItem('token')
    if (session === null) {
      navigate('/') 
    }
  },[navigate])

  return (
    <>
      <Cards />
      <Grid container spacing={2} sx={{ padding: '0px 24px' }}>
        <SupportUsersList />
      </Grid>
    </>
  )
}

export default Layouts(Support);