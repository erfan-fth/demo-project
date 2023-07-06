import React, { useEffect } from "react";
import ReactApexChart from "react-apexcharts";

const ThreeBarChart = () => {
  useEffect(() => {
    randomNumber();
  }, []);
  const randomNumber = () => {
    let num = [];
    for (let i = 0; i <= 23; i++) {
      // console.log({ name: i, data: randomData() });
      num.push({
        name: i < 10 ? "0" + i + ":00" : i + ":00",
        data: randomData(),
      });
    }
    console.log(num);
    return num;
  };
  const randomData = () => {
    let data = [];
    for (let i = 0; i <= 6; i++) {
      data.push(Math.floor(Math.random() * 23));
    }
    return data;
  };

  const option = {
    series: randomNumber(),

    options: {
      chart: {
        type: "bar",
        height: 350,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
          endingShape: "rounded",
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"],
      },
      xaxis: {
        categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      },
      // yaxis: {
      //   title: {
      //     text: "$ (thousands)",
      //   },
      // },
      fill: {
        opacity: 1,
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return val + " thousands";
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
        type="bar"
        height={350}
      />
    </div>
  );
};

export default ThreeBarChart;

// [
//   {
//     name: "0",
//     data: [44, 55, 57, 56, 61, 58, 63],
//   },
//   {
//     name: "1",
//     data: [76, 85, 101, 98, 87, 105, 91],
//   },
//   {
//     name: "2",
//     data: [35, 41, 36, 26, 45, 48, 52],
//   },
//   {
//     name: "3",
//     data: [35, 41, 36, 26, 45, 48, 52],
//   },
//   {
//     name: "4",
//     data: [35, 41, 36, 26, 45, 48, 52],
//   },
//   {
//     name: "5",
//     data: [35, 41, 36, 26, 45, 48, 52],
//   },
//   {
//     name: "6",
//     data: [35, 41, 36, 26, 45, 48, 52],
//   },
//   {
//     name: "7",
//     data: [35, 41, 36, 26, 45, 48, 52],
//   },
//   {
//     name: "8",
//     data: [35, 41, 36, 26, 45, 48, 52],
//   },
//   {
//     name: "9",
//     data: [35, 41, 36, 26, 45, 48, 52],
//   },
//   {
//     name: "10",
//     data: [35, 41, 36, 26, 45, 48, 52],
//   },
//   {
//     name: "11",
//     data: [35, 41, 36, 26, 45, 48, 52],
//   },
//   {
//     name: "12",
//     data: [35, 41, 36, 26, 45, 48, 52],
//   },
//   {
//     name: "13",
//     data: [35, 41, 36, 26, 45, 48, 52],
//   },
//   {
//     name: "14",
//     data: [35, 41, 36, 26, 45, 48, 52],
//   },
//   {
//     name: "15",
//     data: [35, 41, 36, 26, 45, 48, 52],
//   },
//   {
//     name: "16",
//     data: [35, 41, 36, 26, 45, 48, 52],
//   },
//   {
//     name: "17",
//     data: [35, 41, 36, 26, 45, 48, 52],
//   },
//   {
//     name: "18",
//     data: [35, 41, 36, 26, 45, 48, 52],
//   },
//   {
//     name: "19",
//     data: [35, 41, 36, 26, 45, 48, 52],
//   },
//   {
//     name: "20",
//     data: [35, 41, 36, 26, 45, 48, 52],
//   },
//   {
//     name: "21",
//     data: [35, 41, 36, 26, 45, 48, 52],
//   },
//   {
//     name: "22",
//     data: [35, 41, 36, 26, 45, 48, 52],
//   },
//   {
//     name: "23",
//     data: [35, 41, 36, 26, 45, 48, 52],
//   },
//   // {
//   //   name: "Mon",
//   //   data: randomNumber(),
//   // },
//   // {
//   //   name: "Tue",
//   //   data: randomNumber(),
//   // },
//   // {
//   //   name: "Wed",
//   //   data: randomNumber(),
//   // },
//   // {
//   //   name: "Thu",
//   //   data: randomNumber(),
//   // },
//   // {
//   //   name: "Fri",
//   //   data: randomNumber(),
//   // },
//   // {
//   //   name: "Sat",
//   //   data: randomNumber(),
//   // },
//   // {
//   //   name: "Sun",
//   //   data: randomNumber(),
//   // },
// ],

// colors: ["#e61c1c", "#ffe600", "#08d604", "#53d0e0", "#9f93e6", "#12e6a3", "#b31cc7", "#1f5ab8", "#e063bf", "#280ccf", "#084d2b", "#6b4707", "#814bad", "#911744", "#0289f7", "#fab209", "#4f0820", "#2a5247", "#8be0b6", "#ada6a9", "#ff0561", "#c9bce3", "#c0f0dd"],
