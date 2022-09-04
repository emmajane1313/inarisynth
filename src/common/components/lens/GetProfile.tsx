import Link from "next/link";
import React, { FunctionComponent, useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { useLensModal } from "../../hooks/useLensModal";

export const GetProfile: FunctionComponent = (): JSX.Element | null => {

    const {handleLensModalClose} = useLensModal();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center">
      <div className="relative bg-greenLens p-2 rounded w-72">
        <AiFillCloseCircle
          color="#00501e"
          className="item-center right-0 top-0 p-0 m-2 cursor-pointer absolute"
          onClick={handleLensModalClose}
        />
        <h1 className="font-semibold text-center text-xl text-darkGreenLens mt-4 font-distro">
          Own Your Digital Roots. Claim Your Lens Handle.
        </h1>
        {/* <video
          src="/assets/video/Logo-roots_1.mp4"
          type="video/mp4"
          autoPlay
          loop
          muted
          className="mb-5"
        /> */}
        <div className="text-center">
          <Link href={"https://claim.lens.xyz/"}>
            <button className="px-5 py-2 bg-darkGreenLens font-space text-greenLens mb-3 rounded hover:opacity-80">
              Claim Handle
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
