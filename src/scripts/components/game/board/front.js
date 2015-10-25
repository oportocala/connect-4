'use strict';

import React from 'react';


class Front extends React.Component {

    render () {
        return (<g className="front">
            <defs>
                <mask id="holes">
                    <rect width="100%" height="100%" fill="white"/>
                    {this.props.children}
                </mask>
            </defs>
            <rect width="100%" height="100%" className="mask"/>
        </g>);
    }
}



export default Front;
