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

const SideCard = () => {
  const collection=useSelector(state=>state.collection)
  return (
    <div className='w-[20%] '>
      {collection.data &&
    <div className='rounded-lg'>
      <div className='flex justify-end'><AccountMenu/></div>
      <div className='flex flex-col flex-1 gap-3 p-2'>
            <Card sx={{ maxWidth: 300, backgroundColor:"#F1F5F9", border:2, 
             borderBottomRightRadius:20, borderTopLeftRadius:20,boxShadow:1, borderColor:"#f8fafc",
             WebkitBoxShadow:4, MozBoxSizing:10}}>
              <CardActionArea>
                <CardContent>
                  <Typography gutterBottom variant="h5" 
                  component="div" 
                  fontFamily="serif" fontWeight="bold" borderColor="skyblue" textAlign="center" fontSize="small">
                  Weekly Collection
                  </Typography>
                  <Typography variant="h1" color="text.primary" textAlign="center" fontWeight="bold" fontSize="large" fontFamily="serif">
                  {collection.data.weeklyData.dateRangeTotal}
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
                  <Typography gutterBottom variant="h5" 
                  component="div" 
                  fontFamily="serif" fontWeight="bold" borderColor="skyblue" textAlign="center" fontSize="small">
                   Weekly Account from
                  </Typography>
                  <Typography variant="h1" color="text.primary" textAlign="center" fontWeight="bold" fontSize="large" fontFamily="serif">
                  {collection.data.weeklyData.totalAccount}
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
                  <Typography gutterBottom variant="h5" 
                  component="div" 
                  fontFamily="serif" fontWeight="bold" borderColor="skyblue" textAlign="center" fontSize="small">
                     Weekly Average Collection
                  </Typography>
                  <Typography variant="h1" color="text.primary" textAlign="center" fontWeight="bold" fontSize="large" fontFamily="serif">
                  {collection.data.weeklyData.dateRangeTotal/collection.data.weeklyData.workingDay}
                  </Typography>
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
                  <Typography gutterBottom variant="h5" 
                  component="div" 
                  fontFamily="serif" fontWeight="bold" borderColor="skyblue" textAlign="center" fontSize="small">
                     Weekly Average Account
                  </Typography>
                  <Typography variant="h1" color="text.primary" textAlign="center" fontWeight="bold" fontSize="large" fontFamily="serif">
                  {collection.data.weeklyData.totalAccount/collection.data.weeklyData.workingDay}
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
