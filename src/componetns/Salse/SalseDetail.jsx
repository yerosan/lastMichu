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
import {TableFooter} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect} from 'react';
import axios from 'axios';
import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';
import Alert from '@mui/material/Alert';
import config from '../../config/config';
import { useStateContext } from '../../context/ContextProvider';
import { allSalse } from '../../features/salse/salseSlice';
import SalseFilter from './SalseFilter';
import DownloadForOfflineOutlinedIcon from '@mui/icons-material/DownloadForOfflineOutlined';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import * as XLSX from 'xlsx';
// import { CSVWriter } from 'react-csv';

import { CSVLink, CSVDownload } from "react-csv";

import MenuItem from '@mui/material/MenuItem';
import { data } from 'autoprefixer';


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


export default function SalseDetail() {
  const userIn=useSelector(state=>state.logins)
  const dispatch=useDispatch()
  const [salse,setSalse]=useState(null)
  const [load, setLoad]=useState(false)
  const salseData=useSelector(state=> state.salse)
  const [rowData, setRowData]=useState({})
  const {salseFilter, setSalseFilter}=useStateContext()
  const {detail , setDetail}=useStateContext()
  const [delets,setDelets]=useState(false)
  const [userDistrict, setUserDistrict]=useState(null)
  const [deleteRow, setDeleteRow]=useState({})
  let [userDistrictss, setUserDistrictss]= useState([])
  const [download, setDownload]=useState(null)
  const Download=[]
  const detailData=salseFilter

  const VISIBLE_FIELDS= ["fullName","district","uniqueCustomer","numberOfAccount","disbursedAmount","income","date"]
  
  const fetchAllSalse=async()=>{
    dispatch(allSalse({loading:true, error:"", data:null}))
    try{
      let salses=await  axios.post(`${config.apiUrl}/salse/getData`, detailData)
      if(salses.data.message=="succeed"){
         dispatch(allSalse({loading:false, error:"",data:salses.data.data}))
         setSalse(salses.data.data)
         setLoad(true)
         setDetail(false)
      }else{
        dispatch(allSalse({loading:false, data:null, error:salses.data.message}))
        setDetail(false)
    }
    }catch(error){
      dispatch(allSalse({loading:false, error:"Something went wrong", data:null}))
      setDetail(false)
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



  const {open, setOpen}=useStateContext()
  const handleRowClick = (params) => {
    setRowData(params.row)
  }

  if(detail){
    fetchAllSalse()
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

  const handleUpdate=()=>{
    updateData(rowData)
    setOpen(false)
  }


  const handleDelete=async()=>{
    let data={salseId:rowData.salseId, userId:rowData.userId}
    try{
      let deleteData= await  axios.delete(`${config.apiUrl}/salse/delete`, {data})
      if(deleteData.data.message=="succeed"){
        fetchAllSalse()
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
      getDistrict(props.row.userId)
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
    fetchAllSalse()
  }, [])
  return (
    <div className='h-full w-full'>
    {salseData.loading ? 
      <div className='flex items-center justify-center h-full w-full' >
        <Stack sx={{ width: '100%', color: 'grey.500' }}>
          <LinearProgress color="secondary" />
        </Stack>
      </div>:
    <div className='h-full w-full'>
      <SalseFilter/>
      {salseData.error !=='' ?<Alert sx={{mt: 2, mb: 2}} severity="error">{salseData.error}</Alert>:
    load &&
    <div className=''>
    <Box sx={{borderBottom:1 , borderColor:"divider",height:100}}>
       <div style={{ height:500, width: '100%'}}>
          <DataGrid
            rows={salse.map((row, index) => ({ ...row, id: index }))}
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
                <TextField
                    margin="dense"
                    id="uniqueCustomer"
                    label="Unique customer"
                    type="text"
                    placeholder='Enter unique customer'
                    fullWidth
                    value={rowData.uniqueCustomer}
                    onChange={(e) => setRowData({ ...rowData, uniqueCustomer: e.target.value })}
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
                      id="numberOfAccount"
                      label="Number of account"
                      name='numberOfAccount'
                      value={rowData.numberOfAccount}
                      placeholder='Enter number of account'
                      // onChange={handleForm}
                      onChange={(e) => setRowData({ ...rowData, numberOfAccount: e.target.value })}
                    >
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
                      id="disbursedAmount"
                      label="Disbursed Amount"
                      value={rowData.disbursedAmount}
                      placeholder='Enter disbursed Amount'
                      onChange={(e) => setRowData({ ...rowData, disbursedAmount: e.target.value })}
                    >
                    </TextField>
                  </div>
                </Box>
                <TextField
                    margin='dense'
                    id="income"
                    label="Income"
                    type="text"
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
            className='text-center font-semibold text-lg'>Are you sure to delete <span className='font-light te'>{rowData.fullName}'s</span> data on {rowData.date} date ?
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