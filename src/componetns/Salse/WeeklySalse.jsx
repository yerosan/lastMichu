import React from 'react'
import { TextField, Box, Menu } from '@mui/material'
// import AccountMenu from './WeeklyFlow'
import AccountMenu from '../WeeklyFlow'
import { useSelector } from 'react-redux'

// import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import DateRange from './DateRange';
// import DashboardFilter from './DashboardFilter';
import DashboardFilter from '../Colletion/DashboardFilter';

const WeeklySalse = () => {
  const salses=useSelector(state=>state.salse)
  const weeklySalses=salses.data.weeklySalse
  return (
    <div className='w-[20%] '>
      {salses.data &&
    <div className='rounded-lg h-full flex flex-col flex-auto'>
      <div className='flex justify-end'><DashboardFilter/></div>
      <h2 className='font-bold text-xl font-arialNarrow p-1 text-black shadow-sm text-center mx-1'> Weekly Status</h2>
      <div className='flex flex-col flex-1 h-full justify-between p-2'>
          
            <Card sx={{ maxWidth: 300, backgroundColor:"#F1F5F9", border:2, 
             borderBottomRightRadius:20, borderTopLeftRadius:20,boxShadow:1, borderColor:"#f8fafc",
             WebkitBoxShadow:4, MozBoxSizing:10}}>
              <CardActionArea>
                <CardContent>
                <div className='flex justify-center gap-2 items-center'>
                  <Typography variant="h4" color="text.primary" textAlign="center" fontWeight="bold" fontSize="xlarge" fontFamily="serif">
                  {Math.round(weeklySalses.numberOfAccount).toLocaleString()}     
                  </Typography>
                  </div>
                  <Typography gutterBottom variant="h5" 
                  component="div" 
                  fontFamily="serif" fontWeight="bold" borderColor="skyblue" textAlign="center" fontSize="medium">
                  Number of Account
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>

            <Card sx={{maxWidth: 300, backgroundColor:"#F1F5F9", border:2, 
             borderBottomRightRadius:20, borderTopLeftRadius:20,boxShadow:1, borderColor:"#f8fafc",}}>
              <CardActionArea>
                <CardContent>
                  <Typography variant="h4" color="text.primary" textAlign="center" fontWeight="bold" fontSize="xlarge" fontFamily="serif">
                  {Math.round(weeklySalses.uniqueCustomer).toLocaleString()}
                  </Typography>
                  <Typography gutterBottom variant="h5" 
                  component="div" 
                  fontFamily="serif" fontWeight="bold" borderColor="skyblue" textAlign="center" fontSize="medium">
                   Unique Customer
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>


            <Card sx={{ maxWidth: 300, backgroundColor:"#F1F5F9", border:2, 
             borderBottomRightRadius:20, borderTopLeftRadius:20,boxShadow:1, borderColor:"#f8fafc",}}>
              <CardActionArea>
                <CardContent>
                <div className='flex justify-center gap-2 items-center'>
                  <Typography variant="h4" color="text.primary" textAlign="center" fontWeight="bold" fontSize="xlarge" fontFamily="serif">
                  {Math.round(weeklySalses.totalDisbursed).toLocaleString()}    
                  </Typography>
                   <span className='text-black font-semibold text-center'>ETB</span>
                </div>
                  <Typography gutterBottom variant="h5" 
                  component="div" 
                  fontFamily="serif" fontWeight="bold" borderColor="skyblue" textAlign="center" fontSize="medium">
                    Disbursed amount
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
              

            <Card sx={{ maxWidth: 300, backgroundColor:"#F1F5F9", border:2, 
             borderBottomRightRadius:20, borderTopLeftRadius:20,boxShadow:1, borderColor:"#f8fafc",}}>
              <CardActionArea>
                <CardContent>
                <div className='flex justify-center gap-2 items-center'>
                  <Typography variant="h4" color="text.primary" textAlign="center" fontWeight="bold" fontSize="xlarge" fontFamily="serif">
                  {Math.round(weeklySalses.income).toLocaleString()}    
                  </Typography>
                   <span className='text-black font-semibold text-center'>ETB</span>
                </div>
                  <Typography gutterBottom variant="h5" 
                  component="div" 
                  fontFamily="serif" fontWeight="bold" borderColor="skyblue" textAlign="center" fontSize="medium">
                     Income
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
      </div>
    </div>
  }
  </div>
  )
}

export default WeeklySalse
