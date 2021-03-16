import React, { useEffect, useState } from "react";

import {
    Close,
    ModalContainer,
    Overlay,
    ModalContent,
    InsideWrap,
} from "./styled";
import { clearAllBodyScrollLocks, disableBodyScroll } from "body-scroll-lock";
import Portal from "./portal";

import { usePresence } from "framer-motion";

const Modal = ({ toggle, children}) => {
    const [animationComplete, setAnimationComplete] = useState(false);
    const [isPresent, safeToRemove] = usePresence();

    const modalRef = React.createRef();
    const modalContentRef = React.createRef();

    useEffect(() => {
        disableBodyScroll(modalRef);
        if (!isPresent) {
            setAnimationComplete(false);
            setTimeout(safeToRemove, 500);
            clearAllBodyScrollLocks();
        }
    }, [isPresent, modalRef, safeToRemove]);

    return (
        <Portal>
            <ModalContainer ref={modalRef} style={{}}>
                <InsideWrap>
                    <Overlay
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{
                            duration: 0.5,
                        }}
                    />
                    <ModalContent
                        style={{
                            maxHeight: animationComplete ? "none" : "100vh",
                            overflow: animationComplete ? "auto" : "hidden",
                        }}
                        innerRef={modalContentRef}
                        initial={{
                            scale: 0,
                        }}
                        animate={{ scale: 1}}
                        exit={{
                            scale: 0,
                        }}
                        transition={{
                            duration: 0.5,
                        }}
                        onAnimationComplete={() => {
                            setAnimationComplete(true);
                        }}
                    >

                        <div className="w-100 d-flex justify-content-end">
                            {toggle && (
                                <Close
                                    onClick={() => {
                                        toggle(false);
                                        clearAllBodyScrollLocks();
                                    }}
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20.39 20.39"
                                >
                                    <title>close</title>
                                    <line
                                        x1="16.39"
                                        y1="16.39"
                                        x2="4"
                                        y2="4"
                                        fill="none"
                                        stroke="#FFFFFF"
                                        strokeLinecap="round"
                                        strokeMiterlimit="10"
                                        strokeWidth="1"
                                    />
                                    <line
                                        x1="4"
                                        y1="16.39"
                                        x2="16.39"
                                        y2="4"
                                        fill="none"
                                        stroke="#FFFFFF"
                                        strokeLinecap="round"
                                        strokeMiterlimit="10"
                                        strokeWidth="1"
                                    />
                                </Close>
                            )}
                        </div>
                        {React.cloneElement(children, { toggle }, null)}
                    </ModalContent>
                </InsideWrap>
            </ModalContainer>
        </Portal>
    );
};

export default Modal;
