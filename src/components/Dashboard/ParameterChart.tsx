import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  IconButton,
} from '@mui/material';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
  ReferenceLine,
} from 'recharts';
import { FilterList, GetApp } from '@mui/icons-material';
import { CHART_COLORS } from '@/utils/constants';
import type { ParameterChartData } from '@/types';

interface ParameterChartProps {
  equipmentId: number;
  parameterId: number;
  parameterName: string;
  unit: string;
}

const ParameterChart: React.FC<ParameterChartProps> = ({
  equipmentId,
  parameterId,
  parameterName,
  unit,
}) => {
  const [chartData, setChartData] = useState<ParameterChartData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadChartData();
  }, [equipmentId, parameterId]);

  const loadChartData = async () => {
    try {
      setLoading(true);
      const { getMockChartData } = await import('@/utils/mockData');
      const mockData = getMockChartData(parameterName);
      setChartData({
        ...mockData,
        parameter_name: parameterName,
        unit,
      });
    } catch (error) {
      console.error('Error loading chart data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading || !chartData) {
    return (
      <Card
        sx={{
          borderRadius: 2,
          border: '1px solid #e5e7eb',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        }}
      >
        <CardContent>
          <Typography variant="h6">Loading chart...</Typography>
        </CardContent>
      </Card>
    );
  }

  const isCO2 = parameterName.toLowerCase().includes('co₂') || parameterName.toLowerCase().includes('co2');
  
  // Colors for CO₂ bar chart (matching the design - gray shades and pink)
  const barColors = ['#9ca3af', '#f3f4f6', '#fce7f3', '#e5e7eb'];

  return (
    <Card
      sx={{
        borderRadius: 2,
        border: '1px solid #e5e7eb',
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, fontSize: '1rem' }}>
            {parameterName} Chart
          </Typography>
          <Box sx={{ display: 'flex', gap: 0.5 }}>
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
              <FilterList fontSize="small" />
            </IconButton>
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
              <GetApp fontSize="small" />
            </IconButton>
          </Box>
        </Box>

        <ResponsiveContainer width="100%" height={300}>
          {isCO2 ? (
            <BarChart data={chartData.data} margin={{ top: 40, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="date"
                stroke="#6b7280"
                style={{ fontSize: '0.75rem' }}
                tick={{ fill: '#6b7280' }}
              />
              <YAxis
                label={{ 
                  value: `${parameterName} (${unit})`, 
                  angle: -90, 
                  position: 'insideLeft',
                  style: { fontSize: '0.75rem', fill: '#6b7280' }
                }}
                stroke="#6b7280"
                style={{ fontSize: '0.75rem' }}
                domain={[5.0, 7.0]}
                tickFormatter={(value) => `${value}%`}
                tick={{ fill: '#6b7280' }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #e5e7eb',
                  borderRadius: 8,
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                }}
                formatter={(value: number) => `${value}%`}
              />
              <Legend 
                wrapperStyle={{ fontSize: '0.75rem' }}
                iconType="square"
              />
              {chartData.equipment_names.map((name, index) => (
                <Bar
                  key={name}
                  dataKey={name}
                  fill={barColors[index % barColors.length]}
                  radius={[4, 4, 0, 0]}
                >
                  {chartData.data.map((entry: any, idx: number) => (
                    <Cell
                      key={`cell-${idx}`}
                      fill={barColors[index % barColors.length]}
                    />
                  ))}
                </Bar>
              ))}
              {/* Custom annotation for Incubator C on Tuesday */}
              {chartData.data.map((entry: any, entryIndex: number) => {
                if (entry.date === 'Tuesday' && entry['Incubator C'] === 6.39) {
                  return (
                    <ReferenceLine
                      key={`annotation-${entryIndex}`}
                      x="Tuesday"
                      stroke="transparent"
                      label={{
                        value: '6.39%',
                        position: 'top',
                        fill: '#111827',
                        fontSize: 12,
                        fontWeight: 500,
                      }}
                    />
                  );
                }
                return null;
              })}
            </BarChart>
          ) : (
            <LineChart data={chartData.data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="date"
                stroke="#6b7280"
                style={{ fontSize: '0.75rem' }}
                tick={{ fill: '#6b7280' }}
              />
              <YAxis
                label={{ 
                  value: `${parameterName} (${unit})`, 
                  angle: -90, 
                  position: 'insideLeft',
                  style: { fontSize: '0.75rem', fill: '#6b7280' }
                }}
                stroke="#6b7280"
                style={{ fontSize: '0.75rem' }}
                tick={{ fill: '#6b7280' }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #e5e7eb',
                  borderRadius: 8,
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                }}
              />
              <Legend 
                wrapperStyle={{ fontSize: '0.75rem' }}
                iconType="line"
              />
              {chartData.equipment_names.map((name, index) => (
                <Line
                  key={name}
                  type="monotone"
                  dataKey={name}
                  stroke={CHART_COLORS[index % CHART_COLORS.length]}
                  strokeWidth={2}
                  dot={{ r: 4, fill: CHART_COLORS[index % CHART_COLORS.length] }}
                  activeDot={{ r: 6 }}
                />
              ))}
            </LineChart>
          )}
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default ParameterChart;
