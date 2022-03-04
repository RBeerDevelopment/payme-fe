import React from "react";

interface Props {
    children?: React.ReactNode
    hideModal: () => void
    show: boolean
}

export function Modal(props: Props): React.ReactElement {

    const { children, hideModal, show } = props;

    return (
        <>
            { show && (<>
                <div className="opacity-25 fixed inset-0 z-40 bg-black" onClick={hideModal}></div>
                <div
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 justify-center items-center flex overflow-x-auto overflow-y-auto z-50 outline-none focus:outline-none"
                >
                    <div className="relative w-auto my-6 mx-auto">
                        {children}
                    </div>
                </div>
            </>)}
        </>
    );
}