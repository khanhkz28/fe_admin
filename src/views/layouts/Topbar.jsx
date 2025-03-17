import * as React from 'react';
import { useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { useNavigate } from 'react-router-dom';
import { Divider, ListItemIcon } from '@mui/material';
import Logout from '@mui/icons-material/Logout';
import { logout } from '../../api/Collections/Authcation';
import BasicModal from '../components/ModalProfile';
import AuthContext from '../../context';

const pages = [
  { name: 'Home', path: '/home' },
  { name: 'User', path: '/user' },
];

function ResponsiveAppBar() {
  const navigate = useNavigate();
  const { user, logoutData } = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      const response = await logout();
      console.log("Logout Response:", response);
      logoutData();
      localStorage.removeItem("token");
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <AppBar 
      position="static" 
      sx={{ 
        width: "100vw", 
        background: 'linear-gradient(90deg, #4A00E0 0%, #8E2DE2 100%)', // Màu gradient tím
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between', py: 1 }}>
          {/* Logo Section - Moved to Left */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, color: '#fff' }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.2rem',
                color: '#fff',
                textDecoration: 'none',
                '&:hover': { color: '#E0E0E0' },
              }}
            >
              LOGO1
            </Typography>

            {/* Mobile Logo */}
            <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1, color: '#fff' }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                display: { xs: 'flex', md: 'none' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.2rem',
                color: '#fff',
                textDecoration: 'none',
              }}
            >
              LOGO
            </Typography>
          </Box>

          {/* Navigation Buttons - Centered */}
          <Box 
            sx={{ 
              flexGrow: 1, 
              display: { xs: 'none', md: 'flex' }, 
              justifyContent: 'center',
              gap: 2 
            }}
          >
            {pages.map((page) => (
              <Button
                key={page.name}
                onClick={() => navigate(page.path)}
                sx={{ 
                  color: '#fff', 
                  fontWeight: 500,
                  px: 3,
                  py: 1,
                  borderRadius: '20px',
                  '&:hover': { 
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    color: '#E0E0E0'
                  }
                }}
              >
                {page.name}
              </Button>
            ))}
          </Box>

          {/* User Section - Right */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Tooltip title="Account settings">
              <IconButton
                onClick={handleClick}
                size="small"
                sx={{ ml: 1 }}
                aria-controls={open ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
              >
                <Avatar 
                  sx={{ 
                    width: 36, 
                    height: 36, 
                    bgcolor: '#fff', 
                    color: '#4A00E0',
                    fontWeight: 600 
                  }}
                >
                  {user?.name?.charAt(0) || 'M'}
                </Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={open}
              onClose={handleClose}
              slotProps={{
                paper: {
                  elevation: 0,
                  sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.25))',
                    mt: 1.5,
                    bgcolor: '#fff',
                    borderRadius: '8px',
                    '& .MuiAvatar-root': {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    '&::before': {
                      content: '""',
                      display: 'block',
                      position: 'absolute',
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: '#fff',
                      transform: 'translateY(-50%) rotate(45deg)',
                      zIndex: 0,
                    },
                  },
                },
              }}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
              <MenuItem sx={{ py: 1 }}>
                <Avatar sx={{ bgcolor: '#4A00E0', color: '#fff' }} />
                <BasicModal dataUser={user} />
              </MenuItem>
              <Divider sx={{ mx: 1 }} />
              <MenuItem 
                onClick={handleLogout}
                sx={{ 
                  py: 1,
                  '&:hover': { 
                    bgcolor: 'rgba(74,0,224,0.1)',
                    color: '#4A00E0' 
                  }
                }}
              >
                <ListItemIcon>
                  <Logout fontSize="small" sx={{ color: '#4A00E0' }} />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;