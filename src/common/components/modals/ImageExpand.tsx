import React, { FunctionComponent } from "react";
import { ImageExpandProps } from "../../../types/stablediffusion/sdtypes.types";
import { IoMdContract } from "react-icons/io";
import ReactImageZoom from "react-image-zoom";

export const ImageExpand: FunctionComponent<ImageExpandProps> = ({
  expandedImage,
  imageOpen,
  onImageModalClose,
}): JSX.Element => {
  return imageOpen ? (
    <div className="flex text-center relative">
      <div className="fixed inset-0 bg-black backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-100">
        <div className="relative p-4 cursor-pointer rounded w-96 cursor-zoom-in">
          <ReactImageZoom
            width={768}
            zoomLensStyle={"opacity: 0"}
            height={512}
            offset={{ vertical: 10, horizontal: 10 }}
            scale={0.5}
            zoomPosition={"left"}
            zoomWidth={200}
            img={expandedImage}
          />
          <div className="cursor-pointer">
            <IoMdContract color="white" onClick={() => onImageModalClose()} />
          </div>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
};
