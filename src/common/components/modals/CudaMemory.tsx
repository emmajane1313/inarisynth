import React, { FunctionComponent } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { CudaMemoryProps } from "../../../types/stablediffusion/sdtypes.types";

export const CudaMemory: FunctionComponent<CudaMemoryProps> = ({
  setCudaMemoryModal,
}): JSX.Element | null => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center font-sourceReg">
      <div className="relative bg-grad2 p-4 cursor-pointer rounded w-72">
        <AiFillCloseCircle
          color="#00501e"
          className="item-center right-0 top-0 p-0 m-2 absolute cursor-pointer"
          onClick={() => setCudaMemoryModal(false)}
        />
        <h1 className="font-semibold text-center text-xl text-lensDark mt-4 mb-4">
          GPU allocation for synthesis APIs is finicky business. You’ve found
          the dreaded CUDA OOM error. Width + height have been reduced to
          appease the beast, for now.
        </h1>
      </div>
    </div>
  );
};
