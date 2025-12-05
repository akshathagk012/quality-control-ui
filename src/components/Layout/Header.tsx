import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Breadcrumbs,
  Link,
} from '@mui/material';
import {
  CalendarToday,
  Notifications,
  HelpOutline,
  KeyboardArrowDown,
} from '@mui/icons-material';
import { useLocation, Link as RouterLink } from 'react-router-dom';
import ViewSwitcher from './ViewSwitcher';
import { useView } from '@/utils/viewContext';

const Header = () => {
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { currentView, setCurrentView } = useView();

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Get breadcrumb path
  const pathnames = location.pathname.split('/').filter((x) => x);
  const breadcrumbMap: Record<string, string> = {
    dashboard: 'Dashboard',
    'admin-dashboard': 'Admin Dashboard',
    configuration: 'Configuration',
    'user-configuration': 'User Configuration',
    'user-management': 'User Management',
    'audit-trail': 'Audit Trail',
    clinical: 'Clinical',
    lab: 'Lab',
    reports: 'Reports',
  };

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        backgroundColor: '#FAFAFA',
        borderRadius: 2,
        color: '#111827',
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', px: 3, py: 1.5 }}>
        {/* Left: Logo and Breadcrumbs */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
          <Typography
            variant="h6"
            component="div"
            sx={{
              color: '#14b8a6',
              fontWeight: 600,
              fontSize: '1.25rem',
              letterSpacing: '-0.025em',
            }}
          >
          
          </Typography>

          <Breadcrumbs
            separator="›"
            aria-label="breadcrumb"
            sx={{
              '& .MuiBreadcrumbs-separator': {
                color: '#9ca3af',
                mx: 1,
              },
            }}
          >
            <Link
              component={RouterLink}
              to="/"
              sx={{
                textDecoration: 'none',
                color: '#6b7280',
                fontSize: '0.875rem',
                '&:hover': {
                  color: '#14b8a6',
                },
              }}
            >
              Quality Control
            </Link>
            {pathnames.map((name, index) => {
              const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
              const isLast = index === pathnames.length - 1;
              return isLast ? (
                <Typography
                  key={name}
                  sx={{
                    color: '#111827',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    textTransform: 'capitalize'
                  }}
                >
                  {breadcrumbMap[name] || name}
                </Typography>
              ) : (
                <Link
                  key={name}
                  component={RouterLink}
                  to={routeTo}
                  sx={{
                    textDecoration: 'none',
                    color: '#6b7280',
                    fontSize: '0.875rem',
                    textTransform: 'capitalize',
                    '&:hover': {
                      color: '#14b8a6',
                    },
                  }}
                >
                  {breadcrumbMap[name] || name}
                </Link>
              );
            })}
          </Breadcrumbs>
        </Box>

        {/* Right: View Switcher, Clinic, Icons, User */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <ViewSwitcher currentView={currentView} onViewChange={setCurrentView} />

          <Typography
            variant="body2"
            sx={{
              color: '#6b7280',
              fontSize: '0.875rem',
            }}
          >
            Clinic: Crysta IVF, Banglore
          </Typography>

          <IconButton
            size="small"
            sx={{
              color: '#6b7280',
              '&:hover': {
                backgroundColor: '#f3f4f6',
                color: '#14b8a6',
              },
            }}
          >
            <CalendarToday fontSize="small" />
          </IconButton>

          <IconButton
            size="small"
            sx={{
              color: '#6b7280',
              position: 'relative',
              '&:hover': {
                backgroundColor: '#f3f4f6',
                color: '#14b8a6',
              },
            }}
          >
            <Notifications fontSize="small" />
            <Box
              sx={{
                position: 'absolute',
                top: 6,
                right: 6,
                width: 8,
                height: 8,
                borderRadius: '50%',
                backgroundColor: '#ef4444',
                border: '2px solid #ffffff',
              }}
            />
          </IconButton>

          <IconButton
            size="small"
            sx={{
              color: '#6b7280',
              '&:hover': {
                backgroundColor: '#f3f4f6',
                color: '#14b8a6',
              },
            }}
          >
            <HelpOutline fontSize="small" />
          </IconButton>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              cursor: 'pointer',
              px: 1.5,
              py: 0.75,
              borderRadius: 2,
              '&:hover': { backgroundColor: '#f3f4f6' },
            }}
            onClick={handleMenuOpen}
          >
            <Avatar
              sx={{
                width: 36,
                height: 36,
                bgcolor: '#14b8a6',
                fontSize: '0.875rem',
                fontWeight: 600,
              }}
            >
              KR
            </Avatar>
            <Box>
              <Typography variant="body2" sx={{ fontWeight: 500, fontSize: '0.875rem', lineHeight: 1.2 }}>
                Kate Russell
              </Typography>
              <Typography variant="caption" sx={{ color: '#6b7280', fontSize: '0.75rem', lineHeight: 1.2 }}>
                Receptionist
              </Typography>
            </Box>
            <KeyboardArrowDown fontSize="small" sx={{ color: '#6b7280' }} />
          </Box>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            PaperProps={{
              sx: {
                mt: 1,
                minWidth: 180,
              },
            }}
          >
            <MenuItem onClick={handleMenuClose} sx={{ fontSize: '0.875rem' }}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose} sx={{ fontSize: '0.875rem' }}>Settings</MenuItem>
            <MenuItem onClick={handleMenuClose} sx={{ fontSize: '0.875rem' }}>Logout</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
