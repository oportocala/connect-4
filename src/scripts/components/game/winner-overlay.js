import React from 'react';
import ReplayBtn from './overlay/replay-btn';
import GameActions from '../../actions/game';

class WinnerOverlay extends React.Component {

    render () {
        var className =  "overlay " + (this.props.visible ? 'visible':'');
        return (<div className={className}>
            <div><img src={`images/player_${this.props.player}_win.svg`} height="85" /></div>
            <ReplayBtn />
        </div>);

    }
}

export default WinnerOverlay;
