import { sendPost } from './axios';

export const uploadImage = (file: File) => {
  const formData = new FormData();
  formData.append('files', file);
  return sendPost('/upload', formData);
};
