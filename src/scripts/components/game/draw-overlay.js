import React from 'react';
import ReplayBtn from './overlay/replay-btn';
import GameActions from '../../actions/game';

class DrawOverlay extends React.Component {

    render () {
        var className =  "overlay " + (this.props.visible ? 'visible':'');
        return (<div className={className}>
            <div><img src="images/draw_title.svg" height="85" /></div>
            <ReplayBtn />
        </div>);

    }
}

export default DrawOverlay;
