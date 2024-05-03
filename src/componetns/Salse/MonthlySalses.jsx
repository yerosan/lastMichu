import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

// import ActionAreaCard from './Card'
// previousColletions
import {useSelector, useDispatch} from "react-redux"
const MonthlySalse = () => {
  const salse=useSelector(state=>state.salse)
  let monthlySalse=salse.data.monthlySalse
  return (
    <div>
      {salse.data&&
    <div className='flex mt-2 justify-around rounded-lg px-4 pt-2 pb-2'>

            <Card sx={{ maxWidth: 300, backgroundColor:"#f8fafc",border:2,borderRadius:2, borderColor:"#00adef", borderBlockColor:"#00adef"}}>
                <CardActionArea>
                    <CardContent>
                    <Typography gutterBottom variant="h5" 
                    component="div" 
                    fontFamily="serif" fontWeight="bold" borderColor="skyblue" textAlign="center" fontSize="medium">
                     Nucmber Of Accounts
                    </Typography>
                    <Typography variant="h4" color="text.primary" fontWeight="bold"textAlign="center" fontSize="xlarge" fontFamily="serif">
                        {Math.round(monthlySalse.numberOfAccount).toLocaleString()}
                    </Typography>
                    <span className='text-black font-light text-center'>in last month</span>
                    </CardContent>
                </CardActionArea>
            </Card>

            <Card sx={{ maxWidth: 300, backgroundColor:"#f8fafc",border:2,borderRadius:2, borderColor:"#00adef", borderBlockColor:"#00adef"}}>
              <CardActionArea>
                <CardContent>
                  <Typography gutterBottom variant="h5" 
                  component="div" 
                  fontFamily="serif" fontWeight="bold" borderColor="skyblue" textAlign="center" fontSize="medium">
                   Unique Customer
                  </Typography>
                  <Typography variant="h4" color="text.primary" fontWeight="bold" textAlign="center" fontSize="xlarge" fontFamily="serif">
                    {Math.round(monthlySalse.uniqueCustomer).toLocaleString()}
                  </Typography>
                  <span className='text-black text-center font-light'>in last month</span>
                </CardContent>
              </CardActionArea>
            </Card>


            <Card sx={{ maxWidth: 300, backgroundColor:"#f8fafc",border:2,borderRadius:2, borderColor:"#00adef", borderBlockColor:"#00adef"}}>
                <CardActionArea>
                    <CardContent>
                    <Typography gutterBottom variant="h5" 
                    component="div" 
                    fontFamily="serif" fontWeight="bold" borderColor="skyblue" textAlign="center" fontSize="medium">
                       Disbursed Amount
                    </Typography>
                    <div className='flex justify-center gap-2 items-center'>
                        <Typography variant="h4" color="text.primary" textAlign="center" fontWeight="bold" fontSize="xlarge" fontFamily="serif">
                        {Math.round(monthlySalse.totalDisbursed).toLocaleString()}     
                        </Typography>
                        <span className='text-black font-normal text-md text-center'>ETB</span>
                    </div>
                    <span className='text-black font-light text-center'>in last month</span>
                    </CardContent>
                </CardActionArea>
            </Card>

            <Card sx={{ maxWidth: 300, backgroundColor:"#f8fafc",border:2,borderRadius:2, borderColor:"#00adef", borderBlockColor:"#00adef"}}>
                <CardActionArea>
                    <CardContent>
                    <Typography gutterBottom variant="h5" 
                    component="div" 
                    fontFamily="serif" fontWeight="bold" borderColor="skyblue" textAlign="center" fontSize="medium">
                      Income Generated
                    </Typography>
                    <Typography variant="h4" color="text.primary" fontWeight="bold"textAlign="center" fontSize="xlarge" fontFamily="serif">
                        {Math.round(monthlySalse.income).toLocaleString()}
                    </Typography>
                    <span className='text-black font-light text-center'>in last month</span>
                    </CardContent>
                </CardActionArea>
            </Card>

          </div>
       }
    </div>
  )
}

export default MonthlySalse
