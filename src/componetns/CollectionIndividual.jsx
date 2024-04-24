import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { TableFooter } from '@mui/material';
// import { collectionPerUser } from '../features/collection/collectionSlice';
import { collectionPerUser } from '../features/collection/individualSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';
import Alert from '@mui/material/Alert';
import axios from 'axios';
import DateRange from './Colletion/DateRange';
import { useStateContext } from '../context/ContextProvider';
import config from '../config/config';
import Profile from './Profile';

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
  // Add your custom logic here
}

const StyledTableRow = styled(TableRow)(({ theme }) => ({

  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));




export default function CollectionIndividual() {
  const dispatch=useDispatch()
  const collection=useSelector(state=>state.individualCollection)
  const [collectionloaded, setCollectionloaded]=useState(false)
  const [coll, setColl]=useState(null)
  const {dateRanges, setDateRanges}=useStateContext()
  const {filter, setFilter}=useStateContext()
  const [rankedData, setRankedData] = useState([]);
  const {dashboard, setDashboard}=useStateContext()
  const fetchCollectionPerUser=async()=>{
    // dispatch(collectionPerUser({loading:true, error:"", data:null}))
    try{
      const collections=await axios.post(`${config.apiUrl}/collection/customer`, dateRanges)
      if(collections.data.message=="succeed"){
        let perIndividualCollection=collections.data.data
         const sortedData = perIndividualCollection.sort((a, b) => b.totalCollectedAmount- a.totalCollectedAmount);
         const rankedDatas = sortedData.map((row, index) => ({ ...row, rank: index + 1 }));
         setRankedData(rankedDatas);
          dispatch(collectionPerUser({loading:false,error:"", data:perIndividualCollection}))
          setColl(perIndividualCollection)
          setCollectionloaded(true)
          setFilter(false)
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
      <div className=''>
        {dashboard ?
         <div className='flex flex-auto'>
             {dashboard && <Profile/>}
             <p className='font-semibold w-full text-center text-2xl pb-2 font-arial text-black border-b-2 rounded-lg'>Collection Performance</p>
             <DateRange/>
         </div>:
         <DateRange/>
        }
      </div>
      
    {collection.error !=='' ?<Alert sx={{mt: 2, mb: 2}} severity="error">{collection.error}</Alert>:
    <div className='h-full w-full'>
    {collection.data!==null &&
    <div>
    <TableContainer component={Paper} sx={{maxHeight:740}}>
      <Table sx={{ minWidth: 650 }} stickyHeader aria-label="simple table">
        <TableHead>
          <TableRow style={styles} >
            <StyledTableCell style={styles} >User Name</StyledTableCell>
            <StyledTableCell align='right' style={styles} >Total Contacted customer</StyledTableCell>
            <StyledTableCell align="right" style={styles} >Total Payed Customer</StyledTableCell>
            <StyledTableCell align="right" style={styles} >Total Unpayed Customer</StyledTableCell>
            <StyledTableCell align="right" style={styles} >Total Payed Amount</StyledTableCell>
            <StyledTableCell align="right" style={styles} >Rank</StyledTableCell>
            {/* <TableCell align="right">Protein&nbsp;(g)</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {rankedData.map((row, id) => (
            <StyledTableRow
              key={id}
              sx={{ '&:last-child td, &:last-child th': { border: 0, fontFamily:"serif" } }}
              onClick={(event) => handleRowClick(event, row)}
              className={{
              }}
            >
              <StyledTableCell component="th" scope="row">
                {row.fullName}
              </StyledTableCell>
              <StyledTableCell align="right">{row.totalCustomer}</StyledTableCell>
              <StyledTableCell align="right">{row.totalPaid}</StyledTableCell>
              <StyledTableCell align="right">{row.totalUnpaid}</StyledTableCell>
              <StyledTableCell align="right">{Math.round(row.totalCollectedAmount).toLocaleString()}</StyledTableCell>
              <StyledTableCell align="right">{row.rank}</StyledTableCell>
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