import React from 'react'
import HeadCard from './HeadCard'
import Area from './Area'
import BottomCard from './BottomCard'
import SideCard from './SideCard'
const Disbursement = () => {
  return (
    <div>
        <div className=''>
          <HeadCard/>
        </div>
        <div className="flex my-4 gap-2">
          <div className='w-[80%] flex flex-col justify-between'>
            <div className='h-[100%] flex justify-center'>
               <Area/>
            </div>
            
            <BottomCard/>
          </div>
          <SideCard/>
        </div>
      
    </div>
  )
}

export default Disbursement
