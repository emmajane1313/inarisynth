import { authClient } from './../../lib/lens/client';
import { gql } from '@apollo/client'

const GET_CHALLENGE = `
  query($request: ChallengeRequest!) {
    challenge(request: $request) { text }
  }
`

export const generateChallenge = (address?: string) => {
   return authClient.query({
    query: gql(GET_CHALLENGE),
    variables: {
      request: {
         address,
      },
    },
  })
}
export default generateChallenge;
