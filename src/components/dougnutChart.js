import { useEffect } from 'react';
import Highcharts from 'highcharts/highstock'
import variablePie from "highcharts/modules/variable-pie.js";

variablePie(Highcharts);

const DougnutChart=(props)=>{

  useEffect(()=>{
    
    Highcharts.chart(props.id, {
      chart: props.doughnutProp.chart,
      title:props.doughnutProp.title,
      legend: props.doughnutProp.legend,
      plotOptions: props.doughnutProp.plotOptions,
      series: props.doughnutProp.series
    });
  },[props])
  
  return(
    <div id={props.id}></div>
  )
} 

export default DougnutChart;