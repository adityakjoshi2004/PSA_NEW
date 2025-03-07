import { useRef, useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import MainCard from 'components/MainCard';
import Transitions from 'components/@extended/Transitions';
import BellOutlined from '@ant-design/icons/BellOutlined';
import CheckCircleOutlined from '@ant-design/icons/CheckCircleOutlined';
import GiftOutlined from '@ant-design/icons/GiftOutlined';
import MessageOutlined from '@ant-design/icons/MessageOutlined';
import SettingOutlined from '@ant-design/icons/SettingOutlined';

// Notification Icon Styles
const avatarSX = {
  width: 36,
  height: 36,
  fontSize: '1rem'
};

const actionSX = {
  mt: '6px',
  ml: 1,
  top: 'auto',
  right: 'auto',
  alignSelf: 'flex-start',
  transform: 'none'
};

export default function Notification() {
  const theme = useTheme();
  const matchesXs = useMediaQuery(theme.breakpoints.down('md'));

  const anchorRef = useRef(null);
  const [read, setRead] = useState(2);
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "It's Cristina danny's birthday today.",
      time: '2 min ago',
      icon: <GiftOutlined />,
      color: 'success'
    },
    {
      id: 2,
      title: 'Aida Burg commented on your post.',
      time: '5 August',
      icon: <MessageOutlined />,
      color: 'primary'
    }
  ]);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  // Market Notification Logic
  useEffect(() => {
    // Function to add market alert notification
    const addMarketNotification = () => {
      const newNotification = {
        id: Date.now(),
        title: 'The stock market is now open!',
        time: 'Just now',
        icon: <SettingOutlined />,
        color: 'error'
      };

      setNotifications((prev) => [newNotification, ...prev]);
      setRead((prev) => prev + 1);
    };

    // Check market opening time
    const checkMarketOpen = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();

      // Market opening time: 9:15 AM
      if (hours === 1 && minutes === 35) {
        addMarketNotification();
      }
    };

    // Set interval to check time every minute
    const interval = setInterval(checkMarketOpen, 60000);

    return () => clearInterval(interval);
  }, []);

  const iconBackColorOpen = 'grey.100';

  return (
    <Box sx={{ flexShrink: 0, ml: 0.75 }}>
      <IconButton
        color="secondary"
        variant="light"
        sx={{ color: 'text.primary', bgcolor: open ? iconBackColorOpen : 'transparent' }}
        aria-label="open profile"
        ref={anchorRef}
        aria-controls={open ? 'profile-grow' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
      >
        <Badge badgeContent={read} color="primary">
          <BellOutlined />
        </Badge>
      </IconButton>
      <Popper
        placement={matchesXs ? 'bottom' : 'bottom-end'}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        popperOptions={{ modifiers: [{ name: 'offset', options: { offset: [matchesXs ? -5 : 0, 9] } }] }}
      >
        {({ TransitionProps }) => (
          <Transitions type="grow" position={matchesXs ? 'top' : 'top-right'} in={open} {...TransitionProps}>
            <Paper sx={{ boxShadow: theme.customShadows.z1, width: '100%', minWidth: 285, maxWidth: { xs: 285, md: 420 } }}>
              <ClickAwayListener onClickAway={handleClose}>
                <MainCard
                  title="Notification"
                  elevation={0}
                  border={false}
                  content={false}
                  secondary={
                    <>
                      {read > 0 && (
                        <Tooltip title="Mark all as read">
                          <IconButton color="success" size="small" onClick={() => setRead(0)}>
                            <CheckCircleOutlined style={{ fontSize: '1.15rem' }} />
                          </IconButton>
                        </Tooltip>
                      )}
                    </>
                  }
                >
                  <List component="nav">
                    {notifications.map((item) => (
                      <div key={item.id}>
                        <ListItemButton>
                          <ListItemAvatar>
                            <Avatar sx={{ color: `${item.color}.main`, bgcolor: `${item.color}.lighter` }}>
                              {item.icon}
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText primary={item.title} secondary={item.time} />
                          <ListItemSecondaryAction>
                            <Typography variant="caption" noWrap>
                              {new Date().toLocaleTimeString()}
                            </Typography>
                          </ListItemSecondaryAction>
                        </ListItemButton>
                        <Divider />
                      </div>
                    ))}
                  </List>
                </MainCard>
              </ClickAwayListener>
            </Paper>
          </Transitions>
        )}
      </Popper>
    </Box>
  );
}
