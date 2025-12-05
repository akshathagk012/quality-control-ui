import axios from 'axios';
import type {
  Clinic,
  Department,
  Equipment,
  EquipmentDetail,
  Parameter,
  DashboardData,
  DashboardFilters,
  ParameterChartData,
  Activity,
  Incident,
  AverageData,
  Assignee,
} from '@/types';

// ---------------------------------------------
// 🔹 USE SAFE FALLBACK BASE URL
// ---------------------------------------------
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'https://qcb.xyz.in/api';

const api = axios.create({
  baseURL: API_BASE_URL,    // <-- FIXED (fallback actually works now)
  headers: {
    'Content-Type': 'application/json',
  },
});

// ---------------------------------------------
// 🔹 REQUEST INTERCEPTOR (Token)
// ---------------------------------------------
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ---------------------------------------------
// 🔹 RESPONSE INTERCEPTOR (401 logout)
// ---------------------------------------------
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('auth_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// ---------------------------------------------
// 🔹 CLINIC API
// ---------------------------------------------
export const clinicApi = {
  getAll: () => api.get<Clinic[]>('/clinics/'),
  getById: (id: number) => api.get<Clinic>(`/clinics/${id}/`),
  create: (data: Omit<Clinic, 'id'>) => api.post('/clinics/', data),
  update: (id: number, data: Partial<Clinic>) =>
    api.put(`/clinics/${id}/`, data),
  delete: (id: number) => api.delete(`/clinics/${id}/`),
};

// ---------------------------------------------
// 🔹 DEPARTMENT API
// ---------------------------------------------
export const departmentApi = {
  getAll: (clinicId?: number) =>
    api.get('/departments/', {
      params: clinicId ? { clinic_id: clinicId } : {},
    }),
  getById: (id: number) => api.get(`/departments/${id}/`),
  create: (data: Omit<Department, 'id' | 'created_at'>) =>
    api.post('/departments/', data),
  update: (id: number, data: Partial<Department>) =>
    api.put(`/departments/${id}/`, data),
  delete: (id: number) => api.delete(`/departments/${id}/`),
};

// ---------------------------------------------
// 🔹 EQUIPMENT API
// ---------------------------------------------
export const equipmentApi = {
  getAll: (departmentId?: number) =>
    api.get('/equipments/', {
      params: departmentId ? { dep_id: departmentId } : {},
    }),
  getById: (id: number) => api.get(`/equipments/${id}/`),
  create: (data: Omit<Equipment, 'id' | 'created_at'>) =>
    api.post('/equipments/', data),
  update: (id: number, data: Partial<Equipment>) =>
    api.put(`/equipments/${id}/`, data),
  delete: (id: number) => api.delete(`/equipments/${id}/`),
};

// ---------------------------------------------
// 🔹 EQUIPMENT DETAIL API
// ---------------------------------------------
export const equipmentDetailApi = {
  getAll: (equipmentId?: number) =>
    api.get('/equipment-details/', {
      params: equipmentId ? { equipment_id: equipmentId } : {},
    }),
  getById: (id: number) => api.get(`/equipment-details/${id}/`),
  create: (data: Omit<EquipmentDetail, 'id' | 'created_at'>) =>
    api.post('/equipment-details/', data),
  update: (id: number, data: Partial<EquipmentDetail>) =>
    api.put(`/equipment-details/${id}/`, data),
  delete: (id: number) =>
    api.delete(`/equipment-details/${id}/`),
};

// ---------------------------------------------
// 🔹 PARAMETER API
// ---------------------------------------------
export const parameterApi = {
  getAll: (equipmentId?: number) =>
    api.get('/parameters/', {
      params: equipmentId ? { equipment_id: equipmentId } : {},
    }),
  getById: (id: number) => api.get(`/parameters/${id}/`),
  create: (data: Omit<Parameter, 'id' | 'created_at'>) =>
    api.post('/parameters/', data),
  update: (id: number, data: Partial<Parameter>) =>
    api.put(`/parameters/${id}/`, data),
  delete: (id: number) => api.delete(`/parameters/${id}/`),
};

// ---------------------------------------------
// 🔹 DASHBOARD API
// ---------------------------------------------
export const dashboardApi = {
  getData: (filters?: DashboardFilters) =>
    api.get<DashboardData>('/dashboard/data/', { params: filters }),

  getParameterChart: (
    equipmentIds: number[],
    parameterId: number,
    dateRange?: { start: string; end: string }
  ) =>
    api.get<ParameterChartData>('/dashboard/parameter-chart/', {
      params: {
        equipment_ids: equipmentIds.join(','),
        parameter_id: parameterId,
        ...dateRange,
      },
    }),

  getRecentActivities: (limit = 10) =>
    api.get<Activity[]>('/dashboard/recent-activities/', {
      params: { limit },
    }),

  getIncidents: (filters?: DashboardFilters) =>
    api.get<Incident[]>('/dashboard/incidents/', { params: filters }),

  getAverages: (equipmentIds: number[], parameterId: number) =>
    api.get<AverageData[]>('/dashboard/averages/', {
      params: {
        equipment_ids: equipmentIds.join(','),
        parameter_id: parameterId,
      },
    }),

  getAssignees: (equipmentId?: number) =>
    api.get<Assignee[]>('/dashboard/assignees/', {
      params: equipmentId ? { equipment_id: equipmentId } : {},
    }),

  assignPersonnel: (equipmentId: number, assigneeId: number) =>
    api.post('/dashboard/assignees/', {
      equipment_id: equipmentId,
      assignee_id: assigneeId,
    }),

  removeAssignee: (equipmentId: number, assigneeId: number) =>
    api.delete('/dashboard/assignees/', {
      params: { equipment_id: equipmentId, assignee_id: assigneeId },
    }),
};

export default api;
