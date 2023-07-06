import React from "react";
import ReactApexChart from "react-apexcharts";

const CircleChart = (props) => {
  const { data } = props;
  const option = {
    series: data.data,
    options: {
      chart: {
        height: 390,
        type: "radialBar",
      },
      plotOptions: {
        radialBar: {
          offsetY: 10,
          startAngle: 0,
          endAngle: 270,
          hollow: {
            margin: 5,
            size: "30%",
            background: "transparent",
            image: undefined,
          },
          dataLabels: {
            name: {
              show: false,
            },
            value: {
              show: false,
            },
          },
        },
      },
      colors: [
        "#d42222",
        "#3784db",
        "#3deb1a",
        "#878383",
        "#a64eed",
        "#f0e807",
      ],
      labels: data.categories,
      legend: {
        show: true,
        floating: true,
        fontSize: "13px",
        fontFamily: "Vazir",
        position: "left",
        offsetX: 150,
        offsetY: -20,
        labels: {
          useSeriesColors: true,
        },
        markers: {
          size: 0,
        },
        formatter: function (seriesName, opts) {
          return seriesName + ":  " + opts.w.globals.series[opts.seriesIndex];
        },
        itemMargin: {
          vertical: 3,
        },
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              show: false,
            },
          },
        },
      ],
    },
  };

  return (
    <>
      {/* <div className="p-3">{t("first_statistics_chart_title")}</div> */}
      <div id="chart">
        <ReactApexChart
          options={option.options}
          series={option.series}
          type="radialBar"
          height={250}
        />
      </div>
    </>
  );
};

export default CircleChart;
