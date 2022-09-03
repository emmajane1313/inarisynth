import {gql} from "@apollo/client";

const REFRESH_LOGIN = gql`
mutation Authenticate($request: SignedAuthChallenge!) { 
  authenticate(request: $request) {
    accessToken
    refreshToken
  }
}
`;

export default REFRESH_LOGIN;