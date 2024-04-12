import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

const HeadCard = () => {
  return (
    <div className='flex justify-around items-center gap-2'>
         <Card sx={{ maxWidth: 200, backgroundColor:"#f8fafc",border:2,borderRadius:2, borderColor:"#00adef", borderBlockColor:"#f8fafc"}}>
            <CardActionArea>
              <CardContent>
                <Typography gutterBottom variant="h5" 
                component="div" 
                fontFamily="serif" fontWeight="bold" borderColor="skyblue" textAlign="center" fontSize="large">
                  Monthly Disbursed
                </Typography>
                <Typography variant="body1" color="text.secondary" textAlign="center" fontSize="xlarge" fontFamily="serif">
                  3.5 M
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

          {/* <Card sx={{ maxWidth: 200, backgroundColor:"#f8fafc",border:2,borderRadius:2, borderColor:"#00adef", borderBlockColor:"#f8fafc"}}>
            <CardActionArea>
              <CardContent>
                <Typography gutterBottom variant="h5" 
                component="div" 
                fontFamily="serif" fontWeight="bold" borderColor="skyblue" textAlign="center" fontSize="large">
                  Monthly Account
                </Typography>
                <Typography variant="body1" color="text.secondary" textAlign="center" fontSize="xlarge" fontFamily="serif">
                  2400
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card> */}

          <div className='bg-slate-50 rounded-lg shadow-s border-r-4 border-b-4 border-double border-[#00adef] 
              flex flex-col items-center gap-2 p-2'>
            <p className='text-slate-600 text-center text-lg font-arial font-semibold '>
                  Monthly Account
            </p>

            <span className='text-slate-800 text-center text-2xl font-bold font-arial '>
              2400
            </span>


          </div>

          <Card sx={{ maxWidth: 200, backgroundColor:"#f8fafc",border:2,borderRadius:2, borderColor:"#00adef", borderBlockColor:"#f8fafc"}}>
            <CardActionArea>
              <CardContent>
                <Typography gutterBottom variant="h5" 
                component="div" 
                fontFamily="serif" fontWeight="bold" borderColor="skyblue" textAlign="center" fontSize="large">
                  Average Amount
                </Typography>
                <Typography variant="body1" color="text.secondary" textAlign="center" fontSize="xlarge" fontFamily="serif">
                 126 k
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

          <div className='bg-slate-50 rounded-lg shadow-s border-r-4 border-b-4 border-double border-[#00adef] 
              flex flex-col items-center gap-2 p-2'>
            <p className='text-slate-600 text-center text-lg font-arial font-semibold '>
                Average Account
            </p>

            <span className='text-slate-800 text-center text-2xl font-bold font-arial '>
              260
            </span>

          </div>

        </div>
  )
}

export default HeadCard
