import React from "react";

interface Props {
    onClick: () => void,
    text: string
}

export function AddPaymentTypeButton(props: Props): React.ReactElement {

    const { onClick, text } = props;

    return (
        <button onClick={onClick} className="bg-green-500 w-1/2 lg:w-1/5 hover:bg-green-700 text-white font-bold py-2 px-4 m-2 rounded-full shadow-lg hover:shadow-3xl hover:scale-105">
            {text}
        </button>
    );
}