import React, { useEffect } from "react";
import { LensSignIn } from "../buttons/LensSignIn";
import { ProfileHandle } from "./ProfileHandle";
import { GetProfile } from "./GetProfile";
import { useLensSignIn } from "./../../hooks/useLensSignIn";
import { useAccount } from "wagmi";

export const LensAuth = (): JSX.Element => {

  const { isConnected } = useAccount();
  const {hasProfile} = useLensSignIn();

  if (isConnected && hasProfile === undefined) {
    console.log("case 1")
    return <LensSignIn />
  } else if (isConnected && !hasProfile === undefined) {
    console.log("case 2")
    return <GetProfile />
  }

  // switch (authState) {
  //   case "profile connected":
  //     console.log(authState)
  //     return <ProfileHandle />

  //   case "no profile connected":
  //     console.log(authState)
  //     console.log("CONNECTED NO PROFILE STATE")
      

  //   default:
  //     console.log(authState)
  //     return <div></div>

  // }

  // if (isConnected && hasProfile === "") {
  //   console.log("on connected")
  //   return <LensSignIn />;
  // } 

  // if (isConnected && hasProfile === "no profile") {
  //   console.log("get a profile im on connected and no profile")
  // }
  // // else if (isConnected && hasProfile === "profile") {
  // //   console.log("on profile connected")
  // //   return <ProfileHandle />;
  // // } 
  // else if (isConnected && hasProfile === "no profile") {
  //   console.log("on no profile connected")
  //   return <GetProfile />
  // } else {
  //   console.log("on not connected")
  //   return <div></div>;
  // }
};
