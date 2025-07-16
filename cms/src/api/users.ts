import { IFilter } from "constants/interfaces";
import { sendDelete, sendGet, sendPost, sendPut } from "./axios";

export const getUsersApi = (params?: IFilter) =>
  sendGet("/api/cms/users", params).then((res: any) => res.data);

export const createUserApi = (params: any) =>
  sendPost("/api/cms/users", params).then((res) => res.data);

export const updateUserApi = (payload: { userId?: number; params?: any }) =>
  sendPut(`/api/cms/users/${payload?.userId}`, payload?.params).then(
    (res: any) => res.data
  );

export const updateStatusUserApi = (userId: number) =>
  sendPut(`/api/cms/users/changeStatus/${userId}`).then((res) => res.data);

export const deleteUserApi = (userId: number) =>
  sendDelete(`/api/cms/users/${userId}`).then((res) => res.data);

export const getDetailUserApi = (userId?: number | string) =>
  sendGet(`/api/cms/users/${userId}`).then((res) => res.data);
