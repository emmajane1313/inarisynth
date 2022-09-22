import Link from "next/link";
import React, { FunctionComponent } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { NsfwContentProps } from "../../../types/stablediffusion/sdtypes.types";

export const NSFWContent: FunctionComponent<NsfwContentProps> = ({
  setNsfwModal,
}): JSX.Element | null => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center font-sourceReg">
      <div className="relative bg-grad2 p-4 cursor-pointer rounded w-72">
        <AiFillCloseCircle
          color="#00501e"
          className="item-center right-0 top-0 p-0 m-2 absolute cursor-pointer"
          onClick={() => setNsfwModal(false)}
        />
        <h1 className="font-semibold text-center text-xl text-lensDark mt-4 mb-4">
          The NSFW filter is a bit overzealous with the current API. Can’t wait
          for a custom API? DIY Synth & The Machine<sup>2</sup> Collection are the quickest
          ways to speed up open source dev & community research.
        </h1>
      </div>
    </div>
  );
};
