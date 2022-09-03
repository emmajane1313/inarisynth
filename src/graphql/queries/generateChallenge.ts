import {gql} from "@apollo/client";

const GENERATE_CHALLENGE = gql`
  query Challenge($request: ChallengeRequest!) {
    challenge(request: $request) {
      text
    }
  }
  `;

export default GENERATE_CHALLENGE;