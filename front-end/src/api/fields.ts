import { sendGet } from './axios';

export const getFieldsApi = (params?: any) => sendGet('fields', params);

export const getDetailFieldsApi = (field_id?: number | string) =>
  sendGet(`fields/${field_id}`);
