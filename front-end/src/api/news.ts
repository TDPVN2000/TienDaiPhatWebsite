import { sendGet } from './axios';

export const getNewsApi = (params?: any) => sendGet('api/news', params);

export const getDetailNewApi = (id?: number | string) =>
  sendGet(`/api/news/${id}`);
