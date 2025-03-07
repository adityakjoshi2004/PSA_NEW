import { useState } from "react";
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import {
  EditOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons"; // Keep only Ant Design icons
import CloseIcon from "@mui/icons-material/Close"; // ✅ Fix: Use MUI CloseIcon

export default function ProfileTab() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [modalType, setModalType] = useState(""); // "edit" or "view"
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "123-456-7890",
  });

  const handleListItemClick = (index, type) => {
    setSelectedIndex(index);
    if (type) {
      setModalType(type);
      setOpenModal(true);
    }
  };

  const handleSaveProfile = () => {
    alert("Profile updated successfully!");
    setOpenModal(false);
  };

  return (
    <Box>
      <List component="nav" sx={{ p: 0, "& .MuiListItemIcon-root": { minWidth: 32 } }}>
        <ListItemButton selected={selectedIndex === 0} onClick={() => handleListItemClick(0, "edit")}>
          <ListItemIcon>
            <EditOutlined />
          </ListItemIcon>
          <ListItemText primary="Edit Profile" />
        </ListItemButton>

        <ListItemButton selected={selectedIndex === 1} onClick={() => handleListItemClick(1, "view")}>
          <ListItemIcon>
            <UserOutlined />
          </ListItemIcon>
          <ListItemText primary="View Profile" />
        </ListItemButton>

        <ListItemButton selected={selectedIndex === 2} onClick={() => alert("Logging out...")}>
          <ListItemIcon>
            <LogoutOutlined />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItemButton>
      </List>

      {/* Modal for Edit & View Profile */}
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
            <CloseIcon />
          </IconButton>

          {/* Modal Title */}
          <Typography variant="h5" fontWeight="bold" mb={2}>
            {modalType === "edit" ? "Edit Profile" : "View Profile"}
          </Typography>

          {modalType === "edit" ? (
            <Box>
              <TextField
                label="Full Name"
                fullWidth
                variant="outlined"
                sx={{ mb: 2 }}
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              />
              <TextField
                label="Email"
                fullWidth
                variant="outlined"
                sx={{ mb: 2 }}
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
              />
              <TextField
                label="Phone"
                fullWidth
                variant="outlined"
                sx={{ mb: 2 }}
                value={profile.phone}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
              />

              <Button variant="contained" color="primary" fullWidth onClick={handleSaveProfile}>
                Save Changes
              </Button>
            </Box>
          ) : (
            <Box textAlign="left">
              <Typography variant="h6">
                <strong>Name:</strong> {profile.name}
              </Typography>
              <Typography variant="h6">
                <strong>Email:</strong> {profile.email}
              </Typography>
              <Typography variant="h6">
                <strong>Phone:</strong> {profile.phone}
              </Typography>
            </Box>
          )}
        </Box>
      </Modal>
    </Box>
  );
}
