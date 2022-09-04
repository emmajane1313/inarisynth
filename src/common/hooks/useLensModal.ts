import { useState } from "react"
import { UseLensModalResults } from "../../generated/lens/lenstypes";

export const useLensModal = (): UseLensModalResults => {

    const [lensModalClose, setLensModalClose] = useState<boolean>(false);

    const handleLensModalOpen = (): void => {
        setLensModalClose(false);
    }

    const handleLensModalClose = (): void => {
        setLensModalClose(true);
    }

    return {lensModalClose, handleLensModalOpen, handleLensModalClose}
}