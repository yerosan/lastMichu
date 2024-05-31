import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { TableFooter } from '@mui/material'
import { operationalPerUser } from '../../features/operational/IndividualStatus';
import {useSelector, useDispatch} from "react-redux"
import { useEffect, useState } from 'react';
import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';
import Alert from '@mui/material/Alert';
import axios from 'axios';
import DateRange from '../Colletion/DateRange';
import { useStateContext } from '../../context/ContextProvider';
import config from '../../config/config';
import Profile from '../Profile';

import {Button, Dialog, DialogTitle, DialogContent} from "@mui/material"
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


const handleRowClick = (event, rowData) => {
  // Add your custom logic here
}

const StyledTableRow = styled(TableRow)(({ theme }) => ({

  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));




const IndividualStatus = () => {
  const dispatch=useDispatch()
  const operational= useSelector(state=>state.individualOperation)
  // const operational= useSelector(state=>state.operationalDashboard)
  const [operationalload, setOperationalload]=useState(false)
  const [coll, setColl]=useState(null)
  const {dateRanges, setDateRanges}=useStateContext()
  const {filter, setFilter}=useStateContext()
  const [rankedData, setRankedData] = useState([])
  const {dashboard, setDashboard}=useStateContext()
  const {maxTableHeight, setMaxTableHeight} = useStateContext();
  const fetchOperationalPerUser=async()=>{
    try{
      const operationals=await axios.post(`${config.apiUrl}/operational/userStatus`, dateRanges)
      if(operationals.data.message=="succeed"){
        let perIndividualOperational=operationals.data.data
         const sortedData = perIndividualOperational.sort((a, b) => b.approvedAmount- a.approvedAmount);
         const rankedDatas = sortedData.map((row, index) => ({ ...row, rank: index + 1 }));
         setRankedData(rankedDatas);
          dispatch(operationalPerUser({loading:false,error:"", data:perIndividualOperational}))
          setColl(perIndividualOperational)
          setOperationalload(true)
          setFilter(false)
      }else{
        dispatch(operationalPerUser({loading:false, error:operationals.data.message, data:null}))
      }

    }catch(erro){
      console.log("the error", erro, collection,)
      dispatch(operationalPerUser({loading:false, error:"Something went wrong", data:null}))
    }
  }
  if(filter){
    fetchOperationalPerUser()
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
    // const data= salse.map((row, id))
    const worksheet = XLSX.utils.json_to_sheet(rankedData);
    console.log("The rankedData", rankedData)
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'My Data');
    XLSX.writeFile(workbook, 'my_data.xlsx');
  };



  useEffect(()=>{
    fetchOperationalPerUser()
  },[])
  return (
    <div className='h-full w-full'>
      {operational.loading ? 
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
             <p className='font-semibold w-full text-center text-2xl pb-2 font-arial text-black border-b-2 rounded-lg'>Operational Performance</p>
             <DateRange/>
         </div>:
         <DateRange/>
        }
      </div>
      
    {operational.error !=='' ?<Alert sx={{mt: 2, mb: 2}} severity="error">{operational.error}</Alert>:
    <div className='h-full w-full'>
    {operational.data!==null &&
    <div className='h-full w-full'>
    <TableContainer component={Paper} sx={{maxHeight:maxTableHeight}}>
      <Table sx={{ minWidth: 650 }} stickyHeader aria-label="simple table">
        <TableHead>
          <TableRow style={styles} >
            <StyledTableCell style={styles} >Officer Name</StyledTableCell>
            <StyledTableCell align='right' style={styles} >Total Applicant</StyledTableCell>
            <StyledTableCell align="right" style={styles} >Number Of Approved</StyledTableCell>
            <StyledTableCell align="right" style={styles} >Number Of Rejected</StyledTableCell>
            <StyledTableCell align="right" style={styles} >Total Approved Amount</StyledTableCell>
            <StyledTableCell align="right" style={styles} >Rank</StyledTableCell>
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
                {row.officerName}
              </StyledTableCell>
              <StyledTableCell align="right">{row.totalApplicant}</StyledTableCell>
              <StyledTableCell align="right">{row.approvedCustomer}</StyledTableCell>
              <StyledTableCell align="right">{row.totalApplicant - row.approvedCustomer}</StyledTableCell>
              <StyledTableCell align="right">{Math.round(row.approvedAmount).toLocaleString()}</StyledTableCell>
              <StyledTableCell align="right">{row.rank}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    { ! dashboard &&
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

export default IndividualStatus