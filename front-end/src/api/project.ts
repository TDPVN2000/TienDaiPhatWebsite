import { sendGet } from './axios';

export const getProjectApi = (params?: any) => sendGet('project', params);
