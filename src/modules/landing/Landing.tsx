import Image from "next/image";
import React, { FunctionComponent } from "react";
import { HomeAnimation } from "../../common/components/gallery/Gallery";

export const Landing: FunctionComponent = (): JSX.Element => {
    return (
        <div className="flex text-center relative w-full min-h-screen">
            <HomeAnimation />
            <div className="left-[39%] sm:left-[45%] top-[25%] cursor-pointer absolute hover:rotate-3">
                <Image priority src="/images/icons/logoinari.png" width={100} height={144} alt="logo"/>
            </div>
            <div className="text-distro text-offBlack top-1/2 sm:top-[43%] w-full text-7xl sm:text-9xl absolute justify-center">INARI SYNTH</div>
        </div>
    )
}