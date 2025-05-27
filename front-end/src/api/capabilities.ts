import { sendGet } from './axios';

export const getCapabilitiesApi = (params?: any) =>
  sendGet('capabilities/', params);
