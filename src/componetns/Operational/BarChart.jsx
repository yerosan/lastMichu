import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';
import {useSelector, useDispatch} from "react-redux"
import { useState, useEffect } from 'react';
import { Line} from 'react-chartjs-2';
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
      font:"bold",
      labels:{
          font:{
            size:16
          }
      },
    },
    title: {
      display: true,
      text: 'Michu Loan Approval Status',
      font: {
        size: 20
    }
    },
  },
};

const labels=['yero', 'shewa', 'sane', 'dateRangeTotal']


export function BarChart() {
  const operational=useSelector(state=>state.operationalDashboard)
  const approval=operational.data
  const [label, setLabel]=useState(null)
  const [data, setData]=useState(null)
  const [draw, setDraw]=useState(false)
  let usersCollections= {}
  useEffect(()=>{
    if(operational.data){
        let operationalPerUser=operational.data.approvalPerUser
    }
  },[])
  return (<div className='h-full w-full flex items-center justify-center'> 
    {operational.data && <Bar options={options} data={
    {
        labels:Object.keys(approval.approvalPerUser),
        datasets: [
          {
            label: 'Approval Amount per user',
            borderColor:"#00abef",
            backgroundColor: '#00abef',
          data:Object.values(approval.approvalPerUser),
          datalabels: {
            display: false, // Hide data labels for the target bars
          }
          },
        ],
      }
} />}
</div>
);
}
