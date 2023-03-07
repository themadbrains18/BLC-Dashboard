import React, { useEffect } from "react";
import Layouts from "../layouts";
import KycMediaList from "../sections/kyc/kycMediaList";
import { kycListRequest } from "../Actions/kycActions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const KycMedia = () => {
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
      
        <KycMediaList />
    
    </>
  )
}

export default Layouts(KycMedia);