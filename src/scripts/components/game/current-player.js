"use strict";

import React from 'react';

class CurrentPlayer extends React.Component {


    render () {
        return (<div>Player <span>{this.props.player}</span></div>);
    }

}


export default CurrentPlayer;
