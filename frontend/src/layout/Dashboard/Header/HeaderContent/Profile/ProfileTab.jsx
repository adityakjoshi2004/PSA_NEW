import PropTypes from 'prop-types';
import { useState } from 'react';

// material-ui
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

// icons
import EditOutlined from '@ant-design/icons/EditOutlined';
import ProfileOutlined from '@ant-design/icons/ProfileOutlined';
import LogoutOutlined from '@ant-design/icons/LogoutOutlined';
import UserOutlined from '@ant-design/icons/UserOutlined';

// Dummy User Data (Replace with API call)
const initialUserData = {
  username: 'JohnDoe',
  email: 'johndoe@example.com',
  country: 'USA',
  age: 25,
  profession: 'Software Engineer',
  dob: '1999-05-15'
};

export default function ProfileTab({ handleLogout }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [openEdit, setOpenEdit] = useState(false);
  const [openView, setOpenView] = useState(false);
  const [userData, setUserData] = useState(initialUserData);
  const [passwordChange, setPasswordChange] = useState(false);
  const [passwords, setPasswords] = useState({ current: '', new: '', confirmNew: '' });

  const handleListItemClick = (index) => {
    setSelectedIndex(index);
    if (index === 0) setOpenEdit(true); // Open Edit Profile
    if (index === 1) setOpenView(true); // Open View Profile
  };

  const handleSaveProfile = () => {
    console.log('Updated Profile Data:', userData);
    setOpenEdit(false);
  };

  const handlePasswordChange = () => {
    if (!passwords.current) {
      alert('Please enter your current password');
      return;
    }
    if (passwords.new !== passwords.confirmNew) {
      alert('New passwords do not match');
      return;
    }
    console.log('Password changed successfully');
    setPasswordChange(false);
  };

  return (
    <>
      <List component="nav" sx={{ p: 0, '& .MuiListItemIcon-root': { minWidth: 32 } }}>
        <ListItemButton selected={selectedIndex === 0} onClick={() => handleListItemClick(0)}>
          <ListItemIcon><EditOutlined /></ListItemIcon>
          <ListItemText primary="Edit Profile" />
        </ListItemButton>

        <ListItemButton selected={selectedIndex === 1} onClick={() => handleListItemClick(1)}>
          <ListItemIcon><UserOutlined /></ListItemIcon>
          <ListItemText primary="View Profile" />
        </ListItemButton>

        <ListItemButton onClick={handleLogout}>
          <ListItemIcon><LogoutOutlined /></ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItemButton>
      </List>

      {/* Edit Profile Dialog */}
      <Dialog open={openEdit} onClose={() => setOpenEdit(false)} fullWidth maxWidth="sm">
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogContent>
          <TextField label="Username" fullWidth margin="dense" value={userData.username} 
            onChange={(e) => setUserData({ ...userData, username: e.target.value })} />
          <TextField label="Email" fullWidth margin="dense" value={userData.email} 
            onChange={(e) => setUserData({ ...userData, email: e.target.value })} />
          <TextField label="Country" fullWidth margin="dense" value={userData.country} 
            onChange={(e) => setUserData({ ...userData, country: e.target.value })} />
          <TextField label="Age" type="number" fullWidth margin="dense" value={userData.age} 
            onChange={(e) => setUserData({ ...userData, age: e.target.value })} />
          <TextField label="Profession" fullWidth margin="dense" value={userData.profession} 
            onChange={(e) => setUserData({ ...userData, profession: e.target.value })} />
          <TextField label="Date of Birth" type="date" fullWidth margin="dense" value={userData.dob} 
            onChange={(e) => setUserData({ ...userData, dob: e.target.value })} />

          <Button onClick={() => setPasswordChange(true)} sx={{ mt: 2 }} variant="contained">Change Password</Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEdit(false)}>Cancel</Button>
          <Button onClick={handleSaveProfile} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>

      {/* Change Password Dialog */}
      <Dialog open={passwordChange} onClose={() => setPasswordChange(false)} fullWidth maxWidth="sm">
        <DialogTitle>Change Password</DialogTitle>
        <DialogContent>
          <TextField label="Current Password" type="password" fullWidth margin="dense" 
            onChange={(e) => setPasswords({ ...passwords, current: e.target.value })} />
          <TextField label="New Password" type="password" fullWidth margin="dense" 
            onChange={(e) => setPasswords({ ...passwords, new: e.target.value })} />
          <TextField label="Confirm New Password" type="password" fullWidth margin="dense" 
            onChange={(e) => setPasswords({ ...passwords, confirmNew: e.target.value })} />
          <Button onClick={() => alert('Redirecting to Forgot Password...')} sx={{ mt: 2 }} variant="text">Forgot Password?</Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPasswordChange(false)}>Cancel</Button>
          <Button onClick={handlePasswordChange} variant="contained">Change Password</Button>
        </DialogActions>
      </Dialog>

      {/* View Profile Dialog */}
      <Dialog open={openView} onClose={() => setOpenView(false)} fullWidth maxWidth="sm">
        <DialogTitle>Profile Details</DialogTitle>
        <DialogContent>
          <p><strong>Username:</strong> {userData.username}</p>
          <p><strong>Email:</strong> {userData.email}</p>
          <p><strong>Country:</strong> {userData.country}</p>
          <p><strong>Age:</strong> {userData.age}</p>
          <p><strong>Profession:</strong> {userData.profession}</p>
          <p><strong>Date of Birth:</strong> {userData.dob}</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenView(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

ProfileTab.propTypes = { handleLogout: PropTypes.func };
