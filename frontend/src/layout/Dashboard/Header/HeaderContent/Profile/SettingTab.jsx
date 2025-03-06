import { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography, List, ListItemButton, ListItemIcon, ListItemText, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { CommentOutlined, LockOutlined, QuestionCircleOutlined, UserOutlined, UnorderedListOutlined, MailOutlined, MessageOutlined, InfoCircleOutlined } from '@ant-design/icons';

export default function SettingTab() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [investment, setInvestment] = useState(localStorage.getItem('totalInvestment') || 100000);
  const [profit, setProfit] = useState(localStorage.getItem('profitPercent') || 2);
  const [query, setQuery] = useState('');
  const [openFaq, setOpenFaq] = useState(false);

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

  const handleSubmitQuery = () => {
    if (!query.trim()) {
      alert('Please enter your query.');
      return;
    }
    alert('Your query has been submitted. Our support team will contact you soon.');
    setQuery('');
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
      </List>

      {/* Support Section */}
      {selectedIndex === 0 && (
        <Box sx={{ mt: 3, p: 2, border: '1px solid #ccc', borderRadius: 2 }}>
          <Typography variant="h6">Support</Typography>

          {/* Submit Query */}
          <TextField
            label="Describe your issue"
            multiline
            rows={3}
            fullWidth
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            sx={{ my: 2 }}
          />
          <Button variant="contained" color="primary" fullWidth onClick={handleSubmitQuery}>
            Submit Query
          </Button>

          {/* Contact Support */}
          <Button
            variant="outlined"
            color="secondary"
            fullWidth
            sx={{ mt: 2 }}
            onClick={() => window.open('mailto:support@example.com', '_blank')}
          >
            Contact Support
          </Button>

          {/* FAQ Button */}
          <Button variant="text" color="info" fullWidth sx={{ mt: 2 }} onClick={() => setOpenFaq(true)}>
            View FAQs
          </Button>
        </Box>
      )}

      {/* Account Settings Section */}
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

      {/* FAQs Dialog */}
      <Dialog open={openFaq} onClose={() => setOpenFaq(false)} fullWidth maxWidth="sm">
        <DialogTitle>Frequently Asked Questions</DialogTitle>
        <DialogContent>
          <Typography><strong>Q1:</strong> How do I reset my password?</Typography>
          <Typography color="textSecondary">A: Click on "Forgot Password" on the login page.</Typography>
          <br />
          <Typography><strong>Q2:</strong> How do I update my profile details?</Typography>
          <Typography color="textSecondary">A: Go to "Account Settings" and edit your details.</Typography>
          <br />
          <Typography><strong>Q3:</strong> How can I contact support?</Typography>
          <Typography color="textSecondary">A: Use the "Contact Support" button to email us.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenFaq(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
