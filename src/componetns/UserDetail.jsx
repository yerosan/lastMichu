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
import { TableFooter } from '@mui/material';
import { collectionPerUser } from '../features/collection/collectionSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';
import Alert from '@mui/material/Alert';
import axios from 'axios';
import DateRange from './Colletion/DateRange';
import { useStateContext } from '../context/ContextProvider';
import UserRole from './UserRole';
import DeleteIcon from '@mui/icons-material/Delete';
import config from '../config/config';

const styles={
  fontFamily:"serif",
  fontWeight:"bold",
  color:"black"
}
const totalStatus={"totalRejected":20000,"totalApproved":3000,"totalApplicant":4000}

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


const handleRowClick = (event, rowData) => {
  console.log('Clicked row data:', rowData);
  // Add your custom logic here
}

const StyledTableRow = styled(TableRow)(({ theme }) => ({

  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));




export default function UserDetail() {
  const dispatch=useDispatch()
  const collection=useSelector(state=>state.collection)
  const [collectionloaded, setCollectionloaded]=useState(false)
  const [coll, setColl]=useState(null)
  const {dateRanges, setDateRanges}=useStateContext()
  const {filter, setFilter}=useStateContext()
  const [rankedData, setRankedData] = useState([]);
  const fetchCollectionPerUser=async()=>{
    dispatch(collectionPerUser({loading:true, error:"", data:null}))
    try{
      const collections=await axios.get(`${config.apiUrl}/user/allUser`)
      if(collections.data.message=="succeed"){
         setRankedData(collections.data.data);
          dispatch(collectionPerUser({loading:false,error:"", data:collections.data.data}))
          setColl(collections.data.data)
          setCollectionloaded(true)
      }else{
        dispatch(collectionPerUser({loading:false, error:collections.data.message, data:null}))
      }

    }catch(erro){
      console.log("the error", erro, collection,)
      dispatch(collectionPerUser({loading:false, error:"Something went wrong", data:null}))
    }
  }
  if(filter){
    fetchCollectionPerUser()
  }

  useEffect(()=>{
    fetchCollectionPerUser()
  },[])
  return (
    <div className='h-full w-full'>
      {collection.loading ? 
      <div className='flex items-center justify-center h-full w-full' >
        <Stack sx={{ width: '100%', color: 'grey.500' }}>
          <LinearProgress color="secondary" />
        </Stack>
      </div>:
    <div className='h-full w-full'>
      {/* <DateRange/> */}
    {collection.error !=='' ?<Alert sx={{mt: 2, mb: 2}} severity="error">{collection.error}</Alert>:
    <div className='h-full w-full'>
    {collection.data!==null &&
    <div>
    <TableContainer component={Paper} sx={{maxHeight:540}}>
      <Table sx={{ minWidth: 450 }} stickyHeader aria-label="simple table">
        <TableHead>
          <TableRow style={styles} >
            <StyledTableCell style={styles} >User Name</StyledTableCell>
            <StyledTableCell align='left' style={styles} >Full Name</StyledTableCell>
            <StyledTableCell align="center" style={styles} >Role</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rankedData.map((row) => (
            <StyledTableRow
              key={row.userName}
              sx={{ '&:last-child td, &:last-child th': { border: 0, fontFamily:"serif" } }}
              onClick={(event) => handleRowClick(event, row)}
              className={{
              }}
            >
            <StyledTableCell component="th" scope="row">
                {row.userName}
              </StyledTableCell>
              <StyledTableCell align="left">{row.fullName}</StyledTableCell>
              <StyledTableCell align="center">< UserRole userName={row.userName}/></StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
}
  </div>
  }
  </div>}
  </div>
  );
}