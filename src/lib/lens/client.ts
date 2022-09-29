import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
} from "@apollo/client";
import { BASE_URL } from "./constants";
import { getAuthenticationToken, getRefreshToken } from "./utils";
import jwt_decode from "jwt-decode";
import { RetryLink } from "@apollo/client/link/retry";

const httpLink = new HttpLink({ uri: BASE_URL });

const retryLink = new RetryLink();

let link: any;

link = ApolloLink.from([retryLink, httpLink]);

type decodedType = {
  exp: number;
  iat: number;
  id: string;
  role: string;
};
let decoded: decodedType;

// auth client
export const authClient = new ApolloClient({
  link: link,
  uri: BASE_URL,
  cache: new InMemoryCache(),
});

// main client
const authLink = new ApolloLink((operation, forward) => {
  const token = getAuthenticationToken() as string;
  // const refreshToken = getRefreshToken() as string;
  if (token) decoded = jwt_decode(token as string);

  operation.setContext({
    headers: {
      "x-access-token": token ? `Bearer ${token}` : "",
    },
  });

  return forward(operation);
});

link = ApolloLink.from([retryLink, authLink.concat(httpLink)]);

export const apolloClient = new ApolloClient({
  link: link,
  uri: BASE_URL,
  cache: new InMemoryCache(),
});
