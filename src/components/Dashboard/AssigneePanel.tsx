import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  IconButton,
  Avatar,
  TextField,
  InputAdornment,
} from '@mui/material';
import {
  Search,
  Add,
} from '@mui/icons-material';
import type { Assignee } from '@/types';

interface AssigneePanelProps {
  equipmentId: number;
}

const AssigneePanel: React.FC<AssigneePanelProps> = ({ equipmentId }) => {
  const [assignees, setAssignees] = useState<Assignee[]>([]);
  const [availablePersonnel, setAvailablePersonnel] = useState<Assignee[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadAssignees();
  }, [equipmentId]);

  const loadAssignees = async () => {
    try {
      setLoading(true);
      const { mockAssignees } = await import('@/utils/mockData');
      setAssignees(mockAssignees.filter((a) => a.equipment_id === equipmentId || a.equipment_id === 1));
      setAvailablePersonnel(mockAssignees.filter((a) => !a.equipment_id));
    } catch (error) {
      console.error('Error loading assignees:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (assigneeId: number) => {
    const person = availablePersonnel.find(a => a.id === assigneeId);
    if (person) {
      setAvailablePersonnel(availablePersonnel.filter(a => a.id !== assigneeId));
      setAssignees([...assignees, { ...person, equipment_id: equipmentId }]);
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const filteredAssignees = assignees.filter(a =>
    a.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredAvailable = availablePersonnel.filter(a =>
    a.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
            Incubator Assignees
          </Typography>
          <IconButton 
            size="small"
            sx={{
              color: '#6b7280',
              '&:hover': {
                backgroundColor: '#f9fafb',
                color: '#14b8a6',
              },
            }}
          >
            <Search fontSize="small" />
          </IconButton>
        </Box>

        <TextField
          size="small"
          placeholder="Search assignees..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{
            mb: 2,
            '& .MuiOutlinedInput-root': {
              backgroundColor: '#f9fafb',
              borderRadius: 2,
              '& fieldset': {
                borderColor: '#e5e7eb',
              },
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search fontSize="small" sx={{ color: '#9ca3af' }} />
              </InputAdornment>
            ),
          }}
        />

        <List sx={{ flex: 1, overflow: 'auto', px: 0 }}>
          {filteredAssignees.map((assignee) => (
            <ListItem
              key={assignee.id}
              sx={{
                px: 0,
                py: 1,
                borderRadius: 1,
                mb: 0.5,
                transition: 'background-color 0.2s ease',
                '&:hover': {
                  backgroundColor: '#fafafa',
                },
              }}
              secondaryAction={
                <IconButton
                  edge="end"
                  size="small"
                  onClick={() => handleAdd(assignee.id)}
                  sx={{
                    color: '#14b8a6',
                    '&:hover': {
                      backgroundColor: '#ecfdf5',
                    },
                  }}
                >
                  <Add fontSize="small" />
                </IconButton>
              }
            >
              <ListItemAvatar>
                <Avatar
                  sx={{
                    width: 36,
                    height: 36,
                    bgcolor: '#14b8a6',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                  }}
                >
                  {getInitials(assignee.name)}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography variant="body2" sx={{ fontSize: '0.8125rem', fontWeight: 500 }}>
                    {assignee.name}
                  </Typography>
                }
                secondary={
                  assignee.equipment_name && (
                    <Typography variant="caption" sx={{ color: '#9ca3af', fontSize: '0.75rem' }}>
                      {assignee.equipment_name}
                    </Typography>
                  )
                }
              />
            </ListItem>
          ))}
          
          {filteredAvailable.map((person) => (
            <ListItem
              key={person.id}
              sx={{
                px: 0,
                py: 1,
                borderRadius: 1,
                mb: 0.5,
                transition: 'background-color 0.2s ease',
                '&:hover': {
                  backgroundColor: '#fafafa',
                },
              }}
              secondaryAction={
                <IconButton
                  edge="end"
                  size="small"
                  onClick={() => handleAdd(person.id)}
                  sx={{
                    color: '#9ca3af',
                    '&:hover': {
                      color: '#14b8a6',
                      backgroundColor: '#ecfdf5',
                    },
                  }}
                >
                  <Add fontSize="small" />
                </IconButton>
              }
            >
              <ListItemAvatar>
                <Avatar
                  sx={{
                    width: 36,
                    height: 36,
                    bgcolor: '#9ca3af',
                    fontSize: '0.75rem',
                    fontWeight: 500,
                  }}
                >
                  {getInitials(person.name)}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography variant="body2" sx={{ fontSize: '0.8125rem', color: '#6b7280' }}>
                    {person.name}
                  </Typography>
                }
              />
            </ListItem>
          ))}
          
          {filteredAssignees.length === 0 && filteredAvailable.length === 0 && (
            <Typography variant="body2" sx={{ color: '#9ca3af', textAlign: 'center', py: 3 }}>
              No assignees found
            </Typography>
          )}
        </List>
      </CardContent>
    </Card>
  );
};

export default AssigneePanel;
