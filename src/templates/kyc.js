import React, { useEffect } from "react";
import { Grid} from "@mui/material";
import Layouts from "../layouts";
import KycUsersList from "../sections/kyc/kycUsersList";
import TopCard from "../sections/kyc/topCard";
import { kycListRequest } from "../Actions/kycActions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";


const Kyc = () => {
  const dispatch = useDispatch();
  const navigate= useNavigate();

  useEffect(() => {
    let session = sessionStorage.getItem('token')
    if (session === null) {
      navigate('/') 
    }
    const getKycList = async () => {
     await dispatch(kycListRequest());
    }

    getKycList();
    
  }, [dispatch, navigate]);

  return (
    <>
      <TopCard />
      <Grid container spacing={2} sx={{ padding: '0px 24px' }}>
        <KycUsersList />
      </Grid>
    </>
  )
}

export default Layouts(Kyc);