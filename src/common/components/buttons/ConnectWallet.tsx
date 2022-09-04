import React, { FunctionComponent } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export const ConnectWallet: FunctionComponent = (): JSX.Element => {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        const ready = mounted && authenticationStatus !== "loading";
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === "authenticated");

        return (
          <div
            {...(!ready && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <button
                    onClick={openConnectModal}
                    type="button"
                    className="m-0 justify-center font-sans text-sm bg-gradient-to-r from-grad1 via-grad2 to-grad4 h-10 w-fit py-1 px-4 rounded-lg hover:opacity-90 relative -top-2"
                  >
                    <div className="w-full justify-center relative text-center flex leading-8 font-distro text-offBlack">
                      CONNECT WALLET
                    </div>
                  </button>
                );
              }

              if (chain.unsupported) {
                return (
                  <button
                    onClick={openChainModal}
                    type="button"
                    className="m-0 justify-center font-sans text-sm bg-gradient-to-r from-grad1 via-grad2 to-grad4 h-10 w-fit py-1 px-4 rounded-lg hover:opacity-90 relative -top-2"
                  >
                    <div className="w-full justify-center relative text-center flex leading-8 font-distro text-offBlack">
                      SWITCH NETWORK
                    </div>
                    <div className="relative h-3 w-3">
                      <div className="animate-ping absolute -right-32 -top-10 h-3 w-3 rounded-full opacity-75 bg-red-600"></div>
                      <div className="absolute -right-32 -top-10 inline-flex rounded-full h-3 w-3 bg-red-500"></div>
                    </div>
                  </button>
                );
              }

              return (
                <div style={{ display: "flex", gap: 12 }}>
                  <button
                    onClick={openAccountModal}
                    type="button"
                    className="m-0 justify-center font-sans text-sm bg-gradient-to-r from-grad1 via-grad2 to-grad4 h-10 w-fit py-1 px-4 rounded-lg hover:opacity-90 relative -top-2"
                  >
                    <div>
                      {account.ensAvatar ? account.ensAvatar : null}
                    </div>
                    <div className="w-full justify-center relative text-center flex leading-8 font-distro text-offBlack">
                      {account.ensName ? account.ensName : account.displayName}
                    </div>
                  </button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};
