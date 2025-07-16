import { sendPost } from "./axios";

export const getPresignedUrl = (params: any) =>
  sendPost("upload/image/", params).then((res) => res.data);
