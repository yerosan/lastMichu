import * as React from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import axios from 'axios';
import config from '../../config/config';
import { operationalDetail } from '../../features/operational/operationalDetail';
import {Button, Dialog, DialogTitle, DialogContent} from "@mui/material"
import { Tooltip, IconButton, DialogContentText, DialogActions, Box } from '@mui/material';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import DetailFilter from './DetailFilter';

import DeleteIcon from "@mui/icons-material/Delete"
// import { useState } from 'react';
// import {Button, Dialog, DialogTitle, DialogContent} from "@mui/material"
import { Edit } from '@mui/icons-material';

import MenuItem from '@mui/material/MenuItem';
import { useStateContext } from '../../context/ContextProvider';
const VISIBLE_FIELDS = ['officerName',"customerId", 'customerName', 'customerPhone',"callStatus", 'applicationStatus', 'approvedAmount', 'RejectionReason', 'approvalDate'];

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


export default function OperationalDetail() {
  const operationalDetails = useSelector(state => state.operationalDetail);
  const [rowData, setRowData]=useState({})
  const [delets,setDelets]=useState(false)
  const {open, setOpen}=useStateContext()
  const {detailfilter, setDetailfilter}=useStateContext()
  const dispatch = useDispatch();
  const dateSet = { startDate: "2024-05-15", endDate: "2024-05-21" };
  const {detail,setDetail}=useStateContext()
  const {dateVeriation, setDateVeriation}=useStateContext()

  const fetchDetailOperation = async () => {
    try {
      const detailData = await axios.post(`${config.apiUrl}/operational/givenDateData`, detailfilter);
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


  const handleDelete=async()=>{
    let dataId=rowData.operationalId
    try{
      let deleteData= await  axios.delete(`${config.apiUrl}/operational/deleteData/${dataId}`)
      console.log("This is the deleteData", deleteData)
      if(deleteData.data.message=="succeed"){
        fetchDetailOperation()
        setDelets(false)
      }else{
        alert(deleteData.data.message)
        setDelets(false)
      }
  }catch(error){
    setDelets(false)
    alert('An internal error')
  }
  }
  const handleRowClick = (params) => {
    console.log("Row data:", params.row);
    setRowData(params.row)
    // Perform any additional actions with the row data here
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
  
        <Tooltip title="Delete" placement="bottom-end" arrow>
          <IconButton onClick={(event)=>DeleteHandler(event, props.row)}>
            <DeleteIcon/>
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
    <div style={{ height: 650, width: '100%'}}>
      {operationalDetails.data && (
        <div className='h-full w-full'>
          <DetailFilter/>
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
                    // onChange={(e) => setRowData({ ...rowData, fullName: e.target.value })}
                    />
                  
                  <TextField
                    margin="dense"
                    id="customerId"
                    label="Customer Id"
                    type="text"
                    placeholder='Enter customer id'
                    fullWidth
                    value={rowData.customerId}
                    onChange={(e) => setRowData({ ...rowData, customerId: e.target.value })}
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

                <TextField
                    margin='dense'
                    id="callStatus"
                    label="Call Status"
                    type="text"
                    fullWidth
                    value={rowData.callStatus}
                    onChange={(e) => setRowData({ ...rowData, callStatus: e.target.value })}
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
                      id="RejectionReason"
                      name='RejectionReason'
                      label="Rejection Reason"
                      value={rowData.RejectionReason}
                      placeholder='select rejection reason'
                      onChange={(e) => setRowData({ ...rowData, RejectionReason: e.target.value })}
                    >
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
                    onChange={(e) => setRowData({ ...rowData, approvalDate: e.target.value })}
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
            className='text-center font-semibold text-lg'>Are you sure to delete {rowData.officerName}'s data on {rowData.approvalDate} date ?
            </p>
          </DialogTitle>
            <DialogActions>
              <Button sx={{textTransform: 'capitalize'}}  onClick={handleDelete}>Yes</Button>
              <Button sx={{textTransform: 'capitalize'}}  autoFocus onClick={()=>setDelets(false)}>No</Button>
            </DialogActions>
        </Dialog>
    </div>
  );
}
