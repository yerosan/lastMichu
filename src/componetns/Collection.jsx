import React from 'react'
import BottomCard from './Colletion/BottomCard'
import SideCard from './Colletion/SideCard'
import Area from './Colletion/Area'
// import config from '../config'
import config from '../config/config'
// import { BarChart } from './Colletion/BarChart'
import { BarChart } from './Colletion/BarChart'
import HeadCard from './Colletion/HeadCard'
import {useSelector, useDispatch} from "react-redux"
import { useState, useEffect } from 'react'
import collectionSlice from '../features/collection/collectionSlice'
import { intervalCollection } from '../features/collection/collectionSlice'
import Alert from "@mui/material/Alert"
import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';
import axios from 'axios'
import DateRange from './Colletion/DateRange'
import { WeeklyBar } from './Colletion/WeeklyBar'
import { useStateContext } from '../context/ContextProvider'
const Collection = () => {
  const collection= useSelector(state=>state.collection)
  const dispatch=useDispatch()
  const [loops, setLoops]=useState(false)
  const [load, setLoad]=useState(false)
  const [previousAccount, setPreviousAccount]=useState(0)
  const [liveAccount, setLiveAccount]=useState(0)
  const {dbfilter, setDbfilter}=useStateContext()
  const {dateVeriation, setDateVeriation}=useStateContext()
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

  const timeIntervalCollection=async(data)=>{
    let userDetails={}
    let liveCollection=0
    let liveAccount=0
    let previousAccount=0
    let previousCollection=0
    dispatch(intervalCollection({loading:true, error:"", data:null}))
    try{
      let collectionss= await axios.post(`${config.apiUrl}/collection/dateRange`, data.monthly)
      let totalCollectionDashboard= await axios.post(`${config.apiUrl}/collection/dashboard`, dateVeriation)
      if(collectionss.data.message=="succed" && totalCollectionDashboard.data.message=="succeed"){
        setDbfilter(false)
        const dashboard=totalCollectionDashboard.data.data
        let weecklyCollection=await axios.post(`${config.apiUrl}/collection/dateRange`, data.weekly)
        if(weecklyCollection.data.message=='succed'){
          let allUser= await axios.get(`${config.apiUrl}/user/allUser`)
          if(allUser.data.message==="succeed"){
              let allUserData=allUser.data.data
              await Promise.all( allUserData.map(async (user,index) =>{
                let [userName, fullName]=[user.userName, user.fullName]
                let userCollection=await axios.get(`${config.apiUrl}/collection/users/${userName}`)
                if(userCollection.data.message=="succed"){
                  let userDetail=userCollection.data.data
                  userDetail[fullName]=fullName
                  userDetails[userName]=userDetail
                  liveCollection +=userDetail.liveCollection
                  previousCollection +=userDetail.previousColletion
                  previousAccount =userDetail.previousAccount
                  liveAccount =userDetail.liveAccount
                }else{
                  setLoops(true)
                }
               }),
               
              )
              if(!loops){
                let AllData={monthlyData:collectionss.data.data, 
                  dashboard:dashboard,
                  weeklyData:weecklyCollection.data.data,
                  liveCollections:liveCollection,
                  previousAccount:previousAccount,
                  liveAccount:liveAccount,
                  previousColletions:previousCollection,
                  details:userDetails}
                dispatch(intervalCollection({loading:false, error:"", data:AllData}))
                setLoad(true)
              }else{
                dispatch(intervalCollection({loading:false, error:"Something went wrong with users detail", data:null}))
              }
          }
        }else{
          dispatch(intervalCollection({loading:false, error:weecklyCollection.data.message, data:null}))
        }
      }else{
        dispatch(intervalCollection({loading:false, error:collectionss.data.message, data:null}))
      }
    }catch(error){
      dispatch(intervalCollection({loading:false, error:"Something went wrong", data:null}))
      console.log("An error occered",error)
    }
  }

  if(dbfilter){
    let timeBase={monthly:dateRange, weekly:weekRange}
    weekFunction()
    timeIntervalCollection(timeBase)
  }

  useEffect(()=>{
    weekFunction()
  })

  useEffect(()=>{
    let timeBase={monthly:dateRange, weekly:weekRange}
    timeIntervalCollection(timeBase)

  },[])
  return (
    <div className='w-full h-full'>
      {collection.loading ? 
      <div className='flex items-center justify-center h-full w-full' >
        <Stack sx={{ width: '100%', color: 'grey.500' }}>
          <LinearProgress color="secondary" />
        </Stack>
      </div>:
       
       <div className='w-full h-full'>
        {collection.error !=="" ?<Alert sx={{mt: 2, mb: 2}} severity="error">{collection.error}</Alert>:
        load && 
        <div className='w-full h-full flex flex-col flex-1'>
          <p className='font-semibold text-center text-2xl pb-2 font-arial text-black border-b-2 rounded-lg'>Michu Loan Collection Dashboard</p>
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

export default Collection