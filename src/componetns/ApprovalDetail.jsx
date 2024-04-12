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
import {Alert,AlertTitle} from '@mui/material';


function createData(name, approved, rejected, applicante, date) {
  return { name, approved, rejected, applicante, date };
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
  createData('Yerosan Tadesse', 159, 6.0, 24, "2024/02/24"),
  createData('Shewanek Zewudu', 237, 9.0, 37, "2024/02/24"),
  createData('Yerosan Tadesse1', 262, 16.0, 24, "2024/02/24"),
  createData('Yerosan Tadesse2', 305, 3.7, 67, "2024/02/24"),
  createData('Shewanek Zewudu1', 356, 16.0, 49, "2024/02/24"),
  createData('Yerosan Tadesse3', 159, 6.0, 24, "2024/02/24"),
  createData('Shewanek Zewudu3', 237, 9.0, 37, "2024/02/24"),
  createData('Yerosan Tadesse12', 262, 16.0, 24, "2024/02/24"),
  createData('Yerosan Tadesse23', 305, 3.7, 67, "2024/02/24"),
  createData('Shewanek Zewudu13', 356, 16.0, 49, "2024/02/24"),
  createData('Yerosan Tadesse21', 159, 6.0, 24, "2024/02/24"),
  createData('Shewanek Zewudu12', 237, 9.0, 37, "2024/02/24"),
  createData('Yerosan Tadesse14', 262, 16.0, 24, "2024/02/24"),
  createData('Yerosan Tadesse25', 305, 3.7, 67, "2024/02/24"),
  createData('Shewanek Zewudu14', 356, 16.0, 49, "2024/02/24"),
];
const rows=Datas
const Actions=(props)=>{
  const [rowsss, setRowsss]=useState(rows)
  const [deleted, setDeleted]=useState(false)
  const {open, setOpen}=useStateContext()
  const [delets,setDelets]=useState(false)
  const DeleteHandler=(event, row)=>{
    console.log("the delete event", row)
    setDelets(true)
    setRowsss(rowsss=>rowsss.filter(roow=>roow.name!==row.name))
    console.log("the deleted row", rowsss)
    // rows=Datas
  }

  const CancelDelete=(event, row)=>{
    console.log("the delete event", row)
    setDelets(true)
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
          <DialogActions>
            <Button sx={{textTransform: 'capitalize'}} onClick={()=>setDelets(false)}>Yes</Button>
            <Button sx={{textTransform: 'capitalize'}} autoFocus onClick={()=>setDelets(false)}>No</Button>
          </DialogActions>
      </Dialog>

    </div>
  )
}


const totalStatus={"totalRejected":20000,"totalApproved":3000,"totalApplicant":4000}

export default function ApprovalDetail() {
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
              <StyledTableCell align='right' style={styles} >Total Approved (in M)</StyledTableCell>
              <StyledTableCell align="right" style={styles} >Total Rejected (in K)</StyledTableCell>
              <StyledTableCell align="right" style={styles} >Total Application</StyledTableCell>
              <StyledTableCell align="right" style={styles} >Application Date</StyledTableCell>
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
                <StyledTableCell align="right">{row.approved}</StyledTableCell>
                <StyledTableCell align="right">{row.rejected}</StyledTableCell>
                <StyledTableCell align="right">{row.applicante}</StyledTableCell>
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
      <DialogTitle sx={{fontFamily:"arial",fontWeight:"bold", color:"secondary.main"}}>Would like to edit data ?</DialogTitle>
      <DialogContent>
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
        <div className='flex flex-col gap-1'>
          <div className='flex gap-2'>
              <TextField
                margin="dense"
                id="approved"
                label="Approved"
                type="text"
                fullWidth
                value={rowData.approved}
                onChange={(e) => setRowData({ ...rowData, approved: e.target.value })}
              />

              <TextField
              margin="dense"
              id="rejected"
              label="Rejection"
              type="text"
              fullWidth
              value={rowData.rejected}
              onChange={(e) => setRowData({ ...rowData, approved: e.target.value })}
            />
          </div>
          <div className='flex gap-2'>
            <TextField
              margin='dense'
              id="applicante"
              label="Applicante"
              type="text"
              fullWidth
              value={rowData.applicante}
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