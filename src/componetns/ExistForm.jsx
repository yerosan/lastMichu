
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
const currencies = [
    {
      value: 'Yerosan Tadesse',
      label: 'Yerosan',
    },
    {
      value: 'Shewanek Zewudu',
      label: 'Shewank',
    },
    {
      value: 'Jems Jems',
      label: 'jems',
    },
    {
      value: 'Sane Yero',
      label: 'sane',
    },
  ];

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
      value:"unreachable",
      label:"Not reached"
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
const initialVaue={
    userName:"",
    customerPhone:"",
    callResponce:"",
    payedAmount:"",
    paymentStatus:"",
    date:today
}


 
 
const CollectionFromExist = () => {
    const [collectionData,setCollectionData]=useState(initialVaue)
    const [formActivater, setFormActivater]=useState(false)
    const [username,setUsername]=useState(initialVaue)
    const alluserss=useSelector(state=>state.allUser)
    const addCollection=useSelector(state=>state.collection)
    const [dataAdding, setDataAdding]=useState(false)
    const dispatch=useDispatch()

    const handleForm=(e)=>{
        console.log("this is e data of user", e.target.value, e.target.name)
        const values=e.target.value
        const namess=e.target.name
        if(namess=="callResponce" && values=="paid"){
          setFormActivater(true)
         }
        if(namess=="callResponce" && values !="paid"){
          setFormActivater(false)
        }
        setCollectionData({ ...collectionData, [namess]:values})
        console.log("the data sets", collectionData)
    }
    const fetchUsers=async()=>{
      dispatch(getAllUsers({loading:true,error:"", data:null }))
      try{
        let users=await axios.get("http://localhost:3000/user/allUser")
        if(users.data.message=="succeed"){
          let userData=users.data.data
          const allUsers=userData.map((user)=>({
            "userName":user.userName,
             "fullName":user.fullName
          }))
          console.log("==============alluser", allUsers)
          dispatch(getAllUsers({loading:false, error:'',data:allUsers}))
        }else{
          dispatch(getAllUsers({loading:false, error:users.data.message}))
        }
      }catch(error){
        dispatch(getAllUsers({loading:false, error:"Something went wrong"}))
        console.log("The error", error)
      }
    }

    const addColleciton=async()=>{
      // dispatch(addingCollection({loading:true, data:null, error:""}))
      try{
        let addingCollections= await axios.post("http://localhost:3000/collection/add", collectionData)
        if(addingCollections.data.message=="succed"){
          // dispatch(addingCollection({loading:false, error:"" , data:addingCollections.data.data}))
          alert("Data submited")
        }
        else{
         alert(addingCollections.data.message)
        }
      }catch(error){
        alert ("Something went wrong")
        console.log("An error", error)
      }
    }
    useEffect(()=>{
      console.log("Loading All users%%%%%%%%%%%%%",alluserss)
      fetchUsers()
      console.log("this is the users`````````````````", alluserss.data)
    },[])

    // useEffect(()=>{
    //   console.log("Loading All users%%%%%%%%%%%%%",alluserss)
    //   fetchUsers()
    //   console.log("this is the users`````````````````", alluserss.data)
    // },[alluserss])
 
    function handleSubmit(event) {
        event.preventDefault();
        addColleciton()
        setCollectionData(initialVaue)
        // console.log(userName, contacted, payed, date, unpayed) 
        console.log("This is the collection DATA", collectionData,addCollection)
    }
 
    return (
        <React.Fragment>
          {alluserss.loading ?  <p 
      className='flext items-center justify-center
       text-center text-semibold text-[#00abef] '>Loading .........</p>:
       <div>
       {alluserss.error !=="" ? <Alert sx={{mt: 2, mb: 2}} severity="error">{alluserss.error}</Alert>:
       <div>
        {alluserss.data &&
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
                                  id="userName"
                                  select
                                  label="Select user"
                                  name='userName'
                                  // defaultValue="EUR"
                                  value={collectionData.userName}
                                  placeholder='Please select user'
                                  onChange={handleForm}
                                  // helperText="Please select user"
                                >
                                  {alluserss.data.map((option) => (
                                    
                                    <MenuItem key={option.userName} value={option.userName}>
                                      {option.fullName}
                                    </MenuItem>
                                  ))}
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
                                    id="callResponce"
                                    select
                                    label="Call responce"
                                    name='callResponce'
                                    values={collectionData.callResponce}
                                    // defaultValue="EUR"
                                    placeholder='Select call response'
                                    onChange={handleForm}
                                    // helperText="Please select user"
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
                                    sx={{my:1 }}
                              />
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
//  #00b0ff
export default CollectionFromExist;