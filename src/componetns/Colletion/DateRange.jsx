import React, { useState } from "react"; 
// import { DateRangePicker } from "rsuite"; 
// import "rsuite/dist/rsuite.css"; 
import { useStateContext } from "../../context/ContextProvider";
  
import { TextField, Button, Container, Stack, Paper } from '@mui/material';
const currentDate=new Date()
const currentMonth=currentDate.getMonth()+1
const currentYear=currentDate.getFullYear()
const currentDay=currentDate.getDate()
const month = `0${currentMonth}`.slice(-2);
const day = `0${currentDay}`.slice(-2);
const today=`${currentYear}-${month}-${day}`;
// const dateRange=[new Date(today), new Date(today)]
import { Tooltip, IconButton, DialogContentText, DialogActions, Box } from '@mui/material';
import {Dialog, DialogTitle, DialogContent} from "@mui/material"


import { Edit } from '@mui/icons-material';
import DeleteIcon from "@mui/icons-material/Delete"
import FilterListIcon from '@mui/icons-material/FilterList';
const initialDate={
  startDate:today,
  endDate:today
}
const DateRange = () => {
  const [delets,setDelets]=useState(false)
  const {dateRanges, setDateRanges}=useStateContext()
  const {filter, setFilter}=useStateContext()

  const filterHandler=(event)=>{
    setDelets(true)
  }

  const submitClick=()=>{
    setDelets(false)
    setFilter(true)
  }

  const cancelClick=()=>{
    setDelets(false)
  }


  return (
    <div className="flex items-center justify-end my-1 pl-30">

      <Tooltip title="Filter by date " placement="bottom-end" arrow>
        <IconButton onClick={(event)=>filterHandler()}>
          <FilterListIcon/>
        </IconButton>
      </Tooltip>

      <Dialog 
        open={delets}
        onClose={delets=>{setDelets(false)}}
        aria-label='dialog-title' 
        aria-describedby='dialog-descriptio'

      >
        <DialogTitle
          sx={{fontFamily:"arial", 
          fontWeight:"semibold",
          color:'secondary.main',
        }}>
          <p 
          className='text-center font-semibold text-lg'>Select start and end date !
          </p>
        </DialogTitle>
        <DialogContent>
          <div className="flex gap-3 p-1 justify-between items-center">
          
          <TextField
              margin="dense"
              id="startDate"
              label="Start date"
              type="date"
              fullWidth
              value={dateRanges.startDate}
              onChange={(e) => setDateRanges({ ...dateRanges, startDate: e.target.value })}
          />
          <TextField
              margin="dense"
              id="endDate"
              label="End date"
              type="date"
              fullWidth
              value={dateRanges.endDate}
              onChange={(e) => setDateRanges({ ...dateRanges, endDate: e.target.value })}
          />
        </div>
        </DialogContent>
          <DialogActions>
            <Button sx={{textTransform: 'capitalize'}}  onClick={submitClick}>filter</Button>
            <Button sx={{textTransform: 'capitalize'}}  autoFocus onClick={cancelClick}>cancel</Button>
          </DialogActions>
      </Dialog>
      
    </div>
  );
}

export default DateRange;
