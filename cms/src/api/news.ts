import { IFilter } from "constants/interfaces";
import { sendDelete, sendGet, sendPost, sendPut } from "./axios";

interface paramNews {
  title: string;
  description: string;
  content: string;
  image_url: string;
}

export const getNewsApi = (params?: IFilter) =>
  sendGet("news/", params).then((res: any) => res);

export const createNewsApi = (params: paramNews) =>
  sendPost("news/", params).then((res: any) => res.data);

export const deleteNewsApi = (news_id: number) => sendDelete(`news/${news_id}`);

export const getDetailNewsApi = (news_id?: number | string) =>
  sendGet(`news/${news_id}`).then((res) => res);

export const updateNewsApi = (payload: { news_id?: number; params?: any }) =>
  sendPut(`news/${payload?.news_id}`, payload?.params).then((res: any) => res);
