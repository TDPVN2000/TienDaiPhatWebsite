import { IFilter } from "constants/interfaces";
import { sendDelete, sendGet, sendPost, sendPut } from "./axios";

export const getNotiApi = (params?: IFilter) =>
  sendGet("/api/cms/notifications", params).then((res: any) => res.data);

export const createNotiApi = (params: any) =>
  sendPost("/api/cms/notifications", params);

export const deleteNotiApi = (id: number) =>
  sendDelete(`/api/cms/notifications/${id}`);

export const getDetailNotiApi = (notiId?: number | string) =>
  sendGet(`/api/cms/notifications/${notiId}`).then((res) => res.data);

export const updateNotiApi = (payload: { notiId?: number; params?: any }) =>
  sendPut(`/api/cms/notifications/${payload?.notiId}`, payload?.params).then(
    (res: any) => res.data
  );
