
import MenuItem from '@mui/material/MenuItem';
import React, {useState, useEffect} from 'react';
import { TextField, Button, Container, Stack, Paper } from '@mui/material';
import { Link } from "react-router-dom"
import { Approval } from '@mui/icons-material';
import axios from "axios"
import { getAllUsers } from '../features/userCreation/allUserSlice';
import { addingCollection } from '../features/collection/collectionSlice';
import {useSelector, useDispatch} from 'react-redux'
import {Tab, Box} from "@mui/material"
import { TabList, TabContext, TabPanel } from '@mui/lab';
import Alert from '@mui/material/Alert';
import config from '../config/config';
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

  const paymentStatus = [
    {
      value: 'fullyPaid',
      label: 'Fully paid',
    },
    {
      value: 'partiallyPaid',
      label: 'Partially paid',
    }
  ];
  

const currentDate=new Date()
const month = `0${currentDate.getMonth()+1}`.slice(-2);
const day = `0${currentDate.getDate()}`.slice(-2);
let today=currentDate.getFullYear()+"-"+month+"-"+day

 
const CollectionFromExist = () => {
  const userIn=useSelector(state=>state.logins)
  const initialVaue={
              userName:userIn.data.userName,
              customerName:"",
              customerPhone:"",
              customerAccount:"",
              callResponce:"",
              payedAmount:0,
              paymentStatus:"",
              date:today
          }
    const [collectionData,setCollectionData]=useState(initialVaue)
    const [formActivater, setFormActivater]=useState(false)
    const [username,setUsername]=useState(initialVaue)
    const alluserss=useSelector(state=>state.allUser)
    const addCollection=useSelector(state=>state.collection)
    const [dataAdding, setDataAdding]=useState(false)
    const [error, setError]=useState(false)
    const [iderror, setIderror]=useState(false)
    const dispatch=useDispatch()

    const validatePhoneNumber = (phoneNumber) => {
      return phoneNumber.length === 12 && /^\d+$/.test(phoneNumber); // Checks if the phone number is exactly 12 digits and contains only numeric characters
    };

    const validateCustomerAccount = (customerAccount) => {
      return customerAccount.length === 13 && /^\d+$/.test(customerAccount); // Checks if the phone number is exactly 12 digits and contains only numeric characters
    };

    const handleForm=(e)=>{
        const values=e.target.value
        const namess=e.target.name
        if(namess=="callResponce" && values=="paid"){
          setFormActivater(true)
         }
        if(namess=="callResponce" && values !="paid"){
          setFormActivater(false)
        }

        setCollectionData((prevState) => ({
          ...prevState,
          [namess]: values,
        }));
        if (namess === 'customerPhone') {
          setError(!validatePhoneNumber(values)); // Set error to true if the phone number is invalid
        }

        if (namess === 'customerAccount') {
          setIderror(!validateCustomerAccount(values)); // Set error to true if the phone number is invalid
        }
    }

    const addColleciton=async()=>{
      try{
        let addingCollections= await axios.post(`${config.apiUrl}/collection/add`, collectionData)
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
    // useEffect(()=>{
    //   fetchUsers()
    // },[])

 
    function handleSubmit(event) {
        event.preventDefault();
        if(error){
          alert("Incorrect phone number")
        }else{
           addColleciton()
           setCollectionData(initialVaue)
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

                              <TextField
                                    type="text"
                                    variant='outlined'
                                    color='primary'
                                    name="customerName"
                                    label="Customer name"
                                    onChange={handleForm}
                                    value={collectionData.customerName}
                                    placeholder='Enter customer name'
                                    fullWidth
                                    required
                                    sx={{my:1 }}
                              >
                              </TextField> 

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
                                    id="callResponce"
                                    select
                                    label="Call responce"
                                    name='callResponce'
                                    value={collectionData.callResponce}
                                    placeholder='Select call response'
                                    onChange={handleForm}
                                  >
                                    {callResponce.map((option) => (
                                      <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                      </MenuItem>
                                    ))}
                                  </TextField>
                                </div>
                              </Box>
                              {formActivater && 
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
                                      id="paymentStatus"
                                      select
                                      name='paymentStatus'
                                      label="Payment type"
                                      value={collectionData.paymentStatus}
                                      placeholder='select payment status'
                                      onChange={handleForm}
                                    >
                                      {paymentStatus.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                          {option.label}
                                        </MenuItem>
                                      ))}
                                    </TextField>
                                  </div>
                              </Box>
                              } 
                          </div>

                          <div className='flex flex-col gap-2 w-full'>
                              <TextField
                                    type="number"
                                    variant='outlined'
                                    color='primary'
                                    name="customerPhone"
                                    label="Customer phone"
                                    onChange={handleForm}
                                    value={collectionData.customerPhone}
                                    placeholder='Enter customer phone'
                                    fullWidth
                                    required
                                    error={error}
                                    sx={{my:1 }}
                              >
                              </TextField> 
                              <TextField
                                    type="number"
                                    variant='outlined'
                                    color='primary'
                                    name="customerAccount"
                                    label="Customer account"
                                    onChange={handleForm}
                                    value={collectionData.customerAccount}
                                    placeholder='Enter customer account'
                                    fullWidth
                                    required
                                    error={iderror}
                                    sx={{my:1 }}
                              >
                              </TextField> 

                              {formActivater &&
                                <TextField
                                    type="number"
                                    variant='outlined'
                                    color='primary'
                                    name="payedAmount"
                                    label="Paid amount"
                                    onChange={handleForm}
                                    value={collectionData.payedAmount}
                                    placeholder='Enter call response'
                                    required
                                    fullWidth
                                    sx={{my:1 }}
                                />
                              }
                              <TextField
                                  type="date"
                                  // inputProps={{ format: 'yyyy-MM-dd' }}
                                  defaultValue={collectionData.date}
                                  variant='outlined'
                                  name="date"
                                  color='primary'
                                  onChange={handleForm}
                                  placeholder={collectionData.date}
                                  value={collectionData.date}
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
export default CollectionFromExist;