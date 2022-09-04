import React, { FunctionComponent } from "react";
import { useLensSignIn } from "../../hooks/useLensSignIn";

export const ProfileHandle: React.FC = (): JSX.Element => {
  const { lensProfile } = useLensSignIn();
  console.log("profile handle profile: ", lensProfile);
  return <div></div>;
};