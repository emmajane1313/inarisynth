import { gql } from "@apollo/client";
import { apolloClient } from "../../lib/lens/client";

const ENABLED_MODULE_CURRENCIES = `
query EnabledModuleCurrencies {
    enabledModuleCurrencies {
      name
      symbol
      decimals
      address
    }
  }
`;

const enabledCurrencies = () => {
  return apolloClient.query({
    query: gql(ENABLED_MODULE_CURRENCIES),
  });
};

export default enabledCurrencies;
