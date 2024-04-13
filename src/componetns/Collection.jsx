import React from 'react'
import BottomCard from './Colletion/BottomCard'
import SideCard from './Colletion/SideCard'
import Area from './Colletion/Area'
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
const Collection = () => {
  const collection= useSelector(state=>state.collection)
  const dispatch=useDispatch()
  const [loops, setLoops]=useState(false)
  const currentDate =new Date()
  const startOfPreviousMonth = new Date(currentDate.getFullYear(), currentDate.getMonth()-1, 1);
  const currentDay=new Date(currentDate.getFullYear(),currentDate.getMonth(),currentDate.getDate())
  const endOfPreviousMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);
  console.log("START OF THe Previous Month", startOfPreviousMonth,endOfPreviousMonth)
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
    console.log(formatedStartDate,formatedEndDate,"~~~~~~~~~~~~~~~This is the Weekly DateRAGNe~~~~~~~~~~~~~~~~~~~", weekRange)
  }

  const defaultStartDate = startOfPreviousMonth.toISOString();
  const defaultEndDate = endOfPreviousMonth.toISOString();
  const dateRange={startDate:defaultStartDate, endDate:defaultEndDate}

  console.log("this si DATERAnGE", dateRange)

  const timeIntervalCollection=async(data)=>{
    let userDetails={}
    let liveCollection=0
    let previousCollection=0
    dispatch(intervalCollection({loading:true, error:"", data:null}))
    try{
      let collectionss= await axios.post("http://localhost:3000/collection/dateRange", data.monthly)
      if(collectionss.data.message=="succed"){
        console.log("this is succedData", collectionss)
        let weecklyCollection=await axios.post("http://localhost:3000/collection/dateRange", data.weekly)
        if(weecklyCollection.data.message=='succed'){
          let allUser= await axios.get("http://localhost:3000/user/allUser")
          if(allUser.data.message==="succeed"){
              let allUserData=allUser.data.data
              console.log("ALL UUUUSER", allUserData)
              await Promise.all( allUserData.map(async (user,index) =>{
                console.log("this is UUUUUUUUUUUders", user)
                let [userName, fullName]=[user.userName, user.fullName]
                console.log("The USers, Name,full", userName, fullName)
                let userCollection=await axios.get(`http://localhost:3000/collection/users/${userName}`)
                if(userCollection.data.message=="succed"){
                  let userDetail=userCollection.data.data
                  userDetail[fullName]=fullName
                  userDetails[userName]=userDetail
                  liveCollection +=userDetail.liveCollection
                  previousCollection +=userDetail.previousColletion
                }else{
                  setLoops(true)
                }
               }),
               
              )
              if(!loops){
                let AllData={monthlyData:collectionss.data.data, 
                  weeklyData:weecklyCollection.data.data,
                  liveCollections:liveCollection,
                  previousColletions:previousCollection,
                  details:userDetails}
                dispatch(intervalCollection({loading:false, error:"", data:AllData}))
              }else{
                dispatch(intervalCollection({loading:false, error:"Something went wrong with users detail", data:null}))
              }
          }
        }else{
          dispatch(intervalCollection({loading:false, error:weecklyCollection.data.message}))
        }
      }else{
        dispatch(intervalCollection({loading:false, error:collectionss.data.message}))
      }
    }catch(error){
      dispatch(intervalCollection({loading:false, error:"Something went wrong", data:null}))
      console.log("An error occered",error)
    }
  }

  useEffect(()=>{
    console.log("this is the CollectiondataChange",collection)
    weekFunction()
  })

  useEffect(()=>{
    let timeBase={monthly:dateRange, weekly:weekRange}
    timeIntervalCollection(timeBase)

  },[])
  return (
    <div>
      {collection.loading ? 
      <div className='flex items-center justify-center h-full w-full bg-green-400 mt-40' >
        <Stack sx={{ width: '100%', color: 'grey.500' }}>
          <LinearProgress color="secondary" />
        </Stack>
      </div>:
       
       <div>
        {collection.error !=="" ?<Alert sx={{mt: 2, mb: 2}} severity="error">{collection.error}</Alert>:
        <div>
          <div className=''>
            <HeadCard/>
          </div>
          <div className="flex my-4 gap-2">
            <div className='w-[80%] flex flex-col justify-around'>
              <div className='h-[70%] flex justify-center'>
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