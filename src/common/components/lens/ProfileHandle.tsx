import React, { FunctionComponent } from "react";
import { CgProfile } from "react-icons/cg";
import Image from "next/image";
import { ProfileHandleProps } from "../../../generated/lens/lenstypes.types";

export const ProfileHandle: FunctionComponent<ProfileHandleProps> = ({
  lensProfile,
}): JSX.Element => {

  const getAvatar = (picture: any) => {
    if (!picture) {
      return (
        <CgProfile
          color="#00501e"
          width={10}
          height={10}
        />
      );
    } else if (picture.original) {
      if (picture.original.url.includes("http")) {
        return (
            <Image src={picture.original.url} width={10} height={10} />
        );
      } else {
        const cut = picture.original.url.split("/");
        const link = "https://lens.infura-ipfs.io/ipfs/" + cut[cut.length - 1];
        return (
            <Image src={link} width={10} height={10} />
        );
      }
    } else {
      return (
          <Image src={picture.uri} width={10} height={10} />
      );
    }
  };

  return (
    <button
      type="button"
      className="m-0 cursor-pointer justify-center font-space text-lensDark text-xs bg-lensLight h-10 w-fit py-1 px-2 rounded-lg hover:opacity-90 relative top-1 left-[60px]"
    >
      <div className="w-full justify-center relative flex">
        <div>@{lensProfile?.handle}</div>
        {/* <div className="absolute rounded-full drop-shadow-md">
          {getAvatar(lensProfile?.picture)}
          </div> */}
      </div>
    </button>
  );
};
