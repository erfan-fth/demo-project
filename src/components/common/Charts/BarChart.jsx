import React from "react";
import ReactApexChart from "react-apexcharts";

const BarChart = (props) => {
  const { data } = props;
  const option = {
    series: [
      {
        name: "Number",
        data: data?.data,
        color: props.color,
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "bar",
        fontFamily: "Vazir",
      },
      plotOptions: {
        bar: {
          borderRadius: 9,

          horizontal: props.horizontal,
          dataLabels: {
            position: "top", // top, center, bottom
          },
        },
      },
      dataLabels: {
        enabled: true,
        formatter: function (val) {
          return val;
        },
        offsetY: -20,
        style: {
          fontSize: "12px",
          colors: ["#304758"],

        },
      },

      xaxis: {
        categories: data?.categories || [],
        position: "bottom",
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        crosshairs: {
          fill: {
            type: "gradient",
            gradient: {
              colorFrom: "#D8E3F0",
              colorTo: "#fab209",
              stops: [0, 100],
              opacityFrom: 0.4,
              opacityTo: 0.5,
            },
          },
        },
        tooltip: {
          enabled: true,
        },
      },
      yaxis: {
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        labels: {
          show: true,
          formatter: function (val) {
            return val;
          },
        },
      },
      //   title: {
      //     text: "Monthly Inflation in Argentina, 2002",
      //     floating: true,
      //     offsetY: 330,
      //     align: "center",
      //     style: {
      //       color: "#444",
      //     },
      //   },
    },
  };
  return (
    <div id="chart" style={{direction: "ltr"}}>
      <ReactApexChart
        options={option.options}
        series={option.series}
        type="bar"
        height={350}
      />
    </div>
  );
};

export default BarChart;
