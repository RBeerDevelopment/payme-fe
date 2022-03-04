import { Modal } from "@components/modal/modal";
import React from "react";

interface Props {
    hideModal: () => void
    show: boolean
}

export function AddSepaModal(props: Props): React.ReactElement {

    const { hideModal, show } = props;
    
    return (
        <>
            <Modal hideModal={hideModal} show={show}>
                <div className="bg-white rounded-md p-4">
                    <p className="text-2xl">Add Sepa</p>
                    <form></form>
                </div>
            </Modal>
        </>
    );
}