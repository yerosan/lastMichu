import React, { useEffect, useState } from 'react'
import Collection from './componetns/Collection'
import CollectionIndividual from './componetns/CollectionIndividual'
import { useStateContext } from './context/ContextProvider'
const Display = () => {
    const [lognum, setLognum]=useState(true)

    useEffect(()=>{
      const intervalId= setInterval(()=>{
           setLognum((prevLognum)=>!prevLognum)
        },20000)
        return () => clearInterval(intervalId);
    },[])

  return (
    <div className='ml-0 ease-in-out duration-1000 delay-300 grid content-around h-full'>
        {lognum ? <Collection/> :<CollectionIndividual/> }
    </div>
  )
}

export default Display