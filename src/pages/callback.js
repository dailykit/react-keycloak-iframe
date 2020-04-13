import React from "react";
import { useAuth } from "../context/auth";

const Callback = () => {
    React.useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const urlToRedirect = urlParams.get("url");
        window.parent.location.href =
            window.parent.location.protocol +
            "//" +
            window.parent.location.host +
            urlToRedirect;
    });
    return null;
};

export default Callback;
