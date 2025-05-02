import { sendGet, sendPost } from './axios';

export const getProfile = () => sendGet('/auth/profile');
export const postLogin = (payload: any) => sendPost('/auth/login', payload);
