import React, { useEffect, useState } from 'react'
import SalseDashboard from './componetns/Salse/Salse'
import IndividualSalse from './componetns/Salse/IndividualSalse'
import PerformanceDisplay from './componetns/Salse/PerformanceDisplay'
const SalesDisplay = () => {
    const [lognum, setLognum]=useState(true)

    useEffect(()=>{
      const intervalId= setInterval(()=>{
           setLognum((prevLognum)=>!prevLognum)
        },30000)
        return () => clearInterval(intervalId);
    },[])

  return (
    <div className='ml-0 ease-in-out duration-1000 delay-300 grid content-around h-full'>
        {lognum ? <SalseDashboard/> :<PerformanceDisplay/> }
        {/* {lognum===2 && <CollectionIndividual/>} */}
    </div>
  )
}

export default SalesDisplay