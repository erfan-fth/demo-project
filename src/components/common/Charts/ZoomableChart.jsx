import React from "react";
import ReactApexChart from "react-apexcharts";

const ZoomableChart = () => {
  const option = {
    series: [
      {
        name: "تعداد",
        data: [
          [1322508400000, 34],
          [1323594800000, 54],
          [1324236400000, 23],
          [1325326400000, 15],
          [1326341200000, 53],
          [1327346400000, 62],
          [1328265400000, 42],
          [1329392300000, 26],
        ],
        color: "#fab209"
      },
    ],
    options: {
      chart: {
        type: "area",
        stacked: false,
        height: 350,
        zoom: {
          type: "x",
          enabled: true,
          autoScaleYaxis: true,
        },
        toolbar: {
          autoSelected: "zoom",
        },
      },
      dataLabels: {
        enabled: false,
      },
      markers: {
        size: 0,
      },
      //   title: {
      //     text: "Stock Price Movement",
      //     align: "left",
      //   },
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          inverseColors: false,
          opacityFrom: 0.5,
          opacityTo: 0,
          stops: [0, 90, 100],
        },
      },
      yaxis: {
        labels: {
          formatter: function (val) {
            return Math.floor(val)
          },
        },
        // title: {
        //   text: "Price",
        // },
      },
      xaxis: {
        type: "datetime",
      },
      tooltip: {
        shared: false,
        y: {
          formatter: function (val) {
            return Math.floor(val)
          },
        },
      },
    },
  };
  return (
    <div id="chart">
      <ReactApexChart
        options={option.options}
        series={option.series}
        type="area"
        height={350}
      />
    </div>
  );
};

export default ZoomableChart;
