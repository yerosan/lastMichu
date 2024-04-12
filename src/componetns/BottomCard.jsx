import React from 'react'
import ActionAreaCard from './CardComponent'

const BottomCard = () => {
  return (
    <div className='flex mt-3 justify-around rounded-lg p-4'>
            <div className='bg-slate-50 rounded-lg shadow-md outline outline-2 outline-offset-1 outline-[#00adef]
                flex flex-col items-center gap-3 p-4 '>
              <p className='text-slate-600 text-center text-lg font-serif font-semibold '>
                    Yestarday Disbursed
              </p>

              <span className='text-slate-800 text-center text-xl font-bold font-arial'>
                1.5 <span>M</span>

              </span>

            </div>

            <ActionAreaCard/>

            <div className='bg-slate-50 rounded-lg shadow-md border-spacing-2 border-[#00adef]
                flex flex-col items-center gap-3 p-4 outline outline-2 outline-offset-1 outline-[#00adef]'>
              <p className='text-slate-600 text-center text-lg font-serif font-semibold '>
                    Yestarday Account
              </p>

              <span className='text-slate-800 text-center text-xl font-bold font-arial'>
                240
              </span>

            </div>
          </div>
  )
}

export default BottomCard
