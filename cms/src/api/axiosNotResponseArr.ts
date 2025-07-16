import Axios from "axios";
// import { handleErrorMessage } from "utils/helper";
import configs from "constants/config";
import { LanguageType } from "constants/enums";
import storage from "utils/helper/storage";
import { handleErrorMessage } from "utils/helper";
import Cookies from "js-cookie";
import { router } from "index";

const axiosInstance = Axios.create({
  timeout: 3 * 60 * 1000,
  baseURL: configs.API_DOMAIN,
});

const logout = () => {
  Cookies.remove("token");
  Cookies.remove("refreshToken");
  router.navigate("/login");
};

axiosInstance.interceptors.request.use(
  (config: any) => {
    // eslint-disable-next-line no-param-reassign
    config.headers = {
      "Accept-Language": LanguageType.JA,
      ...config.headers,
    };
    const token = storage.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const originalConfig = error.config;
    if (error.response.status !== 401) {
      if (
        error.response?.data?.errorCode === "Account_Inactive" &&
        window.location.pathname !== "/login"
      ) {
        return logout();
      }
      return Promise.reject(error);
    }

    const refreshToken = storage.getRefreshToken();
    if (!refreshToken) {
      return logout();
    }

    return Axios.post(`${configs.API_DOMAIN}/cms/admin-auth/refresh-token`, {
      refreshToken,
    })
      .then((res) => {
        if (res.status === 201) {
          const data = res.data;
          storage.setToken(data.data.token);
          originalConfig.headers.Authorization = `Bearer ${data.data.token}`;
          return Axios(originalConfig);
        } else {
          logout();
        }
      })
      .catch((err: any) => {
        if (err?.status === 401) {
          return logout();
        }
        return Promise.reject(error);
      });
  }
);

export const sendGetNotErr = (url: string, params?: any, headers?: any) =>
  axiosInstance.get(url, { params, headers }).then((res) => res.data);

export const sendPost = (
  url: string,
  params?: any,
  queryParams?: any,
  headers?: any
) =>
  axiosInstance
    .post(url, params, { params: queryParams, headers })
    .then((res) => res.data);

export const sendPutNotErr = (url: string, params?: any, headers?: any) =>
  axiosInstance.put(url, params, { headers }).then((res) => res.data);

export const sendPatch = (url: string, params?: any, headers?: any) =>
  axiosInstance.patch(url, params, { headers }).then((res) => res.data);

export const sendDelete = (url: string, params?: any, headers?: any) =>
  axiosInstance.delete(url, { params, headers }).then((res) => res.data);
