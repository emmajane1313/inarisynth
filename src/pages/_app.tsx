<<<<<<< HEAD
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import {
  chain,
  configureChains,
  createClient,
  WagmiConfig,
} from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import { Header } from '../common/components/layout/Header';

const { chains, provider } = configureChains(
  [chain.polygon, chain.polygonMumbai],
  [
    alchemyProvider({ apiKey: process.env.ALCHEMY_ID }),
    publicProvider()
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'Inari Synth',
  chains
=======
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { createContext, useState } from "react";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { Header } from "../common/components/layout/Header";
import { Footer } from "../common/components/layout/Footer";

export const GlobalProfileContextDefault = {
  profileExists: false,
  setProfileExists: (profileExists: boolean) => {},
};

export const GlobalContext = createContext(GlobalProfileContextDefault);

const { chains, provider } = configureChains(
  [chain.polygon, chain.polygonMumbai],
  [alchemyProvider({ apiKey: process.env.ALCHEMY_ID }), publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "Inari Synth",
  chains,
>>>>>>> newer/main
});

const wagmiClient = createClient({
  autoConnect: false,
  connectors,
<<<<<<< HEAD
  provider
})

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <Header />
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>
  )
}

export default MyApp
=======
  provider,
});

function MyApp({ Component, pageProps }: AppProps) {
  const [profileExists, setProfileExists] = useState(GlobalProfileContextDefault.profileExists);
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <GlobalContext.Provider
          value={{ profileExists, setProfileExists }}
        >
          <Header />
          <Component {...pageProps} />
          <Footer />
        </GlobalContext.Provider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;
>>>>>>> newer/main
