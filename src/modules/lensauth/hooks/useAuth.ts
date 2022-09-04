import { useMemo, useState } from "react";
import { useLensSignIn } from "./useLensSignIn";
import { useAccount } from "wagmi";
import { UseAuthResult } from "../../../generated/lens/lenstypes";
import { useLensModal } from "./useLensModal";

export const useAuth = (): UseAuthResult => {
  const [auth, setAuth] = useState<string>("");
  const { hasProfile } = useLensSignIn();
  const { isConnected } = useAccount();

  useMemo(() => {
    if (isConnected) {
      setAuth("wallet connected");
    } else if (hasProfile) {
      setAuth("profile");
    } else {
      setAuth("");
    }
  }, [isConnected, hasProfile]);

  return { auth, setAuth };
};
