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
import CreateUser from './CreateUser';
import UserDetail from './UserDetail';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';; 
const User = () => {
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
                    <Tab label="Create user" value="1" icon={<PersonSearchOutlinedIcon/>} iconPosition='start'/>
                    <Tab label="User detail" value="2" icon={<AdminPanelSettingsIcon/>} iconPosition='start'/>  
                </TabList>

            </Box>

            <TabPanel value="1">
                <CreateUser/>
                
                </TabPanel>
            <TabPanel value="2"><UserDetail/></TabPanel>
            
        </TabContext>
    </div>
  )
}

export default User
