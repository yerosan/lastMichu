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
      text: 'Michu lon monthly collection per Individula',
      font: {
        size: 20
    }
    },
  },
};

const labels=['yero', 'shewa', 'sane', 'dateRangeTotal']


export function BarChart() {
  const collection=useSelector(state=>state.dashboard)
  const collecte=collection.data
  const [label, setLabel]=useState(null)
  const [data, setData]=useState(null)
  const [draw, setDraw]=useState(false)
  let usersCollections= {}
  useEffect(()=>{
    if(collection.data){
        let collectionPerUser=collection.data.dashboard[1][0]
        let monthlyCollection=collection.data.monthlyData
    }
  },[])
  return (<div className='h-full w-full flex items-center justify-center'> 
    {collection.data && <Bar options={options} data={
    {
        labels:Object.keys(collection.data.dashboard[1][0]),
        datasets: [
          {
            label: 'Officer vs collection amount',
            borderColor:"#00abef",
            backgroundColor: '#00abef',
          data:Object.values(collection.data.dashboard[1][0]),
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
