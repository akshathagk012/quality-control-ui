import { format, formatDistanceToNow } from 'date-fns';

export const formatDate = (date: string | Date, formatStr = 'MMM dd, yyyy'): string => {
  return format(new Date(date), formatStr);
};

export const formatDateTime = (date: string | Date): string => {
  return format(new Date(date), 'MMM dd, yyyy HH:mm');
};

export const formatTimeAgo = (date: string | Date): string => {
  return formatDistanceToNow(new Date(date), { addSuffix: true });
};

export const formatNumber = (value: number, decimals = 2): string => {
  return value.toFixed(decimals);
};

export const formatPercentage = (value: number, decimals = 1): string => {
  return `${value.toFixed(decimals)}%`;
};

export const formatUnit = (value: number, unit: string, decimals = 2): string => {
  return `${value.toFixed(decimals)}${unit}`;
};

