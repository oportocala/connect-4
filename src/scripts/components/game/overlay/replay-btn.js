import React from 'react';
import GameActions from '../../../actions/game';

class ReplayBtn extends React.Component {

    onClick (e) {
        "use strict";
        e.preventDefault();
        GameActions.restart();
    }
    render () {
        return (
            <a onClick={this.onClick} className="replay-btn">
                <img src="images/replay_btn.svg" height="85" />
            </a>
        );
    }
}

export default ReplayBtn;
