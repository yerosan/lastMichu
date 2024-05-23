import React from 'react'
import BottomCard from './BottomCard'
import SideCard from './SideCard'
import config from '../../config/config'
import { BarChart } from './BarChart'
import HeadCard from './HeadCard'
import {useSelector, useDispatch} from "react-redux"
import { useState, useEffect } from 'react'
import { operationalInterval } from '../../features/operational/operationalSlice'
import Alert from "@mui/material/Alert"
import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';
import BasicExampleDataGrid from './OperationDetail'
import axios from 'axios'
import { useStateContext } from '../../context/ContextProvider'
// import IndividualStatus from './IndividualStatus'
import Profile from '../Profile'
import OpeationalForm from './OperationalForm'
const Operational = () => {
  const operational= useSelector(state=>state.operationalDashboard)
//   const operational= operationals.data
  const dispatch=useDispatch()
  const [loops, setLoops]=useState(false)
  const [load, setLoad]=useState(false)
  const [previousAccount, setPreviousAccount]=useState(0)
  const [liveAccount, setLiveAccount]=useState(0)
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

  const timeIntervalOperational=async(data)=>{
    let userDetails={}
    let liveCollection=0
    let liveAccount=0
    let previousAccount=0
    let previousCollection=0
    try{
      let operationalss= await axios.post(`${config.apiUrl}/operational/totalData`, data)
      let approvalPeruser= await axios.post(`${config.apiUrl}/operational/totalApprovalPerUser`, data)
      if(operationalss.data.message=="succeed" && approvalPeruser.data.message=="succeed"){
        setDbfilter(false)
        let operationalStatus={}
        operationalStatus.totalStatus=operationalss.data.data 
        operationalStatus.approvalPerUser=approvalPeruser.data.data
        dispatch(operationalInterval({loading:false, error:"", data:operationalStatus}))
        setLoad(true)
      }else{
        {approvalPeruser.data.message=="succeed" ? dispatch(operationalInterval({loading:false, error:operationalss.data.message, data:null})):
        dispatch(operationalInterval({loading:false, error:approvalPeruser.data.message, data:null}))}
      }
    }catch(error){
      dispatch(operationalInterval({loading:false, error:"Something went wrong", data:null}))
      console.log("An error occered",error)
    }
  }

  if(dbfilter){
    weekFunction()
    let timeBase={... dateVeriation, "weekStart":weekRange.startDate,"weekEnd":weekRange.endDate}
    timeIntervalOperational(timeBase)
  }

  useEffect(()=>{
    weekFunction()
  })


  useEffect(()=>{
    let timeBase={... dateVeriation, "weekStart":weekRange.startDate,"weekEnd":weekRange.endDate}
    timeIntervalOperational(timeBase)
  },[])
  return (
    <div className='w-full h-full'>
      {operational.loading ? 
      <div className='flex items-center justify-center h-full w-full' >
        <Stack sx={{ width: '100%', color: 'grey.500' }}>
          <LinearProgress color="secondary" />
        </Stack>
      </div>:
       
       <div className='w-full h-full'>
        {operational.error !=="" ?<Alert sx={{mt: 2, mb: 2}} severity="error">{operational.error}</Alert>:
        load && 
        <div className='w-full h-full flex flex-col flex-1'>
          <div className='flex flex-auto'>
             {dashboard && <Profile/>}
             <p className='font-semibold w-full text-center text-2xl pb-2 font-arial text-black border-b-2 rounded-lg'>Michu Loan Operational Dashboard</p>
          </div>
          
          <div className='mt-2'>
            <HeadCard/>
          </div>
          <div className="flex py-2 flex-1 h-full">
          
            <div className='w-[80%] flex flex-col justify-around h-full flex-auto'>
              <div className='h-[100%] flex justify-end items-center '>
                <BarChart/>
              </div>
              <BottomCard/>
            </div>
            <SideCard/>
          </div>
        
        </div> }
    </div>}
    </div>
  )
}

export default Operational