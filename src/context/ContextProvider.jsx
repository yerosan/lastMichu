import React from 'react'

import { createContext, useContext, useState } from 'react'

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
        dateVeriation, setDateVeriation

       }
    }
    >
    {children}
  </ContextState.Provider>
  )
}


export const useStateContext=()=>useContext(ContextState)

