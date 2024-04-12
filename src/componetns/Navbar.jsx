import React from 'react'

import { useStateContext } from '../context/ContextProvider'
// import { IconName } from "react-icons/fi";
import { FiAlignJustify } from "react-icons/fi";
import { michu, sane, coop } from '../assets';
import { loginUser } from '../features/userCreation/userSlice';

import { useSelector, useDispatch } from 'react-redux'

const  Navbar =() =>{
    const {menu, setMenu}=useStateContext()
    const dispatch=useDispatch()
    let userOut=useSelector(state=>state.user)
    const {login, setLogin}=useStateContext()
    const handleSingout=(e)=>{
      dispatch(loginUser({loading:false, error:"", data:null}))
      console.log("this is userLogout", userOut)
      setLogin(true)
    }
  return (
    <div className="fixed  z-10 bg-slate-400 w-full">
     {!menu ?
       <div className='flex justify-between items-center p-1'>
        <div className='flex w-2/5 gap-4 items-start'>
            <button 
                onClick={()=>setMenu((preMenu =>!preMenu))} 
                className='cursor-pointer text-2xl'><FiAlignJustify/> 
            </button>
            <img src={michu} className='w-18 h-12' />
            {/* <h3 className="text-black font-mono text-2xl font-sem">Logo</h3> */}
        </div>

        <div className='w-3/5'>
            <div className='flex justify-end gap-4 items-center'> 
                <img src={sane} className="w-8, h-8 rounded-full"/>  
                {/* <h3 className="text-black font-serif text-xl font-sem">Profile</h3> */}
                <button type='button' onClick={handleSingout} 
                  className="text-black font-serif text-lg font-semibold rounded-lg p-1 
                      cursor-pointer hover:bg-[#e38524]"
                  >Logout
                </button>
            </div>
        </div>
       </div>
      :
      <div className='flex justify-end gap-4 pl-4 items-center w-5/6 p-2'>  
        <img src={sane} className="w-8, h-8 rounded-full"/>  
                {/* <h3 className="text-black font-serif text-xl font-sem">Profile</h3> */}
                <button type='button' onClick={handleSingout} 
                  className="text-black font-serif text-lg font-semibold rounded-lg p-1 
                      cursor-pointer hover:bg-[#e38524]"
                  >Logout
                </button>
      </div>
     }
      
    </div>
  )
}

export default Navbar
