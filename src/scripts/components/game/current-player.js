"use strict";

import React from 'react';
import Player from './current-player/player.js';

class CurrentPlayer extends React.Component {


    render () {
        var p1ClassNames = "player-1 " + (this.props.player === 1? 'active': '');
        var p2ClassNames = "player-2 " + (this.props.player === 2? 'active': '');

        return (<div className="current-player">
            <Player name={"Player1"} className={p1ClassNames}/>
            <Player name={"Player2"} className={p2ClassNames}/>
        </div>);
    }

}


export default CurrentPlayer;
