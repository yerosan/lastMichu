import React from 'react'

import {Box, Tab} from "@mui/material"
import {TabContext, TabList, TabPanel} from "@mui/lab"
import { useState } from 'react'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
import AutoAwesomeMotionIcon from '@mui/icons-material/AutoAwesomeMotion'
import SalseDetail from './SalseDetail'
import IndividualSalse from './IndividualSalse'
import SalesTarget from './SalesTarget'
import Diversity2OutlinedIcon from '@mui/icons-material/Diversity2Outlined';
import DistrictPerUser from './DistrictPerUser'
import PerformanceDisplay from './PerformanceDisplay'
import Districts from './District'
import CrisisAlertIcon from '@mui/icons-material/CrisisAlert'
import TargetDetail from "./TargetDetail"
const SalsePerformance = () => {
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
                    <Tab label="Salse Detail" value="1" icon={<AutoAwesomeMotionIcon/>} iconPosition='start'/>
                    <Tab label="Individual Status" value="2" icon={<EmojiEventsIcon/>} iconPosition='start'/>
                    <Tab label="District" value="3" icon={<Diversity2OutlinedIcon/>} iconPosition='start'/>
                    <Tab label="Salse Detail" value="4" icon={<AutoAwesomeMotionIcon/>} iconPosition='start'/>
                </TabList>
            </Box>
            <TabPanel value="1"><SalseDetail/></TabPanel>
            <TabPanel value="2"><PerformanceDisplay/></TabPanel>
            <TabPanel value="3"><DistrictPerUser/></TabPanel>
            <TabPanel value="4"><TargetDetail/></TabPanel>
        </TabContext>
    </Box>
  )
}

export default SalsePerformance
