import { gql } from "@apollo/client";
import { authClient } from "../../lib/lens/client";

const REFRESH_AUTHENTICATION = `
  mutation($request: RefreshRequest!) { 
    refresh(request: $request) {
      accessToken
      refreshToken
    }
 }`

const refreshAuth = (refreshToken: string) => {
  return authClient.mutate({
    mutation: gql(REFRESH_AUTHENTICATION),
    variables: {
      request: {
        refreshToken,
      },
    },
  });
};

export default refreshAuth;
