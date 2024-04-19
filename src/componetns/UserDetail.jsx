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

// function createData(name, contacted, payed, unpayed, totalPayed) {
//   return { name, contacted, payed, unpayed, totalPayed };
// }
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
    console.log(",.....", collection)
    try{
      const collections=await axios.get(`${config.apiUrl}/user/allUser`)
      if(collections.data.message=="succeed"){
        //  const sortedData = collections.data.data.sort((a, b) => b.totalCollectedAmount- a.totalCollectedAmount);
        //  const rankedDatas = sortedData.map((row, index) => ({ ...row, rank: index + 1 }));
         setRankedData(collections.data.data);
          dispatch(collectionPerUser({loading:false,error:"", data:collections.data.data}))
          console.log("The userS===========", collections.data.data)
          setColl(collections.data.data)
          setCollectionloaded(true)
        //   setFilter(false)
      }else{
        dispatch(collectionPerUser({loading:false, error:collections.data.message, data:null}))
        console.log("The userSError===========", collections.data.data)
      }

    }catch(erro){
      console.log("the error", erro, collection,)
      dispatch(collectionPerUser({loading:false, error:"Something went wrong", data:null}))
    }
  }
  if(filter){
    fetchCollectionPerUser()
  }
  // useEffect(()=>{
  //   console.log("this isCollect-----------", collection, coll)
  // },[collection])

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
            {/* <StyledTableCell align="right" style={styles} >Total Unpayed Customer</StyledTableCell>
            <StyledTableCell align="right" style={styles} >Total Payed Amount</StyledTableCell>
            <StyledTableCell align="right" style={styles} >Rank</StyledTableCell> */}
            {/* <TableCell align="right">Protein&nbsp;(g)</TableCell> */}
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
              {/* <StyledTableCell align="right">{row.totalPaid}</StyledTableCell>
              <StyledTableCell align="right">{row.totalUnpaid}</StyledTableCell>
              <StyledTableCell align="right">{row.totalCollectedAmount}</StyledTableCell>
              <StyledTableCell align="right">{row.rank}</StyledTableCell> */}
            </StyledTableRow>
          ))}
        </TableBody>
        {/* <TableFooter style={styles} sx={{backgroundColor:"#e38524", border:2}}> 
            <StyledTableCell style={styles}>Total</StyledTableCell>
            <StyledTableCell align='right' style={footerStyles}>{totalStatus.totalApproved}</StyledTableCell> 
            <StyledTableCell align='right' style={footerStyles}>{totalStatus.totalRejected}</StyledTableCell> 
            <StyledTableCell align='right' style={footerStyles}>{totalStatus.totalApplicant}</StyledTableCell>
            <StyledTableCell align='right' style={footerStyles}>50000</StyledTableCell>
            <StyledTableCell align='right' style={footerStyles}></StyledTableCell>
          </TableFooter>  */}
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