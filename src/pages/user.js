import React from "react";
import { useAuth } from "../context/auth";

const User = () => {
    const { user } = useAuth();
    return (
        <>
            <div>This is the user page</div>
            <h3>Username: {user.username}</h3>
            <h3>Firstname: {user.firstName}</h3>
        </>
    );
};

export default User;
