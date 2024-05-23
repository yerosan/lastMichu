import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

// import ActionAreaCard from './Card'
// previousColletions
import {useSelector, useDispatch} from "react-redux"
const BottomCard = () => {
  const operational=useSelector(state=>state.operationalDashboard)
//   let totalCollections=collection.data.dashboard[0][0]
  return (
    <div>
      {operational.data&&
    <div className='flex mt-3 justify-around rounded-lg px-4 pt-4 pb-2'>

            <Card sx={{ maxWidth: 200, backgroundColor:"#f8fafc",borderRight:2, borderBottom:2,borderRadius:2, borderColor:"#00adef", borderBlockColor:"#00adef"}}>
                <CardActionArea>
                    <CardContent>
                    <Typography gutterBottom variant="h5" 
                    component="div" 
                    fontFamily="serif" fontWeight="bold" borderColor="skyblue" textAlign="center" fontSize="medium">
                        Yesterday Approval
                    </Typography>
                    <Typography variant="h4" color="text.primary" fontWeight="bold"textAlign="center" fontSize="xlarge" fontFamily="serif">
                        {Math.round(operational.data.totalStatus.preivousApproval).toLocaleString()}
                    </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>

            <Card sx={{ maxWidth: 300, backgroundColor:"#f8fafc",borderRight:2, borderBottom:2,borderRadius:2, borderColor:"#00adef", borderBlockColor:"#00adef"}}>
              <CardActionArea>
                <CardContent>
                  <Typography gutterBottom variant="h5" 
                  component="div" 
                  fontFamily="serif" fontWeight="bold" borderColor="skyblue" textAlign="center" fontSize="medium">
                    Yesterday Account
                  </Typography>
                  <Typography variant="h4" color="text.primary" fontWeight="bold" textAlign="center" fontSize="xlarge" fontFamily="serif">
                    {Math.round(operational.data.totalStatus.preicousAccount).toLocaleString()}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>


            <Card sx={{ maxWidth: 200, backgroundColor:"#f8fafc",borderRight:2, borderBottom:2,borderRadius:2, borderColor:"#00adef", borderBlockColor:"#00adef"}}>
                <CardActionArea>
                    <CardContent>
                    <Typography gutterBottom variant="h5" 
                    component="div" 
                    fontFamily="serif" fontWeight="bold" borderColor="skyblue" textAlign="center" fontSize="medium">
                       Live Disbursment
                    </Typography>
                    <Typography variant="h4" color="text.primary" fontWeight="bold"textAlign="center" fontSize="xlarge" fontFamily="serif">
                        {Math.round(operational.data.totalStatus.liveAmount).toLocaleString()}
                    </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>

            <Card sx={{ maxWidth: 200, backgroundColor:"#f8fafc",borderRight:2, borderBottom:2,borderRadius:2, borderColor:"#00adef", borderBlockColor:"#00adef"}}>
                <CardActionArea>
                    <CardContent>
                    <Typography gutterBottom variant="h5" 
                    component="div" 
                    fontFamily="serif" fontWeight="bold" borderColor="skyblue" textAlign="center" fontSize="medium">
                       Live Account
                    </Typography>
                    <Typography variant="h4" color="text.primary" fontWeight="bold"textAlign="center" fontSize="xlarge" fontFamily="serif">
                        {Math.round(operational.data.totalStatus.liveCustomer).toLocaleString()}
                    </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>

          </div>
       }
    </div>
  )
}

export default BottomCard
