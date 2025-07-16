import { IFilter } from "constants/interfaces";
import { sendDelete, sendGet, sendPost, sendPut } from "./axios";

export const getCertificationApi = (params?: IFilter) =>
  sendGet("certifications/", params).then((res: any) => res);

export const createCertificationApi = (params: any) =>
  sendPost("certifications/", params).then((res: any) => res.data);

export const deleteCertificationApi = (project_id: number) =>
  sendDelete(`certifications/${project_id}`);

export const getDetailCertificationApi = (project_id?: number | string) =>
  sendGet(`certifications/${project_id}`).then((res) => res);

export const updateCertificationApi = (payload: {
  project_id?: number;
  params?: any;
}) =>
  sendPut(`certifications/${payload?.project_id}`, payload?.params).then(
    (res: any) => res
  );
