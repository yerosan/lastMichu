import React, {useState} from 'react';
import { TextField, Button, Container, Stack, Paper } from '@mui/material';
import { Link } from "react-router-dom"
import { Approval } from '@mui/icons-material';

import {Tab, Box} from "@mui/material"
import { TabList, TabContext, TabPanel } from '@mui/lab';



 
 
const RegisterForm = () => {
    const [userName, setUserName] = useState('')
    const [approved, setApproved] = useState('')
    const [rejection, setRejection] = useState('')
    const [date, setDate] = useState('')
    const [applicante, setApplicante] = useState('')
 
    function handleSubmit(event) {
        event.preventDefault();
        console.log(userName, approved, rejection, date, applicante) 
    }
 
    return (
        
        <React.Fragment>
            <Paper >
            <div className='p-6'>
            
                <h2 className=
                    'font-serif font-semibold text-xl p-2'
                >Enter Data</h2>
                <form onSubmit={handleSubmit} action={<Link to="/login" />}>
                    <div className='flex  gap-4'>
                        <div className="flex gap-3 flex-col w-full">
                            <TextField
                                type="text"
                                variant='outlined'
                                color='primary'
                                label="User name"
                                onChange={e => setFirstName(e.target.value)}
                                value={userName}
                                fullWidth
                                required
                            />
                            <TextField
                                type="text"
                                variant='outlined'
                                color='primary'
                                label="Approved amount"
                                onChange={e => setLastName(e.target.value)}
                                value={approved}
                                fullWidth
                                required
                            />
                        
                            <TextField
                                type="text"
                                variant='outlined'
                                color='primary'
                                label="Rejected amount"
                                onChange={e => setEmail(e.target.value)}
                                value={rejection}
                                fullWidth
                                required
                                sx={{mb: 4}}
                            />
                        </div>

                        <div className='flex flex-col gap-3 w-full'>
                            <TextField
                                type="tect"
                                variant='outlined'
                                color='primary'
                                label="Total applicante"
                                onChange={e => setPassword(e.target.value)}
                                value={applicante}
                                required
                                fullWidth
                                sx={{mb: 4}}
                            />
                            <TextField
                                type="date"
                                variant='outlined'
                                color='primary'
                                // label="Date of Birth"
                                onChange={e => setDateOfBirth(e.target.value)}
                                value={date}
                                fullWidth
                                required
                                sx={{mb: 4}}
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
export default RegisterForm;