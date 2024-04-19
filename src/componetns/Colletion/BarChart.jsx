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
      position: 'top'
    },
    title: {
      display: true,
      text: 'Michu lon monthly collection per Individula',
    },
  },
};

const labels=['yero', 'shewa', 'sane', 'dateRangeTotal']


export function BarChart() {
  const collection=useSelector(state=>state.collection)
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
          // {
          //   label: 'Dataset 1',
          //   data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
          //   backgroundColor: 'rgba(255, 99, 132, 0.5)',
          // },
          {
            label: 'Officer vs collection amount',
          //   data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
          data:Object.values(collection.data.dashboard[1][0]),
            backgroundColor: '#00abef7a',
          },
        ],
      }
} />}
</div>
);
}
