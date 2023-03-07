import * as React from 'react';
import {Card, Grid,Typography,IconButton, Box} from '@mui/material';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
 
import { useNavigate, Link } from "react-router-dom";
  import AddIcon from '@mui/icons-material/Add';
import { useSelector } from "react-redux";


export default function PaymentList() {
    const paymentList = useSelector((state) => state.paymentList);
    return (
    <>
        <Box sx={{
              display: 'flex'
            }}>
              <Typography
                sx={{ flex: '1 1 100%', fontsize: '20px',width: '100%',
                padding: '0 20px' }}

                id="tableTitle"
                component="div"
              >
                Payment List
              </Typography>
              <Link
                component="button"
                to="/payment/add-new"
                onClick={() => {
                  console.info("I'm a button.");
                }}
              >
                <IconButton aria-label="edit"  >
                  <AddIcon />
                </IconButton>
              </Link>
            </Box>
    

    <Grid container spacing={2}  sx={{ padding: '24px 20px' }}>


     {paymentList.map((method,index)=>{
        console.log("========method",method);
        return(
            <Card key = {index}sx={{ display: 'flex',     alignItems: "center", maxWidth:'350px', width:'100%',
            padding:' 20px',
            gap:"30px",
            margin: '20px 30px'}}>
    
            <CardMedia
              component="img"
              image={method.icon}
              alt="image"
              sx={{maxWidth:'70px', borderRadius:'5px', width:'100%',objectFit:"unset !important"}}
            />
              <CardContent sx={{ flex: '1 0 auto',padding:"0 !important" }}>
                <Typography component="div" variant="h5">
                  {method.payment_method}
                </Typography>
              </CardContent>
          </Card>
        )
       
     })}
         
    </Grid>
    </>
   
   
  );
}