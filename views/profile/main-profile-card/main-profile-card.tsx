import { User } from "../../../graphql";
import React from "react";
import Image from "next/image";
import { ProfileCard } from "@components/cards";

interface Props {
    user: User
}

export function MainProfileCard(props: Props): React.ReactElement {

    const { user } = props;

    return (
        <ProfileCard>
            {user?.avatarUrl ? <Image src={user.avatarUrl} width={92} height={92} priority /> : <></>}
            <p className="text-2xl font-semibold my-4">{`${user?.firstName} ${user?.lastName}`}</p>
            <p className="font-thin text-sm">Email Adress</p>
            <p>{user?.email}</p>
            <p className="font-thin text-sm mt-4">Username</p>
            <p>{user?.username}</p>
        </ProfileCard>
    );
}