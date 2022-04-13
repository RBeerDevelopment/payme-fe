import { useQuery } from "@apollo/client";
import { LoadingIndicator } from "@components/loading-indicator";
import { MainProfileCard } from "./main-profile-card";
import { PaymentMethodsProfileCard } from "./payment-methods-profile-card";
import { PaymentRequestsProfileCard } from "./payment-requests-profile-card";

import { UserData, UserQueryVars, USER_QUERY } from "@graphql/user";
import React from "react";
import { useAuthContext } from "context";


export function Profile(): React.ReactElement {

    const { user: authUser } = useAuthContext();

    if(!authUser) return <></>;

    const { username } = authUser;

    const { data, loading, error } = useQuery<UserData, UserQueryVars>(USER_QUERY, { variables: { username, onlyActive: true }});

    if(loading) return (<LoadingIndicator />);
    if(error) return (<p>ERROR...</p>);

    if(!data) {
        return (<p>ERROR...</p>);
    }

    const { user } = data;
    
    return (
        <>
            <div className="w-screen grid grid-flow-row grid-cols-1 lg:grid-cols-3">
                <div className="col-span-1 row-span-2">
                    <MainProfileCard user={user} />
                </div>
                <div className="col-span-2">
                    <PaymentMethodsProfileCard user={user} />
                    <PaymentRequestsProfileCard user={user} />
                </div>
            </ div>
        </>
    );
}