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
   fontWeight:"bold",
   color:"#e38524"
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


const Actions=(props)=>{
  const {open, setOpen}=useStateContext()
  const EditDas=()=>{
    setOpen(true)
  }

  return(
    <div>
      <Tooltip title="Edit" placement="bottom-end" arrow>
        <IconButton onClick={(event)=>EditDas(event, props.row)}>
          <Edit/>
        </IconButton>
      </Tooltip>

    </div>
  )
}

const totalStatus={"totalRejected":20000,"totalApproved":3000,"totalApplicant":4000}

export default function Individualcollection() {
  const currentDate= new Date()
  const currentMonth=currentDate.getMonth()+1
  const currentYear=currentDate.getFullYear()
  const toDayDate=currentDate.getDate()
  const month = `0${currentMonth}`.slice(-2);
  const dayDate = `0${toDayDate}`.slice(-2);
  const today=`${currentYear}-${month}-${dayDate}`;
  const userIn=useSelector(state=>state.logins)
  const dispatch=useDispatch()
  const [allcollection, setAllcollection]=useState(null)
  const [load, setLoad]=useState(false)
  const collection=useSelector(state=> state.collection)
  const [rowData, setRowData]=useState({})
  const {detailfilter, setDetailfilter}=useStateContext()
  const {detail , setDetail}=useStateContext()
  const detailData={userId:userIn.data.userId, date:today}
  const fetchAllCollection=async()=>{
    dispatch(allCollection({loading:true, error:"", data:null}))
    try{
      let Collections=await  axios.post(`${config.apiUrl}/collection/userCollection`, detailData)
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
      console.log("The error", error)
      dispatch(allCollection({loading:false, error:"Something went wrong", data:null}))
      setDetail(false)
    }
  }
  const {open, setOpen}=useStateContext()
  const handleRowClick = (rowData) => {
    setRowData(rowData)
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

  const handleXlsxDownload = () => {
    const worksheet = XLSX.utils.json_to_sheet(allcollection);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'My Data');
    XLSX.writeFile(workbook, 'my_data.xlsx');
  };

  const handleUpdate=()=>{
    updateData(rowData)
    setOpen(false)
  }

  useEffect(()=>{
    fetchAllCollection()
  }, [])

  const totalPayedAmount = allcollection ? allcollection.reduce((sum, row) => sum + row.payedAmount, 0) : 0;
  const totalCustomerCount = allcollection ? allcollection.length : 0;
  return (
    <div className='h-full w-full'>
    {collection.loading ? 
      <div className='flex items-center justify-center h-full w-full' >
        <Stack sx={{ width: '100%', color: 'grey.500' }}>
          <LinearProgress color="secondary" />
        </Stack>
      </div>:
    <div className='h-full w-full'>
      {collection.error !=='' ?<Alert sx={{mt: 2, mb: 2}} severity="error">{collection.error}</Alert>:
    load &&
    <div className=''>
    <Box sx={{borderBottom:1 , borderColor:"divider",height:100}}>
      <TableContainer component={Paper} sx={{maxHeight:540}}>
        <Table sx={{ minWidth: 650 }} stickyHeader aria-label="simple table">
          <TableHead>
            <TableRow style={styles}>
              <StyledTableCell style={styles} >Officer Name</StyledTableCell>
              <StyledTableCell align='left' style={styles} >Customer Phone</StyledTableCell>
              <StyledTableCell align="left" style={styles} >Call Responce</StyledTableCell>
              <StyledTableCell align="left" style={styles} >Payment Status</StyledTableCell>
              <StyledTableCell align="left" style={styles} >Paid Amount</StyledTableCell>
              <StyledTableCell align="left" style={styles} >Contacted Date</StyledTableCell>
              <StyledTableCell align="center" style={styles} >Action</StyledTableCell>
              {/* <TableCell align="right">action&nbsp;(g)</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {allcollection.map((row,id) => (
              <StyledTableRow
                key={id}
                sx={{ '&:last-child td, &:last-child th': { border: 0, fontFamily:"serif" } }}
                onClick={(event) => handleRowClick(row)}
                className={{
                }}
                hover
              >
                <StyledTableCell component="th" scope="row">
                  {row.fullName}
                </StyledTableCell>
                <StyledTableCell align="left">{row.customerPhone}</StyledTableCell>
                <StyledTableCell align="left">{row.callResponce}</StyledTableCell>
                <StyledTableCell align="left">{row.paymentStatus}</StyledTableCell>
                <StyledTableCell align="left">{row.payedAmount}</StyledTableCell>
                <StyledTableCell align="left">{row.date}</StyledTableCell>
                <StyledTableCell align="center"><Actions row={row}/> </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>

            <TableFooter>
              <TableRow>
                <StyledTableCell colSpan={2} align="right" style={footerStyles}>Total Contacted Customers</StyledTableCell>
                <StyledTableCell align="left" style={footerStyles}>{totalCustomerCount}</StyledTableCell>
                <StyledTableCell colSpan={2} align="right" style={footerStyles}>Total Collected Amount</StyledTableCell>
                <StyledTableCell align="left" style={footerStyles}>{totalPayedAmount}</StyledTableCell>
              </TableRow>
            </TableFooter>
          
        </Table>
      </TableContainer>
      
      <div className='mt-2 flex justify-end ml-4'>
         <Button variant="contained" onClick={handleXlsxDownload}><DownloadForOfflineOutlinedIcon/></Button>
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
            </div>
            <div className='flex flex-col gap-2'>


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
    </Box>
    </div>
  }
   </div>}
  </div>
  );
}