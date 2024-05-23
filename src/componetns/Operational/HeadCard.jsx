import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import PaidIcon from '@mui/icons-material/Paid';


const HeadCard = () => {
  const operational=useSelector(state=>state.operationalDashboard)
  return (
    <div >
      {operational.data&&
        <div className='flex justify-around items-center gap-2'>
         <Card sx={{ maxWidth: 300, backgroundColor:"#f8fafc",borderBottom:3,borderRadius:2, borderColor:"#00adef"}}>
            <CardActionArea>
              <CardContent>
                <Typography gutterBottom variant="h5" 
                component="div" 
                fontFamily="serif" fontWeight="bold" borderColor="skyblue" textAlign="center" fontSize="medium">
                 Total disbursed amount
                </Typography>
                <div className='flex justify-center gap-2 items-center'>
                <Typography variant="h4" color="text.primary" fontWeight="bold" textAlign="center" fontSize="xlarge" fontFamily="serif">
                  {Math.round(operational.data.totalStatus.totalApprovedAmount).toLocaleString()}
                </Typography>
                <span className='text-black font-semibold text-center'>ETB</span>
                </div>
              </CardContent>
            </CardActionArea>
          </Card> 


          <Card sx={{ maxWidth: 300, backgroundColor:"#f8fafc",borderBottom:3,borderRadius:2, borderColor:"#00adef"}}>
            <CardActionArea>
              <CardContent>
                <Typography gutterBottom variant="h5" 
                component="div" 
                fontFamily="serif" fontWeight="bold" borderColor="skyblue" textAlign="center" fontSize="medium">
                  Total account disbursed for
                </Typography>
                <Typography variant="h4" color="text.primary" fontWeight="bold" textAlign="center" fontSize="xlarge" fontFamily="serif">
                {operational.data.totalStatus.totalAccounts.toLocaleString()}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>


          <Card sx={{ maxWidth: 300, backgroundColor:"#f8fafc",borderRadius:2, borderBottom:3,borderColor:"#00adef"}}>
            <CardActionArea>
              <CardContent>
                <Typography gutterBottom variant="h5" 
                component="div" 
                fontFamily="serif" fontWeight="bold" borderColor="skyblue" textAlign="center" fontSize="medium">
                  Disbursement per day
                </Typography>
                <div className='flex justify-center gap-2 items-center'>
                <Typography variant="h4" color="text.primary" textAlign="center" fontWeight="bold" fontSize="xlarge" fontFamily="serif">
                 {Math.round(operational.data.totalStatus.totalApprovedAmount/operational.data.totalStatus.workingDay).toLocaleString()}
                </Typography>
                <span className='text-black font-semibold text-center'>ETB</span>
                </div>

              </CardContent>
            </CardActionArea>
          </Card>


          <Card sx={{ maxWidth: 300, backgroundColor:"#f8fafc",borderBottom:3,borderRadius:2, borderColor:"#00adef"}}>
            <CardActionArea>
              <CardContent>
                <Typography gutterBottom variant="h5" 
                component="div" 
                fontFamily="serif" fontWeight="bold" borderColor="skyblue" textAlign="center" fontSize="medium">
                 Account per day
                </Typography>
                <Typography variant="h4" color="text.primary" fontWeight="bold" textAlign="center" fontSize="xlarge" fontFamily="serif">
                {Math.round(Number(operational.data.totalStatus.totalAccounts ) / Number(operational.data.totalStatus.workingDay)).toLocaleString()}
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
