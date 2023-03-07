import React, {useEffect} from "react";
import { Grid} from "@mui/material";
import Layouts from "../layouts";
import ReportList from "../sections/report/reportTableList";
import { useNavigate } from "react-router-dom";

const Report = () => {

  const navigate= useNavigate();

  useEffect(() => {
    let session = sessionStorage.getItem('token')
    if (session === null) {
      navigate('/') 
    }
  },[navigate])
  return (
    <>
    <Grid container spacing={2} sx={{ padding: '48px 24px' }}>
        <ReportList />
      </Grid>
    </>
  )
}

export default Layouts(Report);