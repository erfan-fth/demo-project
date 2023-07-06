import React from "react";
import ReactApexChart from "react-apexcharts";

const PolarChart = () => {
  const option = {
    series: [14, 23, 21, 17],
    options: {
      chart: {
        type: "polarArea",
        fontFamily: "Vazir",
      },
      labels: ["بهار", "تابستان", "پاییز", "زمستان"],
      stroke: {
        colors: ["#fff"],
      },
      fill: {
        opacity: 0.8,
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
  };
  return (
    <div id="chart">
      <ReactApexChart
        options={option.options}
        series={option.series}
        type="polarArea"
        height={350}
      />
    </div>
  );
};

export default PolarChart;
