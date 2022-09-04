import React, { FunctionComponent } from "react";
import { useLensSignIn } from "./../../hooks/useLensSignIn";
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
    <div>
      <div>{getAvatar(picture)}</div>
      <div>{handle}</div>
    </div>
  );
};
