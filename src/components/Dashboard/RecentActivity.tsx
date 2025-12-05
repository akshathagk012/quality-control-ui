import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Button,
} from '@mui/material';
import {
  WaterDrop,
  PersonAdd,
  Close,
  TrendingUp,
} from '@mui/icons-material';
import { formatTimeAgo } from '@/utils/formatters';
import type { Activity } from '@/types';

interface RecentActivityProps {
  equipmentId: number;
}

const RecentActivity: React.FC<RecentActivityProps> = ({ equipmentId }) => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadActivities();
  }, [equipmentId]);

  const loadActivities = async () => {
    try {
      setLoading(true);
      const { mockActivities } = await import('@/utils/mockData');
      setActivities(mockActivities.filter(a => a.equipment_id === equipmentId || equipmentId === 1));
    } catch (error) {
      console.error('Error loading activities:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = (id: number) => {
    setActivities(activities.filter((a) => a.id !== id));
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'humidity':
        return <WaterDrop sx={{ color: '#ef4444', fontSize: 18 }} />;
      case 'temperature':
        return <TrendingUp sx={{ color: '#ef4444', fontSize: 18 }} />;
      case 'assignee':
        return <PersonAdd sx={{ color: '#3b82f6', fontSize: 18 }} />;
      default:
        return <WaterDrop sx={{ color: '#6b7280', fontSize: 18 }} />;
    }
  };

  return (
    <Card
      sx={{
        borderRadius: 2,
        border: '1px solid #e5e7eb',
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, fontSize: '1rem' }}>
            Recent Activity
          </Typography>
          <Button
            variant="text"
            size="small"
            onClick={() => setActivities([])}
            sx={{
              textTransform: 'none',
              fontSize: '0.8125rem',
              color: '#6b7280',
              '&:hover': {
                backgroundColor: '#f9fafb',
                color: '#111827',
              },
            }}
          >
            Clear All
          </Button>
        </Box>

        <List sx={{ flex: 1, overflow: 'auto', px: 0 }}>
          {activities.map((activity) => (
            <ListItem
              key={activity.id}
              sx={{
                px: 0,
                py: 1.25,
                borderBottom: '1px solid #f3f4f6',
                '&:last-child': { borderBottom: 'none' },
                transition: 'background-color 0.2s ease',
                '&:hover': {
                  backgroundColor: '#fafafa',
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 36 }}>
                {getActivityIcon(activity.type)}
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography variant="body2" sx={{ fontSize: '0.8125rem', lineHeight: 1.5 }}>
                    {activity.message}
                  </Typography>
                }
                secondary={
                  <Typography variant="caption" sx={{ color: '#9ca3af', fontSize: '0.75rem' }}>
                    {formatTimeAgo(activity.timestamp)}
                  </Typography>
                }
              />
              <IconButton
                size="small"
                onClick={() => handleRemove(activity.id)}
                sx={{
                  ml: 1,
                  color: '#9ca3af',
                  '&:hover': {
                    color: '#ef4444',
                    backgroundColor: '#fef2f2',
                  },
                }}
              >
                <Close fontSize="small" />
              </IconButton>
            </ListItem>
          ))}
          {activities.length === 0 && (
            <Typography variant="body2" sx={{ color: '#9ca3af', textAlign: 'center', py: 3 }}>
              No recent activity
            </Typography>
          )}
        </List>
      </CardContent>
    </Card>
  );
};

export default RecentActivity;
