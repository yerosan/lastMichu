import React, { useEffect, useState } from 'react'
import IndividualStatus from './componetns/Operational/IndividualStatus'
import Operational from './componetns/Operational/Operational'
const OperationalDisplay = () => {
    const [lognum, setLognum]=useState(true)

    useEffect(()=>{
      const intervalId= setInterval(()=>{
           setLognum((prevLognum)=>!prevLognum)
        },20000)
        return () => clearInterval(intervalId);
    },[])

  return (
    <div className='ml-0 ease-in-out duration-1000 delay-300 grid content-around h-full'>
        {lognum ? <Operational/> :<IndividualStatus/> }
    </div>
  )
}

export default OperationalDisplay