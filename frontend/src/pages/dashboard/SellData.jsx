import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

function SellData() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Replace this URL with the correct API endpoint for your Sell data
    axios.get('http://localhost:5000/api/get-sell-sheet-data')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div>
      {data.length > 0 ? (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: 'green', color: 'white' }}>
                <TableCell sx={{ color: 'white' }}>Buy Date</TableCell>
                <TableCell sx={{ color: 'white' }}>ETF Code</TableCell>
                <TableCell sx={{ color: 'white' }}>underlying asset</TableCell>
                <TableCell sx={{ color: 'white' }}>Actual Shares</TableCell>
                <TableCell sx={{ color: 'white' }}>Buy Price</TableCell>
                <TableCell sx={{ color: 'white' }}>Suggested Shares</TableCell>
                <TableCell sx={{ color: 'white' }}>Invested Amount</TableCell>
                <TableCell sx={{ color: 'white' }}>Sell Price</TableCell>
                <TableCell sx={{ color: 'white' }}>Sell Date</TableCell>
                <TableCell sx={{ color: 'white' }}>Shares Sold</TableCell>
                <TableCell sx={{ color: 'white' }}>Shares Remaining</TableCell>
                <TableCell sx={{ color: 'white' }}>Invested Amt Till This Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.buyDate}</TableCell>
                  <TableCell>{row.etfCode}</TableCell>
                  <TableCell>{row.underlyingAsset}</TableCell>
                  <TableCell>{row.actualShare}</TableCell>
                  <TableCell>{row.buyPrice}</TableCell>
                  <TableCell>{row.suggestedShare}</TableCell>
                  <TableCell>{row.investedAmt}</TableCell>
                  <TableCell>{row.sellPrice}</TableCell>
                  <TableCell>{row.sellDate}</TableCell>
                  <TableCell>{row.sharesSold}</TableCell>
                  <TableCell>{row.sharesLeft}</TableCell>
                  <TableCell>{row.investedAmount}</TableCell>
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

export default SellData;