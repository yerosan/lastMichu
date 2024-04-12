import React from 'react'

import { FiChevronDown } from 'react-icons/fi'

const TopHeader = () => {
  return (
    <div className='flex justify-between px-3 items-baseline py-1'>
            <h3 className='text-2xl font-serif font-bold text-slate-700'>Dashboard</h3>
            <div className='flex gap-1 justify-center items-baseline'>
                <p className='text-xl font-serif font-semibold p-1 text-slate-500'>Filter</p>
                <span className='text-xl font-serif font-semibold text-slate-500'> <FiChevronDown/></span>
            </div>
        </div>
  )
}

export default TopHeader
