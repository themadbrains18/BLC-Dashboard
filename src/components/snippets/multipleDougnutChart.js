import { useEffect } from 'react';
import Highcharts from 'highcharts/highstock'
import variablePie from "highcharts/modules/variable-pie.js";

variablePie(Highcharts);

const MultilpleDougnutChart=()=>{
  useEffect(()=>{
    Highcharts.chart("container5", {
    chart: {
      height:'464px',
      // height:'100%',
        type: 'pie'
    },
    legend: {
        align: "middle",
        enabled:true,
        useHTML: true,
         x:50,
         y:-50,
         itemHoverStyle: {
          color: '#ccc',
       },
        itemStyle: {
            font: "14px 'Public Sans', sans-serif",
            color:'#fff'
          }
        },
    title: {
        text: 'Fiat supported',
        align:'left',
        fontSize: '20px' ,
       x:20,
       y:40,
       style: {
        fontSize: '18px'
      }
      },
      subtitle: {
        text: 'Fiat currency used to trade in Crypto',
        align:'left',
        x:20,
        y:65,
        color:'#fff',
        style: {
          fontSize: '15px'
        }
      },
    plotOptions: {
    	series: {
            dataLabels: {

                connectorColor: 'transparent',
                connectorPadding: 10,
                distance: 0,
                enabled:false
                
            },
      }
    },
    series: [{
       
        innerSize: '99%',
        borderWidth: 20,
        borderColor: null,
        enableMouseTracking: false,
        showInLegend: true,
        marker:{enabled:false},
        
    	size: '30%',
        center: ['15%', '50%'],
        data: [  
            {
                name:'',
                y: 40,
                color: '#3699ff',
                opacity:'0.3',
                
              },{
                name:'USD',
            y: 60,
            color:'#3699FF'
          }],
          dataLabels: {
            enabled: true,
              align:'center',
              distance:-50,
            connectorWidth: 0
        },
    }, {
        
        innerSize: '99%',
        borderWidth: 20,
        showInLegend: true,
        borderColor: null,
        enableMouseTracking: false,
        dataLabels: {
          enabled: true,
            align:'center',
            distance:-50,
          connectorWidth: 0
      },
    		size: '30%',
        center: ['50%', '50%'],
        data: [
            {
                name:'INR',
                y: 25,
                color:'#F44336'
              },{
                name:'',
            y: 75,
            color: '#f44336',
            opacity:'0.3'
          },]
    },
    {
        innerSize: '99%',
        borderWidth: 20,
        borderColor: null,
        enableMouseTracking: false,
        dataLabels: {
          enabled: true,
            align:'center',
            distance:-50,
          connectorWidth: 1
      },
      showInLegend: true,
        size: '30%',
    center: ['85%', '50%'],
    data: [{
        name:'EUR',
        y: 15,
        color:'#5F5CF1'
      }, {
        name:'',
        y: 85,
        color: '#5f5cf1',
        opacity:'0.3',
      hidden:true
      },],
     
}],
caption: {
    text: '<b>Users to use the fiat currency to trand in all over the crypto exchange</b>',
    marginTop:'10px',
    x:20,
    y:0,
    style: {
      font: "14px 'Public Sans', sans-serif",
      
      color:'#fff'
    }
}
},

); 
  },[])
  
  return(
    <div id='container5'></div>
  )
}

export default MultilpleDougnutChart;




