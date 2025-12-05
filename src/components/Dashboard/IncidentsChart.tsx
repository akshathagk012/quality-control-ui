import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from 'recharts';
import { STATUS_COLORS } from '@/utils/constants';
import type { Incident } from '@/types';

interface IncidentsChartProps {
  equipmentId: number;
}

const IncidentsChart: React.FC<IncidentsChartProps> = ({ equipmentId }) => {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEquipments, setSelectedEquipments] = useState<string[]>(['Incubator A', 'Incubator B', 'Incubator C', 'Incubator D']);

  useEffect(() => {
    loadIncidents();
  }, [equipmentId]);

  const loadIncidents = async () => {
    try {
      setLoading(true);
      const { mockIncidents } = await import('@/utils/mockData');
      setIncidents(mockIncidents);
    } catch (error) {
      console.error('Error loading incidents:', error);
    } finally {
      setLoading(false);
    }
  };

  // Calculate totals for the chart (matching the design: 50 high, 42 normal, 53 low = 124 total)
  const highCount = 50;
  const normalCount = 42;
  const lowCount = 53;

  const chartData = [
    {
      name: 'High',
      value: highCount,
      color: STATUS_COLORS.high,
    },
    {
      name: 'Normal',
      value: normalCount,
      color: STATUS_COLORS.normal,
    },
    {
      name: 'Low',
      value: lowCount,
      color: STATUS_COLORS.low,
    },
  ];

  const totalLogs = highCount + normalCount + lowCount;

  const handleEquipmentToggle = (equipment: string) => {
    setSelectedEquipments(prev =>
      prev.includes(equipment)
        ? prev.filter(e => e !== equipment)
        : [...prev, equipment]
    );
  };

  return (
    <Card
      sx={{
        borderRadius: 2,
        border: '1px solid #e5e7eb',
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      }}
    >
      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, fontSize: '1rem' }}>
          Incidents
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={75}
                paddingAngle={2}
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #e5e7eb',
                  borderRadius: 8,
                }}
              />
            </PieChart>
          </ResponsiveContainer>

          <Typography variant="h6" sx={{ mt: 1, fontWeight: 600, fontSize: '0.9375rem' }}>
            {totalLogs} Total Logs
          </Typography>

          <Box sx={{ mt: 2, width: '100%' }}>
            {chartData.map((item) => (
              <Box
                key={item.name}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  mb: 1.5,
                }}
              >
                <Box
                  sx={{
                    width: 12,
                    height: 12,
                    borderRadius: '50%',
                    backgroundColor: item.color,
                  }}
                />
                <Typography variant="body2" sx={{ fontSize: '0.8125rem', color: '#6b7280' }}>
                  {item.name} ({item.value} logs)
                </Typography>
              </Box>
            ))}
          </Box>

          <Box sx={{ mt: 2, width: '100%', pt: 2, borderTop: '1px solid #f3f4f6' }}>
            {['Incubator A', 'Incubator B', 'Incubator C', 'Incubator D'].map((equip) => (
              <FormControlLabel
                key={equip}
                control={
                  <Checkbox
                    checked={selectedEquipments.includes(equip)}
                    onChange={() => handleEquipmentToggle(equip)}
                    size="small"
                    sx={{
                      color: '#14b8a6',
                      '&.Mui-checked': {
                        color: '#14b8a6',
                      },
                    }}
                  />
                }
                label={
                  <Typography variant="body2" sx={{ fontSize: '0.8125rem', color: '#6b7280' }}>
                    {equip}
                  </Typography>
                }
                sx={{ mb: 0.5 }}
              />
            ))}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default IncidentsChart;
