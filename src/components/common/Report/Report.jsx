import React from "react";
import Report_Section from "../../Sections/Report_Section";
import BarChart from "../Charts/BarChart";
import ZoomableChart from "../Charts/ZoomableChart";
import PolarChart from "../Charts/PolarChart";
import {
  hourly_bar_chart_data,
  monthly_bar_chart_data,
  weekly_bar_chart_data,
} from "../../../pages/data";

const Report = () => {
  return (
    <div className="grid grid-cols-4 gap-2">
      <Report_Section
        title="نمودار بر اساس ریز گزارشات"
        chart={<ZoomableChart />}
        grid="col-span-4"
      />

      <Report_Section
        title="نمودار گزارش بر اساس روز های هفته"
        chart={<BarChart data={weekly_bar_chart_data} color="#0289f7" />}
        grid="col-span-2"
      />

      <Report_Section
        title="نمودار گزارش بر اساس فصل ها"
        chart={<PolarChart />}
        grid="col-span-2"
      />

      <Report_Section
        title="نمودار گزارش در یک شبانه روز"
        chart={<BarChart data={hourly_bar_chart_data} color="#7a33de" />}
        grid="col-span-2"
      />

      <Report_Section
        title="نمودار گزارش بر اساس ماه های سال"
        chart={<BarChart data={monthly_bar_chart_data} color="#57dbde" />}
        grid="col-span-2"
      />
    </div>
  );
};

export default Report;
