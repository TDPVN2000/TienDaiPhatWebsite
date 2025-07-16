import { sendDelete, sendGet, sendPost, sendPut } from "./axios";
import { sendGetNotErr, sendPutNotErr } from "./axiosNotResponseArr";

export const getProfile = () => sendGet("/cms/profile");
export const deleteLogout = () => sendDelete("/auth/logout");
export const updateProfile = (params: any) => sendPut("/cms/profile", params);

export const postLogin = (payload: any) => sendPost("/api/cms/login", payload);

export const changePasswordApi = (payload: any) =>
  sendPut("/api/cms/change-password", payload);

export const forgotPasswordApi = (payload: any) =>
  sendPut("/api/cms/forgot-password", payload);

export const sendCodeForgotPwdApi = (payload: any) =>
  sendPost("/api/cms/send-verify-code", payload);

export const verifyCodeForgotPwdApi = (payload: any) =>
  sendPutNotErr("/api/cms/verify-code", payload);

export const getBadgeSideNav = () =>
  sendGet("/api/cms/get-badge").then((res: any) => res.data);
