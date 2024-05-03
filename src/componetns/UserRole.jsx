import React, { useState } from "react"; 
import { useStateContext } from "../context/ContextProvider";
import config from "../config/config";
  
import { TextField, Button, Container, Stack, Paper } from '@mui/material';

import Chip from '@mui/material/Chip';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import { Tab} from '@mui/material'
import { TabList, TabContext, TabPanel } from '@mui/lab'
import Alert from "@mui/material/Alert";
import { useSelector } from "react-redux";

const currentDate=new Date()
const currentMonth=currentDate.getMonth()+1
const currentYear=currentDate.getFullYear()
const currentDay=currentDate.getDate()
const month = `0${currentMonth}`.slice(-2);
const day = `0${currentDay}`.slice(-2);
const today=`${currentYear}-${month}-${day}`;
// const dateRange=[new Date(today), new Date(today)]
import { Tooltip, IconButton, DialogContentText, DialogActions, Box } from '@mui/material';
import {Dialog, DialogTitle, DialogContent} from "@mui/material"
// import Chips from "./Chip";

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

const Chips=(props)=> {
    const {role, setRole}=useStateContext()
    const [updating, setUpdating]=useState(props.initialValue)
    const userIn=useSelector(state=>state.logins)
    const {userRoles, setUserRoles}=useStateContext()
    console.log("this si the Role__________--------__________", userRoles)
    const handleClick = (label) => { 
        setRole({...updating, [label]:!role[label]})
        setUpdating({...updating, [label]:!updating[label]})
      };
  return (
    <div>
    {props.roleDiag ? 
    <Stack spacing={1} alignItems="center">
      {(userRoles.admin || userRoles.operationalAdmin )&&
      <Stack direction="row" spacing={1}>
        <Chip label="Operational admin"
        onDelete={() => handleClick("operationalAdmin")}
        color={updating.operationalAdmin ? "primary" : "default"}
        deleteIcon={updating.operationalAdmin ? <CancelIcon/>:<CheckCircleIcon/>}
        />   
        <Chip label="Operational user"
        onDelete={() => handleClick("operationalUser")}
        color={updating.operationalUser ? "primary" : "default"}
        deleteIcon={updating.operationalUser ? <CancelIcon/>:<CheckCircleIcon/>}/>
      </Stack>
      }
      {(userRoles.admin || userRoles.collectionAdmin) && 
      <Stack direction="row" spacing={1}>
      <Chip
          label="Collection admin"
          onDelete={() => handleClick("collectionAdmin")}
          color={updating.collectionAdmin ? "primary" : "default"}
          deleteIcon={updating.collectionAdmin ? <CancelIcon/>:<CheckCircleIcon/>}
        />
        <Chip label="Collection user" 
        onDelete={() => handleClick("collectionUser")}
        color={updating.collectionUser ? "primary" : "default"}
        deleteIcon={updating.collectionUser ? <CancelIcon/>:<CheckCircleIcon/>}
        />
      </Stack>
      }
      {(userRoles.admin || userRoles.salesAdmin) &&
      <Stack direction="row" spacing={1} alignItems="center">
        <Chip label="Sales admin"
        onDelete={() => handleClick("salesAdmin")}
        color={updating.salesAdmin ? "primary" : "default"}
        deleteIcon={updating.salesAdmin ? <CancelIcon/>:<CheckCircleIcon/>}
        />
        <Chip label="Sales user" 
        onDelete={() => handleClick("salesUser")}
        color={updating.salesUser ? "primary" : "default"}
        deleteIcon={updating.salesUser ? <CancelIcon/>:<CheckCircleIcon/>}/>
      </Stack>
      }

      {userRoles.admin &&
      <Stack direction="row" spacing={1} alignItems="center">
        <Chip label="Admin" 
        onDelete={() => handleClick("admin")}
        color={updating.admin ? "primary" : "default"}
        deleteIcon={updating.admin ? <CancelIcon/>:<CheckCircleIcon/>}/>
      </Stack>
     }
    </Stack>:

    <Alert sx={{mt: 2, mb: 2}} severity="error">{updating}</Alert>

}
    </div>
  );
}




const UserRole = (props) => {
  const [delets,setDelets]=useState(false)
  const {role, setRole}=useStateContext()
  const {dateRanges, setDateRanges}=useStateContext()
  const {filter, setFilter}=useStateContext()
  const [roles, setRoles]=useState(null)
  const [roleDiag, setRoleDiag]=useState(false)
  let userRoles=async()=>{
    try{
        const roless=await axios.get(`${config.apiUrl}/role/perUser/${props.userName}`)
        if(roless.data.message=="succeed"){
            setRoles(roless.data.data)
            setDelets(true)
            setRoleDiag(true)
        }else{
            setRoles(roless.data.message)
            setDelets(true)
        }

    }catch(error){
        setRoles("Some thing went wrong")
        setDelets(true)
    }
    
}
  const DeleteHandler=(event)=>{
    userRoles()
  }

  const submitClick= async()=>{
    setDelets(false)
    // setFilter(true)
    try{
    let  changeRole= await axios.patch(`${config.apiUrl}/role/update`, role)
    
      if(changeRole.data.message=="succeed"){
        alert("Role change is succeed")
      }else{
        alert("Unable to change the role") 
      }
  }catch(error){
    console.log("the error", error)
    alert("Some thing went wrong")
    
  }
  }

  const cancelClick=()=>{
    // console.log("This is cancleClick", dateRanges, filter)
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
            <Chips initialValue={roles} roleDiag={roleDiag}/>
        
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

export default UserRole;
