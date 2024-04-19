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
      text: 'Michu lon weekly collection per Individula',
    },
  },
};

const labels=['yero', 'shewa', 'sane', 'dateRangeTotal']

// export const data = {
//   labels,
//   datasets: [
//     // {
//     //   label: 'Dataset 1',
//     //   data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
//     //   backgroundColor: 'rgba(255, 99, 132, 0.5)',
//     // },
//     {
//       label: 'Dataset 2',
//     //   data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
//     data:[100, 500, 400, 1000],
//       backgroundColor: 'rgba(53, 162, 235, 0.5)',
//     },
//   ],
// };

export function WeeklyBar() {
  const collection=useSelector(state=>state.collection)
  const collecte=collection.data
  const [label, setLabel]=useState(null)
  const [data, setData]=useState(null)
  const [draw, setDraw]=useState(false)

  useEffect(()=>{
    if(collection.data){
        console.log("The user Status @@@@@@@@@@@@@@@@@", collection.data.monthlyData)
        // let total =collection.data.monthlyData["dateRangeTotal"]
        let monthlyCollection=collection.data.monthlyData
        // monthlyCollection.delete("dateRangeTotal")
        console.log("this is the before Delete", monthlyCollection)
        // delete monthlyCollection.dateRangeTotal
        // console.log("this is the Delete", monthlyCollection.dateRangeTotal)
        let labelss=Object.keys(monthlyCollection)
        let dataSetss=Object.values(monthlyCollection)
        setData(dataSetss)
        setLabel(labelss)
        setDraw(true)
        // datass=dataSetss
        // lables=labelss
        // console.log("the data of keys, values",total, labelss, dataSetss, data,label)
    }
  },[])
  return (<div className='w-full flex items-center justify-center'> 
    {collection.data && <Bar options={options} data={
    {
        labels:Object.keys(collection.data.weeklyData.PerUser),
        datasets: [
          // {
          //   label: 'Dataset 1',
          //   data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
          //   backgroundColor: 'rgba(255, 99, 132, 0.5)',
          // },
          {
            label: 'Officer vs collection amount',
          //   data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
          data:Object.values(collection.data.weeklyData.PerUser),
            backgroundColor: '#00abef7a',
          },
        ],
      }
} />}
</div>
);
}
