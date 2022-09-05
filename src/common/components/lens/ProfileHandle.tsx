import React, { FunctionComponent } from "react";
import { useLensSignIn } from "../../hooks/useLensSignIn";
import { CgProfile } from "react-icons/cg";
import Image from "next/image";

export const ProfileHandle: FunctionComponent = (): JSX.Element => {
  const { lensProfile } = useLensSignIn();
  const { handle, picture } = lensProfile;

  const getAvatar = (picture: any) => {
    if (!picture) {
      return (
        <CgProfile
          color="#00501e"
          className="w-8 h-8 rounded-full drop-shadow-md"
        />
      );
    } else if (picture.original) {
      if (picture.original.url.includes("http")) {
        return (
          <div className="w-8 h-8 rounded-full drop-shadow-md">
            <Image src={picture.original.url} width={"10px"} height={"10px"} />
          </div>
        );
      } else {
        const cut = picture.original.url.split("/");
        const link = "https://lens.infura-ipfs.io/ipfs/" + cut[cut.length - 1];
        return (
          <div className="w-8 h-8 rounded-full drop-shadow-md">
            <Image src={link} width={"10px"} height={"10px"} />
          </div>
        );
      }
    } else {
      return (
        <div className="w-8 h-8 rounded-full drop-shadow-md">
          <Image src={picture.uri} width={"10px"} height={"10px"} />
        </div>
      );
    }
  };

  return (
        <button
        type="button"
        className="m-0 cursor-pointer justify-center font-sans text-sm bg-lensLight h-10 w-fit py-1 px-2 rounded-lg hover:opacity-90 relative top-1 left-[60px]"
      >
        <div className="w-full justify-center relative flex">
          <div>{handle}</div>
          <Image width={"50px"} height={"20px"} src={`${getAvatar(picture)}`} alt="lensLogo" />
        </div>
      </button>
  );
};