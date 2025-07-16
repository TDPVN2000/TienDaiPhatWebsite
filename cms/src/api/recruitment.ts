import { IFilter } from "constants/interfaces";
import { sendDelete, sendGet, sendPost, sendPut } from "./axios";

export const getRecruitmentApi = (params?: IFilter) =>
  sendGet("recruitment/", params).then((res: any) => res);

export const createRecruitmentApi = (params: any) =>
  sendPost("recruitment/", params).then((res: any) => res.data);

export const deleteRecruitmentApi = (recruitment_id: number) =>
  sendDelete(`recruitment/${recruitment_id}`);

export const getDetailRecruitmentApi = (recruitment_id?: number | string) =>
  sendGet(`recruitment/${recruitment_id}`).then((res) => res);

export const updateRecruitmentApi = (recruitment_id: number | string) =>
  sendPut(`recruitment/${recruitment_id}`).then((res: any) => res.data);
