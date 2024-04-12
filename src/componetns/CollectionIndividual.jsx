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



function createData(name, contacted, payed, unpayed, totalPayed) {
  return { name, contacted, payed, unpayed, totalPayed };
}
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
 

// const StyledTableCell=styled(TableCell)(({theme})=>({
//   [`&.${tableCellClasses.head}`]: {
//     backgroundColor: "#07ebb9",
//     color: theme.palette.common.white,
//   },
//   [`&.${tableCellClasses.body}`]: {
//     fontSize: 14,
//   },
// }))

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

// const StyledTableRow=styled(TableRow)((theme))=({
//   // '&:nth-of-type(odd)': {
//   //   backgroundColor: theme.palette.action.hover,
//   // },
//   // hide last border
//   '&:last-child td, &:last-child th': {
//     border: 0,
//   },
// })

const handleRowClick = (event, rowData) => {
  console.log('Clicked row data:', rowData);
  // Add your custom logic here
}

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  // '&:nth-of-type(odd)': {
  //   backgroundColor: theme.palette.action.hover,
  // },
  // "hover": {
  //   color: "#cbd5e1",
  //   backgroundColor:"red",
  // },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));


// const useStyles = makeStyles({
//   hoverRow: {
//     '&:hover': {
//       backgroundColor: '#f0f0f0', // Change the background color on hover
//       cursor: 'pointer', // Change cursor to pointer on hover
//     },
//   },
// });


const rows = [
  createData('Yerosan Tadesse', 159, 6.0, 24, 4.0),
  createData('Shewanek Zewudu', 237, 9.0, 37, 4.3),
  createData('Yerosan Tadesse1', 262, 16.0, 24, 6.0),
  createData('Yerosan Tadesse2', 305, 3.7, 67, 4.3),
  createData('Shewanek Zewudu1', 356, 16.0, 49, 3.9),
  createData('Yerosan Tadesse3', 159, 6.0, 24, 4.0),
  createData('Shewanek Zewudu3', 237, 9.0, 37, 4.3),
  createData('Yerosan Tadesse21', 262, 16.0, 24, 6.0),
];


export default function CollectionIndividual() {
  return (
    <TableContainer component={Paper} sx={{maxHeight:440}}>
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
          {rows.map((row) => (
            <StyledTableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0, fontFamily:"serif" } }}
              onClick={(event) => handleRowClick(event, row)}
              className={{
              }}
            >
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="right">{row.contacted}</StyledTableCell>
              <StyledTableCell align="right">{row.payed}</StyledTableCell>
              <StyledTableCell align="right">{row.unpayed}</StyledTableCell>
              <StyledTableCell align="right">{row.totalPayed}</StyledTableCell>
              <StyledTableCell align="right"></StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
        <TableFooter style={styles} sx={{backgroundColor:"#e38524", border:2}}> 
            <StyledTableCell style={styles}>Total</StyledTableCell>
            <StyledTableCell align='right' style={footerStyles}>{totalStatus.totalApproved}</StyledTableCell> 
            <StyledTableCell align='right' style={footerStyles}>{totalStatus.totalRejected}</StyledTableCell> 
            <StyledTableCell align='right' style={footerStyles}>{totalStatus.totalApplicant}</StyledTableCell>
            <StyledTableCell align='right' style={footerStyles}>50000</StyledTableCell>
            <StyledTableCell align='right' style={footerStyles}></StyledTableCell>
          </TableFooter> 
      </Table>
    </TableContainer>
  );
}