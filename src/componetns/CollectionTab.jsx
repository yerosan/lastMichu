import React from 'react'
import { Tab, Box } from '@mui/material'
import { TabList, TabContext, TabPanel } from '@mui/lab'
import { useState } from 'react'
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import AutoAwesomeMotionIcon from '@mui/icons-material/AutoAwesomeMotion';
// import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import PersonSearchOutlinedIcon from '@mui/icons-material/PersonSearchOutlined';
import RegisterForm from './Form';
import CollectionFrom from './CollectionFrom';
import CollectionFromExist from './ExistForm';
import CollectionDetail from './CollectionDetail';
import Individualcollection from './Individualcollection';
// import DynamicFeedIcon from '@mui-ui/icons-material/DynamicFeed';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed'; 
const CollectionTab = () => {
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
                    <Tab label="Register detail" value="2" icon={<DynamicFeedIcon/>} iconPosition='start'/>  
                </TabList>

            </Box>

            <TabPanel value="1">
                <CollectionFromExist/>
            </TabPanel>
            <TabPanel value="2"><Individualcollection/></TabPanel>
            
        </TabContext>
    </div>
  )
}

export default CollectionTab
