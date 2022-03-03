import { useQuery } from "@apollo/client";
import { USER_QUERY, UserData, UserQueryVars } from "../../graphql";
import React from "react";
import Image from "next/image";

interface Props {
    username: string
}

export function MainProfileCard(props: Props): React.ReactElement {

    const { username } = props;

    const {data, loading, error } = useQuery<UserData, UserQueryVars>(USER_QUERY, { variables: { username }});

    console.log({ data, error });

    if(loading) return (<p>Loading...</p>);
    if(error) return (<p>ERROR...</p>);

    if(!data) {
        return (<p>ERROR...</p>);
    }

    const { user } = data;

    return (
        <div className="flex flex-col p-8 pt-2 m-4 w-11/12 md:w-1/4 bg-white rounded-md shadow-xl shadow-gray-400">

            {user.avatarUrl && <Image src={user.avatarUrl} width={92} height={92}/>}

            <p className="text-2xl font-semibold my-4">{`${user.firstName} ${user.lastName}`}</p>
            <p className="font-thin text-sm">Email Adress</p>
            <p>{user.email}</p>
            <p className="font-thin text-sm mt-4">Username</p>
            <p>{user.username}</p>
        </ div>
    );
}