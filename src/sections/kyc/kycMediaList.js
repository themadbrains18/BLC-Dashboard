import * as React from 'react';
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { useSelector } from "react-redux";
import { Card, CardHeader, CardContent, IconButton, CardMedia, TextField, Grid, Box, Typography } from '@mui/material';
import { imageBaseUrl } from '../../API';
import { pdfBaseUrl } from '../../API';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import CloseIcon from '@mui/icons-material/Close'
import { useNavigate } from 'react-router-dom';

export default function KycMediaList() {


  const {userid} = useParams();
  const [list, setList] = useState([]);
  const kycList  = useSelector((state) => state.kycList);
  console.log("======================kycList", kycList)
  const navigate = useNavigate()

  useEffect (
    ()=>{
     
    let alluser = [];
    for (const kyc of kycList) {
      console.log("=======",typeof(kyc.user_id),typeof(userid));
      if ( parseInt(userid) === parseInt(kyc.user_id)) {
        alluser.push(kyc);
      }
    }
    setList(alluser);
    
  },[])


  const handleClose = () => {
      navigate('/kyc')
  }

  return (
    <Card sx={{
      maxWidth: '750px',
      width: '100%',
      alignContent: 'center',
      margin: 'auto',
      marginTop: '20px'

    }}>

      <CardHeader
        title={
          <Typography component="h1" variant='h4' color='textG.main'>
            Kyc Media Details
          </Typography>
        }
        action={
          <IconButton aria-label="close" onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        }
      />
      <CardContent>
        {console.log("=====media",list)}
        {list.map((media, index) => {
          return (
            <Box key={index}>
              <Grid container spacing={1}>
                <Grid item xs={12} sm={6}>
                  <TextField

                    id="standard-read-only-input"
                    InputProps={{
                      readOnly: true,
                    }}
                    label="Full Name"
                    fullWidth
                    margin='dense'
                    defaultValue={media.name}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField

                    id="standard-read-only-input"
                    InputProps={{
                      readOnly: true,
                    }}
                    fullWidth
                    margin='dense'
                    label="Email"
                    defaultValue={media.email}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField

                    id="standard-read-only-input"
                    InputProps={{
                      readOnly: true,
                    }}
                    fullWidth
                    margin='dense'
                    label="Document Type"
                    defaultValue={media.doctype}
                  />

                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="standard-read-only-input"
                    InputProps={{
                      readOnly: true,
                    }}
                    fullWidth
                    margin='dense'
                    label="Document Number"
                    defaultValue={media.docnumber}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  Id Front
                  <CardMedia
                    component="img"
                    fullWidth
                    // width='200'
                    height="250"
                    image={imageBaseUrl + media.idfront}
                    alt="green iguana"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                Id Back
                  <CardMedia
                    component="img"
                    fullWidth
                    // width='200'
                    height="250"
                    image={imageBaseUrl + media.idback}
                    alt="green iguana"
                  />
                </Grid>
                <Grid item xs={12} sm={6} >
                  Bank Statement
                  <CardMedia
                    component="img"
                    fullWidth
                    // width='200'
                    height="250"
                    image={imageBaseUrl + media.statement}
                    alt="green iguana"
                  />
                  {/* <IconButton href={imageBaseUrl + media.statement} target="_blank" rel="Bank Statement" sx={{
                    '&:hover': {
                      background: 'none',
                    },
                  }}>
                    <PictureAsPdfIcon sx={{
                      width: 50,
                      height: 160,
                    }} />
                  </IconButton> */}

                </Grid>

              </Grid>
            </Box>
          )

        })}


      </CardContent>
    </Card>
  );
}