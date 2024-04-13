import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Line} from 'react-chartjs-2';
// import faker from 'faker';
import { faker } from '@faker-js/faker';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

// import { useEffect, useState } from 'react';
import {useSelector, useDispatch} from "react-redux"

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top'
    },
    title: {
      display: true,
      text: 'Michu Loan Collection Progress',
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', "August", "September",
"October", "November", "December"];

export const data = {
  labels,
  datasets: [
    {
      fill: true,
      label: 'Michu Loan Collection',
      data: labels.map(() => faker.number.int({ min: 0, max: 1000 })),
      // borderColor: 'rgb(53, 162, 235)',
      borderColor:"#00abef1f",
      backgroundColor: '#00abef7a',
      // backgroundColor:"rgb(0, 173, 239)"
    },
  ],
};

const Area=()=> {
  let collection=useSelector(state=>state.collection)
  
  // console.log("THIS IS FROM AREA``````````````````````````````````", collection,collection.data.details)
  return <Line options={options} data={data} />;
}

export default Area