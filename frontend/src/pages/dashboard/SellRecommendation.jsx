import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Typography, Box, Button, TextField, Modal
} from '@mui/material';
import { NumericFormat } from 'react-number-format';

export default function SellRecommendation() {
  const [sellRecommendations, setSellRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [brokerageFees, setBrokerageFees] = useState({});
  const [open, setOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [shareCount, setShareCount] = useState(0);

  useEffect(() => {
    const fetchSellRecommendations = async () => {
      try {
        const profitPercent = localStorage.getItem('profitPercent') || 2;
        const response = await axios.get(`http://localhost:5000/api/sell-recommendations?profitPercent=${profitPercent}`);
        setSellRecommendations(response.data.sellRecommendations);
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch sell recommendations:', err);
        setError(true);
        setLoading(false);
      }
    };
    fetchSellRecommendations();
  }, []);

  const handleSellClick = (row) => {
    setSelectedRow(row);
    setShareCount(row.selectedShares);
    setOpen(true);
  };

  const handleConfirmSell = async () => {
    if (!selectedRow) return;
    try {
      const sellDate = new Date().toISOString().split('T')[0];
      const response = await axios.post('http://localhost:5000/api/sell', {
        etfCode: selectedRow.stockCode,
        sellPrice: selectedRow.currentCMP,
        sellDate,
        shares: shareCount,
        brokerageFees: parseFloat(brokerageFees[selectedRow.stockCode] || 0)
      });
      alert(response.data.message);
      setOpen(false);
      window.location.reload();
    } catch (error) {
      console.error('Sell request failed:', error);
      alert('Sell request failed. Please try again.');
    }
  };

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>Error fetching data</Typography>;

  return (
    <Box>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#0a2351', color: 'white' }}>
              <TableCell sx={{ color: 'white' }}>Stock Code</TableCell>
              <TableCell sx={{ color: 'white' }}>Buy PRICE</TableCell>
              <TableCell sx={{ color: 'white' }}>Current CMP</TableCell>
              <TableCell sx={{ color: 'white' }}>Shares</TableCell>
              <TableCell sx={{ color: 'white' }}>Recommendation</TableCell>
              <TableCell sx={{ color: 'white' }}>Brokerage Fees</TableCell>
              <TableCell sx={{ color: 'white' }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sellRecommendations.length > 0 ? (
              sellRecommendations.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.stockCode}</TableCell>
                  <TableCell>
                    <NumericFormat value={row.buyPrice} displayType="text" thousandSeparator prefix="₹" />
                  </TableCell>
                  <TableCell>
                    <NumericFormat value={row.currentCMP} displayType="text" thousandSeparator prefix="₹" />
                  </TableCell>
                  <TableCell>{row.selectedShares}</TableCell>
                  <TableCell>{row.recommendation}</TableCell>
                  <TableCell>
                    <TextField
                      type="number"
                      size="small"
                      variant="outlined"
                      label="₹ Brokerage"
                      value={brokerageFees[row.stockCode] || ''}
                      onChange={(e) => setBrokerageFees({
                        ...brokerageFees,
                        [row.stockCode]: e.target.value
                      })}
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      onClick={() => handleSellClick(row)}
                    >
                      SELL
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} align="center">No Sell Recommendations</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal for Sell Summary */}
      {/* Modal for Sell Summary */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2
        }}>
          {selectedRow && (
            <>
              <Typography variant="h5" component="h2" fontWeight="bold">
                Sell Order Summary
              </Typography>
              <Typography>Stock: {selectedRow.stockCode}</Typography>
              <Typography>CMP: ₹{selectedRow.currentCMP}</Typography>
              <Typography>Shares: {selectedRow.selectedShares}</Typography>
              <Typography>Shares to sell: {shareCount}</Typography>
              
              <Box display="flex" alignItems="center" marginY={2}>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => setShareCount(prev => Math.max(1, prev - 1))}
                  sx={{ marginRight: 1 }}
                >
                  -1
                </Button>
                <Typography>{shareCount}</Typography>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => setShareCount(prev => prev + 1)}
                  sx={{ marginLeft: 1 }}
                  disabled={shareCount >= selectedRow.selectedShares}

                >
                  +1
                </Button>
              </Box>
              
              <Button variant="contained" color="success" fullWidth onClick={handleConfirmSell}>
                Confirm Sell
              </Button>
            </>
          )}
        </Box>
      </Modal>
    </Box>
  );
}