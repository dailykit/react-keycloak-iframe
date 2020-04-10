import React from "react";
import { Link } from "react-router-dom";

import { useAuth } from "../context/auth";
const Landing = () => {
    return (
        <div>
            <div>This is the landing page</div>
            <Link to="/login">Login</Link>
        </div>
    );
};

export default Landing;
