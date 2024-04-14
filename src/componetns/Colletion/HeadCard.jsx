import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import PaidIcon from '@mui/icons-material/Paid';


const HeadCard = () => {
  const collection=useSelector(state=>state.collection)
  return (
    <div>
      {collection.data&&
        <div className='flex justify-around items-center gap-2'>
         <Card sx={{ maxWidth: 300, backgroundColor:"#f8fafc",border:2,borderRadius:2, borderColor:"#00adef", borderBlockColor:"#f8fafc"}}>
            <CardActionArea>
              <CardContent>
                <Typography gutterBottom variant="h5" 
                component="div" 
                fontFamily="serif" fontWeight="bold" borderColor="skyblue" textAlign="center" fontSize="small">
                  Monthly collection
                </Typography>
                <Typography variant="body1" color="text.primary" fontWeight="bold" textAlign="center" fontSize="large" fontFamily="serif">
                  {collection.data.monthlyData.dateRangeTotal}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card> 

          {/* <div className='bg-slate-50 rounded-lg shadow-md border-r-4 border-b-4 border-double border-[#00abef] 
              flex flex-col items-center gap-2 p-2'>
            <p className='text-slate-600 text-center text-lg font-arial font-semibold '>
                  Monthly Disbursed
            </p>

            <span className='text-slate-800 text-center text-2xl font-bold font-arial '>
              3.5 <span>M</span>

            </span>

          </div> */}

          <Card sx={{ maxWidth: 300, backgroundColor:"#f8fafc",border:2,borderRadius:2, borderColor:"#00adef", borderBlockColor:"#f8fafc"}}>
            <CardActionArea>
              <CardContent>
                <Typography gutterBottom variant="h5" 
                component="div" 
                fontFamily="serif" fontWeight="bold" borderColor="skyblue" textAlign="center" fontSize="small">
                  Monthly Account
                </Typography>
                <Typography variant="body1" color="text.primary" fontWeight="bold" textAlign="center" fontSize="large" fontFamily="serif">
                {collection.data.monthlyData.totalAccount}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>

          {/* <div className='bg-slate-50 rounded-lg shadow-s border-r-4 border-b-4 border-double border-[#00adef] 
              flex flex-col items-center gap-2 p-2'>
            <p className='text-slate-600 text-center text-lg font-arial font-semibold '>
                Customer Account
            </p>

            <span className='text-slate-800 text-center text-2xl font-bold font-arial '>
              240
            </span>


          </div> */}

          <Card sx={{ maxWidth: 300, backgroundColor:"#f8fafc",border:2,borderRadius:2, borderColor:"#00adef", borderBlockColor:"#f8fafc"}}>
            <CardActionArea>
              <CardContent>
                <Typography gutterBottom variant="h5" 
                component="div" 
                fontFamily="serif" fontWeight="bold" borderColor="skyblue" textAlign="center" fontSize="small">
                  Average Monthly collection
                </Typography>
                <Typography variant="h1" color="text.primary" textAlign="center" fontWeight="bold" fontSize="large" fontFamily="serif">
                 {collection.data.monthlyData.dateRangeTotal/collection.data.monthlyData.workingDay}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>

          {/* <div className='bg-slate-50 rounded-lg shadow-md border-r-4 border-b-4 border-double border-[#00adef] 
              flex flex-col items-center gap-2 p-2'>
            <p className='text-slate-600 text-center text-lg font-arial font-semibold '>
                  Monthly Average Amount
            </p>

            <span className='text-slate-800 text-center text-2xl font-bold font-arial '>
              126<span>K</span>

            </span>

          </div> */}

          <Card sx={{ maxWidth: 300, backgroundColor:"#f8fafc",border:2,borderRadius:2, borderColor:"#00adef", borderBlockColor:"#f8fafc"}}>
            <CardActionArea>
              <CardContent>
                <Typography gutterBottom variant="h5" 
                component="div" 
                fontFamily="serif" fontWeight="bold" borderColor="skyblue" textAlign="center" fontSize="small">
                  Average Account
                </Typography>
                <Typography variant="body1" color="text.primary" fontWeight="bold" textAlign="center" fontSize="large" fontFamily="serif">
                {collection.data.monthlyData.totalAccount/collection.data.monthlyData.workingDay}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>


          {/* <div className='bg-slate-50 rounded-lg shadow-s border-r-4 border-b-4 border-double border-[#00adef] 
              flex flex-col items-center gap-2 p-2'>
            <p className='text-slate-600 text-center text-lg font-arial font-semibold '>
                Average Customer Account 
            </p>

            <span className='text-slate-800 text-center text-2xl font-bold font-arial '>
              260
            </span>

          </div> */}

        </div>
      }
    </div>
  )
}

export default HeadCard
