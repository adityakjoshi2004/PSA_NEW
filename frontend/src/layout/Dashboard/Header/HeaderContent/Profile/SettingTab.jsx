import { useState, useEffect, useContext } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Modal,
  IconButton,
} from "@mui/material";
import {
  CommentOutlined,
  LockOutlined,
  QuestionCircleOutlined,
  UserOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import { ThemeModeContext } from "../../../../../themes";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { Email, Facebook, Twitter, LinkedIn, Close } from "@mui/icons-material";

export default function SettingTab() {
  const { themeMode, toggleTheme } = useContext(ThemeModeContext);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [investment, setInvestment] = useState(localStorage.getItem("totalInvestment") || 100000);
  const [profit, setProfit] = useState(localStorage.getItem("profitPercent") || 2);
  const [openModal, setOpenModal] = useState(false);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    setInvestment(localStorage.getItem("totalInvestment") || 100000);
    setProfit(localStorage.getItem("profitPercent") || 2);
  }, []);

  const handleSaveInvestment = () => {
    localStorage.setItem("totalInvestment", investment);
    alert("Investment amount saved!");
  };

  const handleSaveProfit = () => {
    localStorage.setItem("profitPercent", profit);
    alert("Your sell recommendation will now use this profit percentage!");
  };

  const handleSubmitFeedback = () => {
    alert(`Feedback Submitted: ${feedback}`);
    setFeedback("");
    setOpenModal(false);
  };

  return (
    <Box>
      <List component="nav" sx={{ p: 0, "& .MuiListItemIcon-root": { minWidth: 32 } }}>
        <ListItemButton
          selected={selectedIndex === 0}
          onClick={() => {
            setSelectedIndex(0);
            setOpenModal(true);
          }}
        >
          <ListItemIcon>
            <QuestionCircleOutlined />
          </ListItemIcon>
          <ListItemText primary="Contact us" />
        </ListItemButton>

        <ListItemButton selected={selectedIndex === 1} onClick={() => setSelectedIndex(1)}>
          <ListItemIcon>
            <UserOutlined />
          </ListItemIcon>
          <ListItemText primary="Account Settings" />
        </ListItemButton>

        {/* Dark Mode Toggle */}
        <ListItemButton onClick={toggleTheme}>
          <ListItemIcon>{themeMode === "light" ? <DarkModeIcon /> : <LightModeIcon />}</ListItemIcon>
          <ListItemText primary={themeMode === "light" ? "Dark Mode" : "Light Mode"} />
        </ListItemButton>
      </List>

      {/* Account Settings */}
      {selectedIndex === 1 && (
        <Box>
          {/* Investment Settings */}
          <Box sx={{ mt: 3, p: 2, border: "1px solid #ccc", borderRadius: 2 }}>
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
          <Box sx={{ mt: 3, p: 2, border: "1px solid #ccc", borderRadius: 2 }}>
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

      {/* Contact Us Modal */}
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
            textAlign: "center",
          }}
        >
          {/* Close Button */}
          <IconButton sx={{ position: "absolute", top: 8, right: 8 }} onClick={() => setOpenModal(false)}>
            <Close />
          </IconButton>

          <Typography variant="h5" fontWeight="bold" mb={2}>
            Contact Us
          </Typography>

          {/* Feedback Box */}
          <TextField
            label="Write your feedback..."
            multiline
            rows={4}
            fullWidth
            variant="outlined"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            sx={{ mb: 2 }}
          />

          <Button variant="contained" color="primary" fullWidth onClick={handleSubmitFeedback}>
            Submit Feedback
          </Button>

          {/* Contact Section */}
          <Typography variant="h6" mt={3} mb={1}>
            Reach Us
          </Typography>
          <Typography>
            <Email fontSize="small" /> support@example.com
          </Typography>

          <Box mt={2} display="flex" justifyContent="center" gap={2}>
            <IconButton color="primary">
              <Facebook />
            </IconButton>
            <IconButton color="primary">
              <Twitter />
            </IconButton>
            <IconButton color="primary">
              <LinkedIn />
            </IconButton>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}
