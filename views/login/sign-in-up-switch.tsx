import { useTranslation } from "next-i18next";
import React from "react";
import { ActionType } from "./action-type";



interface Props {
    actionType: ActionType,
    setActionType: (aT: ActionType) => void
}

export function SignInUpSwitch(props: Props): React.ReactElement {

    const { actionType, setActionType } = props;

    const { t } = useTranslation("login");

    let text = "";

    function toggleActionType() {
        if(actionType === ActionType.Signin) setActionType(ActionType.Signup);
        else setActionType(ActionType.Signin);
    }


    if(actionType === ActionType.Signin) {
        text = t("signup-instead");
    } else if(actionType === ActionType.Signup) {
        text = t("signin-instead");
    }

    return (
        <>
            <p onClick={toggleActionType} className="hover:underline text-gray-900 cursor-pointer">{text}</p>
        </>
    );
}