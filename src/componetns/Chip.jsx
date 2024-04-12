import * as React from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { useState } from 'react';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import { Tab, Box } from '@mui/material'
import { TabList, TabContext, TabPanel } from '@mui/lab'
import { useStateContext } from '../context/ContextProvider';

const initialValues={
    collectionAdmin:false,
    operationalAdmin:false,
    salesAdmin:false,
    collectionUser:false,
    operationalUser:false,
    salesUser:false,
    admin:false

}

export default function Chips() {
    const {role, setRole}=useStateContext()
    const handleClick = (label) => { 
        console.log("this is selected Values",!(role[label]))
        setRole({...role, [label]:!role[label]})
        console.log("role list", label,role)
      };
  return (
    <Stack spacing={1} alignItems="center">
      <Stack direction="row" spacing={1}>
      <Chip
          label="Collection admin"
          onDelete={() => handleClick("collectionAdmin")}
          color={role.collectionAdmin ? "primary" : "default"}
          deleteIcon={role.collectionAdmin ? <CancelIcon/>:<CheckCircleIcon/>}
        />
        <Chip label="Operational admin"
        onDelete={() => handleClick("operationalAdmin")}
        color={role.operationalAdmin ? "primary" : "default"}
        deleteIcon={role.operationalAdmin ? <CancelIcon/>:<CheckCircleIcon/>}/>
        <Chip label="Sales admin"
        onDelete={() => handleClick("salesAdmin")}
        color={role.salesAdmin ? "primary" : "default"}
        deleteIcon={role.salesAdmin ? <CancelIcon/>:<CheckCircleIcon/>}
        />
      </Stack>
      <Stack direction="row" spacing={1}>
        <Chip label="Collection user" 
        onDelete={() => handleClick("collectionUser")}
        color={role.collectionUser ? "primary" : "default"}
        deleteIcon={role.collectionUser ? <CancelIcon/>:<CheckCircleIcon/>}/>
        <Chip label="Operational user"
        onDelete={() => handleClick("operationalUser")}
        color={role.operationalUser ? "primary" : "default"}
        deleteIcon={role.operationalUser ? <CancelIcon/>:<CheckCircleIcon/>}/>
        <Chip label="Sales user" 
        onDelete={() => handleClick("salesUser")}
        color={role.salesUser ? "primary" : "default"}
        deleteIcon={role.salesUser ? <CancelIcon/>:<CheckCircleIcon/>}/>
      </Stack>
      <Stack direction="row" spacing={1} alignItems="center">
        <Chip label="Admin" 
        onDelete={() => handleClick("admin")}
        color={role.admin ? "primary" : "default"}
        deleteIcon={role.admin ? <CancelIcon/>:<CheckCircleIcon/>}/>
      </Stack>
    </Stack>
  );
}