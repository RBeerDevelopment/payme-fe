import { useQuery } from "@apollo/client";
import { LoadingIndicator } from "@components/loading-indicator/loading-indicator";
import { MainProfileCard } from "@views/profile/main-profile-card";
import { PaymentMethodsProfileCard } from "@views/profile/payment-methods-profile-card";
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
            <div className="w-screen grid grid-flow-row grid-cols-1 lg:grid-cols-3">
                <div className="col-span-1 row-span-2">
                    <MainProfileCard user={user} />
                </div>
                <div className="col-span-2">
                    <PaymentMethodsProfileCard user={user} />
                </div>
            </ div>
        </>
    );
}