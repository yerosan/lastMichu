import React, { useEffect, useState } from 'react'
import Collection from './componetns/Collection'
import CollectionIndividual from './componetns/CollectionIndividual'
import { useStateContext } from './context/ContextProvider'
const array=["Sacco","Michu","Furtu"]
const Display = () => {
    const {toggling, setToggling}=useStateContext()
    const [product, setProduct]=useState(1)
    const {lognum, setLognum}=useStateContext()
    useEffect(()=>{
        console.log("the count __________________$$$$$$$$$$_______", product)
    }, [lognum])

    useEffect(()=>{
        setInterval(()=>{
           setLognum((prevlognum)=>(prevlognum%2)+1)
        },120000)
    },[])

  return (
    <div className='ml-0 ease-in-out duration-1000 delay-300 grid content-around h-full'>
        {lognum===1 && <Collection/>}
        {lognum===2 && <CollectionIndividual/>}
    </div>
  )
}

export default Display