import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Landing from "./pages/landing";
import Listing from "./pages/listing";
import User from "./pages/user";
import Login from "./pages/login";
import Callback from "./pages/callback";
import Help from "./pages/help";

const App = () => {
    return (
        <>
            <Route path="/" exact component={Landing} />
            <Route path="/restaurants" exact component={Listing} />
            <Route path="/users" exact component={User} />
            <Route path="/login" exact component={Login} />
            <Route path="/callback" exact component={Callback} />
            <Route path="/help" exact component={Help} />
        </>
    );
};

export default App;
