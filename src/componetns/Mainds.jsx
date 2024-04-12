import React from 'react'
import { FiChevronDown } from "react-icons/fi";
import Area from "./Area"
import TopHeader from './TopHeader';
import HeadCard from './HeadCard';
import SideCard from './SideCard';
import BottomCard from './BottomCard';
import { BrowserRouter, Route, Router } from 'react-router-dom';
import Disbursement from './Disbursement';
import StickyHeadTable from './ScrolableTable';

import BasicTable from './Individual';
const Mainds = ()=> {
  return (
    <div className='mx-2 h-full mt-14'>
          <TopHeader/>
          <Disbursement/>
            {/* <Disbursement/> */}
            <div className='flex flex-col gap-4 items-center justify-center p-4'>
                <BasicTable/>
                <StickyHeadTable/>
            </div>
      </div>
  )
}

export default Mainds
