import React from "react";
import { useLensSignIn } from "../../common/hooks/useLensSignIn";
import { useAccount } from "wagmi";
import { LensSignIn } from "../../common/components/buttons/LensSignIn";
import { ProfileHandle } from "../../common/components/lens/ProfileHandle";

export const LensAuth = (): JSX.Element | null => {
  const { hasProfile } = useLensSignIn();
  const { isConnected } = useAccount();

  console.log(isConnected)

  switch (!isConnected) {
    case isConnected:
      return <LensSignIn />;

    case hasProfile:
      return <ProfileHandle />;

    default:
      return null;
  }
};
