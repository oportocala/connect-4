import React from 'react';
import ReplayBtn from './overlay/replay-btn';
import Player from './current-player/player';
import GameActions from '../../actions/game';

class WinnerOverlay extends React.Component {

    render () {
        var className =  "overlay " + (this.props.visible ? 'visible':'');
        return (<div className={className}>
            <div><img src={`images/player_${this.props.player}_win.svg`} height="85" /></div>
            <ReplayBtn />
            <Player className={`player-${this.props.player} active`}/>
        </div>);

    }
}

export default WinnerOverlay;
