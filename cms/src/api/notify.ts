import { IFilter } from "constants/interfaces";
import { sendDelete, sendGet, sendPost, sendPut } from "./axios";

export const getNotifyApi = (params?: IFilter) =>
  sendGet("/api/cms/notify", params).then((res: any) => res.data);

export const createNotifyApi = (params: any) =>
  sendPost("/api/cms/notify", params).then((res: any) => res.data);

export const deleteNotifyApi = (id: number) =>
  sendDelete(`/api/cms/notify/${id}`);

export const getDetailNotifyApi = (notifyId?: number | string) =>
  sendGet(`/api/cms/notify/${notifyId}`).then((res) => res.data);

export const updateNotifyApi = (payload: { notifyId?: number; params?: any }) =>
  sendPut(`/api/cms/notify/${payload?.notifyId}`, payload?.params).then(
    (res: any) => res.data
  );
