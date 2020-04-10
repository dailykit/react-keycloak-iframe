import React from "react";

class Callback extends React.Component {
    render() {
        return null;
    }

    componentDidMount() {
        window.parent.location.reload();
    }
}

export default Callback;
