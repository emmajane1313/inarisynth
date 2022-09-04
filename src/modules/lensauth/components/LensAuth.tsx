import React, { useEffect } from "react";
import { LensSignIn } from "../../../common/components/buttons/LensSignIn";
import { ProfileHandle } from "../../../common/components/lens/ProfileHandle";
import { GetProfile } from "../../../common/components/lens/GetProfile";
import { useLensSignIn } from "../hooks/useLensSignIn";
import { useAccount } from "wagmi";

export const LensAuth = (): JSX.Element => {

  const { hasProfile } = useLensSignIn();
  const { isConnected } = useAccount();

  if (isConnected) {
    console.log("on connected")
    return <LensSignIn />;
  } else if (isConnected && hasProfile === "profile") {
    console.log("on profile connected")
    return <ProfileHandle />;
  } else if (isConnected && hasProfile === "no profile") {
    console.log("on no profile connected")
    return <GetProfile />
  } else {
    console.log("on not connected")
    return <div></div>;
  }
};
