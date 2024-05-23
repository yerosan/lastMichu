import React from 'react'
import {Box, Tab} from "@mui/material"
import {TabContext, TabList, TabPanel} from "@mui/lab"
import { useState } from 'react'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import AutoAwesomeMotionIcon from '@mui/icons-material/AutoAwesomeMotion';
import OperationalDetail from './OperationDetail';
import IndividualStatus from './IndividualStatus';
const OperaionalPerformance = () => {
    const [value, setValue]=useState("1")
    const handleChange=(event, newValue)=>{
          setValue(newValue)
    } 
  return (
    <Box sx={{bgcolor:"seconday", height:100,}}>
        <TabContext value={value}>
            <Box sx={{borderBottom:1 , borderColor:"divider"}}>
                <TabList 
                 aria-label="Tabs example"
                 onChange={handleChange}
                 textColor='primary'
                 indicatorColor='primary'

                >
                    <Tab label="Collection Detail" value="1" icon={<AutoAwesomeMotionIcon/>} iconPosition='start'/>
                    <Tab label="Individual Status" value="2" icon={<EmojiEventsIcon/>} iconPosition='start'/>
                </TabList>
            </Box>
            <TabPanel value="1"><OperationalDetail/></TabPanel>
            <TabPanel value="2"><IndividualStatus/></TabPanel>
        </TabContext>
    </Box>
  )
}

export default OperaionalPerformance
