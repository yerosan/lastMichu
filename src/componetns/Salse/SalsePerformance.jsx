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

                >   <Tab label="Sales Target" value="1" icon={<CrisisAlertIcon/>} iconPosition='start'/>
                    <Tab label="Salse Detail" value="2" icon={<AutoAwesomeMotionIcon/>} iconPosition='start'/>
                    <Tab label="Individual Status" value="3" icon={<EmojiEventsIcon/>} iconPosition='start'/>
                    <Tab label="District" value="4" icon={<Diversity2OutlinedIcon/>} iconPosition='start'/>
                </TabList>
            </Box>
            <TabPanel value="1"><SalesTarget/></TabPanel>
            <TabPanel value="2"><SalseDetail/></TabPanel>
            <TabPanel value="3"><PerformanceDisplay/></TabPanel>
            <TabPanel value="4"><DistrictPerUser/></TabPanel>
        </TabContext>
    </Box>
  )
}

export default SalsePerformance
