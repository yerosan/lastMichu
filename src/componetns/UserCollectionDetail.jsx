import * as React from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import axios from 'axios';
import config from '../config/config';
import { allCollection } from '../features/collection/collectionSlice';
import {Button, Dialog, DialogTitle, DialogContent} from "@mui/material"
import { Tooltip, IconButton, DialogContentText, DialogActions, Box } from '@mui/material';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import DetailFilter from './Colletion/DetailFilter';

import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';
import Alert from "@mui/material/Alert"

import DeleteIcon from "@mui/icons-material/Delete"
import { Edit } from '@mui/icons-material';

import MenuItem from '@mui/material/MenuItem';
import { useStateContext } from '../context/ContextProvider';

const VISIBLE_FIELDS = ['officerName', 'customerPhone', 'callResponce', 'paymentStatus', 'payedAmount', 'date'];
export default function UserDetail() {
  const collection=useSelector(state=> state.collection)
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
  const fetchUserCollectionDetail = async () => {
    dispatch(allCollection({ loading: true, error: "", data:null }))
    try {
      const detailData = await axios.post(`${config.apiUrl}/collection/userDetail`, detailfilter);
      if (detailData.data.message === "succeed") {

        dispatch(allCollection({ loading: false, error: "", data: detailData.data.data }));
        setDetail(false)
      } else {
        dispatch(allCollection({ loading: false, error: detailData.data.message, data: null }));

        setDetail(false)
      }
    } catch (error) {
      console.log("An internal error", error);
      dispatch(allCollection({ loading: false, error: "Something went wrong", data: null }));
      setDetail(false)
    }
  }

  if(detail){
    fetchUserCollectionDetail()
  }


  useEffect(() => {
    fetchUserCollectionDetail();
  }, []);

  const columns = [
    ...VISIBLE_FIELDS.map(field => ({
      field,
      headerName: field.charAt(0).toUpperCase() + field.slice(1),
      width: 150,
    })),
  ];


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
        {collection.data == null ?<Alert sx={{mt: 2, mb: 2}} severity="error">{collection.error}</Alert>:
        <div style={{ height: 600, width: '100%'}}>
            <DataGrid
                rows={collection.data.map((row, index) => ({ ...row, id: index }))}
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
      }
    </div>
    }
    </div>
  );
}
