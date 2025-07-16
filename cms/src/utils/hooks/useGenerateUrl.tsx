import { getPresignedUrl } from "api/uploadImage";

function useGenerateUrl() {
  const getUrlImage = async (file: any) => {
    try {
      if (file) {
        if (file?.name) {
          const formData = new FormData();
          formData.append("file", file);
          const res = await getPresignedUrl(formData);
          return res?.image_url;
        } else return file;
      } else {
        return null;
      }
    } catch (err) {
      console.log(err);
    }
  };
  return {
    getUrlImage,
  };
}

export default useGenerateUrl;
