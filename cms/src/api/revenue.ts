import { IFilter } from "constants/interfaces";
import { sendGet, sendPut } from "./axios";

export const getRevenueYearApi = (params?: IFilter) =>
  sendGet("/api/cms/statistic-revenue/by-year", params).then(
    (res: any) => res.data
  );

export const getAccountYearApi = (params?: IFilter) =>
  sendGet("/api/cms/statistic-account/by-year", params).then(
    (res: any) => res.data
  );

export const getCsvStatisticAccountApi = (params?: IFilter) =>
  sendGet("/api/cms/statistic-account/export-by-year", params).then(
    (res: any) => res
  );

export const getRevenueStoreApi = (params?: IFilter) =>
  sendGet("/api/cms/statistic-revenue/by-store", params).then(
    (res: any) => res.data
  );

export const updateStatusStoreRevenueApi = (params?: any) =>
  sendPut(`/api/cms/statistic-revenue/change-status`, params).then(
    (res: any) => res.data
  );

export const getCsvStatisticApi = (params?: IFilter) =>
  sendGet("/api/cms/statistic-revenue/export-by-store", params).then(
    (res: any) => res
  );
