import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import PaidIcon from '@mui/icons-material/Paid';


const TotalSalse = () => {
  const salse=useSelector(state=>state.salse)
  let totalSalses=salse.data.totalSalse
  return (
    <div >
      {salse.data &&
        <div className='flex justify-around items-center gap-2'>
         <Card sx={{ maxWidth: 300, backgroundColor:"#f8fafc",borderLeft:4,borderColor:"#00adef",  borderRadius:2, borderBlockColor:"#f8fafc"}}>
            <CardActionArea>
              <CardContent>
                <Typography gutterBottom variant="h5" 
                component="div" 
                fontFamily="serif" fontWeight="bold" borderColor="skyblue" textAlign="center" fontSize="medium">
                 Total Number Of Accounts
                </Typography>
                <div className='flex justify-center gap-2 items-center'>
                <Typography variant="h4" color="text.primary" fontWeight="bold" textAlign="center" fontSize="xlarge" fontFamily="serif">
                  {Math.round(totalSalses.numberOfAccount).toLocaleString()}
                </Typography>
                {/* <span className='text-black font-semibold text-center'>ETB</span> */}
                </div>
              </CardContent>
            </CardActionArea>
          </Card> 


          <Card sx={{ maxWidth: 300, backgroundColor:"#f8fafc",borderLeft:4,borderColor:"#00adef",  borderRadius:2, borderBlockColor:"#f8fafc"}}>
            <CardActionArea>
              <CardContent>
                <Typography gutterBottom variant="h5" 
                component="div" 
                fontFamily="serif" fontWeight="bold" borderColor="skyblue" textAlign="center" fontSize="medium">
                  Total Unique Customers
                </Typography>
                <Typography variant="h4" color="text.primary" fontWeight="bold" textAlign="center" fontSize="xlarge" fontFamily="serif">
                {totalSalses.uniqueCustomer.toLocaleString()}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>


          <Card sx={{ maxWidth: 300, backgroundColor:"#f8fafc",borderLeft:4,borderColor:"#00adef",  borderRadius:2, borderBlockColor:"#f8fafc"}}>
            <CardActionArea>
              <CardContent>
                <Typography gutterBottom variant="h5" 
                component="div" 
                fontFamily="serif" fontWeight="bold" borderColor="skyblue" textAlign="center" fontSize="medium">
                  Total Disbursed Amount
                </Typography>
                <div className='flex justify-center gap-2 items-center'>
                <Typography variant="h4" color="text.primary" textAlign="center" fontWeight="bold" fontSize="xlarge" fontFamily="serif">
                 {Math.round(totalSalses.totalDisbursed).toLocaleString()}
                </Typography>
                <span className='text-black font-semibold text-center'>ETB</span>
                </div>

              </CardContent>
            </CardActionArea>
          </Card>


          <Card sx={{ maxWidth: 300, backgroundColor:"#f8fafc",borderLeft:4,borderColor:"#00adef",  borderRadius:2 ,borderBlockColor:"#f8fafc"}}>
            <CardActionArea>
              <CardContent>
                <Typography gutterBottom variant="h5" 
                component="div" 
                fontFamily="serif" fontWeight="bold" borderColor="skyblue" textAlign="center" fontSize="medium">
                 Total Income Generated
                </Typography>
                <Typography variant="h4" color="text.primary" fontWeight="bold" textAlign="center" fontSize="xlarge" fontFamily="serif">
                {Math.round(totalSalses.income).toLocaleString()}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>


        </div>
      }
    </div>
  )
}

export default TotalSalse
