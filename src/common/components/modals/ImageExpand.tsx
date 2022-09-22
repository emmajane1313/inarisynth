import React, { FunctionComponent } from "react";
import { ImageExpandProps } from "../../../types/stablediffusion/sdtypes.types";
import { IoMdContract } from "react-icons/io";
import ReactImageZoom from "react-image-zoom";

export const ImageExpand: FunctionComponent<ImageExpandProps> = ({
  expandedImage,
  imageOpen,
  onImageModalClose,
<<<<<<< HEAD
}): JSX.Element => {
  return imageOpen ? (
    <div className="flex text-center relative">
      <div className="fixed inset-0 bg-black backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-100">
        <div className="relative p-4 cursor-pointer rounded w-96 cursor-zoom-in">
          <ReactImageZoom
            width={768}
            zoomLensStyle={"opacity: 0"}
            height={512}
=======
  height
}): JSX.Element => {
  console.log(height)
  return imageOpen ? (
    <div className="flex absolute">
      <div className="fixed inset-0 bg-black backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-100 w-full h-full top-1 rounded cursor-pointer" onClick={() => onImageModalClose()}>
        <div className="relative p-4 cursor-pointer rounded w-full cursor-zoom-in">
          <ReactImageZoom
            zoomLensStyle={"opacity: 0"}
            height={String(height)}
>>>>>>> newer/main
            offset={{ vertical: 10, horizontal: 10 }}
            scale={0.5}
            zoomPosition={"left"}
            zoomWidth={200}
            img={expandedImage}
          />
<<<<<<< HEAD
          <div className="cursor-pointer">
            <IoMdContract color="white" onClick={() => onImageModalClose()} />
=======
          <div className="cursor-pointer left-4 -top-12 absolute">
            <IoMdContract color="white" size={30} onClick={() => onImageModalClose()} />
>>>>>>> newer/main
          </div>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
};
