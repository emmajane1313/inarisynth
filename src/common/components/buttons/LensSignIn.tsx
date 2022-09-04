import React, { FunctionComponent } from "react";
import { useLensSignIn } from "../../hooks/useLensSignIn";

export const LensSignIn: FunctionComponent = (): JSX.Element => {
  const { lensLogin } = useLensSignIn();

  return <button onClick={lensLogin}>Sign In to Lens</button>;
};
