import React from "react";
import Keycloak from "keycloak-js";
import { useHistory } from "react-router-dom";

const keycloak = new Keycloak({
    realm: process.env.REACT_APP_KEYCLOAK_REALM,
    url: process.env.REACT_APP_KEYCLOAK_URL,
    clientId: process.env.REACT_APP_KEYCLOAK_CLIENT_ID,
    "ssl-required": "none",
    "public-client": true,
    "bearer-only": false,
    "verify-token-audience": true,
    "use-resource-role-mappings": true,
    "confidential-port": 0,
});

const AuthContext = React.createContext();

const excludeUrls = ["/", "/help"];

export const AuthProvider = ({ children }) => {
    const history = useHistory();
    const [isLoading, setLoading] = React.useState(true);
    const [keycloakLoginUrl, setKeycloakLoginUrl] = React.useState("");
    const [isAuthenticated, setIsAuthenticated] = React.useState(false);
    const [user, setUser] = React.useState({});

    let isLoggedIn = false;
    const initialize = async () => {
        const authenticated = await keycloak.init({
            onLoad: "check-sso",
            promiseType: "native",
        });
        if (authenticated) {
            setLoading(false);
            isLoggedIn = true;
            if (
                window.location.pathname == "/login" ||
                window.location.pathname == "/"
            ) {
                history.push("/restaurants");
            }
        } else {
            isLoggedIn = false;
            setKeycloakLoginUrl(
                keycloak.createLoginUrl({
                    redirectUri:
                        `${window.location.protocol}` +
                        "//" +
                        `${window.location.hostname}` +
                        ":" +
                        `${window.location.port}` +
                        "/callback?url=" +
                        `${window.location.pathname}`,
                })
            );
            {
                excludeUrls.includes(window.location.pathname)
                    ? history.push(window.location.pathname)
                    : history.push("/login");
            }
            setLoading(false);
        }
        if (isLoggedIn) {
            setIsAuthenticated(true);
            const user = await keycloak.loadUserProfile();
            setUser(user);
        }
    };

    React.useEffect(() => {
        initialize();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                keycloakLoginUrl,
                user,
                isLoading,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => React.useContext(AuthContext);
