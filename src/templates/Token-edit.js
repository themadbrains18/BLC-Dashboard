import React from "react";
import { Grid, Typography } from "@mui/material";
import TokenForm from "../sections/token/tokenForm";
import Layouts from "../layouts";
import { useNavigate, useParams } from "react-router-dom";

const TokenEdit = () => {
  const redirect = useNavigate();
  
  const { id } = useParams();

  const abc = () => {
    redirect("/token");
  };

  return (
    <>
      <Grid container spacing={2} sx={{ padding: "48px 24px" }}>
        {
            id !== '' ? 
                (
                 <>
                    <TokenForm abc={abc} tokenid={id} />
                 </>
                 ) 
                    :
            (
                <>
                      <Typography variant="h2"  align="center">Opps! something went wrong.</Typography>

                      <Typography variant="p"  align="center">Plase enter valid token id</Typography>
                 
                    
                </>
            )
            
        }
      </Grid>
    </>
  );
};

export default Layouts(TokenEdit);
