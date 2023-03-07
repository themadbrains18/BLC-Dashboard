import StackedBarChartIcon from '@mui/icons-material/StackedBarChart';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TimelineIcon from '@mui/icons-material/Timeline';
import UpdateIcon from '@mui/icons-material/Update';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';

const Items=[
    {
        icon: <StackedBarChartIcon fontSize="small"/> ,
        title:"Market Cap",
        subHeader:"14.97B USD",
        previous:'12.67B USD',
        increment:'+5.3',
        progressIcon: <TrendingUpIcon sx={{ color:'#0BB783'}}/>
    },
    {
       icon: <TimelineIcon/>,
        title:"Volume",
        subHeader:"12.5M USD",
        previous:'17.9M USD',
        increment:'+5.3',
        progressIcon: <TrendingUpIcon sx={{ color:'#0BB783'}}/>
    },
    {
        icon:<UpdateIcon/>,
        title:"Weekly Visits",
        subHeader:"2,19,512",
        previous:'1,17,218',
        increment:'+5.3',
        progressIcon: <TrendingUpIcon sx={{ color:'#0BB783'}}/>
    },{
        icon:<CurrencyExchangeIcon/>,
        title:"Coins on Exchange",
        subHeader:"468 Coins",
        previous:'150 Coins',
        increment:'+5.3',
        progressIcon: <TrendingUpIcon sx={{ color:'#0BB783'}} />
    }
    ]
    export default Items;
    



