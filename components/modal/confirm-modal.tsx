import { TextButton } from "@components/text-button";
import { EmptyFn } from "@components/text-button/empty-fn";
import React from "react";
import { Modal } from "./modal";

interface Props {
    onConfirm: EmptyFn
    title: string
    content: string
    hideModal: EmptyFn
    show: boolean
}

export function ConfirmModal(props: Props): React.ReactElement {

    const { 
        onConfirm,
        title,
        content,
        hideModal,
        show
    } = props;
    return (
        <Modal hideModal={hideModal} show={show} title={title}>
            <div className="bg-white rounded-md pt-8 divide-y-2">
                <div className="pb-6 text-center">
                    {content}
                </div>
                <div className="pt-4 flex flex-row justify-evenly">
                    <TextButton onClick={hideModal} bgColor="gray-700">
                        Cancel
                    </ TextButton>
                    <TextButton onClick={() => {
                        onConfirm();
                        hideModal();
                    }} bgColor="red-600">
                        Confirm
                    </ TextButton>
                </div>
            </div>
        </Modal>
    );
}