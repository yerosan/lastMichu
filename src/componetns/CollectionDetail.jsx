import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
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


// const Datas = [
//   createData('Yerosan Tadesse', 159, 6.0, 24, 4.0,"2024/04/06"),
//   createData('Shewanek Zewudu', 237, 9.0, 37, 4.3,"2024/04/06"),
//   createData('Yerosan Tadesse1', 262, 16.0, 24, 6.0,"2024/04/06"),
//   createData('Yerosan Tadesse2', 305, 3.7, 67, 4.3,"2024/04/06"),
//   createData('Shewanek Zewudu1', 356, 16.0, 49, 3.9,"2024/04/06"),
//   createData('Yerosan Tadesse3', 159, 6.0, 24, 4.0,"2024/04/06"),
//   createData('Shewanek Zewudu3', 237, 9.0, 37, 4.3,"2024/04/06"),
//   createData('Yerosan Tadesse12', 262, 16.0, 24, 6.0,"2024/04/06"),
//   createData('Yerosan Tadesse23', 305, 3.7, 67, 4.3,"2024/04/06"),
//   createData('Shewanek Zewudu13', 356, 16.0, 49, 3.9,"2024/04/06"),
// ];
// const rows=Datas
const Actions=(props)=>{
  // const [rowsss, setRowsss]=useState(rows)
  const {open, setOpen}=useStateContext()
  const [delets,setDelets]=useState(false)
  const [deleteRow, setDeleteRow]=useState({})
  const DeleteHandler=(event, row)=>{
    setDelets(true)
    setDeleteRow(row)
    // setRowsss(rowsss=>rowsss.filter(roow=>roow.name!==row.name))
  }

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

      <Tooltip title="Delete" placement="bottom-end" arrow>
        <IconButton onClick={(event)=>DeleteHandler(event, props.row)}>
          <DeleteIcon/>
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
          className='text-center font-semibold text-lg'>Are you sure to delete {props.row.fullName}'s data on {props.row.date} date ?
          </p>
        </DialogTitle>
          <DialogActions>
            <Button sx={{textTransform: 'capitalize'}}  onClick={()=>setDelets(false)}>Yes</Button>
            <Button sx={{textTransform: 'capitalize'}}  autoFocus onClick={()=>setDelets(false)}>No</Button>
          </DialogActions>
      </Dialog>

    </div>
  )
}

const totalStatus={"totalRejected":20000,"totalApproved":3000,"totalApplicant":4000}

export default function CollectionDetail() {
  const dispatch=useDispatch()
  const [allcollection, setAllcollection]=useState(null)
  const [load, setLoad]=useState(false)
  const collection=useSelector(state=> state.collection)
  const [rowData, setRowData]=useState({})
  const fetchAllCollection=async()=>{
    dispatch(allCollection({loading:true, error:"", data:null}))
    try{
      let Collections=await  axios.get(`${config.apiUrl}/collection/allCollection`)
      if(Collections.data.message=="succeed"){
         dispatch(allCollection({loading:false, error:"",data:Collections.data.data}))
         setAllcollection(Collections.data.data)
         setLoad(true)
      }else{
        dispatch(allCollection({loading:false, data:null, error:Collections.data.message}))
    }
    }catch(error){
      console.log("The error", error)
      dispatch(allCollection({loading:false, error:"Some thing went wrong", data:null}))
    }
  }
  const {open, setOpen}=useStateContext()
  const handleRowClick = (rowData) => {
    setRowData(rowData)
  
  }

  useEffect(()=>{
    fetchAllCollection()
  }, [])
  return (
    <div className='h-full w-full bg-green-800'>
    {collection.loading ? 
      <div className='flex items-center justify-center h-full w-full' >
        <Stack sx={{ width: '100%', color: 'grey.500' }}>
          <LinearProgress color="secondary" />
        </Stack>
      </div>:
    <div className='h-full w-full bg-green-400'>
      {collection.error !=='' ?<Alert sx={{mt: 2, mb: 2}} severity="error">{collection.error}</Alert>:
    load &&
    <Box sx={{borderBottom:1 , borderColor:"divider",height:100}}>
      <TableContainer component={Paper} sx={{maxHeight:640}}>
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
          
        </Table>
      </TableContainer>

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
                    onChange={(e) => setRowData({ ...rowData, fullName: e.target.value })}
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
                    id="callResponce"
                    label="Call responce"
                    type="text"
                    placeholder='Enter call responce'
                    fullWidth
                    value={rowData.callResponce}
                    onChange={(e) => setRowData({ ...rowData, callResponce: e.target.value })}
                />
            </div>
            <div className='flex flex-col gap-2'>
                <TextField
                    margin='dense'
                    id="paymentStatus"
                    label="payment status"
                    type="text"
                    fullWidth
                    value={rowData.paymentStatus}
                    onChange={(e) => setRowData({ ...rowData, paymentStatus: e.target.value })}
                />
                <TextField
                    margin='dense'
                    id="paidAmount"
                    label="Paid amount"
                    type="text"
                    fullWidth
                    value={rowData.payedAmount}
                    onChange={(e) => setRowData({ ...rowData, approved: e.target.value })}
                />
                <TextField
                    margin="dense"
                    id="date"
                    label="Date"
                    type="date"
                    fullWidth
                    value={rowData.date}
                    onChange={(e) => setRowData({ ...rowData, approved: e.target.value })}
                />
            </div>
        </div>
      </DialogContent>
        <DialogActions>
          <Button onClick={()=>setOpen(false)}>Submit</Button>
          <Button autoFocus onClick={()=>setOpen(false)}>Cancel</Button>
        </DialogActions>
       </Dialog>
    </Box>
  }
   </div>}
  </div>
  );
}