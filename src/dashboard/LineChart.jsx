import React from "react";
import { Chart } from "react-google-charts";

const LineChart = () => {
  const data = [
    ["Month", "Subscribers"],
    ["Jan", 5],
    ["Feb", 10],
    ["Mar", 6],
    ["Apr", 12],
    ["May", 8],
  ];

  const options = {
    title: "📈 Monthly Subscriptions (Static Data)",
    curveType: "function",
    legend: { position: "bottom" },
  };

  return (
    <Chart
      chartType="LineChart"
      width="100%"
      height="300px"
      data={data}
      options={options}
    />
  );
};

export default LineChart;
