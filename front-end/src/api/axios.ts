import Axios from 'axios';

import configs from 'constants/config';
import { CookieKey, ErrorCode } from 'constants/enum';
import { handleErrorMessage } from 'utils/helper';
import cookie from 'utils/helper/cookie';

const axiosInstance = Axios.create({
  timeout: 3 * 60 * 1000,
  baseURL: configs.API_DOMAIN,
});
axiosInstance.interceptors.request.use(
  (config: any) => {
    const token = cookie.getItem(CookieKey.TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: any) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response: any) => response,
  (error: any) => {
    const originalConfig = error.config;
    if (error.response?.data?.errorCode !== ErrorCode.UNAUTHORIZED) {
      handleErrorMessage(error);
      return Promise.reject(error);
    }
    return Axios.post(`${configs.API_DOMAIN}/auth/refresh-token`, {
      refreshToken: cookie.getItem(CookieKey.REFRESH_TOKEN),
    })
      .then((res: any) => {
        if (res?.data?.data?.token) {
          const token = res.data.data.token;
          cookie.setItem(CookieKey.TOKEN, token);
          originalConfig.headers.Authorization = `Bearer ${token}`;
          return Axios(originalConfig);
        }
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  }
);

export const sendGet = (url: string, params?: any) =>
  axiosInstance.get(url, { params }).then((res) => res.data);
export const sendPost = (url: string, params?: any, queryParams?: any) =>
  axiosInstance
    .post(url, params, { params: queryParams })
    .then((res) => res.data);
export const sendPut = (url: string, params?: any) =>
  axiosInstance.put(url, params).then((res) => res.data);
export const sendPatch = (url: string, params?: any) =>
  axiosInstance.patch(url, params).then((res) => res.data);
export const sendDelete = (url: string, params?: any) =>
  axiosInstance.delete(url, { params }).then((res) => res.data);
