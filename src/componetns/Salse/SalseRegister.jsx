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
import { useState } from 'react';
import {Button, Dialog, DialogTitle, DialogContent} from "@mui/material"
import { Edit } from '@mui/icons-material';
import { useStateContext } from '../../context/ContextProvider';
import {TableFooter} from '@mui/material';
import { salsePerUser } from '../../features/salse/individualSalseSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect} from 'react';
import axios from 'axios';
import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';
import Alert from '@mui/material/Alert';
import config from '../../config/config';
import MenuItem from '@mui/material/MenuItem';
import { districtBranch } from './constant';

import DownloadForOfflineOutlinedIcon from '@mui/icons-material/DownloadForOfflineOutlined';
import * as XLSX from 'xlsx';

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



const totalStatus={"totalRejected":20000,"totalApproved":3000,"totalApplicant":4000}

export default function SalseRegister() {
  const currentDate= new Date()
  const currentMonth=currentDate.getMonth()+1
  const currentYear=currentDate.getFullYear()
  const toDayDate=currentDate.getDate()
  const month = `0${currentMonth}`.slice(-2);
  const dayDate = `0${toDayDate}`.slice(-2);
  const today=`${currentYear}-${month}-${dayDate}`;
  const userIn=useSelector(state=>state.logins)
  const dispatch=useDispatch()
  const [allsalse, setAllsalse]=useState(null)
  const [load, setLoad]=useState(false)
  const salse=useSelector(state=> state.individualSalse)
  const [rowData, setRowData]=useState({})
  const {detailfilter, setDetailfilter}=useStateContext()
  const {detail , setDetail}=useStateContext()
  const detailData={userId:userIn.data.userId, date:today}
  const {open, setOpen}=useStateContext()
  const [district, setDistrict]=useState("")
  const [formactivator, setFormactivator]=useState(false)

  const [userDistrict, setUserDistrict]=useState(null)
  const [deleteRow, setDeleteRow]=useState({})
  let [userDistrictss, setUserDistrictss]= useState([])

  const fetchAllSalse=async()=>{
    dispatch(salsePerUser({loading:true, error:"", data:null}))
    try{
      let salsess=await  axios.post(`${config.apiUrl}/salse/userSalse`, detailData)
      if(salsess.data.message=="succeed"){
         dispatch(salsePerUser({loading:false, error:"",data:salsess.data.data}))
         setAllsalse(salsess.data.data)
         setLoad(true)
         setDetail(false)
      }else{
        dispatch(salsePerUser({loading:false, data:null, error:salsess.data.message}))
        setDetail(false)
    }
    }catch(error){
      console.log("The error", error)
      dispatch(salsePerUser({loading:false, error:"Something went wrong", data:null}))
      setDetail(false)
    }
  }
  const handleRowClick = (rowData) => {
    setRowData(rowData)
    setDistrict(rowData.district)
    setFormactivator(true)
  }

  const updateData= async(data)=>{
    try{
      let update= await axios.patch(`${config.apiUrl}/salse/update`, data)
      if (update.data.message=="succeed"){
        fetchAllSalse()
      }else(
        alert(update.data.message)
      )
    }catch(error){
      alert("Something went wrong")
    }

  }

  const getDistrict= async(userId)=>{
    try{
      let usersDistrict= await axios.get(`${config.apiUrl}/salse/userDistrict/${userId}`)
      const Districtsss=[]
      if(usersDistrict.data.message=="succeed"){
        const data=usersDistrict.data.data
        let datas= Object.keys(usersDistrict.data.data)
        await Promise.all(datas.map(district=>{
          if(data[district]===true){
            Districtsss.push(
              {value:district,
               label:district
              }
            )
          }
        }))
       setUserDistrict(usersDistrict.data.data)
       setUserDistrictss(Districtsss)
       setOpen(true)
      }else{
        setUserDistrict(usersDistrict.data.message)
        setErrors(true)
      }
    }catch(error){
      console.log("The error", error)
    }
  }
  const Actions=(props)=>{
    const {open, setOpen}=useStateContext()
    const EditDas=()=>{
      getDistrict(props.row.userId)
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
  const handleXlsxDownload = () => {
    // const data= salse.map((row, id))
    const worksheet = XLSX.utils.json_to_sheet(allsalse);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'My Data');
    XLSX.writeFile(workbook, 'my_data.xlsx');
  };

  const handleUpdate=()=>{
    updateData(rowData)
    setFormactivator(false)
    setOpen(false)
  }

  useEffect(()=>{
    fetchAllSalse()
  }, [])
  return (
    <div className='h-full w-full'>
    {salse.loading ? 
      <div className='flex items-center justify-center h-full w-full' >
        <Stack sx={{ width: '100%', color: 'grey.500' }}>
          <LinearProgress color="secondary" />
        </Stack>
      </div>:
    <div className='h-full w-full'>
      {salse.error !=='' ?<Alert sx={{mt: 2, mb: 2}} severity="error">{salse.error}</Alert>:
    load &&
    <div className=''>
    <Box sx={{borderBottom:1 , borderColor:"divider",height:100}}>
      <TableContainer component={Paper} sx={{maxHeight:540}}>
        <Table sx={{ minWidth: 650 }} stickyHeader aria-label="simple table">
          <TableHead>
            <TableRow style={styles}>
              <StyledTableCell style={styles} >Officer Name</StyledTableCell>
              <StyledTableCell align="left" style={styles}>District</StyledTableCell>
              <StyledTableCell align="left" style={styles}>Branch</StyledTableCell>
              <StyledTableCell align='left' style={styles} >Number Of Account</StyledTableCell>
              <StyledTableCell align="left" style={styles} >Unique Customer</StyledTableCell>
              <StyledTableCell align="left" style={styles} >Total Disbursed</StyledTableCell>
              <StyledTableCell align="left" style={styles} >Total Income</StyledTableCell>
              <StyledTableCell align="left" style={styles} >Report Date</StyledTableCell>
              <StyledTableCell align="center" style={styles} >Action</StyledTableCell>
              {/* <TableCell align="right">action&nbsp;(g)</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {allsalse.map((row,id) => (
              <StyledTableRow
                key={id}
                sx={{ '&:last-child td, &:last-child th': { border: 0, fontFamily:"serif" } }}
                onClick={(event) => handleRowClick(row)}
                className={{
                }}
                hover
              >
                <StyledTableCell component="th" scope="row">
                  {userIn.data.fullName}
                </StyledTableCell>
                <StyledTableCell align='left'>{row.district}</StyledTableCell>
                <StyledTableCell align='left'>{row.branchName}</StyledTableCell>
                <StyledTableCell align="left">{row.numberOfAccount}</StyledTableCell>
                <StyledTableCell align="left">{row.uniqueCustomer}</StyledTableCell>
                <StyledTableCell align="left">{row.disbursedAmount}</StyledTableCell>
                <StyledTableCell align="left">{row.income}</StyledTableCell>
                <StyledTableCell align="left">{row.date}</StyledTableCell>
                <StyledTableCell align="center"><Actions row={row}/> </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
          
        </Table>
      </TableContainer>
      {allsalse !==null &&
      <div className='mt-2 flex justify-end ml-4'>
         <Button variant="contained" onClick={handleXlsxDownload}><DownloadForOfflineOutlinedIcon/></Button>
      </div>
      }

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
                    value={userIn.data.fullName || ""}
                    />
                <Box
                  component="form"
                  sx={{
                    '& .MuiTextField-root': { my:1 ,width: '100%' },
                  }}
                  noValidate
                  autoComplete="off"
                >
                <TextField
                  id="district"
                  select
                  name='district'
                  label="District"
                  value={rowData.district}
                  placeholder='select district'
                  onChange={(e) => setRowData({ ...rowData, district: e.target.value })}
                >
                  {userDistrictss.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>

                </Box>

                {formactivator  &&
                

                <Box
                  component="form"
                  sx={{
                    '& .MuiTextField-root': { my:1 ,width: '100%' },
                  }}
                  noValidate
                  autoComplete="off"
                >
                <TextField
                  id="branchName"
                  select
                  name='branchName'
                  label="Branch"
                  value={rowData.branchName}
                  placeholder='select district'
                  onChange={(e) => setRowData({ ...rowData, branchName: e.target.value })}
                >
                  {districtBranch[rowData.district].map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>

                </Box>

                  }


                
                <TextField
                    margin="dense"
                    id="numberOfAccount"
                    label="Number of account"
                    type="number"
                    name="numberOfAccount"
                    placeholder='Enter number of account'
                    fullWidth
                    value={rowData.numberOfAccount}
                    onChange={(e) => setRowData({ ...rowData, numberOfAccount: e.target.value })}
                />
                
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
                      id="uniqueCustomer"
                      label="Unique customer"
                      name='uniqueCustomer'
                      type='number'
                      value={rowData.uniqueCustomer}
                      placeholder='Select call response'
                      onChange={(e) => setRowData({ ...rowData, uniqueCustomer: e.target.value })}
                    >
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
                      id="disbursedAmount"
                      label="Disbursed amount"
                      name="disbursedAmount"
                      type='number'
                      value={rowData.disbursedAmount}
                      placeholder='Enter disbursed amount'
                      onChange={(e) => setRowData({ ...rowData, disbursedAmount: e.target.value })}
                    >
                    </TextField>
                  </div>
                </Box>
                <TextField
                    margin='dense'
                    id="income"
                    label="Income"
                    type="number"
                    fullWidth
                    value={rowData.income}
                    onChange={(e) => setRowData({ ...rowData, income: e.target.value })}
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