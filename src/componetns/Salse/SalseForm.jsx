
import MenuItem from '@mui/material/MenuItem';
import React, {useState, useEffect} from 'react';
import { TextField, Button, Container, Stack, Paper } from '@mui/material';
import { Link } from "react-router-dom"
import { Approval } from '@mui/icons-material';
import axios from "axios"
import {useSelector, useDispatch} from 'react-redux'
import {Tab, Box} from "@mui/material"
import { TabList, TabContext, TabPanel } from '@mui/lab';
import Alert from '@mui/material/Alert';
// import config from '../config/config';
import config from "../../config/config"
import FormHelperText from '@mui/material/FormHelperText';
import LinearProgress from '@mui/material/LinearProgress';
  

const currentDate=new Date()
const month = `0${currentDate.getMonth()+1}`.slice(-2);
const day = `0${currentDate.getDate()}`.slice(-2);
let today=currentDate.getFullYear()+"-"+month+"-"+day

 
const Salseform = () => {
  const userIn=useSelector(state=>state.logins)
  const initialVaue={
              userName:userIn.data.userName,
              fullName:userIn.data.fullName,
              uniqueCustomer:"",
              disbursedAmount:"",
              numberOfAccount:"",
              income:"",
              date:today
          }
    const [salseData,setSalseData]=useState(initialVaue)
    const [formActivater, setFormActivater]=useState(false)
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

        setSalseData((prevState) => ({
          ...prevState,
          [namess]: values,
        }));
    }

    const addSalse=async()=>{
      try{
        let addingSalse= await axios.post(`${config.apiUrl}/salse/addSalse`, salseData)
        if(addingSalse.data.message=="succeed"){
          alert("Data submited")
        }
        else{
         alert(addingSalse.data.message)
        }
      
      }catch(error){
        alert ("Something went wrong")
      }
    }


 
    function handleSubmit(event) {
        event.preventDefault();
        addSalse()
        setSalseData(initialVaue) 
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
                                  value={salseData.fullName}
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
                                      type="number"
                                      id="numberOfAccount"
                                      name='numberOfAccount'
                                      label="Number of account"
                                      value={salseData.numberOfAccount}
                                      placeholder='Enter number of account'
                                      onChange={handleForm}
                                      required
                                    >
                                    </TextField>
                                  </div>
                              </Box>

                              <TextField
                                    type="number"
                                    variant='outlined'
                                    color='primary'
                                    name="uniqueCustomer"
                                    label="Unique customer"
                                    onChange={handleForm}
                                    value={salseData.uniqueCustomer}
                                    placeholder='Enter unique customer'
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
                                    id="disbursedAmount"
                                    label="Disbursed amount"
                                    name='disbursedAmount'
                                    value={salseData.disbursedAmount}
                                    placeholder='Enter disbursed amount'
                                    onChange={handleForm}
                                    required
                                  >
                                  </TextField>
                                </div>
                              </Box>

                              <TextField
                                    type="number"
                                    variant='outlined'
                                    color='primary'
                                    name="income"
                                    label="Income"
                                    onChange={handleForm}
                                    value={salseData.income}
                                    placeholder='Enter call response'
                                    required
                                    fullWidth
                                    sx={{my:1 }}
                                />
                              <TextField
                                  type="date"
                                  // inputProps={{ format: 'yyyy-MM-dd' }}
                                  // defaultValue={salseData.date}
                                  variant='outlined'
                                  name="date"
                                  color='primary'
                                  onChange={handleForm}
                                  // placeholder={salseData.date}
                                  value={salseData.date}
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
export default Salseform;