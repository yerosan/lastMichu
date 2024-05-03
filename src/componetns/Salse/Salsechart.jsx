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
import { Line} from 'react-chartjs-2';
export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top'
    },
    title: {
      display: true,
      text: 'Michu loan sales status vs Individula',
    },
  },
};

const labels=['yero', 'shewa', 'sane', 'dateRangeTotal']


export function Salsechart() {
  const salses=useSelector(state=>state.salse)
  const collecte=salses.data
  const [label, setLabel]=useState(null)
  const [data, setData]=useState(null)
  const [draw, setDraw]=useState(false)
  return (<div className='h-full w-full flex items-center justify-center'> 
    {salses.data && <Bar options={options} data={
    {
        labels:Object.keys(salses.data.salsePerUser),
        datasets: [
          {
            label: 'Officer vs salses amount',
            fill:true,
            borderColor:"#00abef1f",
            backgroundColor: '#00abef7a',
            data:Object.values(salses.data.salsePerUser),
          },
        ],
      }
} />} 
</div>
);
}
