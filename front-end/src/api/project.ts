import { sendGet } from './axios';

export const getProjectApi = (params?: any) => sendGet('projects/', params);
