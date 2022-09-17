import React, { FunctionComponent, useMemo } from "react";
import Image from "next/image";
import { LensSignInProps } from "../../../types/lens/lenstypes.types";

export const LensSignIn: FunctionComponent<LensSignInProps> = ({lensLogin}): JSX.Element => {

  return (
    <button
      onClick={lensLogin}
      type="button"
      className="m-0 cursor-pointer justify-center font-sans text-sm bg-lensLight h-10 w-fit py-1 px-2 rounded-lg hover:opacity-90 relative top-1 left-[60px]"
    >
      <div className="w-full justify-center relative flex">
        <Image width={"50px"} height={"20px"} src="/images/icons/LENS.png" alt="lensLogo" />
      </div>
    </button>
  );
};
