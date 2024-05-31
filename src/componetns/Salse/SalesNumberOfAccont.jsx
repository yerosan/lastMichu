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
import {Button, Dialog, DialogTitle, DialogContent} from "@mui/material"
import { salsePerUser } from '../../features/salse/individualSalseSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';
import Alert from '@mui/material/Alert';
import axios from 'axios';
import DateRange from './DateRange';
import { useStateContext } from '../../context/ContextProvider';
import config from '../../config/config';
import Profile from '../Profile';
import DownloadForOfflineOutlinedIcon from '@mui/icons-material/DownloadForOfflineOutlined';
import * as XLSX from "xlsx"

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

export default function SalesNumberOfAccountperformance() {
  const dispatch=useDispatch()
  const salse=useSelector(state=>state.individualSalse)
  const [salseloaded, setSalseloaded]=useState(false)
  const [sale, setSale]=useState(null)
  const {dateRanges, setDateRanges}=useStateContext()
  const {filter, setFilter}=useStateContext()
  const [rankedData, setRankedData] = useState([]);
  const {dashboard, setDashboard}=useStateContext()
  const {maxTableHeight, setMaxTableHeight} = useStateContext();
  const fetchSalsePerUser=async()=>{
    try{
      const salsess=await axios.post(`${config.apiUrl}/salse/salsePerformance`, dateRanges)
      if(salsess.data.message=="succeed"){
        let perIndividualSalse=salsess.data.data
         const sortedData = perIndividualSalse.sort((a, b) => b.numberOfAccount - a.numberOfAccount );
         const rankedDatas = sortedData.map((row, index) => ({ ...row, rank: index + 1 }));
         setRankedData(rankedDatas);
          dispatch(salsePerUser({loading:false,error:"", data:perIndividualSalse}))
          setSale(perIndividualSalse)
          setSalseloaded(true)
          setFilter(false)
      }else{
        dispatch(salsePerUser({loading:false, error:salsess.data.message, data:null}))
      }

    }catch(erro){
      console.log("the error", erro, salse,)
      dispatch(salsePerUser({loading:false, error:"Something went wrong", data:null}))
    }
  }
  if(filter){
    fetchSalsePerUser()
  }
  useEffect(() => {
    const handleResize = () => {
      if(Window.innerHeight>1200){
        setMaxTableHeight(840);
      }else{
        setMaxTableHeight(600)
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [window.innerHeight]);

  const handleXlsxDownload = () => {
    const worksheet = XLSX.utils.json_to_sheet(rankedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'My Data');
    XLSX.writeFile(workbook, 'my_data.xlsx');
  };
  


  useEffect(()=>{
    fetchSalsePerUser()
  },[])
  return (
    <div className='h-full w-full'>
      {salse.loading ? 
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
             <p className='font-semibold w-full text-center text-2xl pb-2 font-arial text-black border-b-2 rounded-lg'> Number Of Accont Base Sales Performance</p>
             
             <DateRange/>
         </div>:
         <div className='flex flex-auto'>
            <p className='font-semibold w-full text-center text-2xl pb-2 font-arial text-black border-b-2 rounded-lg'> Number Of Accont Base Sales Performance</p>
            <DateRange/>
         </div>
        }
      </div>
      
    {salse.error !=='' ?<Alert sx={{mt: 2, mb: 2}} severity="error">{salse.error}</Alert>:
    <div className='h-full w-full'>
    {salse.data!==null &&
    <div className='h-full w-full'>
    <TableContainer component={Paper} sx={{maxHeight:maxTableHeight}}>
      <Table sx={{ minWidth: 650 }} stickyHeader aria-label="simple table">
        <TableHead>
          <TableRow style={styles} >
            <StyledTableCell style={styles} >User Name</StyledTableCell>
            <StyledTableCell align='right' style={styles} >Unique Customer</StyledTableCell>
            <StyledTableCell align="right" style={styles} >Total Number Of Account</StyledTableCell>
            <StyledTableCell align="right" style={styles} >Total Disbursed Amount</StyledTableCell>
            {/* <StyledTableCell align="right" style={styles} >Total Income</StyledTableCell> */}
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
              <StyledTableCell align="right">{row.uniqueCustomer}</StyledTableCell>
              <StyledTableCell align="right">{row.numberOfAccount}</StyledTableCell>
              <StyledTableCell align="right">{Math.round(row.totalDisbursed)}</StyledTableCell>
              {/* <StyledTableCell align="right">{Math.round(row.income).toLocaleString()}</StyledTableCell> */}
              <StyledTableCell align="right">{row.rank}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    {rankedData.length >0 &&
      <div className='mt-2 flex justify-end ml-4'>
      <Button variant="contained" onClick={handleXlsxDownload}><DownloadForOfflineOutlinedIcon/></Button>
      </div>
    }
    </div>
}
  </div>
  }
  </div>}
  </div>
  );
}