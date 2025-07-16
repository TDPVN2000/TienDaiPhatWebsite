import { sendGet, sendPost } from "./axios";

export interface IUploadVideo {
  file_url: string;
}
export const uploadVideo = (payload: FormData): Promise<IUploadVideo> =>
  sendPost(`/api/cms/landing-page/upload-video`, payload).then(
    (res: any) => res.data,
  );

export const saveVideo = (payload: { videos: IVideoData[] }) =>
  sendPost(`/api/cms/landing-page/save-video`, payload).then(
    (res: any) => res.data,
  );

export interface IVideoData {
  area: number;
  link: string;
  is_active: boolean;
}
export const fetchVideosData = (): Promise<IVideoData[]> =>
  sendGet(`/api/cms/landing-page/index`).then((res) => res.data);
