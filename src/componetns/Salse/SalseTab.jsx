import React from 'react'
import { Tab, Box } from '@mui/material'
import { TabList, TabContext, TabPanel } from '@mui/lab'
import { useState } from 'react'
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import AutoAwesomeMotionIcon from '@mui/icons-material/AutoAwesomeMotion';
// import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import PersonSearchOutlinedIcon from '@mui/icons-material/PersonSearchOutlined';
import Salseform from './SalseForm';
import SalseRegister from './SalseRegister';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed'; 
import SalesTarget from './SalesTarget';
import CrisisAlertIcon from '@mui/icons-material/CrisisAlert'
import TargetDetail from './TargetDetail';
const SalseTab = () => {
    const [value, setValue]=useState("1")
    const handleTabChange=(event, newValue)=>{
        setValue(newValue)
    }
  return (
    <div>
        <TabContext value={value}>
            <Box sx={{borderBottom:1, borderColor:"divider"}}>
                <TabList
                    aria-label='example tab'
                    onChange={handleTabChange}
                    indicatorColor='primary'
                    textColor='primary'
                >
                    {/*  */}
                    <Tab label="Add targeted data" value="1" icon={<CrisisAlertIcon/>} iconPosition='start'> </Tab>
                    <Tab label="Register detail" value="2" icon={<DynamicFeedIcon/>} iconPosition='start'/> 
                    <Tab label="Add salse data" value="3" icon={<AutoAwesomeMotionIcon/>} iconPosition='start'/> 
                    <Tab label="Target Detail" value="4" icon={<DynamicFeedIcon/>} iconPosition='start'/>
                </TabList>
            </Box>
            <TabPanel value="1"><SalesTarget/></TabPanel>
            <TabPanel value="2"><SalseRegister/></TabPanel>
            <TabPanel value="3"><Salseform/> </TabPanel>
            <TabPanel value="4"><TargetDetail/> </TabPanel>
           
        </TabContext>
    </div>
  )
}

export default SalseTab
