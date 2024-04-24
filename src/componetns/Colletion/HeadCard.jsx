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
                  {Math.round(totalCollections.totalCollecteds).toLocaleString()}
                </Typography>
                <span className='text-black font-semibold text-center'>ETB</span>
                </div>
              </CardContent>
            </CardActionArea>
          </Card> 


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


        </div>
      }
    </div>
  )
}

export default HeadCard
