import { IFilter } from "constants/interfaces";
import { sendGet, sendPut, sendPost } from "./axios";

export const getContactApi = (params?: IFilter) =>
  sendGet("/api/cms/contacts", params).then((res: any) => res.data);

export const getDetailContactApi = (contactId?: number | string) =>
  sendGet(`/api/cms/contacts/${contactId}`).then((res) => res.data);

export const getDataReplyContactApi = (
  contactId?: number | string,
  params?: IFilter
) =>
  sendGet(`/api/cms/contacts/${contactId}/child`, params).then(
    (res) => res.data
  );

export const replyContactApi = (contactId?: number | string, params?: any) =>
  sendPost(`/api/cms/contacts/${contactId}/reply`, params).then(
    (res) => res.data
  );

export const updateContactApi = (payload: {
  contactId?: number;
  params?: any;
}) =>
  sendPut(`/api/cms/contacts/${payload?.contactId}`, payload?.params).then(
    (res: any) => res.data
  );
