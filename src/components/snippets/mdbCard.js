import * as React from "react";
import MoreVertIcon from '@mui/icons-material/MoreVert';

import { Box, Grid, Card, IconButton, CardHeader, CardActions, Typography } from "@mui/material";
import Items from "./items";


const styles = {
    card: {
        background: 'transparent',
        width: '100%',
        boxShadow:'unset',
        padding:"0 20px"
    },
    stack: {
        border: '1px solid',
        borderRadius: '10px ',
    },
    divider: {
        width: 1,
        height: '100px',
        backgroundColor: '#ffffff8f',
        sm: { flexDirection: 'column' },
    }

};
const mdbCard = () => {
    return (
        <Box sx={{
            padding: '48px 0px 24px',
        }}>

            <Grid container spacing={0} columns={{ xs: 3, sm: 4, md: 8 }} sx={{ borderRadius:"10px",padding:"24px 4px", background:(theme)=>theme.palette.bgGray.dark }}>
                {Items.map((value, index) => (
                    <Grid  item xs={3} sm={2} md={2} key={value} sx={{
                        gap: '10px'
                    }}>
                        <Box sx={{
                            display: 'flex',
                            alignItems: 'center',
                            
                        }}>
                            <Card key={value} item style={styles.card}  >
                                <CardHeader
                                    avatar={
                                        <Box>
                                            {value.icon}
                                        </Box>}
                                    action={
                                        <IconButton aria-label="settings">
                                            <MoreVertIcon />
                                        </IconButton>
                                    }
                                    title={
                                        <Typography sx={{ fontSize: 12 }} color="text.secondary" gutterBottom>
                                            {value.title}
                                        </Typography>
                                    }
                                    subheader={<Typography sx={{ fontSize: 12 }} color="text.primary" gutterBottom>
                                        {value.subHeader}
                                    </Typography>
                                    }
                                />
                                <CardActions sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    marginBottom: '2px'
                                }} >
                                    <Typography sx={{ fontSize: 10 }} color="text.secondary" gutterBottom>
                                        Previous <br />
                                        <Typography sx={{ fontSize: 10 }} color="text.primary" gutterBottom>

                                            {value.previous}
                                        </Typography>
                                    </Typography>

                                    <Box
                                        sx={{
                                            padding: '4px 8px',
                                            display: 'flex',
                                            justifyContent: 'space-evenly',
                                            alignItems: 'center',
                                            gap: '2px',
                                            background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.9)), #66BB6A',
                                            borderRadius:2,
                                            
                                        }}>
                                        <Typography sx={{ fontSize: 12 }} color="#0BB783">{value.increment}</Typography>
                                        {value.progressIcon}
                                    </Box>
                                </CardActions>
                            </Card>
                            {index < 3 &&
                                <div className="divide" style={styles.divider}></div>
                            }

                        </Box>
                    </Grid>
                ))}

            </Grid>
        </Box>



    );
}

export default mdbCard;