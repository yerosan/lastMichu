import { useStateContext } from "../context/ContextProvider";
import { useSelector, useDispatch } from "react-redux";
import { TextField, Button, Container, Stack, Paper } from '@mui/material';
import { NavLink } from "react-router-dom";
import Navbar from "./Navbar";
// import config from "../config";

import MenuItem from '@mui/material/MenuItem';
import React, {useState, useEffect} from 'react';
import { Link } from "react-router-dom"
// import { Approval } from '@mui/icons-material';
import axios from "axios"
// import { getAllUsers } from '../features/userCreation/allUserSlice';
// import { addingCollection } from '../features/collection/collectionSlice';
import {Tab, Box} from "@mui/material"
import { TabList, TabContext, TabPanel } from '@mui/lab';
import Alert from '@mui/material/Alert';
import{ LinearProgress} from "@mui/material";

const currentDate=new Date()
const currentMonth=currentDate.getMonth()+1
const currentYear=currentDate.getFullYear()
const currentDay=currentDate.getDate()
const month = `0${currentMonth}`.slice(-2);
const day = `0${currentDay}`.slice(-2);
const today=`${currentYear}-${month}-${day}`;
// const dateRange=[new Date(today), new Date(today)]
import { Tooltip, IconButton, DialogContentText, DialogActions} from '@mui/material';
import {Dialog, DialogTitle, DialogContent} from "@mui/material"
import config from "../config/config";
import { Edit, Password } from '@mui/icons-material';
import DeleteIcon from "@mui/icons-material/Delete"
import FilterListIcon from '@mui/icons-material/FilterList';
import { useNavigate } from "react-router-dom";
const ChangePassword = () => {
  const [delets,setDelets]=useState(false)
  const {dateRanges, setDateRanges}=useStateContext()
  const {filter, setFilter}=useStateContext()
  const userInfo=useSelector(state=>state.logins)
  const [change, setChange]=useState(false)
  const {password, setPassword}=useStateContext()
  const {navs, setNavs}=useStateContext()
  let initialInfo={
    userName:userInfo.data.userName,
    oldPassword:"",
    newPassword:"",
    confirmation:""
  }
  const [passwordData, setPasswordData]=useState(initialInfo)
  const handleForm=(e)=>{
    const values=e.target.value
    const namess=e.target.name
    setPasswordData({ ...passwordData, [namess]:values})
}
  const changePassword=async()=>{
    setChange(true)
    try{
        let changingPassword= await axios.patch(`${config.apiUrl}/user/changePassword`, passwordData)
        if(changingPassword.data.message=="succeed"){
            setChange(false)
            alert("Changing password is succeeded")
            setPassword(initialInfo)
            setNavs(["","dashboard"])
        }else{
            setChange(false)
            alert(changingPassword.data.message)
            setPassword(initialInfo)
            setNavs(["","dashboard"])
        }

    }catch(error){
        setChange(false)
        alert("Some thing went wrong")
        setPassword(initialInfo)
        setNavs(["","dashboard"])
    }
  }
  const handleCancel=()=>{
    setNavs(["","dashboard"])
  }
  function handleSubmit(event) {
    event.preventDefault();
    changePassword()
}

  return (
    <React.Fragment>
        {!change ?
            <div className="p-6 flex flex-col justify-center items-center">
              <Paper >
              <div className='p-8'>
              
                  <h2 className=
                      'font-serif font-semibold text-xl p-2'
                    //   action={<Link to="/michu/dashboard" />}
                  >Dear {passwordData.userName} would you like to change password ?</h2>
                  <form onSubmit={handleSubmit}>
                      <div className='flex  gap-4 pb-2'>
                          <div className="flex flex-col gap-2 w-full">
                            <Box
                              component="form"
                              sx={{
                                '& .MuiTextField-root': { my:1 ,width: '100%' },
                              }}
                              noValidate
                              autoComplete="off"
                            >
                              <div>
                                <TextField
                                  id="userName"
                                  type="password"
                                  label="Old password"
                                  name='oldPassword'
                                  // defaultValue="EUR"
                                  value={passwordData.oldPassword}
                                  placeholder='Enter old password'
                                  onChange={handleForm}
                                  // helperText="Please select user"
                                >
                                </TextField>
                              </div>
                              </Box>

                              <Box
                                component="form"
                                sx={{
                                  '& .MuiTextField-root': { my:1 ,width: '100%' },
                                }}
                                noValidate
                                autoComplete="off"
                              >
                                <div>
                                  <TextField
                                    type="password"
                                    id="callResponce"
                                    label="New password"
                                    name='newPassword'
                                    values={passwordData.newPassword}
                                    // defaultValue="EUR"
                                    placeholder='Enter new password'
                                    onChange={handleForm}
                                  >
                                  </TextField>
                                </div>
                              </Box> 
                          </div>

                          <div className='flex flex-col gap-2 w-full'>
                              <TextField
                                    type="password"
                                    variant='outlined'
                                    color='primary'
                                    name="confirmation"
                                    label="Confirm password"
                                    onChange={handleForm}
                                    value={passwordData.confirmation}
                                    placeholder='Re_enter new password'
                                    fullWidth
                                    required
                                    sx={{my:1 }}
                              />
                          </div>
                      </div>
                    <div className="flex justify-around items-center p-1">
                      <Button variant="outlined" color="primary" type="submit">Submit</Button>
                      <Button variant="outlined" color="primary" onClick={handleCancel}>Cancel</Button>
                    </div>
                      
                  </form>
                  
              </div>

              </Paper> </div>:
                <div className='flex items-center justify-center h-full w-full' >
                <Stack sx={{ width: '100%', color: 'grey.500' }}>
                  <LinearProgress color="secondary" />
                </Stack>
              </div>
            
              
}
        </React.Fragment>
    )
}

export default ChangePassword;
