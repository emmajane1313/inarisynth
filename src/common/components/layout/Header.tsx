import React, { FunctionComponent } from "react";
import { ConnectWallet } from "../buttons/ConnectWallet";

export const Header: FunctionComponent = (): JSX.Element => {
    return (
        <div className="w-full flex justify-end p-5 bg-transparent absolute z-30">
            <ConnectWallet />
        </div>
    )
}