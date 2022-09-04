import { useEffect, useState } from "react";
import { useLensSignIn } from "./useLensSignIn";
import { useAccount } from "wagmi";
import { UseAuthResult } from "../../../generated/lens/lenstypes";

export const useAuth = (): UseAuthResult => {
  const [auth, setAuth] = useState<string>("");
  const { hasProfile } = useLensSignIn();
  const { isConnected } = useAccount();

  useEffect(() => {
    if (isConnected) {
      setAuth("wallet connected");
      console.log("im on the connected case")
    } else if (isConnected && hasProfile) {
      setAuth("profile");
      console.log("im on the connected and profile case")
    } else if (isConnected && !hasProfile) {
      setAuth("profile");
      console.log("im on the connected and no profile case")
    } else {
      setAuth("");
    }
  }, [isConnected, hasProfile]);

  return { auth, setAuth };
};
