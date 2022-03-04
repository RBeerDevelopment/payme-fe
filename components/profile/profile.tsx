import { useQuery } from "@apollo/client";
import { LoadingIndicator } from "@components/loading-indicator/loading-indicator";
import { MainProfileCard } from "@components/main-profile-card";
import { Modal } from "@components/modal/modal";
import { SepaProfileCard } from "@components/sepa-profile-card";
import { UserData, UserQueryVars, USER_QUERY } from "@graphql/user";
import React from "react";

interface Props {
    username: string
}

export function Profile(props: Props): React.ReactElement {

    const { username } = props;

    const {data, loading, error } = useQuery<UserData, UserQueryVars>(USER_QUERY, { variables: { username }});



    if(loading) return (<LoadingIndicator />);
    if(error) return (<p>ERROR...</p>);

    if(!data) {
        return (<p>ERROR...</p>);
    }

    const { user } = data;
    
    return (
        <>
            <div className="w-screen grid grid-flow-row grid-cols-1  lg:grid-cols-3">
                <div className="col-span-1">
                    <MainProfileCard user={user} />
                </div>
                <div className="col-span-2">
                    <SepaProfileCard sepaList={user.sepa} />
                </div >
            </ div>
        </>
    );
}