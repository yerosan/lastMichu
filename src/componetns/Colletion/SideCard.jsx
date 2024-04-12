import React from 'react'
import { TextField, Box, Menu } from '@mui/material'
// import AccountMenu from './WeeklyFlow'
import AccountMenu from '../WeeklyFlow'
const SideCard = () => {
  return (
    <div className='w-[20%] border-1 shadow-sm rounded-lg'>
      <div className='flex justify-end'><AccountMenu/></div>
      <div className='flex flex-col flex-1 gap-3 p-2'>
             <div className='bg-slate-50 rounded-lg shadow-s border-r-2 border-b-2 border-[#00adef]
                  flex flex-col items-center gap-1 p-1'>
                <p className='text-slate-600 text-center text-s font-serif font-semibold '>
                      Weekly Collection
                </p>

                <span className='text-slate-800 text-center text-lg font-bold font-arial '>
                  3.5 <span>M</span>

                </span>

              </div>

              <div className='bg-slate-50 rounded-lg shadow-s border-r-2 border-b-2 border-[#00adef] border-spacing-2
                  flex flex-col items-center gap-1 p-1'>
                <p className='text-slate-600 text-center text-s font-serif font-semibold '>
                     Weekly Account from
                </p>

                <span className='text-slate-800 text-center text-lg font-bold font-arial '>
                  2400
                </span>

              </div>

              <div className='bg-slate-50 rounded-lg shadow-s border-r-2 border-b-2 border-[#00adef] border-spacing-2
                  flex flex-col items-center gap-1 p-1'>
                <p className='text-slate-600 text-center text-s font-serif font-semibold '>
                     Average Amount collected
                </p>

                <span className='text-slate-800 text-center text-lg font-bold font-arial '>
                  126<span>K</span>

                </span>

              </div>

              <div className='bg-slate-50 rounded-lg shadow-s border-spacing-2
                  flex flex-col items-center gap-1 p-1 border-r-2 border-b-2 border-solid border-[#00adef]'>
                <p className='text-slate-600 text-center text-s font-serif font-semibold '>
                     Weekly Average Account
                </p>

                <span className='text-slate-800 text-center text-lg font-bold font-arial '>
                  260
                </span>

              </div>
              {/* <OutlinedCard/> */}
      </div>
    </div>
  )
}

export default SideCard
