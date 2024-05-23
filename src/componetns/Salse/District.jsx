import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useState } from 'react';
import config from '../../config/config';
  
import { TextField, Button, Container, Stack, Paper } from '@mui/material';

import Chip from '@mui/material/Chip';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import { Tab} from '@mui/material'
import { TabList, TabContext, TabPanel } from '@mui/lab'
import Alert from "@mui/material/Alert";
import { useSelector } from "react-redux";
import { useStateContext } from '../../context/ContextProvider';

const currentDate=new Date()
const currentMonth=currentDate.getMonth()+1
const currentYear=currentDate.getFullYear()
const currentDay=currentDate.getDate()
const month = `0${currentMonth}`.slice(-2);
const day = `0${currentDay}`.slice(-2);
const today=`${currentYear}-${month}-${day}`;
import { Tooltip, IconButton, DialogContentText, DialogActions, Box } from '@mui/material';
import {Dialog, DialogTitle, DialogContent} from "@mui/material"

import { Edit } from '@mui/icons-material';
import DeleteIcon from "@mui/icons-material/Delete"
import FilterListIcon from '@mui/icons-material/FilterList';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import axios from "axios";
const initialDate={
  startDate:today,
  endDate:today
}


const initialValues={
    collectionAdmin:false,
    operationalAdmin:false,
    salesAdmin:false,
    collectionUser:false,
    operationalUser:false,
    salesUser:false,
    admin:false

}
let initialDistrict={
  "centeralFinfine":false,
  "northFinfine":false,
  "southFinfine":false,
  "westFinfine":false,
  "eastFinfine":false
}




const Districtss = (props)=> {
  const {district, setDistrict}=useStateContext()
  const {districtList, setDistrictList}=useStateContext()
  const [initDistrict, setInitDistrict]=useState(props.previousDistrict)
  const handleChange = (event,label) => {
    setDistrict({... initDistrict, [label] : event.target.checked});
    setInitDistrict({... initDistrict, [label]:event.target.checked})
  };


  return(
    <div>
      {
        props.roleDiag &&
        <div className='flex justify-around items-center'>
                <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
                    <FormControlLabel
                        label="Centeral finfine"
                        control={<Checkbox checked={initDistrict['centeralFinfine']} onChange={(event)=>handleChange(event, "centeralFinfine")} />}
                    />
                    <FormControlLabel
                        label="East finfine"
                        control={<Checkbox checked={initDistrict['eastFinfine']} onChange={(event)=>handleChange(event, "eastFinfine")} />}
                    />

                    <FormControlLabel
                        label="West finfine"
                        control={<Checkbox checked={initDistrict['westFinfine']} onChange={(event)=>handleChange(event, "westFinfine")} />}
                    />
                    <FormControlLabel
                        label="Noth finfine"
                        control={<Checkbox checked={initDistrict['northFinfine']} onChange={(event)=>handleChange(event, "northFinfine")} />}
                    />
                    <FormControlLabel
                        label="South finfine"
                        control={<Checkbox checked={initDistrict['southFinfine']} onChange={(event)=>handleChange(event, "southFinfine")} />}
                    />
                </Box>

                <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>

                    <FormControlLabel
                        label="Jimma"
                        control={<Checkbox checked={initDistrict['jimma']} onChange={(event)=>handleChange(event, "jimma")} />}
                    />
                    <FormControlLabel
                        label="Naqamte"
                        control={<Checkbox checked={initDistrict['naqamte']} onChange={(event)=>handleChange(event, "naqamte")} />}
                    />

                    <FormControlLabel
                        label="Hawasa"
                        control={<Checkbox checked={initDistrict['hawasa']} onChange={(event)=>handleChange(event, "hawasa")} />}
                    />
                    <FormControlLabel
                        label="Hosana"
                        control={<Checkbox checked={initDistrict['hosana']} onChange={(event)=>handleChange(event, "hosana")} />}
                    />
                    <FormControlLabel
                        label="Shashamanne"
                        control={<Checkbox checked={initDistrict['shashamanne']} onChange={(event)=>handleChange(event, "shashamanne")} />}
                    />

                    
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
                  
                    <FormControlLabel
                        label="Adama"
                        control={<Checkbox checked={initDistrict['adama']} onChange={(event)=>handleChange(event, "adama")} />}
                    />
                    <FormControlLabel
                        label="Asalla"
                        control={<Checkbox checked={initDistrict['asalla']} onChange={(event)=>handleChange(event, "asalla")} />}
                    />

                    <FormControlLabel
                        label="Chiro"
                        control={<Checkbox checked={initDistrict['chiro']} onChange={(event)=>handleChange(event, "chiro")} />}
                    />
                    <FormControlLabel
                        label="Bale"
                        control={<Checkbox checked={initDistrict['bale']} onChange={(event)=>handleChange(event, "bale")} />}
                    />
                    <FormControlLabel
                        label="Dirre Dawa"
                        control={<Checkbox checked={initDistrict['dirreDawa']} onChange={(event)=>handleChange(event, "dirreDawa")} />}
                    />
                </Box>

                <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
                  
                    <FormControlLabel
                        label="Bairdar"
                        control={<Checkbox checked={initDistrict['bahirdar']} onChange={(event)=>handleChange(event, "bahirdar")} />}
                    />
                    <FormControlLabel
                        label="Mekele"
                        control={<Checkbox checked={initDistrict['mekelle']} onChange={(event)=>handleChange(event, "mekelle")} />}
                    />
                </Box>
            </div>
}

    </div>
  )
};



const UserRole = (props) => {
  const [delets,setDelets]=useState(false)
  const {district, setDistrict}=useStateContext()
  const [assignedDistrict, setAssignedDistrict]=useState(null)
  const {dateRanges, setDateRanges}=useStateContext()
  const {filter, setFilter}=useStateContext()
  const [roleDiag, setRoleDiag]=useState(false)

  let userDistrict=async()=>{
    try{
        const districts=await axios.get(`${config.apiUrl}/salse/userDistrict/${props.userId}`)
        if(districts.data.message=="succeed"){
            setAssignedDistrict(districts.data.data)
            setDelets(true)
            setRoleDiag(true)
        }else if(districts.data.message="No user"){
          let userid=props.userId
          initialDistrict.userId="userid"
          setAssignedDistrict({... initialDistrict, 'userId':userid})
          setDelets(true)
          setRoleDiag(true)
        }
        else{
            setAssignedDistrict(districts.data.message)
            setDelets(true)
        }
    }catch(error){
        setAssignedDistrict("Some thing went wrong")
        setDelets(true)
    }
    
}
  const DeleteHandler=(event)=>{
    userDistrict()
  }

  const submitClick= async()=>{
    setDelets(false)
    try{
    let  changeRole= await axios.post(`${config.apiUrl}/salse/createDistrict`, district)
      if(changeRole.data.message=="succeed"){
        alert("District assigned successfully")
      }else{
        alert("Unable to assign district") 
      }
  }catch(error){
    console.log("the error", error)
    alert("Some thing went wrong")
    
  }
  }

  const cancelClick=()=>{
    setDelets(false)
  }


  return (
    <div className="flex items-center justify-center">

      <Tooltip title="Role detail " placement="bottom-end" arrow>
        <IconButton onClick={(event)=>DeleteHandler()}>
          <AdminPanelSettingsIcon/>
        </IconButton>
      </Tooltip>

      <Dialog 
        open={delets}
        onClose={delets=>{setDelets(false)}}
        aria-label='dialog-title' 
        aria-describedby='dialog-descriptio'

      >
        <DialogTitle
          sx={{fontFamily:"arial", 
          fontWeight:"semibold",
          color:'secondary.main',
        }}>
          <p 
          className='text-center font-semibold text-lg'>You can change a role !
          </p>
        </DialogTitle>
        <DialogContent>
            <Districtss previousDistrict={assignedDistrict} roleDiag={roleDiag}/>
        </DialogContent>
        {roleDiag &&
          <DialogActions>
            <Button sx={{textTransform: 'capitalize'}}  onClick={submitClick}>Submit</Button>
            <Button sx={{textTransform: 'capitalize'}}  autoFocus onClick={cancelClick}>cancel</Button>
          </DialogActions>

        }
      </Dialog>
      
    </div>
  );
}



export default UserRole