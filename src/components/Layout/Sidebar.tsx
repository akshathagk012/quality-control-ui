import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Box,
  Typography,
  Divider,
  IconButton,
} from '@mui/material';
import {
  Shield,
  Work,
  Description,
  CheckCircle,
} from '@mui/icons-material';
import { useView } from '@/utils/viewContext';

const drawerWidth = 240;

const getMenuItems = (view: 'technician' | 'admin' | 'user') => {
  switch (view) {
    case 'admin':
      // Admin: Full access - all tabs
      return [
        { text: 'Dashboard', path: '/admin-dashboard' },
        { text: 'Clinical', path: '/clinical' },
        { text: 'Lab', path: '/lab' },
        { text: 'Reports', path: '/reports' },
        { text: 'Configuration', path: '/configuration' },
      ];
    case 'user':
      // User: Limited access - Dashboard and Configuration (view only)
      return [
        { text: 'Dashboard', path: '/dashboard' },
        { text: 'Configuration', path: '/user-configuration' },
      ];
    case 'technician':
    default:
      // Technician: Full access - all tabs
      return [
        { text: 'Dashboard', path: '/dashboard' },
        { text: 'Clinical', path: '/clinical' },
        { text: 'Lab', path: '/lab' },
        { text: 'Reports', path: '/reports' },
        { text: 'Configuration', path: '/configuration' },
      ];
  }
};

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentView } = useView();

  const menuItems = getMenuItems(currentView);

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          backgroundColor: '#FFFFFF',
          display: 'flex',
          flexDirection: 'column',
          borderRadius: 2,
          boxShadow: '2px 0 8px rgba(0, 0, 0, 0.04)',
        },
      }}
    >
      {/* Logo at Top */}
      <Box sx={{ p: 2, pb: 1.5 }}>
        <Typography
          variant="h6"
          component="div"
          sx={{
            fontSize: '1.9375rem',
            fontWeight: 600,
            color: 'black',
            display: 'flex',
            alignItems: 'baseline',
            letterSpacing: '-0.02em',
          }}
        >
          Fertility 
          <br></br>
          care
        </Typography>
      </Box>

      {/* Icon Row - Square Icons */}
      <Box sx={{ px: 2, pb: 1.5, display: 'flex', gap: 0.75 }}>
        {/* First icon - Shield with checkmark (highlighted in orange) */}
        <Box sx={{ position: 'relative' }}>
          <IconButton
            size="small"
            sx={{
              width: 32,
              height: 32,
              backgroundColor: '#ea580c',
              color: '#ffffff',
              borderRadius: 1,
              '&:hover': { backgroundColor: '#c2410c' },
            }}
          >
            <Shield sx={{ fontSize: 16 }} />
          </IconButton>
          {/* Selection indicator below */}
          <Box
            sx={{
              position: 'absolute',
              bottom: -3,
              left: '50%',
              transform: 'translateX(-50%)',
              width: 18,
              height: 2,
              backgroundColor: '#ea580c',
              borderRadius: 1,
            }}
          />
        </Box>

        {/* Other square icons */}
        <IconButton
          size="small"
          sx={{
            width: 32,
            height: 32,
            backgroundColor: '#f3f4f6',
            color: '#6b7280',
            borderRadius: 1,
            '&:hover': { backgroundColor: '#e5e7eb' },
          }}
        >
          <Work sx={{ fontSize: 16 }} />
        </IconButton>

        <IconButton
          size="small"
          sx={{
            width: 32,
            height: 32,
            backgroundColor: '#f3f4f6',
            color: '#6b7280',
            borderRadius: 1,
            '&:hover': { backgroundColor: '#e5e7eb' },
          }}
        >
          <Shield sx={{ fontSize: 16 }} />
        </IconButton>

        <IconButton
          size="small"
          sx={{
            width: 32,
            height: 32,
            backgroundColor: '#f3f4f6',
            color: '#6b7280',
            borderRadius: 1,
            '&:hover': { backgroundColor: '#e5e7eb' },
          }}
        >
          <Description sx={{ fontSize: 16 }} />
        </IconButton>
      </Box>

      <Divider />

      {/* Quality Control Heading */}
      <Box sx={{ px: 2.5, pt: 1.5, pb: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
          <Box
            sx={{
              width: 16,
              height: 16,
              borderRadius: '50%',
              backgroundColor: '#ea580c',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <CheckCircle sx={{ color: '#ffffff', fontSize: 10 }} />
          </Box>
          <Typography
            variant="h6"
            sx={{
              color: '#ea580c',
              fontWeight: 600,
              fontSize: '0.8125rem',
            }}
          >
            Quality Control
          </Typography>
        </Box>
      </Box>

      {/* Navigation Menu - Simple text, active in black */}
      <List sx={{ pt: 0, flex: 1, px: 2 }}>
        {menuItems.map((item) => {
          const isActive =
            location.pathname === item.path ||
            (location.pathname.startsWith(item.path.split('?')[0]) && item.path.includes('?'));

          return (
            <ListItem key={item.text} disablePadding sx={{ mb: 0.125 }}>
              <ListItemButton
                onClick={() => navigate(item.path)}
                sx={{
                  px: 2,
                  py: 0.75,
                  borderRadius: 1,
                  backgroundColor: 'transparent',
                  '&:hover': {
                    backgroundColor: '#f9fafb',
                  },
                }}
              >
                <ListItemText
                  primary={item.text}
                  primaryTypographyProps={{
                    fontSize: '0.8125rem',
                    fontWeight: isActive ? 700 : 400,
                    color: isActive ? '#111827' : '#9ca3af',
                    letterSpacing: '-0.01em',
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      {/* Bottom Section with VIDAI Logo */}
      <Box sx={{ p: 2, borderTop: '1px solid #e5e7eb', mt: 'auto' }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 0.375,
          }}
        >
          {/* Circular graphic placeholder */}
          <Box
            sx={{
              width: 28,
              height: 28,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #ea580c 0%, #14b8a6 100%)',
              mb: 0.25,
            }}
          />
          <Typography
            variant="caption"
            sx={{
              background: 'linear-gradient(90deg, #ea580c 0%, #14b8a6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              fontWeight: 600,
              fontSize: '0.6875rem',
            }}
          >
            VIDAI AI-Powered EMR
          </Typography>
          <Typography
            variant="caption"
            sx={{
              color: '#9ca3af',
              fontSize: '0.625rem',
            }}
          >
            Updated Version: 2.0
          </Typography>
        </Box>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
