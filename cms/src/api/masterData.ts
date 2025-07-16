import { IFilter } from "constants/interfaces";
import { sendDelete, sendGet, sendPost, sendPut } from "./axios";

export const getMasterCateStoreApi = (params?: IFilter) =>
  sendGet("/api/cms/store-categories", params).then((res: any) => res.data);

export const getMasterCateWorkerApi = (params?: IFilter) =>
  sendGet("/api/cms/shipper-categories", params).then((res: any) => res.data);

export const createCateStoreApi = (params: any) =>
  sendPost("/api/cms/store-categories", params).then((res) => res.data);

export const createCateWorkerApi = (params: any) =>
  sendPost("/api/cms/shipper-categories", params).then((res) => res.data);

export const updateCateStoreApi = (payload: {
  cateId?: number;
  params?: any;
}) =>
  sendPut(`/api/cms/store-categories/${payload?.cateId}`, payload?.params).then(
    (res: any) => res.data
  );

export const updateCateWorkerApi = (payload: {
  cateId?: number;
  params?: any;
}) =>
  sendPut(
    `/api/cms/shipper-categories/${payload?.cateId}`,
    payload?.params
  ).then((res: any) => res.data);

export const deleteCateStoreApi = (cateId: number) =>
  sendDelete(`/api/cms/store-categories/${cateId}`).then((res) => res.data);

export const deleteCateWorkerApi = (cateId: number) =>
  sendDelete(`/api/cms/shipper-categories/${cateId}`).then((res) => res.data);

export const reorderCateStoreApi = (payload: {
  cateId?: number;
  params?: any;
}) =>
  sendPut(
    `/api/cms/store-categories/reorder/${payload?.cateId}`,
    payload?.params
  ).then((res: any) => res.data);

export const reorderCateWorkerApi = (payload: {
  cateId?: number;
  params?: any;
}) =>
  sendPut(
    `/api/cms/shipper-categories/reorder/${payload?.cateId}`,
    payload?.params
  ).then((res: any) => res.data);

export const getMasterTermApi = (params?: IFilter) =>
  sendGet("/api/cms/master-data/terms", params).then((res: any) => res.data);

export const getDetailTermApi = (type?: any) =>
  sendGet(`/api/cms/master-data/terms/detail?type=${type}`).then(
    (res: any) => res.data
  );

export const updateTermApi = (params?: any) =>
  sendPut(`/api/cms/master-data/terms/update`, params).then(
    (res: any) => res.data
  );

export const getMasterPolicyApi = (params?: IFilter) =>
  sendGet("/api/cms/master-data/policy", params).then((res: any) => res.data);

export const getDetailPolicyApi = (type?: any) =>
  sendGet(`/api/cms/master-data/policy/detail?type=${type}`).then(
    (res: any) => res.data
  );

export const updatePolicyApi = (params?: any) =>
  sendPut(`/api/cms/master-data/policy/update`, params).then(
    (res: any) => res.data
  );

export const getMasterLawApi = (params?: IFilter) =>
  sendGet("/api/cms/master-data/law", params).then((res: any) => res.data);

export const updateLawApi = (params?: any) =>
  sendPut(`/api/cms/master-data/law/update`, params).then(
    (res: any) => res.data
  );

export const getDetailLawApi = (type?: any) =>
  sendGet(`/api/cms/master-data/law/detail?type=${type}`).then(
    (res: any) => res.data
  );

export const getMasterQaApi = (params?: IFilter) =>
  sendGet("/api/cms/master-data/faqs", params).then((res: any) => res.data);

export const updateFaqApi = (params?: any) =>
  sendPost(`/api/cms/master-data/faqs`, params).then((res: any) => res.data);

export const getDetailFaqApi = (type?: any) =>
  sendGet(`/api/cms/master-data/faqs/detail?type=${type}`).then(
    (res: any) => res.data
  );
