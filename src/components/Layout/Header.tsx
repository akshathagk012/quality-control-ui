import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Breadcrumbs,
  Link,
} from '@mui/material';
import {
  KeyboardArrowDown,
} from '@mui/icons-material';
import { useLocation, Link as RouterLink } from 'react-router-dom';
// ViewSwitcher removed per request (technical view dropdown)
import CalendarIcon from '../../assets/icons/calendar.svg';
import NotificationIcon from '../../assets/icons/notification.svg';
import MessageQuestionIcon from '../../assets/icons/message-question.svg';
import EllipseIcon from '../../assets/icons/Ellipse_12.svg';

const Header = () => {
  const location = useLocation();
  // removed technical view dropdown (ViewSwitcher)

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
        width: '100%',
        maxWidth: { xs: '100%', sm: '100%', md: 1200 },
        height: { xs: 'auto', sm: 48 },
        minHeight: 48,
      }}
    >
      <Toolbar sx={{ 
        justifyContent: 'space-between', 
        px: { xs: 1, sm: 2 }, 
        py: { xs: 1, sm: 0.5 }, 
        width: '100%', 
        height: '100%', 
        minHeight: '48px',
        flexWrap: { xs: 'wrap', md: 'nowrap' },
      }}>
        {/* Left: Logo and Breadcrumbs */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 2, md: 3 }, flexWrap: { xs: 'wrap', sm: 'nowrap' } }}>
          <Typography
            variant="h6"
            component="div"
            sx={{
              color: '#14b8a6',
              fontWeight: 600,
              fontSize: { xs: '1rem', sm: '1.25rem' },
              letterSpacing: '-0.025em',
            }}
          >
          
          </Typography>

          <Breadcrumbs
            separator={<Typography sx={{ color: '#232323', fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>›</Typography>}
            aria-label="breadcrumb"
            sx={{
              '& .MuiBreadcrumbs-separator': {
                mx: { xs: 0.5, sm: 1 },
              },
              display: { xs: 'none', sm: 'flex' },
            }}
          >
            <Link
              component={RouterLink}
              to="/"
              sx={{
                textDecoration: 'none',
                color: '#666666',
                display: 'inline-block',
                width: 123,
                height: 20,
                transform: 'none',
                opacity: 1,
                fontFamily: 'Montserrat, sans-serif',
                fontWeight: 500,
                fontStyle: 'normal',
                fontSize: '16px',
                lineHeight: '100%',
                letterSpacing: '0',
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
              const displayText = breadcrumbMap[name] || name;
              const isDashboard = displayText === 'Dashboard' || name === 'dashboard';

              return isLast ? (
                <Typography
                  key={name}
                  sx={{
                    transform: 'none',
                    opacity: 1,
                    fontFamily: 'Montserrat, sans-serif',
                    fontWeight: isDashboard ? 700 : 500,
                    fontStyle: 'normal',
                    fontSize: isDashboard ? '18px' : '0.875rem',
                    lineHeight: isDashboard ? '100%' : '24px',
                    letterSpacing: '0',
                    width: isDashboard ? 104 : 'auto',
                    height: isDashboard ? 22 : 'auto',
                    color: isDashboard ? '#232323' : '#111827',
                    textTransform: 'capitalize',
                    display: 'inline-block',
                    px: isDashboard ? 1 : 0,
                  }}
                >
                  {displayText}
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
                  {displayText}
                </Link>
              );
            })}
          </Breadcrumbs>
        </Box>

        {/* Right: View Switcher, Clinic, Icons, User */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.5, sm: 1 }, ml:'auto', mr: { xs: 0, md: -12 }, flexWrap: { xs: 'wrap', sm: 'nowrap' } }}>
          <Typography
            variant="body2"
            sx={{
              height: 22,
              fontFamily: 'Nunito, sans-serif',
              fontWeight: 500,
              fontSize: { xs: '14px', sm: '16px' },
              lineHeight: '145%',
              letterSpacing: '0%',
              color: '#232323',
              opacity: 1,
              ml:0,
              display: { xs: 'none', md: 'block' },
            }}
          >
            Clinic: Crysta IVF, Banglore
          </Typography>

          <IconButton
            size="small"
            sx={{
              width: { xs: 40, sm: 48 },
              height: { xs: 40, sm: 48 },
              padding: { xs: '8px', sm: '12px' },
              borderRadius: '8px',
              backgroundColor: '#FFFFFF',
              border: '1px solid #e5e7eb',
              opacity: 1,
              '&:hover': {
                backgroundColor: '#f3f4f6',
              },
            }}
          >
            <img
              src={CalendarIcon}
              alt="Calendar"
              style={{
                width: 24,
                height: 24,
                objectFit: 'contain',
              }}
            />
          </IconButton>

          <IconButton
            size="small"
            sx={{
              width: { xs: 40, sm: 48 },
              height: { xs: 40, sm: 48 },
              padding: { xs: '8px', sm: '12px' },
              borderRadius: '8px',
              backgroundColor: '#FFFFFF',
              border: '1px solid #e5e7eb',
              opacity: 1,
              position: 'relative',
              '&:hover': {
                backgroundColor: '#f3f4f6',
              },
            }}
          >
            <img
              src={NotificationIcon}
              alt="Notifications"
              style={{
                width: 24,
                height: 24,
                objectFit: 'contain',
              }}
            />
          </IconButton>

          <IconButton
            size="small"
            sx={{
              width: { xs: 40, sm: 48 },
              height: { xs: 40, sm: 48 },
              padding: { xs: '8px', sm: '12px' },
              borderRadius: '8px',
              backgroundColor: '#FFFFFF',
              border: '1px solid #e5e7eb',
              opacity: 1,
              '&:hover': {
                backgroundColor: '#f3f4f6',
              },
            }}
          >
            <img
              src={MessageQuestionIcon}
              alt="Help"
              style={{
                width: 24,
                height: 24,
                objectFit: 'contain',
                display: 'block',
              }}
            />
          </IconButton>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: { xs: 0.5, sm: 1 },
              cursor: 'pointer',
              width: { xs: 'auto', sm: 158 },
              height: 42,
              opacity: 1,
            }}
          >
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                border: '1px solid #FFFFFF',
                backgroundColor: '#D9D9D9',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: 1,
              }}
            >
              <img
                src={EllipseIcon}
                alt="User Avatar"
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  objectFit: 'cover',
                }}
              />
            </Box>
            <Box
              sx={{
                width: 110,
                height: 42,
                display: { xs: 'none', sm: 'flex' },
                flexDirection: 'column',
                gap: 0.5,
                opacity: 1,
              }}
            >
              <Box
                sx={{
                  width: 110,
                  height: 20,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.5,
                  opacity: 1,
                }}
              >
                <Typography 
                  variant="body2" 
                  sx={{ 
                    fontWeight: 500, 
                    fontSize: '0.875rem', 
                    lineHeight: 1.2,
                    flex: 1,
                    color: '#232323',
                  }}
                >
                  Kate Russell
                </Typography>
                <KeyboardArrowDown fontSize="small" sx={{ color: '#6b7280' }} />
              </Box>
              <Typography 
                variant="caption" 
                sx={{ 
                  width: 82,
                  height: 18,
                  fontFamily: 'Noto Sans, sans-serif',
                  fontWeight: 400,
                  fontSize: '14px',
                  lineHeight: '18px',
                  letterSpacing: '0px',
                  color: '#9E9E9E',
                  opacity: 1,
                }}
              >
                Receptionist
              </Typography>
            </Box>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
