import React from "react";
import reduceImageSize from "./reduceImageSize";

const getResizedImgFiles = async (imgFiles: File[]) =>
  await Promise.all(
    imgFiles.map(async (file) => {
      const blobString = URL.createObjectURL(file);
      const jpeg = await reduceImageSize(blobString);
      return new File([jpeg], new Date().toISOString(), { type: "image/jpeg" });
    }),
  );

export default getResizedImgFiles;
