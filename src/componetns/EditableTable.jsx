import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { TextField } from '@mui/material';


function createData(name, approved, rejected, applicante, date,action) {
    return { name, approved, rejected, applicante, date,action };
  }

const rows = [
    createData('Yerosan Tadesse', 159, 6.0, 24, 4.0),
    createData('Shewanek Zewudu', 237, 9.0, 37, 4.3),
    createData('Yerosan Tadesse1', 262, 16.0, 24, 6.0),
    createData('Yerosan Tadesse2', 305, 3.7, 67, 4.3),
    createData('Shewanek Zewudu1', 356, 16.0, 49, 3.9),
    createData('Yerosan Tadesse3', 159, 6.0, 24, 4.0),
    createData('Shewanek Zewudu3', 237, 9.0, 37, 4.3),
    createData('Yerosan Tadesse12', 262, 16.0, 24, 6.0),
    createData('Yerosan Tadesse23', 305, 3.7, 67, 4.3),
    createData('Shewanek Zewudu13', 356, 16.0, 49, 3.9),
    createData('Yerosan Tadesse21', 159, 6.0, 24, 4.0),
    createData('Shewanek Zewudu12', 237, 9.0, 37, 4.3),
    createData('Yerosan Tadesse14', 262, 16.0, 24, 6.0),
    createData('Yerosan Tadesse25', 305, 3.7, 67, 4.3),
    createData('Shewanek Zewudu14', 356, 16.0, 49, 3.9),
  ];

const EditableTable = () => {
    const [open, setOpen] = useState(false);
    const [rowData, setRowData] = useState({});
    
    const handleRowClick = (data) => {
      setRowData(data);
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    const handleSave = () => {
      // Handle saving edited data here
      console.log('Saving edited data:', rowData);
      handleClose();
    };
  
    return (
      <div>
        <TableContainer component={Paper}>
          <Table>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.id} onClick={() => handleRowClick(row)}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.age}</TableCell>
                  <TableCell>{row.city}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
  
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Edit Row</DialogTitle>
          <DialogContent>
            <TextField
              margin="dense"
              id="name"
              label="Name"
              type="text"
              fullWidth
              value={rowData.name || ''}
              onChange={(e) => setRowData({ ...rowData, name: e.target.value })}
            />
            <TextField
              margin="dense"
              id="age"
              label="Age"
              type="number"
              fullWidth
              value={rowData.age || ''}
              onChange={(e) => setRowData({ ...rowData, age: e.target.value })}
            />
            <TextField
              margin="dense"
              id="city"
              label="City"
              type="text"
              fullWidth
              value={rowData.city || ''}
              onChange={(e) => setRowData({ ...rowData, city: e.target.value })}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleSave} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  };
  
  export default EditableTable;
  