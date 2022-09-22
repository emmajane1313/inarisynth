import {gql} from "@apollo/client";
import {authClient} from "./../../lib/lens/client"

const AUTHENTICATE_LOGIN = `
mutation Authenticate($request: SignedAuthChallenge!) { 
  authenticate(request: $request) {
    accessToken
    refreshToken
  }
}
`;

const authenticate = (address: string | undefined, signature: string) => {
  return authClient.mutate({
   mutation: gql(AUTHENTICATE_LOGIN),
   variables: {
     request: {
       address,
       signature,
     },
   },
 })
}

export default authenticate;