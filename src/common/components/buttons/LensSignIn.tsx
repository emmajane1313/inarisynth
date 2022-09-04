import React from "react";
import { useLensSignIn } from "../../hooks/useLensSignIn";

export const LensSignIn: React.FC = (): JSX.Element => {

    const {lensProfile, lensLogin} = useLensSignIn();

    return (
        <div>
            <button onClick={lensLogin}>Sign In to Lens</button>
        </div>
    )
}