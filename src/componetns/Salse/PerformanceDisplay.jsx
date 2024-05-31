import React, { useEffect, useState } from 'react'
import { useStateContext } from '../../context/ContextProvider'
import IndividualSalse from './IndividualSalse'
import NumberOfAccountChart from './SalesNumberOf Account'
import SalesDisbursementperformance from './SalseDisbursementperformance'
// import {SalesNumberOfAccountperformance }from './SalesNumberOfAccont'
import SalesNumberOfAccountperformance from './SalesNumberOfAccont'
const PerformanceDisplay = () => {
    const {count, setCount}=useStateContext()
    useEffect(()=>{
        const intervalId= setInterval(()=>{
             setCount((prevCount)=> (prevCount % 3 )+1)
          },10000)
          return () => clearInterval(intervalId);
      },[])
  return (
    <div className='ml-0 ease-in-out duration-1000 delay-300 w-full h-full'>
        {count==1 && <IndividualSalse/> }
        {count==2 && <SalesDisbursementperformance/> }
        {count==3 && <SalesNumberOfAccountperformance/>}
    </div>
  )
}

export default PerformanceDisplay