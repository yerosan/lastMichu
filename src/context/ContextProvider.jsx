import React from 'react'

import { createContext, useContext, useState } from 'react'
import { useEffect } from 'react'

const ContextState=createContext()

// initialValue={

// }

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
        lognum, setLognum
       }
    }
    >
    {children}
  </ContextState.Provider>
  )
}



// import { createContext,useContext,useEffect, useState } from "react";
// import {motion, useCycle} from "framer-motion"
// const StateContext=createContext()
// export const ContextProvider=({children})=>{
//     const [toggling,setToggling]=useState(false)
//     const [switcher, setSwitcher]=useState(false)
//     const [lognum, setLognum]=useState(1)
    // useEffect(()=>{
    //     console.log("this is log from log context", lognum)
    //     setInterval(()=>{
    //        setLognum((prevlognum)=>(prevlognum%4)+1)
    //     },20000)
    // },[])
//     return(
//         <StateContext.Provider
//             value={{toggling, setToggling,
//                     switcher, setSwitcher,
//                     lognum, setLognum,
//                 }}
//         >
//             {children}
//         </StateContext.Provider>
//     )
// }

// export const useStateContext=()=>useContext(StateContext)





export const useStateContext=()=>useContext(ContextState)

