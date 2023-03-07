import React  from "react";
import {  Grid ,Box} from '@mui/material'
import MarketOverviewList from "../../sections/dashboard/marketOverviewList";
import RecentlyAddedTokenList from "../../sections/dashboard/recentlyAddedTokenList";


const MarketOverview = () => {

    return (
        <Box>
            <Grid container spacing={6} columns={{ xs: '8', sm: '12' }} sx={{ marginTop:"0px" }} >
                <MarketOverviewList />
                <RecentlyAddedTokenList />
            </Grid>
        </Box>

    )

};

export default MarketOverview;
