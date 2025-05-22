import { sendGet } from './axios';

export const getRecruitmentListApi = (params?: any) =>
  sendGet('recruitment/', params);

export const getDetailRecruitmentApi = (id?: number | string) =>
  sendGet(`recruitment/${id}`);
