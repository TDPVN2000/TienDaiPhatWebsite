import React, { useState } from "react";
import heic2any from "heic2any";

function useConvertHeic() {
  const [isConvertingHeic, setIsConvertingHeic] = useState<boolean>(false);

  const convertHeicToAny = async (file: File) => {
    try {
      setIsConvertingHeic(true);
      const blobURL = window.URL.createObjectURL(file);
      let blobRes = await fetch(blobURL);
      let blob = await blobRes.blob();
      let conversionResult = await heic2any({ blob, quality: 0.5 });
      const fileAfterProcessed = new File(
        [conversionResult as any],
        file?.name?.replace(".heic", ".png"),
        { type: "image/png" }
      );
      const urlImage = URL.createObjectURL(conversionResult as any);
      return {
        fileAfterProcessed,
        urlImage,
      };
    } catch (err) {
      console.log(err);
    } finally {
      setIsConvertingHeic(false);
    }
  };
  return {
    isConvertingHeic,
    convertHeicToAny,
  };
}

export default useConvertHeic;
