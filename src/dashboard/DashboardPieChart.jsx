import React, { useEffect, useState } from "react";
import axios from "axios";
import { Chart } from "react-google-charts";

const DashboardPieChart = () => {
  const [data, setData] = useState([
    ["Publisher", "Articles Count"],
  ]);

  useEffect(() => {
    axios.get("https://y-ruby-three.vercel.app/dashboard/articles")
      .then(res => {
        const publisherCount = {};
        res.data.forEach(article => {
          const pub = article.publisher;
          publisherCount[pub] = (publisherCount[pub] || 0) + 1;
        });

        const chartData = [["Publisher", "Articles"]];
        for (const pub in publisherCount) {
          chartData.push([pub, publisherCount[pub]]);
        }
        setData(chartData);
      })
      .catch(err => console.error("Pie Chart Load Error:", err));
  }, []);

  return (
    <Chart
      chartType="PieChart"
      width="100%"
      height="400px"
      data={data}
      options={{
        title: "Articles by Publisher",
        is3D: true,
      }}
    />
  );
};

export default DashboardPieChart;
