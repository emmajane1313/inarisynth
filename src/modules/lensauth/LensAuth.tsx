import React, { useEffect } from "react";
import { LensSignIn } from "../../common/components/buttons/LensSignIn";
import { ProfileHandle } from "../../common/components/lens/ProfileHandle";
import { useAuth } from "./hooks/useAuth";

export const LensAuth = (): JSX.Element => {

  const {auth} = useAuth();

  switch (auth) {
    case "connected":
      return <LensSignIn />;

    case "profile":
      return <ProfileHandle />;

    default:
      return <div></div>;
  }
};
