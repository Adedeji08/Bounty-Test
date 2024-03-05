import React from "react";
import ReactECharts from "echarts-for-react";

const AreaChart = ({xAxisData, yAxisData }) => {
  const areaChartData = {
    grid: {
      left: "5%",
      right: "5%",
    },

    xAxis: {
      type: "category",
      boundaryGap: false,
      data: xAxisData, 
    },
    yAxis: {
      type: "value",
      data: yAxisData, 
    },
    
    tooltip: {
      trigger: "axis",
      formatter: function (params) {
        const rawDateStr = params[0].name;
        const currentYear = new Date().getFullYear();
        const dateStrWithYear = rawDateStr.includes(currentYear)
          ? rawDateStr
          : `${rawDateStr}, ${currentYear}`;
        const yAxisValue = params[0].value;
        return `
          <div style="text-align: center;">
            ${yAxisValue} <br/> 
            ${dateStrWithYear}
          </div>
        `;
      },
    },
    
    series: [
      {
        data: yAxisData,
        type: "line",
        areaStyle: {
          color: "rgba(34, 204, 226, 0.15)",
        },
        lineStyle: {
          color: "#22CCE2",
          width: 4,
        },
      },
    ],
  };

  const isDataAvailable = xAxisData.length > 0 && yAxisData.length > 0;


  return (
    <div className="dashboard-area-chart">
      {isDataAvailable ? (
        <ReactECharts option={areaChartData} />
      ) : (
        <div className="w-full flex justify-center items-center my-[60px]">No data available</div>
      )}
    </div>

  );
};

export default AreaChart;