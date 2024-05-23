import * as React from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import axios from 'axios';
import config from '../../config/config';
import { operationalDetail } from '../../features/operational/operationalDetail';
import {Button, Dialog, DialogTitle, DialogContent} from "@mui/material"
import { Tooltip, IconButton, DialogContentText, DialogActions, Box } from '@mui/material';
import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';
import Alert from "@mui/material/Alert"
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import DetailFilter from './DetailFilter';
import DeleteIcon from "@mui/icons-material/Delete"
import { Edit } from '@mui/icons-material';

import MenuItem from '@mui/material/MenuItem';
import { useStateContext } from '../../context/ContextProvider';
const VISIBLE_FIELDS = ['officerName', 'customerName', 'customerPhone', 'applicationStatus', 'approvedAmount', 'RejectionReason', 'approvalDate'];

const approvalStatus = [
  {
    value: 'approved',
    label: 'Approved',
  },
  {
    value: 'rejected',
    label: 'Rejected',
  },
  {
      value: 'blocked',
      label: 'Blocked',
    }
];


export default function UserDataEditting() {
  const operationalDetails = useSelector(state => state.operationalDetail);
  const [rowData, setRowData]=useState({})
  const [delets,setDelets]=useState(false)
  const {open, setOpen}=useStateContext()
  const {detailfilter, setDetailfilter}=useStateContext()
  const dispatch = useDispatch();
  const currentDate= new Date()
  const currentMonth=currentDate.getMonth()+1
  const currentYear=currentDate.getFullYear()
  const toDayDate=currentDate.getDate()
  const month = `0${currentMonth}`.slice(-2);
  const dayDate = `0${toDayDate}`.slice(-2);
  const today=`${currentYear}-${month}-${dayDate}`;
  const dateSet = { startDate: today, endDate: today };
  const {detail,setDetail}=useStateContext()
  const {dateVeriation, setDateVeriation}=useStateContext()
  const userIn=useSelector(state=>state.logins)
  dateSet.userId=userIn.data.userId
  const fetchDetailOperation = async () => {
    try {
      const detailData = await axios.post(`${config.apiUrl}/operational/userData`,dateSet);
      if (detailData.data.message === "succeed") {
        dispatch(operationalDetail({ loading: false, error: "", data: detailData.data.data }));
        setDetail(false)
      } else {
        dispatch(operationalDetail({ loading: false, error: detailData.data.message, data: null }));
        setDetail(false)
      }
    } catch (error) {
      console.log("An internal error", error);
      dispatch(operationalDetail({ loading: false, error: "Something went wrong", data: null }));
      setDetail(false)
    }
  }
  const updateData= async(data)=>{
    try{
      let update= await axios.patch(`${config.apiUrl}/operational/operationaUpdate`, data)
      if (update.data.message=="succeed"){
        fetchDetailOperation()
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

  if(detail){
    fetchDetailOperation()
  }

  const handleRowClick = (params) => {
    setRowData(params.row)
  };

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
  
      </div>
    )
  }

  useEffect(() => {
    fetchDetailOperation();
  }, []);

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


  return (
    <div style={{ height: 550, width: '100%'}}>
       {operationalDetails.loading ?  
          <div className='flex items-center justify-center h-full w-full' >
          <Stack sx={{ width: '100%', color: 'grey.500' }}>
            <LinearProgress color="secondary" />
          </Stack>
        </div>:
       <div className='h-full w-full'>
       {operationalDetails.error !==""? <Alert sx={{mt: 2, mb: 2}} severity="error">{operationalDetails.error}</Alert>:
       <div className='h-full w-full'>
      
      {operationalDetails.data && (
        <div className='h-full w-full'>
          {/* <DetailFilter/> */}
          <DataGrid
            rows={operationalDetails.data.map((row, index) => ({ ...row, id: index }))}
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
      )}
      </div>
}
</div>}

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
                    id="officerName"
                    label="Officer Name"
                    type="text"
                    fullWidth
                    value={rowData.officerName || ""}
                    />
                <TextField
                    margin="dense"
                    id="customerName"
                    label="Customer Name"
                    type="text"
                    placeholder='Enter customer Name'
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
                      id="applicationStatus"
                      select
                      label="Application Status"
                      name='applicationStatus'
                      value={rowData.applicationStatus}
                      placeholder='Select call response'
                      onChange={(e) => setRowData({ ...rowData, applicationStatus: e.target.value })}
                    >
                      {approvalStatus.map((option) => (
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
                      id="RejectionReason"
                      select
                      // name='paymentStatus'
                      label="Rejection Reason"
                      value={rowData.RejectionReason}
                      placeholder='select rejection reason'
                      onChange={(e) => setRowData({ ...rowData, RejectionReason: e.target.value })}
                    >
                      {approvalStatus.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </div>
                </Box>
                <TextField
                    margin='dense'
                    id="approvedAmount"
                    label="Approved Amount"
                    type="text"
                    fullWidth
                    value={rowData.approvedAmount}
                    onChange={(e) => setRowData({ ...rowData, approvedAmount: e.target.value })}
                />
                <TextField
                    margin="dense"
                    id="approvalDate"
                    label="Approval Date"
                    type="date"
                    fullWidth
                    value={rowData.approvalDate}
                />
            </div>
        </div>
      </DialogContent>
        <DialogActions>
          <Button onClick={handleUpdate}>Submit</Button>
          <Button autoFocus onClick={()=>setOpen(false)}>Cancel</Button>
        </DialogActions>
       </Dialog>

    </div>
  );
}
