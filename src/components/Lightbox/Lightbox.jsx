import { useState } from "react";

const Lightbox = (image) => {
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const {large, thumbnail} = image.image;

    const showDialogHandler = () => {
        setLightboxOpen(!lightboxOpen);
    }

    return (
        <>
            <img src={thumbnail} onClick={() => showDialogHandler()}/>
            {lightboxOpen && (
                <dialog
                    className="userProfile__imgDialogue"
                    open
                    onClick={() => showDialogHandler()}
                >
                    <img src={large} onClick={() => showDialogHandler()} className="userProfile__imgLarge"/>
                    <p>Click on image to close</p>
                </dialog>
            )}
        </>
    )
}

export default Lightbox;