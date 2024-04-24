import React from 'react'

import { useStateContext } from '../context/ContextProvider'
// import { IconName } from "react-icons/fi";
import { FiAlignJustify } from "react-icons/fi";
import { michu, sane, coop } from '../assets';
import { loginUser } from '../features/userCreation/userSlice';
import Profile from './Profile';
import ChangePassword from './ChangePassword';
import { useSelector, useDispatch } from 'react-redux'

const  Navbar =() =>{
    const {menu, setMenu}=useStateContext()
    const dispatch=useDispatch()
    let userOut=useSelector(state=>state.user)
    const {login, setLogin}=useStateContext()
    const handleSingout=(e)=>{
      dispatch(loginUser({loading:false, error:"", data:null}))
      setLogin(true)
    }
  return (
    <div className="fixed  z-10 bg-slate-200 w-full">
     {!menu ?
       <div className='flex justify-between items-center p-1'>
        <div className='flex w-2/5 gap-4 items-start'>
            <button 
                onClick={()=>setMenu((preMenu =>!preMenu))} 
                className='cursor-pointer text-2xl'><FiAlignJustify/> 
            </button>
            <img src={michu} className='w-18 h-12' />
        </div>

        <div className='w-3/5'>
            <div className='flex justify-end gap-4 items-center'> 
                <Profile/>
            </div>
        </div>
       </div>
      :
      <div className='flex justify-end gap-4 pl-4 items-center w-5/6 p-2'>  
         <Profile/>
      </div>
     }
      
    </div>
  )
}

export default Navbar
