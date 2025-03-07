import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,useTheme } from '@mui/material';

function BuyData() {
  const [data, setData] = useState([]);
  const theme = useTheme();

  useEffect(() => {
    axios.get('http://localhost:5000/api/get-buy-sheet-data')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div>
      {/* <h3>Sheet Data</h3> */}
      {data.length > 0 ? (
        <TableContainer component={Paper}>
          <Table>
                       <TableHead sx={{
                                   backgroundColor: theme.palette.mode === 'dark' ? '#0a2351' : '#0a2351', // Dark background in dark mode
                                   color: theme.palette.mode === 'dark' ? '#fff' : '#fff'  // White text in both modes
                                 }}>
              <TableRow>
                <TableCell  sx={{ color: 'white' }}>Date</TableCell>
                <TableCell sx={{ color: 'white' }}>CMP</TableCell>
                <TableCell sx={{ color: 'white' }}>Stock Code</TableCell>
                <TableCell sx={{ color: 'white' }}>Suggested QTY</TableCell>
                <TableCell sx={{ color: 'white' }}>BUY PRICE</TableCell>
                <TableCell sx={{ color: 'white' }}>Actual QTY</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row, index) => (
               <TableRow  key={index}
                               sx={{
                                 backgroundColor: theme.palette.mode === 'dark' ? '#424242' : '#fff', // Row background color change
                                 '&:hover': {
                                   backgroundColor: theme.palette.mode === 'dark' ? '#616161' : '#f5f5f5', // Hover effect color change
                                 },
                               }}>
                  <TableCell>{row[0]}</TableCell>
                  <TableCell>{row[1]}</TableCell>
                  <TableCell>{row[2]}</TableCell>
                  <TableCell>{row[3]}</TableCell>
                  <TableCell>{row[4]}</TableCell>
                  <TableCell>{row[5]}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default BuyData;