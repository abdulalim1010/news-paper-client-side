const BarChart = () => {
  const data = [
    ["Tag", "Articles"],
    ["Politics", 4],
    ["Technology", 2],
    ["Sports", 3],
    ["Education", 1],
  ];

  return (
    <Chart
      chartType="Bar"
      width="100%"
      height="300px"
      data={data}
      options={{ title: "Articles per Tag (Static Data)" }}
    />
  );
};
export default BarChart