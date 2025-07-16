import { IFilter } from "constants/interfaces";
import { sendDelete, sendGet, sendPost, sendPut } from "./axios";

export const getProjectsApi = (params?: IFilter) =>
  sendGet("projects/", params).then((res: any) => res);

export const createProjectsApi = (params: any) =>
  sendPost("projects/", params).then((res: any) => res.data);

export const deleteProjectsApi = (project_id: number) =>
  sendDelete(`projects/${project_id}`);

export const getDetailProjectsApi = (project_id?: number | string) =>
  sendGet(`projects/${project_id}`).then((res) => res);

export const updateProjectsApi = (payload: {
  project_id?: number;
  params?: any;
}) =>
  sendPut(`projects/${payload?.project_id}`, payload?.params).then(
    (res: any) => res
  );
