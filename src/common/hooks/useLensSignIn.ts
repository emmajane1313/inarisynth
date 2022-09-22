<<<<<<< HEAD
import { useState } from "react";
import { useAccount, useSignMessage } from "wagmi";
import { ACCESS_KEY, REFRESH_KEY, EXP } from "../../lib/lens/constants";
=======
import { useState, useContext} from "react";
import { useAccount, useSignMessage } from "wagmi";
>>>>>>> newer/main
import getDefaultProfile from "../../graphql/queries/userProfile";
import authenticate from "../../graphql/mutations/authenticate";
import generateChallenge from "../../graphql/queries/generateChallenge";
import { UseLensSignInResults } from "../../types/lens/lenstypes.types";
import { Profile } from "../../types/lens/types.types";
import { setAuthenticationToken } from "../../lib/lens/utils";
<<<<<<< HEAD

export const useLensSignIn = (): UseLensSignInResults => {
=======
import {GlobalContext} from "../../pages/_app";

export const useLensSignIn = (): UseLensSignInResults => {
  const {setProfileExists} = useContext(GlobalContext)
>>>>>>> newer/main
  const [hasProfile, setHasProfile] = useState<string>("");
  const [modalClose, setModalClose] = useState<boolean>(false);
  const [lensProfile, setLensProfile] = useState<Profile>({});

  const { address } = useAccount();
<<<<<<< HEAD

=======
 
>>>>>>> newer/main
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
<<<<<<< HEAD
      const accessTokens = await authenticate(address as string, signature as string);

      if(accessTokens) {
        await setAuthenticationToken({ token: accessTokens.data.authenticate })
      }
      
      const profile = await getDefaultProfile(address);

      if (profile) {
        setHasProfile("profile");
=======
      const accessTokens = await authenticate(
        address as string,
        signature as string
      );

      if (accessTokens) {
        await setAuthenticationToken({ token: accessTokens.data.authenticate });
      }
      const profile = await getDefaultProfile(address);
      if (profile) {
        setHasProfile("profile");
        setProfileExists(true);
>>>>>>> newer/main
        setLensProfile(profile.data.defaultProfile);
        return profile.data.defaultProfile;
      } else {
        setHasProfile("no profile");
<<<<<<< HEAD
      }

=======
        setProfileExists(false);
        return null;
      }
>>>>>>> newer/main
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
<<<<<<< HEAD
    hasProfile,
    handleLensModalClose,
    modalClose,
=======
    handleLensModalClose,
    modalClose,
    hasProfile,
>>>>>>> newer/main
  };
};
