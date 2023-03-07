
import { useSelector } from "react-redux";
import {
  Box, Stack, Typography, Button,
  IconButton, Card, CardContent, Grid 
} from "@mui/material";

import GroupIcon from '@mui/icons-material/Group';
import PersonIcon from '@mui/icons-material/Person';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import { theme } from "highcharts";


const TopCard=()=>{

  const userList = useSelector((state) => state.userList);

  let activeUser = userList.filter((item) => {
    return item.status === "Active"
  })


  return (
    <Grid container spacing={2} sx={{ padding: '24px 0px' }}>
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ minWidth: '30%', textAlign: 'center', background:(theme)=> theme.palette.activeColor.main, borderRadius:'10px' }}>
            <CardContent>
              <Box sx={{ marginBottom: '18px' }}>
                <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
                  <Button sx={{ background: '#42A5F5', borderRadius: '50%',height:'64px' }}>
                    <IconButton>
                      <GroupIcon />
                    </IconButton>
                  </Button>
                  <Typography>All Users</Typography>
                </Stack>
              </Box>
              <Box>
                <Typography sx={{ textAlign: 'start' }}>{userList.length}</Typography>
              </Box>
              <Box>
                <Typography sx={{ textAlign: 'start', fontSize: '14px' }}>Compared to {userList.length} last month</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ minWidth: '30%', textAlign: 'center', background: '#E57373', borderRadius:'10px' }}>
            <CardContent>
              <Box sx={{ marginBottom: '18px' }}>
                <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
                  <Button sx={{ background: '#42A5F5', borderRadius: 0, borderRadius: '50%',height:'64px' }}><IconButton>
                    <PersonIcon />
                  </IconButton></Button>

                  <Typography>KYC Completed Users</Typography>
                </Stack>
              </Box>
              <Box>
                <Typography sx={{ textAlign: 'start' }}>{activeUser.length}</Typography>
              </Box>
              <Box>
                <Typography sx={{ textAlign: 'start', fontSize: '14px' }}>Compared to {activeUser.length} last month</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ minWidth: '30%', textAlign: 'center', background: '#080F1D', borderRadius:'10px' }}>
            <CardContent>
              <Box sx={{ marginBottom: '18px' }}>
                <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
                  <Button sx={{ background: '#42A5F5', borderRadius: 0 , borderRadius: '50%',height:'64px'}}><IconButton>
                    <CurrencyExchangeIcon />
                  </IconButton></Button>

                  <Typography>Top Holders</Typography>
                </Stack>
              </Box>
              <Box>
                <Typography sx={{ textAlign: 'start' }}>{activeUser.length}</Typography>
              </Box>
              <Box>
                <Typography sx={{ textAlign: 'start', fontSize: '14px' }}>Compared to {activeUser.length} last month</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
  )
}

export default TopCard;