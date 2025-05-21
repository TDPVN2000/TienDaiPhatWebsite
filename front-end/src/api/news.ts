import { sendGet } from './axios';

export const getNewsApi = (params?: any) => sendGet('news/', params);

export const getDetailNewApi = (id?: number | string) => sendGet(`news/${id}`);
