import React from "react";
import { useAuth } from "../context/auth";

const Login = () => {
    const { keycloakLoginUrl } = useAuth();
    return (
        <div className="App">
            <iframe
                seamless
                id="iFrame"
                src={keycloakLoginUrl}
                width="500px"
                height="700px"
                frameBorder="0"
                scrolling="no"
            ></iframe>
        </div>
    );
};

export default Login;
