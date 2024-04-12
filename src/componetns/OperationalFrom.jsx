
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
  
  function SelectTextFields() {
    return (
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
            id="select-user"
            select
            label="Select user"
            // defaultValue="EUR"
            placeholder='Please select user'
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
    );
  }

const initialVaue={
    userName:"",
    approved:"",
    rejected:"",
    applicant:"",
    date: new Date(),
}


 
 
const OpperationalFromExist = () => {
    const [operationalData,setOperationalData]=useState(initialVaue)
    const [username,setUsername]=useState(initialVaue)

    const handleForm=(e)=>{
        console.log("this is e data of user", e.target.value, e.target.name)
        const values=e.target.value
        const namess=e.target.name
        setOperationalData({ ...operationalData, [namess]:values})
        console.log("the data sets", operationalData)
    }
 
    function handleSubmit(event) {
        event.preventDefault();
        setOperationalData(initialVaue)
        // console.log(userName, approved, payed, date, unpayed) 
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
                            <SelectTextFields/>
                            <TextField
                                type="number"
                                variant='outlined'
                                color='primary'
                                name="approved"
                                label="Total approved"
                                onChange={handleForm}
                                value={operationalData.approved}
                                placeholder='Enter approved customer'
                                fullWidth
                                required
                                sx={{my:1 }}
                            />
                        
                            <TextField
                                type="number"
                                variant='outlined'
                                color='primary'
                                name='rejected'
                                label="Total rejected"
                                onChange={handleForm}
                                value={operationalData.rejected}
                                placeholder='Enter rejected customer'
                                fullWidth
                                required
                                sx={{my:1 }}
                            />
                        </div>

                        <div className='flex flex-col gap-2 w-full'>
                            <TextField
                                type="number"
                                variant='outlined'
                                color='primary'
                                name="applicant"
                                label="Total applied"
                                onChange={handleForm}
                                value={operationalData.applicant}
                                placeholder='Enter applied customer'
                                required
                                fullWidth
                                sx={{my:1 }}
                            />
                            {/* <TextField
                                type="number"
                                variant='outlined'
                                color='primary'
                                name="applicant"
                                label="Payed Amount"
                                placeholder='Enter total payed'
                                onChange={handleForm}
                                value={operationalData.applicant}
                                required
                                fullWidth
                                sx={{my:1 }}
                            /> */}
                            <TextField
                                type="date"
                                variant='outlined'
                                name="date"
                                color='primary'
                                // label="Date of Birth"
                                onChange={handleForm}
                                value={operationalData.date}
                                fullWidth
                                required
                                sx={{my:1 }}
                            />
                        </div>
                    </div>
                    <Button variant="outlined" color="primary" type="submit">Submit</Button>
                    
                </form>
                {/* <small>Already have an account? <Link to="/login">Login Here</Link></small> */}
                
            </div>
            </Paper>
        </React.Fragment>
    )
}
//  #00b0ff
export default OpperationalFromExist;