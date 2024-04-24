import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

import ActionAreaCard from './Card'
// previousColletions
import {useSelector, useDispatch} from "react-redux"
const BottomCard = () => {
  const collection=useSelector(state=>state.collection)
  return (
    <div>
      {collection.data&&
    <div className='flex mt-3 justify-around rounded-lg px-4 pt-4 pb-2'>

            <Card sx={{ maxWidth: 200, backgroundColor:"#f8fafc",border:2,borderRadius:2, borderColor:"#00adef", borderBlockColor:"#00adef"}}>
                <CardActionArea>
                    <CardContent>
                    <Typography gutterBottom variant="h5" 
                    component="div" 
                    fontFamily="serif" fontWeight="bold" borderColor="skyblue" textAlign="center" fontSize="medium">
                        Yesterday Collection
                    </Typography>
                    <Typography variant="h4" color="text.primary" fontWeight="bold"textAlign="center" fontSize="xlarge" fontFamily="serif">
                        {Math.round(collection.data.previousColletions).toLocaleString()}
                    </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>

            <Card sx={{ maxWidth: 300, backgroundColor:"#f8fafc",border:2,borderRadius:2, borderColor:"#00adef", borderBlockColor:"#00adef"}}>
              <CardActionArea>
                <CardContent>
                  <Typography gutterBottom variant="h5" 
                  component="div" 
                  fontFamily="serif" fontWeight="bold" borderColor="skyblue" textAlign="center" fontSize="medium">
                    Yesterday Account
                  </Typography>
                  <Typography variant="h4" color="text.primary" fontWeight="bold" textAlign="center" fontSize="xlarge" fontFamily="serif">
                    {Math.round(collection.data.previousAccount).toLocaleString()}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>


            <Card sx={{ maxWidth: 200, backgroundColor:"#f8fafc",border:2,borderRadius:2, borderColor:"#00adef", borderBlockColor:"#00adef"}}>
                <CardActionArea>
                    <CardContent>
                    <Typography gutterBottom variant="h5" 
                    component="div" 
                    fontFamily="serif" fontWeight="bold" borderColor="skyblue" textAlign="center" fontSize="medium">
                       Live Collection
                    </Typography>
                    <Typography variant="h4" color="text.primary" fontWeight="bold"textAlign="center" fontSize="xlarge" fontFamily="serif">
                        {Math.round(collection.data.liveCollections).toLocaleString()}
                    </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>

            <Card sx={{ maxWidth: 200, backgroundColor:"#f8fafc",border:2,borderRadius:2, borderColor:"#00adef", borderBlockColor:"#00adef"}}>
                <CardActionArea>
                    <CardContent>
                    <Typography gutterBottom variant="h5" 
                    component="div" 
                    fontFamily="serif" fontWeight="bold" borderColor="skyblue" textAlign="center" fontSize="medium">
                       Live Account
                    </Typography>
                    <Typography variant="h4" color="text.primary" fontWeight="bold"textAlign="center" fontSize="xlarge" fontFamily="serif">
                        {Math.round(collection.data.liveAccount).toLocaleString()}
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
