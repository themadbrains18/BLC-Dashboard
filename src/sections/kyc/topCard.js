import {
    Box, Stack, Typography, 
 Card, CardContent, Grid
} from "@mui/material";
import React, { useState } from "react";
import { Avatar, AvatarGroup } from "@mui/material";
import Avtar1 from '../../assets/images/Avatar1.png'
import Avtar2 from '../../assets/images/Avatar2.png'
import Avtar3 from '../../assets/images/Avatar3.png'
import Avtar4 from '../../assets/images/Avatar4.png'
import LinearProgress from '@mui/material/LinearProgress';

const TopCard = (props) => {
    const [progress, setProgress] = useState(10);
    return (
        <Grid container spacing={2} sx={{ padding: '24px 24px' }}>
            <Grid item xs={12} sm={6} md={4}>
                <Card sx={{ minWidth: '30%', textAlign: 'center', background: '#ffa7261f', borderRadius: '10px' }}>
                    <CardContent>
                        <Box sx={{ marginBottom: '18px' }}>
                            <Typography sx={{ textAlign: 'start', fontSize: '20px' }}>Total KYC Users</Typography>
                        </Box>
                        <Box >
                            <Stack direction="row" sx={{ justifyContent: 'space-between', }}>
                                <Typography sx={{ fontSize: '14px' }}>KYC</Typography>
                                <Typography sx={{ fontSize: '12px' }}>{progress}%</Typography>
                            </Stack>
                        </Box>

                        <Box sx={{ width: '100%', mr: 1, marginBottom: '18px' }}>
                            <LinearProgress variant="determinate" value={progress} sx={{
                                borderRadius: 15,
                                height:6
                            }} />
                        </Box>
                        <Box >
                            <Stack direction="row" sx={{ justifyContent: 'space-between', }}>
                                <AvatarGroup max={4} >
                                    <Avatar alt="Remy Sharp" src={Avtar1} sx={{ height: '29px', width: '29px' }} />
                                    <Avatar alt="Travis Howard" src={Avtar2} sx={{ height: '29px', width: '29px' }} />
                                    <Avatar alt="Cindy Baker" src={Avtar3} sx={{ height: '29px', width: '29px' }} />
                                    <Avatar alt="Agnes Walker" src={Avtar4} sx={{ height: '29px', width: '29px' }} />
                                </AvatarGroup>
                                <Typography sx={{ textAlign: 'start', fontSize: '12px' }}>219545</Typography>
                            </Stack>
                        </Box>



                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
                <Card sx={{ minWidth: '30%', textAlign: 'center', background: '#0288d11f', borderRadius: '10px' }}>
                    <CardContent>
                        <Box sx={{ marginBottom: '18px' }}>
                            <Typography sx={{ textAlign: 'start', fontSize: '20px' }}>KYC Holders</Typography>
                        </Box>
                        <Box >
                            <Stack direction="row" sx={{ justifyContent: 'space-between', }}>
                                <Typography sx={{ fontSize: '14px' }}>KYC</Typography>
                                <Typography sx={{ fontSize: '12px' }}>{progress}%</Typography>
                            </Stack>
                        </Box>

                        <Box sx={{ width: '100%', mr: 1, marginBottom: '18px' }}>
                            <LinearProgress variant="determinate" value={progress} sx={{
                                borderRadius: 15,
                                height:6
                            }} />
                        </Box>
                        <Box >
                            <Stack direction="row" sx={{ justifyContent: 'space-between', }}>
                                <AvatarGroup max={4} >
                                    <Avatar alt="Remy Sharp" src={Avtar1} sx={{ height: '29px', width: '29px' }} />
                                    <Avatar alt="Travis Howard" src={Avtar2} sx={{ height: '29px', width: '29px' }} />
                                    <Avatar alt="Cindy Baker" src={Avtar3} sx={{ height: '29px', width: '29px' }} />
                                    <Avatar alt="Agnes Walker" src={Avtar4} sx={{ height: '29px', width: '29px' }} />
                                </AvatarGroup>
                                <Typography sx={{ textAlign: 'start', fontSize: '12px' }}>219545</Typography>
                            </Stack>
                        </Box>



                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
                <Card sx={{ minWidth: '30%', textAlign: 'center', background: '#f443361f', borderRadius: '10px' }}>
                    <CardContent>
                        <Box sx={{ marginBottom: '18px' }}>
                            <Typography sx={{ textAlign: 'start', fontSize: '20px' }}>KYC Requests</Typography>
                        </Box>
                        <Box >
                            <Stack direction="row" sx={{ justifyContent: 'space-between', }}>
                                <Typography sx={{ fontSize: '14px' }}>KYC</Typography>
                                <Typography sx={{ fontSize: '12px' }}>{progress}%</Typography>
                            </Stack>
                        </Box>

                        <Box sx={{ width: '100%', mr: 1, marginBottom: '18px' }}>
                            <LinearProgress variant="determinate" value={progress} sx={{
                                borderRadius: 15, 
                                height:6
                            }} />
                        </Box>
                        <Box >
                            <Stack direction="row" sx={{ justifyContent: 'space-between', }}>
                                <AvatarGroup max={4} >
                                    <Avatar alt="Remy Sharp" src={Avtar1} sx={{ height: '29px', width: '29px' }} />
                                    <Avatar alt="Travis Howard" src={Avtar2} sx={{ height: '29px', width: '29px' }} />
                                    <Avatar alt="Cindy Baker" src={Avtar3} sx={{ height: '29px', width: '29px' }} />
                                    <Avatar alt="Agnes Walker" src={Avtar4} sx={{ height: '29px', width: '29px' }} />
                                </AvatarGroup>
                                <Typography sx={{ textAlign: 'start', fontSize: '12px' }}>219545</Typography>
                            </Stack>
                        </Box>



                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    )
}

export default TopCard;