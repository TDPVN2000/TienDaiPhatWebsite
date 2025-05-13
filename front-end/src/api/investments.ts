import { sendGet } from './axios';

export const getInvestmentsApi = (params?: any) =>
  sendGet('investments', params);
