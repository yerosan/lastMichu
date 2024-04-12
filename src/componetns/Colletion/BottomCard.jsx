import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

import ActionAreaCard from './Card'

const BottomCard = () => {
  return (
    <div className='flex mt-3 justify-around rounded-lg p-4'>

            <Card sx={{ maxWidth: 200, backgroundColor:"#f8fafc",border:2,borderRadius:2, borderColor:"#00adef", borderBlockColor:"#00adef"}}>
                <CardActionArea>
                    <CardContent>
                    <Typography gutterBottom variant="h5" 
                    component="div" 
                    fontFamily="serif" fontWeight="bold" borderColor="skyblue" textAlign="center" fontSize="small">
                        Yesterday Collection
                    </Typography>
                    <Typography variant="h1" color="text.primary" fontWeight="bold"textAlign="center" fontSize="large" fontFamily="serif">
                        1.5 M
                    </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
            {/* <div className='bg-slate-50 rounded-lg shadow-md outline outline-2 outline-offset-1 outline-[#00adef]
                flex flex-col items-center gap-3 p-4 '>
              <p className='text-slate-600 text-center text-lg font-serif font-semibold '>
                    Yestarday Collection
              </p>

              <span className='text-slate-800 text-center text-xl font-bold font-arial'>
                1.5 <span>M</span>

              </span>

            </div> */}

            <ActionAreaCard/>

            {/* <div className='bg-slate-50 rounded-lg shadow-md border-spacing-2 border-[#00adef]
                flex flex-col items-center gap-3 p-4 outline outline-2 outline-offset-1 outline-[#00adef]'>
              <p className='text-slate-600 text-center text-lg font-serif font-semibold '>
                    Yestarday Collection Account
              </p>

              <span className='text-slate-800 text-center text-xl font-bold font-arial'>
                240
              </span>

            </div> */}
          </div>
  )
}

export default BottomCard
