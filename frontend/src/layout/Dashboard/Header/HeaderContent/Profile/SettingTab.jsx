import { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { CommentOutlined, LockOutlined, QuestionCircleOutlined, UserOutlined, UnorderedListOutlined } from '@ant-design/icons';

export default function SettingTab() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [investment, setInvestment] = useState(localStorage.getItem('totalInvestment') || 100000);
  const [profit, setProfit] = useState(localStorage.getItem('profitPercent') || 2); // Default 2%

  useEffect(() => {
    setInvestment(localStorage.getItem('totalInvestment') || 100000);
    setProfit(localStorage.getItem('profitPercent') || 2);
  }, []);

  console.log(`Profit Percentage: ${profit}%`);

  const handleSaveInvestment = () => {
    localStorage.setItem('totalInvestment', investment);
    alert('Investment amount saved!');
  };

  const handleSaveProfit = () => {
    localStorage.setItem('profitPercent', profit);
    alert('Your sell recommendation will now use this profit percentage!');
  };

  return (
    <Box>
      <List component="nav" sx={{ p: 0, '& .MuiListItemIcon-root': { minWidth: 32 } }}>
        <ListItemButton selected={selectedIndex === 0} onClick={() => setSelectedIndex(0)}>
          <ListItemIcon><QuestionCircleOutlined /></ListItemIcon>
          <ListItemText primary="Support" />
        </ListItemButton>
        <ListItemButton selected={selectedIndex === 1} onClick={() => setSelectedIndex(1)}>
          <ListItemIcon><UserOutlined /></ListItemIcon>
          <ListItemText primary="Account Settings" />
        </ListItemButton>
        <ListItemButton selected={selectedIndex === 2} onClick={() => setSelectedIndex(2)}>
          <ListItemIcon><LockOutlined /></ListItemIcon>
          <ListItemText primary="Privacy Center" />
        </ListItemButton>
        <ListItemButton selected={selectedIndex === 3} onClick={() => setSelectedIndex(3)}>
          <ListItemIcon><CommentOutlined /></ListItemIcon>
          <ListItemText primary="Feedback" />
        </ListItemButton>
        <ListItemButton selected={selectedIndex === 4} onClick={() => setSelectedIndex(4)}>
          <ListItemIcon><UnorderedListOutlined /></ListItemIcon>
          <ListItemText primary="History" />
        </ListItemButton>
      </List>

      {selectedIndex === 1 && (
        <Box>
          {/* Investment Settings */}
          <Box sx={{ mt: 3, p: 2, border: '1px solid #ccc', borderRadius: 2 }}>
            <Typography variant="h6">Investment Settings</Typography>
            <TextField
              label="Total Investment"
              type="number"
              fullWidth
              value={investment}
              onChange={(e) => setInvestment(e.target.value)}
              sx={{ my: 2 }}
            />
            <Button variant="contained" color="primary" fullWidth onClick={handleSaveInvestment}>
              Save Investment
            </Button>
          </Box>

          {/* Profit Percentage Settings */}
          <Box sx={{ mt: 3, p: 2, border: '1px solid #ccc', borderRadius: 2 }}>
            <Typography variant="h6">Profit Percentage</Typography>
            <TextField
              label="Set Profit Percentage (%)"
              type="number"
              fullWidth
              value={profit}
              onChange={(e) => setProfit(e.target.value)}
              sx={{ my: 2 }}
            />
            <Button variant="contained" color="primary" fullWidth onClick={handleSaveProfit}>
              Save Profit Percentage
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
}
