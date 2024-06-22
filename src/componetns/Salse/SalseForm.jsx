
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
import config from "../../config/config"
import FormHelperText from '@mui/material/FormHelperText';
import LinearProgress from '@mui/material/LinearProgress';
import { useStateContext } from '../../context/ContextProvider';

import { districtBranch } from './constant/index';

const currentDate=new Date()
const month = `0${currentDate.getMonth()+1}`.slice(-2);
const day = `0${currentDate.getDate()}`.slice(-2);
let today=currentDate.getFullYear()+"-"+month+"-"+day

const Salseform = () => {
  const userIn=useSelector(state=>state.logins)
  const initialVaue={
              userName:userIn.data.userName,
              fullName:userIn.data.fullName,
              district:"",
              branchName:"",
              uniqueCustomer:"",
              disbursedAmount:"",
              numberOfAccount:"",
              income:"",
              date:today
          }
    const [salseData,setSalseData]=useState(initialVaue)
    const [userDistrict, setUserDistrict]=useState(null)
    const [formActivater, setFormActivater]=useState(false)
    const alluserss=useSelector(state=>state.allUser)
    const addCollection=useSelector(state=>state.collection)
    const [dataAdding, setDataAdding]=useState(false)
    const [errors, setErrors]=useState(false)
    const [error, setError]=useState(false)
    const dispatch=useDispatch()
    let [userDistrictss, setUserDistrictss]= useState([])

    const validatePhoneNumber = (phoneNumber) => {
      return phoneNumber.length === 12 && /^\d+$/.test(phoneNumber); 
    };

    const handleForm=(e)=>{
        const values=e.target.value
        const namess=e.target.name
        if(namess=='district' && values !=""){
          setSalseData((prevState) => ({
            ...prevState,
            "branchName": "",
          }));
          setFormActivater(true)
         }


        setSalseData((prevState) => ({
          ...prevState,
          [namess]: values,
        }));
    }
    const Districtss=[ ]

    const getDistrict= async()=>{
      try{
        let usersDistrict= await axios.get(`${config.apiUrl}/salse/userDistrict/${userIn.data.userId}`)
        const Districtsss=[]
        if(usersDistrict.data.message=="succeed"){
          const data=usersDistrict.data.data
          let datas= Object.keys(usersDistrict.data.data)
          await Promise.all(datas.map(district=>{
            if(data[district]===true){
              Districtsss.push(
                {value:district,
                 label:district
                }
              )
            }
          }))
         setUserDistrict(usersDistrict.data.data)
         setUserDistrictss(Districtsss)
        }else{
          setUserDistrict(usersDistrict.data.message)
          setErrors(true)
        }
      }catch(error){
        console.log("The error", error)
      }
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
        setFormActivater(false)
        setSalseData(initialVaue) 
    }

    useEffect(()=>{
        getDistrict()
    },[])
 
    return (
        <React.Fragment>
          {(userIn.loading || userDistrict == null)  ?  
          <div className='flex items-center justify-center h-full w-full' >
            <Stack sx={{ width: '100%', color: 'grey.500' }}>
              <LinearProgress color="secondary" />
            </Stack>
          </div>:
       <div>
       {(userIn.error !=="" || errors) ? 
        <div> {userIn.error !== "" ? <Alert sx={{mt: 2, mb: 2}} severity="error">{userIn.error}</Alert>:
          <Alert sx={{mt: 2, mb: 2}} severity="error">{userDistrict}</Alert>}
        </div>:
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
                                <TextField
                                  id="district"
                                  select
                                  name='district'
                                  label="District"
                                  value={salseData.district}
                                  placeholder='select district'
                                  onChange={handleForm}
                                >
                                  {userDistrictss.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                      {option.label}
                                    </MenuItem>
                                  ))}
                                </TextField>

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
                                 select
                                  type='text'
                                  id="branch"
                                  label="Select branch"
                                  name='branchName'
                                  value={salseData.branchName}
                                  placeholder='Select branch'
                                  onChange={handleForm}
                                  required
                                >
                                    {districtBranch[salseData.district].map((option) => (
                                      <MenuItem key={option} value={option}>
                                        {option}
                                      </MenuItem>
                                    ))}
                                </TextField>
                              </div>
                              </Box>
                             }

                    
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
                                  variant='outlined'
                                  name="date"
                                  color='primary'
                                  onChange={handleForm}
                                  value={salseData.date}
                                  fullWidth
                                  required
                                  sx={{my:1 }}
                              />
                              
                              
                              <div className='flex justify-end my-2'>
                                <Button variant="outlined" color="primary" type="submit">Submit</Button>
                              </div>
                            
                          </div>
                      </div>

                      
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

