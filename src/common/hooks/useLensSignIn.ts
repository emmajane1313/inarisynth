import { useState, useContext } from "react";
import { useAccount, useSignMessage } from "wagmi";
import getDefaultProfile from "../../graphql/queries/userProfile";
import authenticate from "../../graphql/mutations/authenticate";
import generateChallenge from "../../graphql/queries/generateChallenge";
import { UseLensSignInResults } from "../../types/lens/lenstypes.types";
import { Profile } from "../../types/lens/types.types";
import { setAuthenticationToken } from "../../lib/lens/utils";
import { GlobalContext } from "../../pages/_app";

export const useLensSignIn = (): UseLensSignInResults => {
  const { setProfileExists } = useContext(GlobalContext);
  const [hasProfile, setHasProfile] = useState<string>("");
  const [modalClose, setModalClose] = useState<boolean>(false);
  const [lensProfile, setLensProfile] = useState<Profile>({});

  const { address } = useAccount();

  const { signMessageAsync } = useSignMessage({
    onSettled(data, error) {
      console.log("Settled", { data, error });
    },
  });

  const lensLogin = async (): Promise<void> => {
    try {
      const challengeResponse = await generateChallenge(address);
      const signature = await signMessageAsync({
        message: challengeResponse.data.challenge.text,
      });
      const accessTokens = await authenticate(
        address as string,
        signature as string
      );

      if (accessTokens) {
        await setAuthenticationToken({ token: accessTokens.data.authenticate });
      }
      const profile = await getDefaultProfile(address);
      if (profile.data.defaultProfile !== null) {
        setHasProfile("profile");
        setProfileExists(true);
        console.log(profile.data.defaultProfile, "profile");
        setLensProfile(profile.data.defaultProfile);
        return profile.data.defaultProfile;
      } else if (profile.data.defaultProfile === null) {
        setHasProfile("no profile");
        setProfileExists(false);
        return null;
      }
    } catch (err: any) {
      console.error(err.message);
    }
  };

  const handleLensModalClose = (): void => {
    setModalClose(true);
  };

  return {
    lensProfile,
    lensLogin,
    handleLensModalClose,
    modalClose,
    hasProfile,
  };
};
