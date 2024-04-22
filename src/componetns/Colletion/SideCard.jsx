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
import DashboardFilter from './DashboardFilter';

const SideCard = () => {
  const collection=useSelector(state=>state.collection)
  return (
    <div className='w-[20%] '>
      {collection.data &&
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
                  {collection.data.weeklyData.GivenDateAmount.toLocaleString()}     
                  </Typography>
                   <span className='text-black font-semibold text-center'>ETB</span>
                  </div>
                  {/* <Typography variant="h4" color="text.primary" textAlign="center" fontWeight="bold" fontSize="xlarge" fontFamily="serif">
                     {collection.data.weeklyData.dateRangeTotal} 
                  </Typography> */}
                  <Typography gutterBottom variant="h5" 
                  component="div" 
                  fontFamily="serif" fontWeight="bold" borderColor="skyblue" textAlign="center" fontSize="medium">
                  Collected Amount
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
             {/* <div className='bg-slate-50 rounded-lg shadow-s border-r-2 border-b-2 border-[#00adef]
                  flex flex-col items-center gap-1 p-1'>
                <p className='text-slate-600 text-center text-s font-serif font-semibold '>
                      Weekly Collection
                </p>

                <span className='text-slate-800 text-center text-lg font-bold font-arial '>
                  {collection.data.weeklyData.dateRangeTotal}

                </span>

              </div> */}

              {/* <div className='bg-slate-50 rounded-lg shadow-s border-r-2 border-b-2 border-[#00adef] border-spacing-2
                  flex flex-col items-center gap-1 p-1'>
                <p className='text-slate-600 text-center text-s font-serif font-semibold '>
                     Weekly Account from
                </p>

                <span className='text-slate-800 text-center text-lg font-bold font-arial '>
                {collection.data.weeklyData.totalAccount}
                </span>

              </div> */}

            <Card sx={{maxWidth: 300, backgroundColor:"#F1F5F9", border:2, 
             borderBottomRightRadius:20, borderTopLeftRadius:20,boxShadow:1, borderColor:"#f8fafc",}}>
              <CardActionArea>
                <CardContent>
                  <Typography variant="h4" color="text.primary" textAlign="center" fontWeight="bold" fontSize="xlarge" fontFamily="serif">
                  {collection.data.weeklyData.totalAccount.toLocaleString()}
                  </Typography>
                  <Typography gutterBottom variant="h5" 
                  component="div" 
                  fontFamily="serif" fontWeight="bold" borderColor="skyblue" textAlign="center" fontSize="medium">
                   Account collected from
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>

              {/* <div className='bg-slate-50 rounded-lg shadow-s border-r-2 border-b-2 border-[#00adef] border-spacing-2
                  flex flex-col items-center gap-1 p-1'>
                <p className='text-slate-600 text-center text-s font-serif font-semibold '>
                  Weekly Average Collection
                </p>

                <span className='text-slate-800 text-center text-lg font-bold font-arial '>
                {collection.data.weeklyData.dateRangeTotal/collection.data.weeklyData.workingDay}

                </span>

              </div> */}

            <Card sx={{ maxWidth: 300, backgroundColor:"#F1F5F9", border:2, 
             borderBottomRightRadius:20, borderTopLeftRadius:20,boxShadow:1, borderColor:"#f8fafc",}}>
              <CardActionArea>
                <CardContent>
                <div className='flex justify-center gap-2 items-center'>
                  <Typography variant="h4" color="text.primary" textAlign="center" fontWeight="bold" fontSize="xlarge" fontFamily="serif">
                  {Math.round(collection.data.weeklyData.dateRangeTotal/collection.data.weeklyData.workingDay).toLocaleString()}    
                  </Typography>
                   <span className='text-black font-semibold text-center'>ETB/ day</span>
                  </div>
                  <Typography gutterBottom variant="h5" 
                  component="div" 
                  fontFamily="serif" fontWeight="bold" borderColor="skyblue" textAlign="center" fontSize="medium">
                    Collected Amount
                  </Typography>
                  {/* <Typography variant="h1" color="text.primary" textAlign="center" fontWeight="bold" fontSize="large" fontFamily="serif">
                  {collection.data.weeklyData.dateRangeTotal/collection.data.weeklyData.workingDay} 
                  <span className='text-serif font-light text-sm'> ETB / day</span>
                  </Typography> */}
                </CardContent>
              </CardActionArea>
            </Card>
              
              {/* <div className='bg-slate-50 rounded-lg shadow-s border-spacing-2
                  flex flex-col items-center gap-1 p-1 border-r-2 border-b-2 border-solid border-[#00adef]'>
                <p className='text-slate-600 text-center text-s font-serif font-semibold '>
                     Weekly Average Account
                </p>

                <span className='text-slate-800 text-center text-lg font-bold font-arial '>
                {collection.data.weeklyData.totalAccount/collection.data.weeklyData.workingDay}
                </span>

              </div> */}

            <Card sx={{ maxWidth: 300, backgroundColor:"#F1F5F9", border:2, 
             borderBottomRightRadius:20, borderTopLeftRadius:20,boxShadow:1, borderColor:"#f8fafc",}}>
              <CardActionArea>
                <CardContent>
                  <Typography variant="h4" color="text.primary" textAlign="center" fontWeight="bold" fontSize="xlarge" fontFamily="serif">
                  {Math.round(collection.data.weeklyData.totalAccount/collection.data.weeklyData.workingDay).toLocaleString()}  
                  </Typography>
                   {/* <Typography variant="h4" color="text.primary" textAlign="center" fontWeight="bold" fontSize="large" fontFamily="serif">
                     {collection.data.weeklyData.totalAccount/collection.data.weeklyData.workingDay}
                  </Typography> */}
                  <Typography gutterBottom variant="h5" 
                  component="div" 
                  fontFamily="serif" fontWeight="bold" borderColor="skyblue" textAlign="center" fontSize="medium">
                     Average Account
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
              {/* <OutlinedCard/> */}
      </div>
    </div>
  }
  </div>
  )
}

export default SideCard
