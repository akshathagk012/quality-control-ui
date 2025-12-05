import type {
  Clinic,
  Department,
  Equipment,
  Parameter,
} from "@/types";

// ------------------------------
// API FETCH FUNCTION
// ------------------------------

const API_BASE = "http://127.0.0.1:8000/api/get_clinic";

export const loadClinicData = async (clinic_id: number) => {
  const response = await fetch(`${API_BASE}/${clinic_id}/`);
  const json = await response.json();
  return json;
};

// ------------------------------
// STORAGE FOR DYNAMIC MOCK DATA
// ------------------------------

export let mockClinic: Clinic | null = null;
export let mockDepartments: Department[] = [];
export let mockEquipments: Equipment[] = [];
export let mockParameters: Parameter[] = [];

// ------------------------------
// TRANSFORM API → Dashboard-friendly format
// ------------------------------

export const initializeMockData = async (clinic_id: number) => {
  mockClinic = null; mockDepartments = []; mockEquipments = []; mockParameters = [];
  const api = await loadClinicData(clinic_id);

  // ---------- Clinic ----------
  mockClinic = {
    id: clinic_id,
    name: api.name,
  };

  // ---------- Departments ----------
  mockDepartments = api.department.map((d: any, depIndex: number) => ({
    id: depIndex + 1,
    name: d.name,
    is_active: d.is_active,
    clinic_id: clinic_id,
    created_at: new Date().toISOString(),
  }));

  // ---------- Equipments + Parameters ----------
  let equipmentCounter = 1;
  let parameterCounter = 1;

  api.department.forEach((dep: any, depIndex: number) => {
    dep.equipments.forEach((eq: any) => {
      const newEquipment: Equipment = {
        id: equipmentCounter,
        equipment_name: eq.equipment_name,
        dep_id: depIndex + 1,
        created_at: new Date().toISOString(),
        department: mockDepartments[depIndex],
        parameters: [], // add parameter array
      };

      mockEquipments.push(newEquipment);

      // parameters
      eq.parameters.forEach((param: any) => {
        const newParam: Parameter = {
          id: parameterCounter,
          parameter_name: param.parameter_name,
          equipment_id: equipmentCounter,
          is_active: param.is_active,
          Content: {
            ...param.content,
            unit: "N/A",
            min_value: 0,
            max_value: 0,
            control_limits: {
              warning_min: 0,
              warning_max: 0,
              critical_min: 0,
              critical_max: 0,
            },
          },
          created_at: new Date().toISOString(),
          equipment: newEquipment,
        };

        mockParameters.push(newParam);
        newEquipment.parameters.push(newParam); // store inside equipment

        parameterCounter++;
      });

      equipmentCounter++;
    });
  });
};
