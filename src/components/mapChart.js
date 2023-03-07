import { useState } from 'react';
import Highcharts from 'highcharts/highmaps'
import worldMap from "@highcharts/map-collection/custom/world.geo.json";
import HighchartsReact from "highcharts-react-official";

const MapChart = () => {

  const [options] = useState({
    chart: {
      map: worldMap
    },
    mapNavigation: {
      enabled: true,
      buttonOptions: {
        alignTo: "spacingBox"
      }
    },
    colorAxis: {
      min: 0
    },
    series: [
      {
        name: "Random data",
        states: {
          hover: {
            color: "#BADA55"
          }
        },
        // dataLabels: {
        //   enabled: true,
        //   format: "{point.name}"
        // },
        allAreas: true,
        data: [
          ["fo", 0],
          ["um", 1],
          ["us", 2],
          ["jp", 3],
          ["sc", 4],
          ["in", 5],
          ["fr", 6],
          ["fm", 7],
          ["cn", 8]
        ]
      }
    ]
  });

  return (
    <div id='map-chart'>
      <HighchartsReact
      highcharts={Highcharts}
      constructorType={"mapChart"}
      options={options}
    />
    </div>
  )
}

export default MapChart;