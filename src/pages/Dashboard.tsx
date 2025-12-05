import React, { useState, useEffect } from 'react';
import { Box, Container } from '@mui/material';
import DepartmentTabs from '@/components/Dashboard/DepartmentTabs';
import EquipmentCards from '@/components/Dashboard/EquipmentCards';
import ParameterTabs from '@/components/Dashboard/ParameterTabs';
import ParameterChart from '@/components/Dashboard/ParameterChart';
import RecentActivity from '@/components/Dashboard/RecentActivity';
import IncidentsChart from '@/components/Dashboard/IncidentsChart';
import AverageParameterCards from '@/components/Dashboard/AverageParameterCards';
import AssigneePanel from '@/components/Dashboard/AssigneePanel';
import DashboardHeader from '@/components/Dashboard/DashboardHeader';
import type { Equipment, Parameter } from '@/types';
import { mockEquipments, mockParameters } from '@/utils/mockData';

const Dashboard = () => {
  const [selectedDepartment, setSelectedDepartment] = useState<string>('Embryology');
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(null);
  const [selectedParameter, setSelectedParameter] = useState<Parameter | null>(null);
  const [equipments, setEquipments] = useState<Equipment[]>([]);
  const [parameters, setParameters] = useState<Parameter[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Load mock equipments
    setEquipments(mockEquipments);
    // Auto-select first equipment
    if (mockEquipments.length > 0 && !selectedEquipment) {
      const firstEquipment = mockEquipments[0];
      setSelectedEquipment(firstEquipment);
      // Also load parameters for first equipment
      const equipmentParams = mockParameters.filter(p => p.equipment_id === firstEquipment.id);
      setParameters(equipmentParams);
      if (equipmentParams.length > 0) {
        setSelectedParameter(equipmentParams[0]);
      }
    }
  }, [selectedDepartment]);

  useEffect(() => {
    // Load parameters for selected equipment
    if (selectedEquipment) {
      const equipmentParams = mockParameters.filter(p => p.equipment_id === selectedEquipment.id);
      setParameters(equipmentParams);
      if (equipmentParams.length > 0) {
        setSelectedParameter(equipmentParams[0]);
      } else {
        setSelectedParameter(null);
      }
    }
  }, [selectedEquipment]);

  const handleDepartmentChange = (department: string) => {
    setSelectedDepartment(department);
    setSelectedEquipment(null);
    setSelectedParameter(null);
  };

  const handleEquipmentSelect = (equipment: Equipment) => {
    setSelectedEquipment(equipment);
    setSelectedParameter(null);
  };

  const handleParameterSelect = (parameter: Parameter) => {
    setSelectedParameter(parameter);
  };

  return (
    <Container maxWidth={false} sx={{ py: 2 }}>
      <DashboardHeader />

      <DepartmentTabs
        selected={selectedDepartment}
        onChange={handleDepartmentChange}
      />

      <EquipmentCards
        equipments={equipments}
        selected={selectedEquipment}
        onSelect={handleEquipmentSelect}
        loading={loading}
      />

      {selectedEquipment && (
        <>
          <ParameterTabs
            parameters={parameters}
            selected={selectedParameter}
            onSelect={handleParameterSelect}
            loading={loading}
          />

          {selectedParameter && (
            <Box sx={{ mt: 3 }}>
              <Box sx={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 3, mb: 3 }}>
                <ParameterChart
                  equipmentId={selectedEquipment.id}
                  parameterId={selectedParameter.id}
                  parameterName={selectedParameter.parameter_name}
                  unit={selectedParameter.Content.unit}
                />
                <RecentActivity equipmentId={selectedEquipment.id} />
              </Box>

              <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 2fr 1fr', gap: 3 }}>
                <IncidentsChart equipmentId={selectedEquipment.id} />
                <AverageParameterCards
                  equipmentId={selectedEquipment.id}
                  parameterId={selectedParameter.id}
                  parameterName={selectedParameter.parameter_name}
                />
                <AssigneePanel equipmentId={selectedEquipment.id} />
              </Box>
            </Box>
          )}
        </>
      )}
    </Container>
  );
};

export default Dashboard;

