import React, { useEffect,useState } from "react";
import { useDispatch } from "react-redux";
import { userListRequest } from "../Actions/userActions";

import {
  Box, Stack, Typography, Card, CardContent, Slider, Grid, Divider,
  ListItem, ListItemText
} from "@mui/material";

import Layouts from "../layouts";
import DougnutChart from "../components/dougnutChart";
import MapChart from "../components/mapChart";

import AllUserList from "../sections/user/allUserList";
import TopCard from "../sections/user/topCard";
import ActiveUserList from "../sections/user/activeUserList";
import AlertDialog from "../Modal/sessionModel";



const Users = () => {
  const dispatch = useDispatch();

  const [alertOpen, setAlertOpen] = useState(false);
  useEffect(() => {
    getUserList();
  },[]);

  const getUserList = async () => {
    let response = await dispatch(userListRequest());
    if(response.status === 404){
      console.log(response);
      setAlertOpen(true);
    }
  }

  let doughnutProp = {
    chart: {
      type: 'variablepie',

    },
    title: {
      text: 'Vistor Distribution'
    },
    legend: {
      align: "top",
      verticalAlign: "right",
      layout: "vertical",
      x: 5,
      y: 100,
      itemMarginTop: 5,
      itemMarginBottom: 5,
      itemStyle: {
        font: "14px Trebuchet MS, Verdana, sans-serif",
        color: "#333333"
      }
    },
    plotOptions: {
      series: {
        stacking: "normal",
        dataLabels: {
          enabled: false
        },
        showInLegend: true,
        size: 185
      }
    },
    series: [{
      minPointSize: 1,
      innerSize: '60%',
      zMin: 0,
      name: 'countries',
      data: [{
        name: 'Spain',
        y: 10,
        z: 30
      }, {
        name: 'France',
        y: 20,
        z: 30
      }, {
        name: 'Poland',
        y: 30,
        z: 30
      }, {
        name: 'Italy',
        y: 30,
        z: 30
      }, {
        name: 'Switzerland',
        y: 50,
        z: 30
      }, {
        name: 'Germany',
        y: 60,
        z: 30
      }]
    }]
  }

  const sessionExpire=()=>{
    console.log('here from list page');
  }


  return (
    <>
      <TopCard />

      <Grid container spacing={2}>
        <ActiveUserList />
        <ActiveUserList />
      </Grid>
      <Grid container spacing={2} sx={{ padding: '0px 24px' }}>
        <AllUserList sessionExpire={sessionExpire()}/>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ minWidth: '30%', textAlign: 'center' }}>
            <CardContent>
              <MapChart />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ minWidth: '30%', textAlign: 'center' }}>
            <CardContent>
              <DougnutChart id="pie-chart" doughnutProp={doughnutProp}/>
            </CardContent>

          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ minWidth: '30%', textAlign: 'center' }}>
            <CardContent>
              <Stack direction="column">
                <Box>
                  <Typography>Traffice Resources</Typography>
                </Box>
                <Box>
                  <Grid container>
                    <Grid item xs>
                      <ListItem>
                        <ListItemText primary="Total Users" secondary="5,000" />
                      </ListItem>
                    </Grid>
                    <Divider orientation="vertical" flexItem>
                    </Divider>
                    <Grid item xs>
                      <ListItem>
                        <ListItemText primary="New Users" secondary="10" />
                      </ListItem>
                    </Grid>
                  </Grid>
                </Box>
                <Box>
                  <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
                    <Typography sx={{ textAlign: 'start' }}> From Direct</Typography>
                    <Typography sx={{ textAlign: 'end' }}> 50%</Typography>
                  </Stack>

                  <Slider defaultValue={50} aria-label="Default" valueLabelDisplay="auto" />
                </Box>
                <Box>

                  <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
                    <Typography sx={{ textAlign: 'start' }}>Affiliate</Typography>
                    <Typography sx={{ textAlign: 'end' }}> 50%</Typography>
                  </Stack>
                  <Slider defaultValue={50} aria-label="Default" valueLabelDisplay="auto" />
                </Box>
                <Box>

                  <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
                    <Typography sx={{ textAlign: 'start' }}>Referral</Typography>
                    <Typography sx={{ textAlign: 'end' }}> 50%</Typography>
                  </Stack>
                  <Slider defaultValue={50} aria-label="Default" valueLabelDisplay="auto" />
                </Box>
                <Box>

                  <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
                    <Typography sx={{ textAlign: 'start' }}>Marketing</Typography>
                    <Typography sx={{ textAlign: 'end' }}> 50%</Typography>
                  </Stack>
                  <Slider defaultValue={50} aria-label="Default" valueLabelDisplay="auto" />
                </Box>
              </Stack>

            </CardContent>

          </Card>
        </Grid>
      </Grid>
      {alertOpen === true && 
        <AlertDialog open={alertOpen} />
      }
      
    </>
  )
}

export default Layouts(Users);