import React, {useState, useEffect} from 'react';
import { TextField, Button, Container, Stack, Paper } from '@mui/material';
import { Link } from "react-router-dom"
// import { Approval } from '@mui/icons-material';
// import MenuItem from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Chips from './Chip';

import {Tab, Box} from "@mui/material"
import { TabList, TabContext, TabPanel } from '@mui/lab';
import Checkbox from '@mui/material/Checkbox';
import Alert from "@mui/material/Alert"
import ChipTab from './ChipTab';
import { useStateContext } from '../context/ContextProvider';
import { useSelector, useDispatch } from 'react-redux'
import axios from "axios"
import { Counter } from '../features/counter/counter';
import { useNavigate} from "react-router-dom"
import config from '../config/config';


import { register} from '../features/userCreation/userSlice';
// import { registerUser } from '../features/userCreation/userSlice';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

function Checkboxes() {
  return (
    <div>
      <Checkbox {...label} defaultChecked />
      <Checkbox {...label} />
      <Checkbox {...label} disabled />
      <Checkbox {...label} disabled checked />
    </div>
  );
}


const currencies = [
    {
      value: 'admin',
      label: 'Admin',
    },
    {
      value: 'approvalUser',
      label: 'Approval user',
    },
    {
    value: 'collectionUser',
    label: 'Collection user',
    },
    {
      value: 'salesUser',
      label: 'Sales user',
    },
  ];
  
const initialVaue={
    fullName:"",
    userName:"",
    password:"",
    confirmation:"",
}

const initialRoles={
  collectionAdmin:false,
  operationalAdmin:false,
  salesAdmin:false,
  collectionUser:false,
  operationalUser:false,
  salesUser:false,
  admin:false

}
const CreateUser = () => {
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const userHistory=useSelector(state=>state.user)
    const [collectionData,setCollectionData]=useState(initialVaue)
    const {role, setRole}=useStateContext()
    collectionData.role=role
    const handleForm=(e)=>{
        console.log("this is e data of user", e.target.value, e.target.name)
        const values=e.target.value
        const namess=e.target.name
        setCollectionData({ ...collectionData, [namess]:values})
        console.log("the data sets", collectionData)
    }

    const registerUser=async(data)=>{
      dispatch(register({loading:true, error:"", data:null}))
      console.log("M>>><<<<<<<<<<<User>>>>>>>>>>>>>", userHistory)
      try{
           const userRegister=await axios.post(`${config.apiUrl}/user/register`, data)
           if(userRegister.data.message=="succed"){
              console.log("User",userRegister.data.data)
              const roleData={userName:data.userName}
              let roles=data.role
              console.log("this is a role________", roles)
              Object.keys(roles).map(role=>{
                if(roles[role]){
                  roleData[role]=true
                }else{
                  roleData[role]=false
                }
              })
              console.log("this is role data",roleData)
              const createRole=await axios.post(`${config.apiUrl}/role/create`, roleData)
              if(createRole.data.message=="succed"){
                  console.log('Role', createRole)
                  let userData={user:userRegister.data.data.fullName,userName:roleData.userName, userCredential:createRole.data.data}
                  console.log("user data", userData)
                  alert("User registered")
                  setCollectionData(initialVaue)
                  dispatch(register({loading:false, error:"succeed", data:userData}))
                  console.log("M>>><<<<<<<<<<<", userHistory)
              }

              else{
                  console.log("Unable to create role")
                  alert("User registered without role")
                  dispatch(register({loading:false, error:createRole.data.message, data:null}))
              }
           }else{
              console.log("Unable to create user")
              alert(userRegister.data.message)
              dispatch(register({loading:false, error:userRegister.data.message, data:null}))
           }
      }catch(error){
          console.log(error)
          dispatch(register({loading:false, error:"Some thing went Wrong", data:null}))
      }
  
    }
    // if(userHistory.error=="succeed"){
    //   setTimeout(()=>{
    //     setRole(initialRoles)
    //     setCollectionData(initialVaue)
    //     // navigate('/michu/dashboard')
        
    //   },1000)
    //   console.log("this is dela function")
    // }
    useEffect(() => {
      console.log("Updated User History:", userHistory);
    }, [userHistory]);
 
    function handleSubmit(event) {
        event.preventDefault();
        collectionData.role=role
        console.log("this is a userDATA", collectionData)
        registerUser(collectionData)
        // console.log(userName, contacted, payed, date, unpayed) 
    }
 
    return (
        
        <React.Fragment>
            <Paper >
            <div className='p-6'>
            
                <h2 className=
                    'font-serif font-semibold text-xl p-2'
                >Create User</h2>
                <form onSubmit={handleSubmit} action={<Link to="/login" />}>
                      <div className='flex  gap-4 pb-2'>
                        <div className="flex flex-col gap-3 w-full">
                            <TextField
                                type="text"
                                variant='outlined'
                                color='primary'
                                name="fullName"
                                label="Full Name"
                                onChange={handleForm}
                                value={collectionData.fullName}
                                placeholder='Enter full name'
                                fullWidth
                                required
                                sx={{my:1 }}
                            />
                            <TextField
                                type="text"
                                variant='outlined'
                                color='primary'
                                name="userName"
                                label="User name"
                                onChange={handleForm}
                                value={collectionData.userName}
                                placeholder='Enter user name'
                                fullWidth
                                required
                                sx={{my:1 }}
                            />
                            {/* <TextField
                                  type="number"
                                  variant='outlined'
                                  color='primary'
                                  name="employeeId"
                                  label="Employee Id"
                                  onChange={handleForm}
                                  value={collectionData.employeeId}
                                  placeholder='Enter employee Id'
                                  required
                                  fullWidth
                                  sx={{my:1 }}
                              /> */}
                        
                        </div>

                        <div className='flex flex-col gap-2 w-full'>
                            {/* <SelectTextFields/> */}
                            <TextField
                                type="password"
                                variant='outlined'
                                color='primary'
                                name="password"
                                label="Password"
                                onChange={handleForm}
                                value={collectionData.password}
                                placeholder='Enter password'
                                required
                                fullWidth
                                sx={{my:1 }}
                            />
                            <TextField
                                type="password"
                                variant='outlined'
                                color='primary'
                                name="confirmation"
                                label="Confirmationn"
                                onChange={handleForm}
                                value={collectionData.confirmation}
                                placeholder='Re_eneter your password'
                                required
                                fullWidth
                                sx={{my:1 }}
                            />
                           
                        </div>
                      </div>
                      {/* <ChipTab/> */}
                      <div><Button variant="outlined" color="primary" type="submit">Submit</Button></div>
                    
                </form>
                {/* <small>Already have an account? <Link to="/login">Login Here</Link></small> */}
                
            </div>
            </Paper>
        </React.Fragment>
    )
}
//  #00b0ff
export default CreateUser;