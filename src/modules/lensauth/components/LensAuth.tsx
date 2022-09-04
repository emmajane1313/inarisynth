import React, { useEffect } from "react";
import { LensSignIn } from "../../../common/components/buttons/LensSignIn";
import { ProfileHandle } from "../../../common/components/lens/ProfileHandle";
import { useAuth } from "../hooks/useAuth";
import { GetProfile } from "../../../common/components/lens/GetProfile";

export const LensAuth = (): JSX.Element => {

  const {auth} = useAuth();

  switch (auth) {
    case "wallet connected":
      return <LensSignIn />;

    case "profile":
      return <ProfileHandle />;

    case "no profile":
      return <GetProfile />

    default:
      return <div></div>;
  }
};
