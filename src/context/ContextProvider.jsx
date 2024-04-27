import React from 'react'

import { createContext, useContext, useState } from 'react'
import { useEffect } from 'react'
import { collectionPerUser } from '../features/collection/individualSlice';
import { intervalCollection } from '../features/collection/dashboardSlisce'
import { useDispatch, useSelector } from 'react-redux';

const ContextState=createContext()

const initialRoles={
  collectionAdmin:false,
  operationalAdmin:false,
  salesAdmin:false,
  collectionUser:false,
  operationalUser:false,
  salesUser:false,
  admin:false

}


const currentDate=new Date()
const currentMonth=currentDate.getMonth()+1
const currentYear=currentDate.getFullYear()
const currentDay=currentDate.getDate()
const lastMonth=`0${currentDate.getMonth()}`.slice(-2)
const month = `0${currentMonth}`.slice(-2);
const day = `0${currentDay}`.slice(-2);
const today=`${currentYear}-${month}-${day}`;
const monthAgo=`${currentYear}-${lastMonth}-${day}`;
const dateRange=[new Date(today), new Date(today)]

const initialDate={
  startDate:today,
  endDate:today
}

const initialVeriation={
  startDate:"",
  endDate:today
}
let lastDay=new Date(currentDate.getTime() - 2*(24 * 60 * 60 * 1000))
const lastWeek=lastDay.getDate()
const months=lastDay.getMonth()+1
const years= lastDay.getFullYear()
const weekAgo=`${years}-${`0${months}`.slice(-2)}-${`0${lastWeek}`.slice(-2)}`;
const sevenDay={
   startDate:weekAgo,
   endDate:today
}

export const ContextProvider = ({children}) => {
       const [dateRanges, setDateRanges]=useState(initialDate)
       const [menu, setMenu]=useState(true)
       const [navs, setNavs]=useState([])
       const [open, setOpen]=useState(false)
       const [login, setLogin]=useState(true)
       const [role, setRole]=useState(initialRoles)
       const [filter, setFilter]=useState(false)
       const [userRoles,setUserRoles]=useState(null)
       const [dbfilter, setDbfilter]=useState(false)
       const [dateVeriation, setDateVeriation]=useState(initialVeriation)
       const [password, setPassword]=useState(false)
       const [dashboard, setDashboard]=useState(false)
       const [lognum, setLognum]=useState(1)
       const [detailfilter, setDetailfilter]=useState(sevenDay)
       const [detail, setDetail]=useState(false)
       const dispatch=useDispatch()

       useEffect(()=>{
        const intervalId= setInterval(()=>{
             dispatch(collectionPerUser({loading:true, error:"", data:null}))
             dispatch(intervalCollection({loading:true, error:"", data:null}))
          },600000)
          return () => clearInterval(intervalId);
      },[])

  return (<ContextState.Provider
    value={
       {
        login, 
        setLogin,
        menu,
        setMenu,
        navs, 
        setNavs,
        open, 
        setOpen,
        role, 
        setRole,
        dateRanges, setDateRanges,
        filter, setFilter,
        userRoles, setUserRoles,
        dbfilter, setDbfilter,
        dateVeriation, setDateVeriation,
        password, setPassword,
        dashboard,setDashboard,
        lognum, setLognum,
        detailfilter, setDetailfilter,
        detail, setDetail
       }
    }
    >
    {children}
  </ContextState.Provider>
  )
}







export const useStateContext=()=>useContext(ContextState)

