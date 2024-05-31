import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import { Tooltip, IconButton, DialogContentText, DialogActions, Box } from '@mui/material';
import DeleteIcon from "@mui/icons-material/Delete"
import { useState } from 'react';
import {Button, Dialog, DialogTitle, DialogContent} from "@mui/material"
import { Edit } from '@mui/icons-material';
import Form from './Form';
import { useStateContext } from '../context/ContextProvider';
import {TableFooter} from '@mui/material';
import { allCollection } from '../features/collection/collectionSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect} from 'react';
import axios from 'axios';
import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';
import Alert from '@mui/material/Alert';
import config from '../config/config';
import DetailFilter from "./Colletion/DetailFilter"

import MenuItem from '@mui/material/MenuItem';

import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { data } from 'autoprefixer';

import DownloadForOfflineOutlinedIcon from '@mui/icons-material/DownloadForOfflineOutlined';
import * as XLSX from 'xlsx';


function createData(name, contactedCustomer, payedCustomer, unpayedCustomer,totalPayed, date) {
  return { name, contactedCustomer, payedCustomer, unpayedCustomer,totalPayed, date };
}
const styles={
  fontFamily:"serif",
  fontWeight:"bold",
  color:"black"
}

const footerStyles={
   fontFamily:"arial",
   fontWeight:"semibold",
   color:'black'
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#38bdf8",
    color: theme.palette.common.white ,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    fontFamily:"serif"
  },
}));


const callResponce = [
  {
    value: 'Promised to pay',
    label: 'Promised to pay',
  },
  {
    value: 'paid',
    label: 'Paid',
  },
  {
    value: 'Not answering',
    label: 'Not answering',
  },
  {
    value: 'Refused to pay',
    label: 'Refused to pay',
  },
  {
    value:"Out of service",
    label:"Out of service"
  },
  {
    value:"Hung up",
    label:"Hung up"
  },
  {
    value:"Line busy",
    label:"Line busy"
  },
  {
    value:"Incorrect number",
    label:"Incorrect number"
  },
  {
    value:"Switched off",
    label:"Switched off"
  },
  {
    value:"Call forwarding",
    label:"Call forwarding"
  },
  {
    value:"Not working",
    label:"Not working"
  }
];

const paymentStatus = [
  {
    value: 'Fully paid',
    label: 'Fully paid',
  },
  {
    value: 'Partially paid',
    label: 'Partially paid',
  }
];


const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "hover": {
    color: "#cbd5e1",
    backgroundColor:"red",
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const VISIBLE_FIELDS = ['fullName', 'customerName','customerPhone','customerAccount', 'callResponce', 'paymentStatus', 'payedAmount', 'date'];

export default function CollectionDetail() {
  const userIn=useSelector(state=>state.logins)
  const dispatch=useDispatch()
  const [allcollection, setAllcollection]=useState(null)
  const [load, setLoad]=useState(false)
  const collection=useSelector(state=> state.collection)
  const [rowData, setRowData]=useState({})
  const {detailfilter, setDetailfilter}=useStateContext()
  const {detail , setDetail}=useStateContext()
  const [delets,setDelets]=useState(false)
  const [deleteRow, setDeleteRow]=useState({})
  const {userRoles,setUserRoles}=useStateContext()
  const detailData=detailfilter
  detailData.userId=userIn.data.userId
  const fetchAllCollection=async()=>{
    dispatch(allCollection({loading:true, error:"", data:null}))
    try{
      let Collections=await  axios.post(`${config.apiUrl}/collection/allCollection`, detailData)
      if(Collections.data.message=="succeed"){
         dispatch(allCollection({loading:false, error:"",data:Collections.data.data}))
         setAllcollection(Collections.data.data)
         setLoad(true)
         setDetail(false)
      }else{
        dispatch(allCollection({loading:false, data:null, error:Collections.data.message}))
        setDetail(false)
    }
    }catch(error){
      dispatch(allCollection({loading:false, error:"Something went wrong", data:null}))
      setDetail(false)
    }
  }
  const {open, setOpen}=useStateContext()
  const handleRowClick = (params) => {
    setRowData(params.row)
  }

  if(detail){
    fetchAllCollection()
  }

  const updateData= async(data)=>{
    try{
      let update= await axios.patch(`${config.apiUrl}/collection/update`, data)
      if (update.data.message=="succeed"){
        fetchAllCollection()
      }else(
        alert(update.data.message)
      )
    }catch(error){
      alert("Something went wrong")
    }

  }

  const handleUpdate=()=>{
    updateData(rowData)
    setOpen(false)
  }


  const handleDelete=async()=>{
    let data={collectionId:rowData.collectionId, userId:rowData.userId}
    try{
      let deleteData= await  axios.delete(`${config.apiUrl}/collection/delete`, {data})
      if(deleteData.data.message=="succeed"){
        fetchAllCollection()
        setDelets(false)
      }else{
        alert("Unable to delete data")
        setDelets(false)
      }
  }catch(error){
    setDelets(false)
    alert('An internal error')
  }
  }



  const Actions=(props)=>{

    const EditDas=()=>{
      setOpen(true)
    }

    const DeleteHandler=()=>{
      setDelets(true)
    }

  
    return(
      <div>
        <Tooltip title="Edit" placement="bottom-end" arrow>
          <IconButton onClick={(event)=>EditDas(event, props.row)}>
            <Edit/>
          </IconButton>
        </Tooltip>
  
        <Tooltip title="Delete" placement="bottom-end" arrow>
          <IconButton onClick={(event)=>DeleteHandler(event, props.row)}>
            <DeleteIcon/>
          </IconButton>
        </Tooltip>
  
      </div>
    )
  }

  const columns = [
    ...VISIBLE_FIELDS.map(field => ({
      field,
      headerName: field.charAt(0).toUpperCase() + field.slice(1),
      width: 150,
    })),
    {
      field: 'action',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => <Actions row={params.row} />,
    },
  ];




  useEffect(()=>{
    fetchAllCollection()
  }, [])

  return (
    <div className='h-full w-full'>
    {collection.loading ? 
      <div className='flex items-center justify-center h-full w-full' >
        <Stack sx={{ width: '100%', color: 'grey.500' }}>
          <LinearProgress color="secondary" />
        </Stack>
      </div>:
    <div className='h-full w-full'>
      <DetailFilter/>
      {collection.error !=='' ?<Alert sx={{mt: 2, mb: 2}} severity="error">{collection.error}</Alert>:
    load &&
    <div className=''>
    <Box sx={{borderBottom:1 , borderColor:"divider",height:100}}>
       <div style={{ height:500, width: '100%'}}>
          <DataGrid
            rows={collection.data.map((row, index) => ({ ...row, id: index }))}
            columns={columns}
            slots={{ toolbar: GridToolbar }}
            onRowClick={handleRowClick}
            sx={{
              '& .MuiDataGrid-columnHeaders': {
                backgroundColor:"#00adef", // Change this color to your desired background color
                // color: "fff", 
                fontFamily:"serif",
                // fontWeight:"semibold",
                fontWeight:"bold",
                color:"black",
                
              },
            }}
          />
        </div>
      <Dialog 
        open={open}
        onClose={open=>{setOpen(false)}}
        aria-label='dialog-title' 
        aria-describedby='dialog-descriptio'

      >
      <DialogTitle sx={{fontFamily:"arial", fontWeight:"bold", color:"secondary.main"}}>Would like to edit data ?</DialogTitle>
      <DialogContent>
        <div className='flex gap-2'>
            <div className='flex flex-col gap-2'>
                <TextField
                    autoFocus
                    margin="dense"
                    id="fullname"
                    label="Full Name"
                    type="text"
                    fullWidth
                    value={rowData.fullName || ""}
                    // onChange={(e) => setRowData({ ...rowData, fullName: e.target.value })}
                    />

                 <TextField
                    margin="dense"
                    id="customerName"
                    label="Customer name"
                    type="text"
                    placeholder='Enter customer name'
                    fullWidth
                    value={rowData.customerName}
                    onChange={(e) => setRowData({ ...rowData, customerName: e.target.value })}
                />
                <TextField
                    margin="dense"
                    id="customerPhone"
                    label="Customer Phone"
                    type="text"
                    placeholder='Enter customer phone'
                    fullWidth
                    value={rowData.customerPhone}
                    onChange={(e) => setRowData({ ...rowData, customerPhone: e.target.value })}
                />

               <TextField
                    margin="dense"
                    id="customerAccount"
                    label="Customer account"
                    type="text"
                    placeholder='Enter customer account'
                    fullWidth
                    value={rowData.customerAccount}
                    onChange={(e) => setRowData({ ...rowData, customerAccount: e.target.value })}
                />
            </div>
            <div className='flex flex-col gap-1'>

                <Box
                  component="form"
                  sx={{
                    '& .MuiTextField-root': { my:1 ,width: '100%' },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <div>
                    <TextField
                      id="callResponce"
                      select
                      label="Call responce"
                      name='callResponce'
                      value={rowData.callResponce}
                      placeholder='Select call response'
                      onChange={(e) => setRowData({ ...rowData, callResponce: e.target.value })}
                    >
                      {callResponce.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </div>
                </Box> 

                <Box
                  component="form"
                  sx={{
                    '& .MuiTextField-root': { my:1 ,width: '100%' },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <div>
                    <TextField
                      id="paymentStatus"
                      select
                      // name='paymentStatus'
                      label="Payment type"
                      value={rowData.paymentStatus}
                      placeholder='select payment status'
                      onChange={(e) => setRowData({ ...rowData, paymentStatus: e.target.value })}
                    >
                      {paymentStatus.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </div>
                </Box>
                <TextField
                    margin='dense'
                    id="paidAmount"
                    label="Paid amount"
                    type="text"
                    fullWidth
                    value={rowData.payedAmount}
                    onChange={(e) => setRowData({ ...rowData, payedAmount: e.target.value })}
                />
                <TextField
                    margin="dense"
                    id="date"
                    label="Date"
                    type="date"
                    fullWidth
                    value={rowData.date}
                    onChange={(e) => setRowData({ ...rowData, date: e.target.value })}
                />
            </div>
        </div>
      </DialogContent>
        <DialogActions>
          <Button onClick={handleUpdate}>Submit</Button>
          <Button autoFocus onClick={()=>setOpen(false)}>Cancel</Button>
        </DialogActions>
       </Dialog>



       <Dialog 
          open={delets}
          onClose={()=>{setDelets(false)}}
          aria-label='dialog-title' 
          aria-describedby='dialog-descriptio'
  
        >
          <DialogTitle
            sx={{fontFamily:"arial", 
            fontWeight:"semibold",
            color:'secondary.main',
          }}>
            <p 
            className='text-center font-semibold text-lg'>Are you sure to delete {rowData.fullName}'s data on {rowData.date} date ?
            </p>
          </DialogTitle>
            <DialogActions>
              <Button sx={{textTransform: 'capitalize'}}  onClick={handleDelete}>Yes</Button>
              <Button sx={{textTransform: 'capitalize'}}  autoFocus onClick={()=>setDelets(false)}>No</Button>
            </DialogActions>
        </Dialog>


    </Box>
    </div>
  }
   </div>}
  </div>
  );
}