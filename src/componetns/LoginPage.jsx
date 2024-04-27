import React from 'react';
import { michu } from '../assets';
import LogIn from './Login';
const LoginPage = () => {
  return (
    <div className='relative flex flex-col justify-center items-center w-full h-screen bg-slate-50'>
          <div className='flex gap-4 items-center p-3 mb-2'>
               <img src={michu} className='w-18 h-12' /> 
               <h2 className ="font-serif text-slate-700 font-semibold text-2xl">Loan Status</h2>
          </div>
        <LogIn/>
    </div>
  );
}

export default LoginPage;
