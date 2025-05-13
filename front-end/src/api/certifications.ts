import { sendGet } from './axios';

export const getCertificationsApi = (params?: any) =>
  sendGet('certifications', params);
