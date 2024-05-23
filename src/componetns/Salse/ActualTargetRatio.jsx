import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

import {useSelector, useDispatch} from "react-redux"
import { useState, useEffect } from 'react';

Chart.register(ChartDataLabels);


Chart.register(...registerables);

const BarChart = () => {

  const salses=useSelector(state=>state.salse)
  const collecte=salses.data
  const [label, setLabel]=useState(null)
  const [data, setData]=useState(null)
  const [draw, setDraw]=useState(false)
  const datas = Object.values(salses.data.salsePerUser)
  let districtName=Object.keys(salses.data.salsePerUser)
  const achivedData=[]
  const targetData=[]
  const valuess= datas.map((district, index)=>[
    achivedData.push(district.numberOfAccount),
    targetData.push(salses.data.salesTargets[districtName[index]].dataStatus[0].numberOfAccount),
  ])


  const chartData = {
    labels: districtName,
    datasets: [
      {
        label: 'Target number of account',
        borderWidth: 1,
        fill:true,
        borderColor:"#e38524",
        backgroundColor: '#e38524',
        data:targetData,
        datalabels: {
          display: false, // Hide data labels for the target bars
        },
      },
      {
        label: 'Actual number of account',
        fill:true,
        borderColor:"#00adef",
        backgroundColor: '#00adef',
        data:achivedData,
        borderWidth: 1,
        datalabels: {
          align: 'end',
          anchor: 'end',
          formatter: function (value, context) {
            const index = context.dataIndex;
            const target = targetData[index];
            const actual = achivedData[index];
            const ratio = ((actual / target) * 100).toFixed(2);
            return `${ratio}%`;
          },
          color: '#000',
        }
      },
    ],
  
};


  const options = {
    plugins: {
      datalabels: {
        display: function(context) {
          // Only display data labels for the actual bars
          return context.dataset.label === 'Actual number of account';
        },
      },
    // plugins: {
    //   datalabels: {
    //     display: true,
    //     align: 'top',
    //     anchor: 'end',
    //     formatter: function (value, context) {
    //       const index = context.dataIndex;
    //       const target = targetData[index];
    //       const actual = achivedData[index];
    //       const ratio = ((actual / target) * 100).toFixed(2);
    //       return `${ratio}%`;
    //     },
    //     color: '#000',
    //   },
      tooltip: {
        callbacks: {
          label: function (context) {
            const index = context.dataIndex;
            const target = targetData[index];
            const actual = achivedData[index];
            const ratio = ((actual / target) * 100).toFixed(2);
            return `Target: ${target}, Actual: ${actual}, Ratio: ${ratio}%`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };
  

  // const options = {
  //   plugins: {
  //     tooltip: {
  //       callbacks: {
  //         label: function (context) {
  //           const index = context.dataIndex;
  //           const target = data.targets[index];
  //           const actual = data.actuals[index];
  //           const ratio = ((actual / target) * 100).toFixed(2);
  //           return `Target: ${target}, Actual: ${actual}, Ratio: ${ratio}%`;
  //         },
  //       },
  //     },
  //     datalabels: {
  //       display: true,
  //       align: 'start',
  //       anchor: 'end',
  //       formatter: function (value, context) {
  //         const index = context.dataIndex;
  //         const target = data.targets[index];
  //         const actual = data.actuals[index];
  //         const ratio = ((actual / target) * 100).toFixed(2);
  //         return `${ratio}%`;
  //       },
  //       color: '#000',
  //     },
  //   },
  //   scales: {
  //     y: {
  //       beginAtZero: true,
  //     },
  //   },
  // };

  return (salses.data && <Bar data={chartData} options={options} />);
};

export default BarChart;
