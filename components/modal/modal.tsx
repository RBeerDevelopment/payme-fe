import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment } from "react";

interface Props {
    title: string
    children?: React.ReactNode
    hideModal: () => void
    show: boolean
}

export function Modal(props: Props): React.ReactElement {

    const { children, hideModal, show, title } = props;

    return (
        <Transition
            show={show} as={Fragment}
        >
            <Dialog className="fixed z-50 inset-0 pt-12 overflow-y-auto" onClose={hideModal}>
                <div className="min-h-screen px-4 text-center">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0 bg-black opacity-40" />
                    </Transition.Child>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-sm rounded-lg">
                            <Dialog.Title
                                as="h2"
                                className="text-xl font-medium leading-6 text-gray-900"
                            >
                                {title}
                            </Dialog.Title>
                            <div className="mt-2">
                                {children}
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            
            </Dialog>
        </Transition>
    );
}