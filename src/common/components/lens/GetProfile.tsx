import Link from "next/link";
import React, { FunctionComponent, useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { LensSignIn } from "../buttons/LensSignIn";
import {GetProfileProps} from "../../../types/lens/lenstypes.types"

export const GetProfile: FunctionComponent<GetProfileProps> = ({handleLensModalClose, modalClose, lensLogin}): JSX.Element | null => {

  if (modalClose) return <LensSignIn lensLogin={lensLogin} />

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center">
      <div className="relative bg-lensLight p-4 cursor-pointer rounded w-72">
        <AiFillCloseCircle
          color="#00501e"
          className="item-center right-0 top-0 p-0 m-2 absolute cursor-pointer"
          onClick={handleLensModalClose}
        />
        <h1 className="font-semibold text-center text-xl text-lensDark mt-4 font-space">
          Own Your Digital Roots. Claim Your Lens Handle.
        </h1>
        <video
          src="/video/Logo-roots_1.mp4"
          autoPlay
          loop
          muted
          className="mb-5"
        />
        <div className="text-center cursor-pointer">
          <Link href={"https://claim.lens.xyz/"} rel="noreferrer" target="_blank">
            <a>
            <button className="px-5 py-2 bg-lensDark font-space text-lensLight mb-3 rounded hover:opacity-80">
              Claim Handle
            </button>
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};
