import React from 'react'
import { Tab, Box } from '@mui/material'
import { TabList, TabContext, TabPanel } from '@mui/lab'
import { useState } from 'react'
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
// import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import PersonSearchOutlinedIcon from '@mui/icons-material/PersonSearchOutlined';
import RegisterForm from './Form';
import CollectionFrom from './CollectionFrom';
import CollectionFromExist from './ExistForm';
import OpperationalFromExist from './OperationalFrom';

const OperationalTab = () => {
    const [value, setValue]=useState("1")
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
                    <Tab label="Existing Member" value="1" icon={<PersonSearchOutlinedIcon/>} iconPosition='start'/>
                    <Tab label="New Member" value="2" icon={<PersonAddAltIcon/>} iconPosition='start'/>  
                </TabList>

            </Box>

            <TabPanel value="1"><OpperationalFromExist/></TabPanel>
            <TabPanel value="2"><CollectionFrom/></TabPanel>
            
        </TabContext>
    </Box>
  )
}

export default OperationalTab
