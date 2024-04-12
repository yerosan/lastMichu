import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { sane } from '../assets';

export default function ActionAreaCard() {
  return (
    <Card sx={{ maxWidth: 200, backgroundColor:"#f8fafc",border:2,borderRadius:2, borderColor:"#00adef", borderBlockColor:"#00adef"}}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" 
          component="div" 
          fontFamily="serif" fontWeight="bold" borderColor="skyblue" textAlign="center" fontSize="large">
            Yesterday Disbursement
          </Typography>
          <Typography variant="body1" color="text.secondary" textAlign="center" fontSize="xlarge" fontFamily="serif">
            64 %
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}