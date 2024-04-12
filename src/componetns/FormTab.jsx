import React from 'react'
import { Tab, Box } from '@mui/material'
import { TabList, TabContext, TabPanel } from '@mui/lab'
import { useState } from 'react'
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
// import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import PersonSearchOutlinedIcon from '@mui/icons-material/PersonSearchOutlined';
import RegisterForm from './Form';

const FormTab = () => {
    const [value, setValue]=useState("3")
    const handleTabChange=(event, newValue)=>{
        setValue(newValue)
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
                    <Tab label="New user" value="3" icon={<PersonAddAltIcon/>} iconPosition='start'/>
                    <Tab label="Existing user" value="4" icon={<PersonSearchOutlinedIcon/>} iconPosition='start'/>  
                </TabList>

            </Box>

            <TabPanel value="3"><RegisterForm/></TabPanel>
            <TabPanel value="4"><RegisterForm/></TabPanel>
            
        </TabContext>
    </Box>
  )
}

export default FormTab
