import React from 'react';
import { Box, Tabs, Tab, Typography } from '@mui/material';
import type { Parameter } from '@/types';

interface ParameterTabsProps {
  parameters: Parameter[];
  selected: Parameter | null;
  onSelect: (parameter: Parameter) => void;
  loading?: boolean;
}

const ParameterTabs: React.FC<ParameterTabsProps> = ({
  parameters,
  selected,
  onSelect,
  loading = false,
}) => {
  if (loading || parameters.length === 0) {
    return null;
  }

  return (
    <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
        <Typography
          variant="body2"
          sx={{ color: '#6b7280', fontSize: '0.875rem', fontWeight: 500 }}
        >
          Parameters:
        </Typography>
      </Box>
      <Tabs
        value={selected?.id || parameters[0]?.id} // default to first parameter
        onChange={(_, value) => {
          const param = parameters.find((p) => p.id === value);
          if (param) onSelect(param);
        }}
        sx={{
          '& .MuiTab-root': {
            textTransform: 'none',
            fontWeight: 500,
            minHeight: 40,
            fontSize: '0.875rem',
            color: '#000000', // default black
            transition: 'color 0.2s ease',
            '&:hover': {
              color: '#ea580c', // orange on hover
            },
          },
          '& .Mui-selected': {
            color: '#ea580c !important', // orange when selected
            fontWeight: 600,
          },
          '& .MuiTabs-indicator': {
            backgroundColor: '#ea580c',
            height: 3,
            borderRadius: '3px 3px 0 0',
          },
        }}
      >
        {parameters.map((param) => (
          <Tab key={param.id} label={param.parameter_name} value={param.id} />
        ))}
      </Tabs>
    </Box>
  );
};

export default ParameterTabs;
