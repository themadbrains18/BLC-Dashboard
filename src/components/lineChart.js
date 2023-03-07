import { useEffect } from 'react';
import Highcharts from 'highcharts/highstock'
import variablePie from "highcharts/modules/variable-pie.js";

variablePie(Highcharts);

// const styles = {
//   card: {
//       background: 'transparent',
//       width: "25%",      
//   },
//   stack: {
//       border: '1px solid',
//       borderRadius: '10px ',   
//   },

// };
const LineChart=()=>{

  useEffect(()=>{
    Highcharts.chart('line-chart', {
      chart: {
          type: 'spline',
          spacingLeft: 20,
          spacingBottom: 40,
          spacingRight: 30,
      },
      title: {
          text: 'Revenue Statisitics',
          align:'left',
          x: 25,
          y: 35
      },
    
      xAxis: {
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
              'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          accessibility: {
              description: 'Months of the year'
          }
      },
      yAxis: {
          title: {
             
          },
          labels: {

          }
      },
      legend: {
        enabled: true,
        align: 'right',
        verticalAlign: 'top',
        borderWidth: 0,
        itemMarginTop: -10,
        itemMarginBottom: 5,
    },
      tooltip: {
          crosshairs: true,
          shared: true
      },
      plotOptions: {
          spline: {
              marker: {
                  radius: 4,
                  lineColor: '#666666',
                  lineWidth: 1
              }
          }
      },
      series: [{
          name: 'Tokyo',
          marker: {
              symbol: 'square'
          },
          data: [5.2, 5.7, 8.7, 13.9, 18.2, 21.4, 25.0, 26.4, 22.8, 17.5, 12.1, 7.6]

      }, {
          name: 'Bergen',
          marker: {
              symbol: 'diamond'
          },
          data: [1.5, 1.6, 3.3, 5.9, 10.5, 13.5, 14.5, 14.4, 11.5, 8.7, 4.7, 2.6]
      }]
  });
  },[])
  
  return(
    <div id="line-chart"></div>
  )
}

export default LineChart;