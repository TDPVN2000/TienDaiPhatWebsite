import { sendGet } from './axios';

export const getIntroductionsApi = (params?: any) =>
  sendGet('introductions/', params);
