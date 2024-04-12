import React from 'react'

import {Box, Tab} from "@mui/material"
import {TabContext, TabList, TabPanel} from "@mui/lab"
import { useState } from 'react'
import Individual from './Individual'
import ApprovalDetail from "./ApprovalDetail"
import FavoriteIcon from "@mui/icons-material/Favorite"
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import AutoAwesomeMotionIcon from '@mui/icons-material/AutoAwesomeMotion';

const CoreData = () => {
    const [value, setValue]=useState("1")
    const handleChange=(event, newValue)=>{
          console.log("this is an event",newValue)
          setValue(newValue)
    } 
  return (
    <Box>
        <TabContext value={value}>
            <Box sx={{borderBottom:1 , borderColor:"divider"}}>
                <TabList 
                 aria-label="Tabs example"
                 onChange={handleChange}
                 textColor='primary'
                 indicatorColor='primary'

                >
                    <Tab label="Approval Detail" value="1" icon={<AutoAwesomeMotionIcon/>} iconPosition='start'/>
                    <Tab label="Individual Status" value="2" icon={<EmojiEventsIcon/>} iconPosition='start'/>
                </TabList>
            </Box>
            <TabPanel value="1"><ApprovalDetail/></TabPanel>
            <TabPanel value="2"><Individual/></TabPanel>
        </TabContext>
    </Box>
  )
}

export default CoreData
