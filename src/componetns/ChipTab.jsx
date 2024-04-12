import React from 'react'
import { Tab, Box } from '@mui/material'
import { TabList, TabContext, TabPanel } from '@mui/lab'
import { useState } from 'react'
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
// import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import PersonSearchOutlinedIcon from '@mui/icons-material/PersonSearchOutlined';
import RuleIcon from '@mui/icons-material/Rule';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import RegisterForm from './Form';
import Chips from './Chip';


const ChipTab= () => {
    const [value, setValue]=useState("0")
    const handleTabChange=(event, newValue)=>{
        if(value=="0"){
            setValue(newValue)
        }else{
            setValue("0")
        }
        console.log("this is newvalue", newValue, event)
    }
  return (
    <Box>
        <TabContext value={value}>
            <Box sx={{borderBottom:1, borderColor:"divider"}}>
                <TabList
                    aria-label='example tab'
                    onChange={handleTabChange}
                    indicatorColor='primary'
                    textColor='primary'
                >
                    <Tab label="Role" value="1" icon={<RuleIcon/>} iconPosition='start'/>  
                    <Tab value="0" icon={<ArrowDropUpIcon/>} iconPosition='start'/>
                </TabList>

            </Box>

            <TabPanel value="1"><Chips/></TabPanel>
            <TabPanel value="0"></TabPanel>
            
        </TabContext>
    </Box>
  )
}

export default ChipTab
