import React from "react";
import { LensSignIn } from "../buttons/LensSignIn";
import { ProfileHandle } from "./ProfileHandle";
import { GetProfile } from "./GetProfile";
import { useLensSignIn } from "../../hooks/useLensSignIn";
import { useAccount } from "wagmi";

export const LensAuth = (): JSX.Element => {
  const { hasProfile, modalClose, handleLensModalClose, lensLogin } =
    useLensSignIn();
  const { isConnected } = useAccount();

  let action = "NOT_CONNECTED";

  const decideStringAction = () => {
    if (isConnected && !modalClose) {
      action = "CONNECTED";
    }

    if (isConnected && modalClose) {
      action = "MODAL_CLOSED";
    }

    if (isConnected && hasProfile === "profile") {
      action = "PROFILE";
    }

    if (isConnected && hasProfile === "no profile") {
      action = "NO_PROFILE";
      console.log("IS CONNECTED AND NO PROFILE");
      console.log(isConnected);
    }
    console.log("action", action);
    return action;
  };
  console.log("rendered");
  switch (decideStringAction()) {
    case "CONNECTED":
      return <LensSignIn lensLogin={lensLogin} />;

    case "PROFILE":
      return <ProfileHandle />;

    case "NO_PROFILE":
      return (
        <GetProfile
          modalClose={modalClose}
          handleLensModalClose={handleLensModalClose}
          lensLogin={lensLogin}
        />
      );

    case "MODAL_CLOSED":
      return <LensSignIn lensLogin={lensLogin} />;

    default:
      return <div></div>;
  }
};
