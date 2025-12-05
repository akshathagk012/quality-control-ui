import React from 'react';
import { Grid, Card, CardContent, Typography, Box } from '@mui/material';
import {
  People,
  PersonAdd,
  Person,
  AttachMoney,
  TrendingUp,
} from '@mui/icons-material';

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: React.ReactElement;
  color: string;
  change?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, icon, color, change }) => {
  return (
    <Card
      sx={{
        height: '100%',
        borderRadius: 2,
        border: '1px solid #e5e7eb',
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        transition: 'all 0.2s ease',
        '&:hover': {
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          transform: 'translateY(-2px)',
        },
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Box sx={{ flex: 1 }}>
            <Typography variant="body2" sx={{ color: '#6b7280', mb: 1, fontSize: '0.8125rem' }}>
              {title}
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 0.5, fontSize: '1.5rem' }}>
              {value}
            </Typography>
            {change && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.5 }}>
                <TrendingUp sx={{ fontSize: 14, color: '#10b981' }} />
                <Typography variant="caption" sx={{ color: '#10b981', fontSize: '0.75rem', fontWeight: 500 }}>
                  {change}
                </Typography>
              </Box>
            )}
          </Box>
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: 2,
              backgroundColor: `${color}15`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color,
              flexShrink: 0,
            }}
          >
            {icon}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

const MetricsCards = () => {
  const metrics = [
    {
      title: 'Total Patients',
      value: '1,234',
      icon: <People />,
      color: '#3b82f6',
      change: '+12.5% vs last month',
    },
    {
      title: 'New Patients',
      value: '89',
      icon: <PersonAdd />,
      color: '#10b981',
      change: '+8.2% vs last month',
    },
    {
      title: 'Active Patients',
      value: '856',
      icon: <Person />,
      color: '#f59e0b',
      change: '+5.1% vs last month',
    },
    {
      title: 'Total Revenue',
      value: '$125,430',
      icon: <AttachMoney />,
      color: '#8b5cf6',
      change: '+15.3% vs last month',
    },
    {
      title: 'Average Revenue',
      value: '$2,450',
      icon: <TrendingUp />,
      color: '#ef4444',
      change: '+3.7% vs last month',
    },
  ];

  return (
    <Grid container spacing={2}>
      {metrics.map((metric) => (
        <Grid item xs={12} sm={6} md={4} lg={2.4} key={metric.title}>
          <MetricCard {...metric} />
        </Grid>
      ))}
    </Grid>
  );
};

export default MetricsCards;
