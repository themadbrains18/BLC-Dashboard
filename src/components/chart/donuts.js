import React from "react";
import DougnutChart from '../dougnutChart'
import TableChart from './tableChart'


const RevenueToken = () => {
    return (
        <div
        style={{
            padding:'24px 30px'
        }}>

        <Grid container spacing={6} columns={12}
      >
            <Grid item  xs={6} sx={{
                    border:'1px solid transparent',
                    borderRadius:'10px'
                }}>
                <Card
                >
                     <TableChart/>
                   </Card>
            </Grid>
            <Grid item xs={6}>
            
                <Card sx={{
                    display:'flex',
                    flexDirection:'row',
                }}>   
                <DougnutChart id="container2" />
                </Card>
            </Grid>
        </Grid>
            </div>


    )

};

export default RevenueToken;
