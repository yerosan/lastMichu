import React from 'react'
import {Link, NavLink} from "react-router-dom"
import { useStateContext } from '../context/ContextProvider'
import {FiX} from "react-icons/fi"
import Menus from './Menus'
import { michu } from '../assets'

const Sidebar = () => {

    const {menu, setMenu}=useStateContext()
   //  const handleMenu=()=>{
   //      setMenu(!menu)
   //  }
  return (
    <div className='flex flex-col gap-1 w-full h-full'>
      {menu && (
         <>
         <nav><NavLink to="michu"></NavLink></nav>
         
            <div className='flex bg-slate-200 fixed z-10  justify-between items-start w-52 p-2'>
               <img src={michu} className='w-18 h-12'/>
               {/* <h3 className='text-2xl font-semibold font-mono'>Logo</h3> */}
               <button 
                  onClick={()=>setMenu((preMenu)=>!preMenu)}
                  className='cursor-pointer text-2xl'
               > 
                  <FiX/>
               </button>  
            </div>
            <div className='mt-14'>
               <Menus/>
            </div>
         </>
      )}
        
    </div>
  )
}

export default Sidebar

