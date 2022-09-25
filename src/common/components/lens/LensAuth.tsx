import React, { useContext } from "react";
import { LensSignIn } from "../buttons/LensSignIn";
import { ProfileHandle } from "./ProfileHandle";
import { GetProfile } from "./GetProfile";
import { useLensSignIn } from "../../hooks/useLensSignIn";
import { useAccount } from "wagmi";

export const LensAuth = (): JSX.Element => {
  const { modalClose, handleLensModalClose, lensLogin, lensProfile, hasProfile } =
    useLensSignIn();
  const { isConnected } = useAccount();

  let action = "NOT_CONNECTED";

  console.log(hasProfile, "has profile")

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
    }
    return action;
  };

  switch (decideStringAction()) {
    case "CONNECTED":
      return <LensSignIn lensLogin={lensLogin} />;

    case "PROFILE":
      return <ProfileHandle lensProfile={lensProfile}/>;

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
