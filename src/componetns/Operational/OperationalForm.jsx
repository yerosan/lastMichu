
import MenuItem from '@mui/material/MenuItem';
import React, {useState, useEffect} from 'react';
import { TextField, Button, Container, Stack, Paper } from '@mui/material';
import { Link } from "react-router-dom"
import { Approval } from '@mui/icons-material';
import axios from "axios"
// import { getAllUsers } from '../features/userCreation/allUserSlice';
// import { addingCollection } from '../features/collection/collectionSlice';
import {useSelector, useDispatch} from 'react-redux'
import {Tab, Box} from "@mui/material"
import { TabList, TabContext, TabPanel } from '@mui/lab';
import Alert from '@mui/material/Alert';
import config from '../../config/config';
import FormHelperText from '@mui/material/FormHelperText';
import LinearProgress from '@mui/material/LinearProgress';
  const callResponce = [
    {
      value: 'promise',
      label: 'promise',
    },
    {
      value: 'paid',
      label: 'Paid',
    },
    {
      value: 'notAnswer',
      label: 'Not answer',
    },
    {
      value: 'refusedToPay',
      label: 'Refused to pay',
    },
    {
      value:"outOfService",
      label:"Out of service"
    },
    {
      value:"hangUP",
      label:"Hung up"
    },
    {
      value:"lineBusy",
      label:"Line busy"
    },
    {
      value:"incorrectNumber",
      label:"Incorrect number"
    },
    {
      value:"switchOff",
      label:"Switch off"
    },
    {
      value:"callForWarding",
      label:"Call forwarding"
    },
    {
      value:"notWorking",
      label:"Not working"
    }
  ];

  const approvalStatus = [
    {
      value: 'approved',
      label: 'Approved',
    },
    {
      value: 'rejected',
      label: 'Rejected',
    },
    {
        value: 'blocked',
        label: 'Blocked',
      }
  ];
  

const currentDate=new Date()
const month = `0${currentDate.getMonth()+1}`.slice(-2);
const day = `0${currentDate.getDate()}`.slice(-2);
let today=currentDate.getFullYear()+"-"+month+"-"+day

 
const OpeationalForm = () => {
  const userIn=useSelector(state=>state.logins)
  const initialVaue={
              userId:userIn.data.userId,
              userName:userIn.data.userName,
              officerName:userIn.data.fullName,
              customerName:"",
              customerPhone:"",
              applicationStatus:"",
              approvedAmount:0,
              RejectionReason:"Verifed",
              approvalDate:today
          }
    const [operationalData,setOperationalData]=useState(initialVaue)
    const [formActivater, setFormActivater]=useState(false)
    const [username,setUsername]=useState(initialVaue)
    const alluserss=useSelector(state=>state.allUser)
    const addCollection=useSelector(state=>state.collection)
    const [dataAdding, setDataAdding]=useState(false)
    const [error, setError]=useState(false)
    const dispatch=useDispatch()

    const validatePhoneNumber = (phoneNumber) => {
      return phoneNumber.length === 12 && /^\d+$/.test(phoneNumber); // Checks if the phone number is exactly 12 digits and contains only numeric characters
    };

    const handleForm=(e)=>{
        const values=e.target.value
        const namess=e.target.name
        if(namess=="applicationStatus" && values=="approved"){
          setFormActivater(false)
         }
        if(namess=="applicationStatus" && values !=="approved"){
          setFormActivater(true)
        }

        setOperationalData((prevState) => ({
          ...prevState,
          [namess]: values,
        }));
        if (namess === 'customerPhone') {
          setError(!validatePhoneNumber(values)); // Set error to true if the phone number is invalid
        }
    }

    const addColleciton=async()=>{
      try{
        let addingCollections= await axios.post(`${config.apiUrl}/operational/approvalData`, operationalData)
        if(addingCollections.data.message=="succed"){
          alert("Data submited")
        }
        else{
         alert(addingCollections.data.message)
        }
      
      }catch(error){
        alert ("Something went wrong")
      }
    }

 
    function handleSubmit(event) {
        event.preventDefault();
        if(error){
          alert("Incorrect phone number")
        }else{
           addColleciton()
           setOperationalData(initialVaue)
        }
        
    }
 
    return (
        <React.Fragment>
          {userIn.loading ?  
          <div className='flex items-center justify-center h-full w-full' >
          <Stack sx={{ width: '100%', color: 'grey.500' }}>
            <LinearProgress color="secondary" />
          </Stack>
        </div>:
       <div>
       {userIn.error !==""? <Alert sx={{mt: 2, mb: 2}} severity="error">{userIn.error}</Alert>:
       <div>
        {userIn.data &&
              <Paper >
              <div className='p-6'>
              
                  <h2 className=
                      'font-serif font-semibold text-xl p-2'
                  >Enter Data</h2>
                  <form onSubmit={handleSubmit} action={<Link to="/login" />}>
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
                                  id="fullName"
                                  // select
                                  label="Full Name"
                                  name='fullName'
                                  value={userIn.data.fullName}
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
                                    id="customerName"
                                    // select
                                    label="Customer Name"
                                    name='customerName'
                                    value={operationalData.customerName}
                                    placeholder='Enter customer name'
                                    onChange={handleForm}
                                  >
                                  </TextField>
                                </div>
                              </Box>

                              <TextField
                                    type="number"
                                    variant='outlined'
                                    color='primary'
                                    name="customerPhone"
                                    label="Customer phone"
                                    onChange={handleForm}
                                    value={operationalData.customerPhone}
                                    placeholder='Enter customer phone'
                                    fullWidth
                                    required
                                    error={error}
                                    sx={{my:1 }}
                              >
                              </TextField>

                          </div>

                          <div className='flex flex-col gap-2 w-full'>
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
                                    id="applicationStatus"
                                    select
                                    label="Application status"
                                    name='applicationStatus'
                                    value={operationalData.applicationStatus}
                                    placeholder='select application status'
                                    onChange={handleForm}
                                  >
                                    {approvalStatus.map((option) => (
                                      <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                      </MenuItem>
                                    ))}
                                  </TextField>
                                </div>
                              </Box> 
                              {(!formActivater) && 
                                <TextField
                                    type="number"
                                    variant='outlined'
                                    color='primary'
                                    name="approvedAmount"
                                    label="Approved Amount"
                                    onChange={handleForm}
                                    value={operationalData.approvedAmount}
                                    placeholder='Enter approved amount'
                                    required
                                    fullWidth
                                    sx={{my:1 }}
                                />
                              }
                              

                              {formActivater &&
                                <TextField
                                    type="text"
                                    variant='outlined'
                                    color='primary'
                                    name="RejectionReason"
                                    label="Rejection reason"
                                    onChange={handleForm}
                                    value={operationalData.RejectionReason}
                                    placeholder='Enter rejection reason'
                                    required
                                    fullWidth
                                    sx={{my:1 }}
                                />
                              }
                              <TextField
                                  type="date"
                                  // inputProps={{ format: 'yyyy-MM-dd' }}
                                  // defaultValue={operationalData.approvalDate}
                                  variant='outlined'
                                  name="approvalDate"
                                  color='primary'
                                  // onChange={handleForm}
                                  placeholder={operationalData.approvalDate}
                                  value={operationalData.approvalDate}
                                  fullWidth
                                  required
                                  sx={{my:1 }}
                              />
                          </div>
                      </div>
                      <Button variant="outlined" color="primary" type="submit">Submit</Button>
                      
                  </form>
                  
              </div>

              </Paper>

            }
              </div> 
              
              }
            </div>
          }
        </React.Fragment>
    )
}
export default OpeationalForm;