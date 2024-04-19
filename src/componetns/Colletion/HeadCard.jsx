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
  console.log("Ther Head++++++++++++++---------========", collection.data.dashboard[0] )
  let totalCollections=collection.data.dashboard[0][0]
  return (
    <div >
      {collection.data&&
        <div className='flex justify-around items-center gap-2'>
         <Card sx={{ maxWidth: 300, backgroundColor:"#f8fafc",border:2,borderRadius:2, borderColor:"#00adef", borderBlockColor:"#f8fafc"}}>
            <CardActionArea>
              <CardContent>
                <Typography gutterBottom variant="h5" 
                component="div" 
                fontFamily="serif" fontWeight="bold" borderColor="skyblue" textAlign="center" fontSize="medium">
                 Total collected amount
                </Typography>
                <div className='flex justify-center gap-2 items-center'>
                <Typography variant="h4" color="text.primary" fontWeight="bold" textAlign="center" fontSize="xlarge" fontFamily="serif">
                  {totalCollections.totalCollecteds.toLocaleString()}
                </Typography>
                <span className='text-black font-semibold text-center'>ETB</span>
                </div>
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
                fontFamily="serif" fontWeight="bold" borderColor="skyblue" textAlign="center" fontSize="medium">
                  Total account collected from
                </Typography>
                <Typography variant="h4" color="text.primary" fontWeight="bold" textAlign="center" fontSize="xlarge" fontFamily="serif">
                {totalCollections.totalAccounts.toLocaleString()}
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
                fontFamily="serif" fontWeight="bold" borderColor="skyblue" textAlign="center" fontSize="medium">
                  Average collection per day
                </Typography>
                <div className='flex justify-center gap-2 items-center'>
                <Typography variant="h4" color="text.primary" textAlign="center" fontWeight="bold" fontSize="xlarge" fontFamily="serif">
                 {Math.round(totalCollections.totalCollecteds/totalCollections.workingDay).toLocaleString()}
                </Typography>
                <span className='text-black font-semibold text-center'>ETB</span>
                </div>

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
                fontFamily="serif" fontWeight="bold" borderColor="skyblue" textAlign="center" fontSize="medium">
                 Average account per day
                </Typography>
                <Typography variant="h4" color="text.primary" fontWeight="bold" textAlign="center" fontSize="xlarge" fontFamily="serif">
                {Math.round(Number(totalCollections.totalAccounts ) / Number(totalCollections.workingDay)).toLocaleString()}
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
