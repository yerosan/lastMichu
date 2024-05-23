import React, { useEffect, useState } from 'react'
// import Collection from './componetns/Collection'
import Salsechart from './Salsechart'
import UniqueCustomerChart from './SalesUniqueCustomer'
import { useStateContext } from '../../context/ContextProvider'
import NumberOfAccountChart from './SalesNumberOf Account'
const DistrictDisplay = () => {
    const {count, setCount}=useStateContext()
    useEffect(()=>{
      const intervalId= setInterval(()=>{
           setCount((prevCount)=> (prevCount % 3)+1)
        },20000)
        return () => clearInterval(intervalId);
    },[])

  return (
    <div className='ml-0 ease-in-out duration-1000 delay-300 w-full h-full'>
        {count==1 && <Salsechart/> }
        {count==2 && <UniqueCustomerChart/> }
        {count==3 && <NumberOfAccountChart/>}
    </div>
  )
}

export default DistrictDisplay