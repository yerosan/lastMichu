
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

import {useSelector, useDispatch} from "react-redux"
import { useState, useEffect } from 'react';

Chart.register(ChartDataLabels);


Chart.register(...registerables);

const Salsechart = () => {

  const salses=useSelector(state=>state.salse)
  const collecte=salses.data
  const [label, setLabel]=useState(null)
  const [data, setData]=useState(null)
  const [draw, setDraw]=useState(false)
  const datas = Object.values(salses.data.salsePerUser)
  let districtName=Object.keys(salses.data.salsePerUser)
  let combinedDistrictName=[]
  const achivedData=[]
  const targetData=[]
  const valuess= datas.map((district, index)=>{
    if(salses.data.salesTargets[districtName[index]].dataStatus==0){
    }else{
      combinedDistrictName.push(districtName[index])
      achivedData.push(district.disbursedAmount),
      targetData.push(salses.data.salesTargets[districtName[index]].dataStatus[0].totalDisbursed)
    }
})


  const chartData = {
    labels: combinedDistrictName,
    datasets: [
      {
        label: 'Targeted disbursement',
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
        label: 'Actual disbursement',
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
      legend: {
              position: 'top',
              font:"bold",
              labels:{
                font:{
                  size:16
                }
              }
            },

      datalabels: {
        display: function(context) {
          // Only display data labels for the actual bars
          return context.dataset.label === 'Actual disbursement';
        },
      },

      title: {
              display: true,
              text: 'Disbursed Amount per District',
              font: {
                size: 20
            }
            },
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

  return (salses.data && <Bar data={chartData} options={options} />);
};

export default Salsechart;
