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
  // '&:nth-of-type(odd)': {
  //   backgroundColor: theme.palette.action.hover,
  // },
  "hover": {
    color: "#cbd5e1",
    backgroundColor:"red",
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));


const Datas = [
  createData('Yerosan Tadesse', 159, 6.0, 24, 4.0,"2024/04/06"),
  createData('Shewanek Zewudu', 237, 9.0, 37, 4.3,"2024/04/06"),
  createData('Yerosan Tadesse1', 262, 16.0, 24, 6.0,"2024/04/06"),
  createData('Yerosan Tadesse2', 305, 3.7, 67, 4.3,"2024/04/06"),
  createData('Shewanek Zewudu1', 356, 16.0, 49, 3.9,"2024/04/06"),
  createData('Yerosan Tadesse3', 159, 6.0, 24, 4.0,"2024/04/06"),
  createData('Shewanek Zewudu3', 237, 9.0, 37, 4.3,"2024/04/06"),
  createData('Yerosan Tadesse12', 262, 16.0, 24, 6.0,"2024/04/06"),
  createData('Yerosan Tadesse23', 305, 3.7, 67, 4.3,"2024/04/06"),
  createData('Shewanek Zewudu13', 356, 16.0, 49, 3.9,"2024/04/06"),
];
const rows=Datas
const Actions=(props)=>{
  const [rowsss, setRowsss]=useState(rows)
  const {open, setOpen}=useStateContext()
  const [delets,setDelets]=useState(false)
  const [deleteRow, setDeleteRow]=useState({})
  const DeleteHandler=(event, row)=>{
    console.log("the delete event", row)
    setDelets(true)
    setDeleteRow(row)
    setRowsss(rowsss=>rowsss.filter(roow=>roow.name!==row.name))
    console.log("the deleted row", rowsss)
    // rows=Datas
  }

  const EditDas=()=>{
    setOpen(true)
  }

  // rows=rowsss
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
          className='text-center font-semibold text-lg'>Are you sure to delete {props.row.name}'s data on {props.row.date} date ?
          </p>
        </DialogTitle>
        {/* <DialogContent>
          Data can not be recovered
        </DialogContent> */}
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
  const [rowData, setRowData]=useState({})
  // const [popUp,setPopup]=useState(false)
  // const [open,setOpen]=useState(false)
  const {open, setOpen}=useStateContext()
  const handleRowClick = (rowData) => {
    console.log('Clicked row data:', rowData);
    setRowData(rowData)
    // setOpen(true)
    console.log("this is row data", rowData)
    // Add your custom logic here
  }
  return (
    <Box sx={{borderBottom:1 , borderColor:"divider"}}>
      <TableContainer component={Paper} sx={{maxHeight:440}}>
        <Table sx={{ minWidth: 650 }} stickyHeader aria-label="simple table">
          <TableHead>
            <TableRow style={styles}>
              <StyledTableCell style={styles} >User Name</StyledTableCell>
              <StyledTableCell align='right' style={styles} >Total Contacted Customer</StyledTableCell>
              <StyledTableCell align="right" style={styles} >Total Payed Customer</StyledTableCell>
              <StyledTableCell align="right" style={styles} >Total Unpayed Custmer</StyledTableCell>
              <StyledTableCell align="right" style={styles} >Total Payed Amount</StyledTableCell>
              <StyledTableCell align="right" style={styles} >Collection Date</StyledTableCell>
              <StyledTableCell align="center" style={styles} >Action</StyledTableCell>
              {/* <TableCell align="right">action&nbsp;(g)</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0, fontFamily:"serif" } }}
                onClick={(event) => handleRowClick(row)}
                className={{
                }}
                hover
              >
                <StyledTableCell component="th" scope="row">
                  {row.name}
                </StyledTableCell>
                <StyledTableCell align="right">{row.contactedCustomer}</StyledTableCell>
                <StyledTableCell align="right">{row.payedCustomer}</StyledTableCell>
                <StyledTableCell align="right">{row.unpayedCustomer}</StyledTableCell>
                <StyledTableCell align="right">{row.totalPayed}</StyledTableCell>
                <StyledTableCell align="right">{row.date}</StyledTableCell>
                <StyledTableCell align="center"><Actions row={row}/> </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
          <TableFooter style={styles} sx={{backgroundColor:"#e38524", border:2}}> 
            <StyledTableCell style={styles}>Total</StyledTableCell>
            <StyledTableCell align='right' style={footerStyles}>{totalStatus.totalApproved}</StyledTableCell> 
            <StyledTableCell align='right' style={footerStyles}>{totalStatus.totalRejected}</StyledTableCell> 
            <StyledTableCell align='right' style={footerStyles}>{totalStatus.totalApplicant}</StyledTableCell>
            <StyledTableCell align='right' style={footerStyles}>{totalStatus.totalApplicant}</StyledTableCell>
            <StyledTableCell align='right' style={footerStyles}>2024/02/06 - 2024/04/06</StyledTableCell>
            <StyledTableCell align='right' style={footerStyles}></StyledTableCell>
          </TableFooter> 
          
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
                    id="name"
                    label="userName"
                    type="text"
                    fullWidth
                    value={rowData.name || ""}
                    onChange={(e) => setRowData({ ...rowData, name: e.target.value })}
                    />
                <TextField
                    margin="dense"
                    id="contacted"
                    label="Contacted customer"
                    type="text"
                    placeholder='Enter total contacted'
                    fullWidth
                    value={rowData.contactedCustomer}
                    onChange={(e) => setRowData({ ...rowData, approved: e.target.value })}
                />

                <TextField
                    margin="dense"
                    id="payed"
                    label="Payed customer"
                    type="text"
                    placeholder='Total payed customer'
                    fullWidth
                    value={rowData.payedCustomer}
                    onChange={(e) => setRowData({ ...rowData, approved: e.target.value })}
                />
            </div>
            <div className='flex flex-col gap-2'>
                <TextField
                    margin='dense'
                    id="Unpayed customer"
                    label="Total unpayed customer"
                    type="text"
                    fullWidth
                    value={rowData.unpayedCustomer}
                    onChange={(e) => setRowData({ ...rowData, approved: e.target.value })}
                />
                <TextField
                    margin='dense'
                    id="Collected Amount"
                    label="Total collected amount"
                    type="text"
                    fullWidth
                    value={rowData.totalPayed}
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
  );
}