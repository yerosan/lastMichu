import React from 'react'
import config from '../../config/config'
import {useSelector, useDispatch} from "react-redux"
import { useState, useEffect } from 'react'
import { intervalSalse } from '../../features/salse/salseSlice'
import Alert from "@mui/material/Alert"
import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';
import axios from 'axios'
import { useStateContext } from '../../context/ContextProvider'
import Profile from '../Profile'
import TotalSalse from './TotalSalse'
import WeeklySalse from './WeeklySalse'
import MonthlySalse from './MonthlySalses'
import DistrictDisplay from './DistrictDisplay'
import Income from './Income'

import BarChart from './ActualTargetRatio'


const SalseDashboard = () => {
  const salse= useSelector(state=>state.salse)
  const dispatch=useDispatch()
  const [load, setLoad]=useState(false)
  const {dbfilter, setDbfilter}=useStateContext()
  const {dateVeriation, setDateVeriation}=useStateContext()
  const {dashboard, setDashboard}=useStateContext()
  const currentDate =new Date()
  const startOfPreviousMonth = new Date(currentDate.getFullYear(), currentDate.getMonth()-1, 1);
  const currentDay=new Date(currentDate.getFullYear(),currentDate.getMonth(),currentDate.getDate())
  const endOfPreviousMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);
  let weekRange={}

  const weekFunction=()=>{
    let today=currentDate.getDate()
    let day=currentDay.getDay()
    let previousMonday=today-(day+6)
    let previousMondayDate=new Date(currentDate.getFullYear(), currentDate.getMonth(), previousMonday)
    let previousSundayDate=previousMonday+6
    let lastWeekEnd=new Date(currentDate.getFullYear(), currentDate.getMonth(), previousSundayDate)
    let formatedStartDay=`0${previousMondayDate.getDate()}`.slice(-2)
    let formatedStartMonth=`0${previousMondayDate.getMonth()+1}`.slice(-2)
    let formatedStartDate=`${previousMondayDate.getFullYear()}-${formatedStartMonth}-${formatedStartDay}`
    let formatedEndDay=`0${lastWeekEnd.getDate()}`.slice(-2)
    let formatedEndMonth=`0${lastWeekEnd.getMonth()+1}`.slice(-2)
    let formatedEndDate=`${lastWeekEnd.getFullYear()}-${formatedEndMonth}-${formatedEndDay}`
    weekRange.startDate=previousMondayDate
    weekRange.endDate=lastWeekEnd
  }
  const currentMonth=currentDate.getMonth()+1
  const currentYear=currentDate.getFullYear()
  const toDayDate=currentDate.getDate()
  const month = `0${currentMonth}`.slice(-2);
  const dayDate = `0${toDayDate}`.slice(-2);
  const today=`${currentYear}-${month}-${dayDate}`;

  const defaultStartDate = startOfPreviousMonth.toISOString();
  const defaultEndDate = endOfPreviousMonth.toISOString();
  const dateRange={startDate:defaultStartDate, endDate:defaultEndDate}

  const timeIntervalSalse=async(data)=>{
    let userDetails={}
    let liveCollection=0
    let liveAccount=0
    let previousAccount=0
    let previousCollection=0
    try{
      let totalSalse= await axios.post(`${config.apiUrl}/salse/total`, dateVeriation)
      let salesTarget= await axios.post(`${config.apiUrl}/salse/givenDateTarget`, dateVeriation)
      let salsePerUser=await axios.post(`${config.apiUrl}/salse/salsePerUser`, dateVeriation)
      if(totalSalse.data.message=="succeed" && salsePerUser.data.message=="succeed"){
        setDbfilter(false)
        const dashboard=totalSalse.data.data
        const salsePerUsers=salsePerUser.data.data
        const monthlySalse= await axios.post(`${config.apiUrl}/salse/total`, data.monthly)
        const weeklySalse=await axios.post(`${config.apiUrl}/salse/total`, data.weekly)
        if(weeklySalse.data.message=='succeed' && monthlySalse.data.message=="succeed"){
          const monthlySalses=monthlySalse.data.data
          const weeklySalses=weeklySalse.data.data
          let AllData={totalSalse:dashboard, 
            salsePerUser:salsePerUsers, 
            monthlySalse:monthlySalses, 
            weeklySalse:weeklySalses,
            salesTargets:salesTarget.data.data}
          dispatch(intervalSalse({loading:false, error:"", data:AllData}))
          setLoad(true)
        }else{
          dispatch(intervalSalse({loading:false, error:weeklySalse.data.message, data:null}))
          
        }
      }else{
        {totalSalse.data.message=="succeed" ?  
        dispatch(intervalSalse({loading:false, error:salsePerUser.data.message, data:null}))
        :
        dispatch(intervalSalse({loading:false, error:totalSalse.data.message, data:null}))
      }
      }
    }catch(error){
      dispatch(intervalSalse({loading:false, error:"Something went wrong", data:null}))
      console.log("An error occered",error)
    }
  }

  if(dbfilter){
    let timeBase={totalDate:dateVeriation,monthly:dateRange, weekly:weekRange}
    weekFunction()
    timeIntervalSalse(timeBase)
  }

  const actualTargetdata = {
    labels: ['January', 'February', 'March', 'April', 'May'],
    targets: [100, 120, 150, 130, 170],
    actuals: [90, 110, 130, 115, 160],
  };

  useEffect(()=>{
    weekFunction()
  })

  useEffect(()=>{
    let timeBase={totalDate:dateVeriation,monthly:dateRange, weekly:weekRange}
    timeIntervalSalse(timeBase)

  },[])
  return (
    <div className='w-full h-full'>
      {salse.loading ? 
      <div className='flex items-center justify-center h-full w-full' >
        <Stack sx={{ width: '100%', color: 'grey.500' }}>
          <LinearProgress color="secondary" />
        </Stack>
      </div>:
       <div className='w-full h-full'>
        {salse.error !=="" ?<Alert sx={{mt: 2, mb: 2}} severity="error">{salse.error}</Alert>:
        load && 
        <div className='w-full h-full flex flex-col flex-1'>
          <div className='flex flex-auto'>
             {dashboard && <Profile/>}
             <p className='font-semibold w-full text-center text-2xl pb-2 font-arial text-black border-b-2 rounded-lg'>Michu Loan Sales Dashboard</p>
          </div>
          
          <div className='mt-2'>
            <TotalSalse/>
          </div>
          <div className="flex py-2 flex-1 h-full">
          
            <div className='w-[80%] flex flex-col justify-around h-full flex-auto'>
              <div className='h-[90%] flex justify-end items-center '>
                <DistrictDisplay/>
              </div>
              <MonthlySalse/>
            </div>
            <WeeklySalse/>
          </div>
        
        </div> }
    </div>}
    </div>
  )
}

export default SalseDashboard