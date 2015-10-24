'use strict';

import React from 'react';


class Mask extends React.Component {

    render () {
        return React.createElement(
            "g",
            null,
            React.createElement(
                "defs",
                null,
                React.createElement(
                    "mask",
                    { id: "holes" },
                    React.createElement("rect", { width: "100%", height: "100%", fill: "white" }),
                    this.props.children
                )
            ),
            React.createElement("rect", { width: "100%", height: "100%", mask: "url(#holes)", className: "mask" })
        );
    }
}



export default Mask;
