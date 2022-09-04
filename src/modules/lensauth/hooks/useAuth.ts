import { useEffect, useState } from "react";
import { useLensSignIn } from "../../../common/hooks/useLensSignIn";
import { useAccount } from "wagmi";
import { UseAuthResult } from "../../../generated/lens/lenstypes";

export const useAuth = (): UseAuthResult => {
  const { hasProfile } = useLensSignIn();
  const { isConnected } = useAccount();

  const [auth, setAuth] = useState<string>("");

  console.log(auth);

  useEffect(() => {
    if (isConnected) {
      setAuth("connected");
    } else if (hasProfile) {
      setAuth("profile");
    } else {
      setAuth("");
    }
  }, [isConnected, hasProfile]);

  return { auth };
};
