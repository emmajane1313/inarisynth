import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useAccount, useSignMessage } from "wagmi";
import { client } from "../../lib/lens/client";
import { STORAGE_KEY } from "../../lib/lens/constants";
import USER_PROFILE from "../../graphql/queries/userProfile";
import AUTHENTICATE_LOGIN from "../../graphql/mutations/authenticate";
import GENERATE_CHALLENGE from "../../graphql/queries/generateChallenge";
import { refreshAuthToken, parseJWT } from "../../lib/lens/utils";
import { UseLensSignInResults } from "./../../generated/lens/lenstypes.types";
import { Profile } from "../../generated/lens/types.types";

export const useLensSignIn = (): UseLensSignInResults => {
  const router = useRouter();
  const [hasProfile, setHasProfile] = useState<string>("");
  const [modalClose, setModalClose] = useState<boolean>(false);

  let lensProfile: Profile | undefined;

  const { address } = useAccount();

  const { signMessageAsync } = useSignMessage({
    onSettled(data, error) {
      console.log("Settled", { data, error });
    },
  });

  const getLensProfile = async (address?: string): Promise<void> => {
    try {
      const response = await client
        .query(USER_PROFILE, {
          request: {
            ethereumAddress: address,
          },
        })
        .toPromise();
      if (response.data.defaultProfile) {
        setHasProfile("profile");
        return lensProfile = response.data.defaultProfile;
      } else {
        setHasProfile("no profile");
      }
    } catch (err: any) {
      console.error(err.message);
    }
  };

  const handleRouteChanges = (): void => {
    router.events.on("routeChangeStart", () => {
      refreshAuthToken();
    });
  };

  console.log("outside function", lensProfile)

  useEffect(() => {
    refreshAuthToken();
    // if (address) {
    //   console.log("calling lens login in use effect")
    //   getLensProfile(address);
    // }
    handleRouteChanges();
  }, [address]);

  const lensLogin = async () => {
    console.log("calling lens login")
    try {
      const challengeResponse = await client
        .query(GENERATE_CHALLENGE, {
          request: {
            address: address,
          },
        })
        .toPromise();

      const signature = await signMessageAsync({message: challengeResponse.data.challenge.text});

      const accessTokens = await client
        .mutation(AUTHENTICATE_LOGIN, {
          request: {
            address: address,
            signature: signature,
          },
        })
        .toPromise();

      if (accessTokens) {
        const { accessToken, refreshToken } = accessTokens.data.authenticate;
        const dataAccessToken = parseJWT(accessToken);

        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({
            accessToken,
            refreshToken,
            exp: dataAccessToken.exp,
          })
        );
      }

      getLensProfile(address);
    } catch (err: any) {
      console.error(err.message);
    }
  };

  const handleLensModalClose = (): void => {
    setModalClose(true);
  }

  return { lensProfile, lensLogin, hasProfile, handleLensModalClose, modalClose };
};
