import {useState, useEffect} from 'react';
import { useRouter } from 'next/router';
import {useAccount, useSignMessage} from 'wagmi';
import {client} from "./../../lib/lens/client";
import {STORAGE_KEY} from "./../../lib/lens/constants";
import USER_PROFILE from "./../../graphql/queries/userProfile";
import AUTHENTICATE_LOGIN from "./../../graphql/mutations/authenticate";
import GENERATE_CHALLENGE from "./../../graphql/queries/generateChallenge";
import {refreshAuthToken, parseJWT} from "./../../lib/lens/utils";
import {UseLensSignInResults} from "../../generated/lens/lenstypes";

export const useLensSignIn = (): UseLensSignInResults => {

    const router = useRouter();
    const [message, setMessage] = useState<string>();
    const [lensProfile, setLensProfile] = useState({});
    const [hasProfile, setHasProfile] = useState<boolean>(false);

    const {address} = useAccount();

    const {data, isSuccess, signMessageAsync} = useSignMessage({
        message: message,
        onSettled(data, error) {
          console.log('Settled', { data, error })
        },
      });
    
    const getLensProfile = async (address?: string): Promise<void> => {
        try {
          const response = await client.query(USER_PROFILE, {
            request: {
              ethereumAddress: address
            }
          }).toPromise();
          if (response) {
            setLensProfile(response.data.defaultProfile);
            setHasProfile(true);
          } else {
            setHasProfile(false);
          }
        } catch (err: any) {
          console.error(err.message);
        }
    }
    
  const handleRouteChanges = (): void => {
    router.events.on('routeChangeStart', () => {
      refreshAuthToken();
    })
  };

  useEffect(() => {
    refreshAuthToken();
    if (address) {
        getLensProfile(address);
    } else {
        alert("Address Not connected display rainbow");
    }
    handleRouteChanges();
  }, [address]);

  const lensLogin = async () => {
    try {
      const challengeResponse = await client.query(GENERATE_CHALLENGE, {
        request: {
          address: address
        }
      }).toPromise();

      setMessage(challengeResponse.data.challenge.text);

      const signature = await signMessageAsync();
      console.log(signature);
      
      const accessTokens = await client.mutation(AUTHENTICATE_LOGIN, {
        request: {
          address: address,
          signature: signature
        }}
      ).toPromise();

      console.log(accessTokens);

      const {accessToken, refreshToken} = accessTokens.data.authenticate;
      const dataAccessToken = parseJWT(accessToken);

      getLensProfile(address);
      
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        accessToken,
        refreshToken,
        exp: dataAccessToken.exp,
      }))

    } catch (err: any) {
      console.error(err.message);
    }
  }
    
  return {lensProfile, lensLogin, hasProfile}

}


