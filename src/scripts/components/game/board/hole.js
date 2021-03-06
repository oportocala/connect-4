'use strict';

import React from 'react';
import classNames from 'classnames';

class Hole extends React.Component {

    render () {
        const props = this.props;
        const pos = props.pos;
        const r = props.size/2;
        var className = 'cell';
        if (props.player) {
            className += ' player-' + props.player;
        }
        if (props.highlight) {
            className += ' highlight';
        }
        if (props.latest) {
            className += ' latest';
        }
        return (<circle cx={pos.x+r} cy={pos.y-r} r={r} className={className} />);
    }
}

export default Hole;
