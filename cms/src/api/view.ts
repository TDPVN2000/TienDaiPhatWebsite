import { IFilter } from "constants/interfaces";
import { sendGet, sendPut } from "./axios";

export const getViewsApi = (params?: IFilter) =>
  sendGet("/api/cms/setting-view-stores", params).then((res: any) => res.data);

export const updateSettingViewApi = (params: any) =>
  sendPut(`/api/cms/setting-view-stores`, params).then((res: any) => res.data);
