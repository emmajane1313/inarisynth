import {gql} from "@apollo/client";

const AUTHENTICATE_LOGIN = gql`
mutation Authenticate($request: SignedAuthChallenge!) { 
  authenticate(request: $request) {
    accessToken
    refreshToken
  }
}
`;

export default AUTHENTICATE_LOGIN;