import { sendGet } from "./axios";

export const getResources = () =>
  sendGet("/resources").then((data: any) => data.data);
