import React, {useState} from 'react';
import { TextField, Button, Container, Stack, Paper } from '@mui/material';
import { Link } from "react-router-dom"
// import { Approval } from '@mui/icons-material';
// import MenuItem from '@mui/material';
import MenuItem from '@mui/material/MenuItem';

import {Tab, Box} from "@mui/material"
import { TabList, TabContext, TabPanel } from '@mui/lab';


const currencies = [
    {
      value: 'collection',
      label: 'Collection',
    },
    {
      value: 'approval',
      label: 'Approval',
    },
    {
      value: 'sales',
      label: 'Sales',
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
            id="position"
            select
            label="Select team"
            // defaultValue="EUR"
            placeholder='Please select team'
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
    firstName:"",
    lastName:"",
    employeeId:"",
    position:"",
}
const CollectionFrom = () => {
    const [collectionData,setCollectionData]=useState(initialVaue)
    const handleForm=(e)=>{
        console.log("this is e data of user", e.target.value, e.target.name)
        const values=e.target.value
        const namess=e.target.name
        setCollectionData({ ...collectionData, [namess]:values})
        console.log("the data sets", collectionData)
    }
 
    function handleSubmit(event) {
        event.preventDefault();
        setCollectionData(initialVaue)
        console.log(userName, contacted, payed, date, unpayed) 
    }
 
    return (
        
        <React.Fragment>
            <Paper >
            <div className='p-6'>
            
                <h2 className=
                    'font-serif font-semibold text-xl p-2'
                >Create member</h2>
                <form onSubmit={handleSubmit} action={<Link to="/login" />}>
                    <div className='flex  gap-4 pb-2'>
                        <div className="flex flex-col gap-3 w-full">
                            <TextField
                                type="text"
                                variant='outlined'
                                color='primary'
                                name="firstName"
                                label="First Name"
                                onChange={handleForm}
                                value={collectionData.firstName}
                                placeholder='Enter first name'
                                fullWidth
                                required
                                sx={{my:1 }}
                            />
                            <TextField
                                type="text"
                                variant='outlined'
                                color='primary'
                                name="lastName"
                                label="Last Name"
                                onChange={handleForm}
                                value={collectionData.lastName}
                                placeholder='Enter last name'
                                fullWidth
                                required
                                sx={{my:1 }}
                            />
                        
                        </div>

                        <div className='flex flex-col gap-2 w-full'>
                            <SelectTextFields/>
                            <TextField
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
export default CollectionFrom;