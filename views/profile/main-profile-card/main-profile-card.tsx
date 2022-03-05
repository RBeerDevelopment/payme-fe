import { User } from "../../../graphql";
import React from "react";
import Image from "next/image";

interface Props {
    user: User
}

export function MainProfileCard(props: Props): React.ReactElement {

    const { user } = props;

    return (
        <div className="flex flex-col p-8 pt-2 m-4 bg-white rounded-md shadow-xl shadow-gray-400">

            {user.avatarUrl && <Image src={user.avatarUrl} width={92} height={92} priority />}

            <p className="text-2xl font-semibold my-4">{`${user.firstName} ${user.lastName}`}</p>
            <p className="font-thin text-sm">Email Adress</p>
            <p>{user.email}</p>
            <p className="font-thin text-sm mt-4">Username</p>
            <p>{user.username}</p>
        </ div>
    );
}