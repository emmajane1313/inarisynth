import React, { FunctionComponent } from "react";
import { CgProfile } from "react-icons/cg";
import Image from "next/image";
import { ProfileHandleProps } from "../../../types/lens/lenstypes.types";

export const ProfileHandle: FunctionComponent<ProfileHandleProps> = ({
  lensProfile,
}): JSX.Element => {

  return (
    <button
      type="button"
      className="m-0 cursor-pointer justify-center font-space text-lensDark text-xs bg-lensLight h-10 w-fit py-1 px-2 rounded-lg hover:opacity-90 relative top-1 left-[60px]"
    >
      <div className="w-full justify-center relative flex">
        <div>@{lensProfile?.handle}</div>
      </div>
    </button>
  );
};
