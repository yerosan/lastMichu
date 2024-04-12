
import MenuItem from '@mui/material/MenuItem';
import React, {useState} from 'react';
import { TextField, Button, Container, Stack, Paper } from '@mui/material';
import { Link } from "react-router-dom"
import { Approval } from '@mui/icons-material';

import {Tab, Box} from "@mui/material"
import { TabList, TabContext, TabPanel } from '@mui/lab';
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
      value: 'fullPaid',
      label: 'Full paid',
    },
    {
      value: 'partialyPaid',
      label: 'Partialy paid',
    }
  ];
  

const currentDate=new Date()
const month = `0${currentDate.getMonth()+1}`.slice(-2);
const day = `0${currentDate.getDate()}`.slice(-2);
let today=currentDate.getFullYear()+"-"+month+"-"+day
const initialVaue={
    userName:"",
    customer:"",
    callResponse:"",
    paidAmount:"",
    paymentStatus:"",
    date:today
}


 
 
const CollectionFromExist = () => {
    const [collectionData,setCollectionData]=useState(initialVaue)
    const [formActivater, setFormActivater]=useState(false)
    const [username,setUsername]=useState(initialVaue)

    const handleForm=(e)=>{
        console.log("this is e data of user", e.target.value, e.target.name)
        const values=e.target.value
        const namess=e.target.name
        if(namess=="callResponse" && values=="paid"){
          setFormActivater(true)
         }
        if(namess=="callResponse" && values !="paid"){
          setFormActivater(false)
        }
        setCollectionData({ ...collectionData, [namess]:values})
        console.log("the data sets", collectionData)
    }
 
    function handleSubmit(event) {
        event.preventDefault();
        setCollectionData(initialVaue)
        // console.log(userName, contacted, payed, date, unpayed) 
    }
 
    return (
        
        <React.Fragment>
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
                                {currencies.map((option) => (
                                  <MenuItem key={option.value} value={option.value}>
                                    {option.label}
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
                                  id="callResponse"
                                  select
                                  label="Call response"
                                  name='callResponse'
                                  values={collectionData.callResponse}
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
                                  name="customer"
                                  label="Customer phone"
                                  onChange={handleForm}
                                  value={collectionData.customer}
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
                                  name="paidAmount"
                                  label="Paid amount"
                                  onChange={handleForm}
                                  value={collectionData.paidAmount}
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
        </React.Fragment>
    )
}
//  #00b0ff
export default CollectionFromExist;