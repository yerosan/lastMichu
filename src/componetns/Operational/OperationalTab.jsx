import React from 'react'
import { Tab, Box } from '@mui/material'
import { TabList, TabContext, TabPanel } from '@mui/lab'
import { useState } from 'react'
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import AutoAwesomeMotionIcon from '@mui/icons-material/AutoAwesomeMotion';
import Individualcollection from '../Individualcollection';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed'; 
import OpeationalForm from './OperationalForm';
import UserDetail from './UserOperationalDetail';
import UserDataEditting from './UserDataEditting';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
const OperationalTab = () => {
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
                    <Tab label="Add Contacted Customer" value="1" icon={<AutoAwesomeMotionIcon/>} iconPosition='start'/>
                    <Tab label="Registery detail" value="2" icon={<DynamicFeedIcon/>} iconPosition='start'/>  
                    <Tab label="Report" value="3" icon={<AssignmentOutlinedIcon/>} iconPosition='start'/> 
                </TabList>

            </Box>

            <TabPanel value="1"><OpeationalForm/></TabPanel>
            <TabPanel value="2"><UserDataEditting/></TabPanel>
            <TabPanel value="3"><UserDetail/></TabPanel>
            
        </TabContext>
    </div>
  )
}

export default OperationalTab
