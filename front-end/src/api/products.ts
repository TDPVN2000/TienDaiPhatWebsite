import { sendGet } from './axios';

export const getProductsApi = (params?: any) => sendGet('products', params);
