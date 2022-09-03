import Image from "next/image";
import React, { FunctionComponent } from "react";

export const Landing: FunctionComponent = (): JSX.Element => {
    return (
        <div className="flex text-center relative w-full min-h-screen">
            <div className="w-full top-[25%] absolute">
                <Image src="/images/icons/logoinari.png" width={100} height={144} alt="logo"/>
            </div>
            <div className="text-distro text-offBlack top-1/2 sm:top-[43%] text-7xl sm:text-9xl w-full absolute justify-center">INARI SYNTH</div>
        </div>
    )
}