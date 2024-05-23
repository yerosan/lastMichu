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
import { Edit } from '@mui/icons-material';

import MenuItem from '@mui/material/MenuItem';
import { useStateContext } from '../../context/ContextProvider';
const VISIBLE_FIELDS = ['officerName', 'customerName', 'customerPhone', 'applicationStatus', 'approvedAmount', 'RejectionReason', 'approvalDate'];
export default function UserDetail() {
  const operationalDetails = useSelector(state => state.operationalDetail);
  const [rowData, setRowData]=useState({})
  const [delets,setDelets]=useState(false)
  const {open, setOpen}=useStateContext()
  const {detailfilter, setDetailfilter}=useStateContext()
  const dispatch = useDispatch();
  const dateSet = { startDate: "2024-05-15", endDate: "2024-05-21" };
  const {detail,setDetail}=useStateContext()
  const {dateVeriation, setDateVeriation}=useStateContext()
  const userIn=useSelector(state=>state.logins)
  detailfilter.userId=userIn.data.userId
  const fetchDetailOperation = async () => {
    try {
      const detailData = await axios.post(`${config.apiUrl}/operational/userData`, detailfilter);
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

  if(detail){
    fetchDetailOperation()
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
  ];


  return (
    <div style={{ height: 600, width: '100%'}}>
      {operationalDetails.data && (
        <div className='h-full w-full'>
          <DetailFilter/>
          <DataGrid
            rows={operationalDetails.data.map((row, index) => ({ ...row, id: index }))}
            columns={columns}
            slots={{ toolbar: GridToolbar }}

            sx={{
              '& .MuiDataGrid-columnHeaders': {
                backgroundColor:"#00adef", // Change this color to your desired background color
                fontFamily:"serif",
                fontWeight:"bold",
                color:"black",
                
              },
            }}
          />
        </div>
      )}

    </div>
  );
}
