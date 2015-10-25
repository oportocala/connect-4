'use strict';

import React from 'react';
import classNames from 'classnames';

class Cell extends React.Component {

    render () {
        const props = this.props;
        const pos = props.pos;
        const r = props.size/2;
        var className = "cell player-" + props.player;
        if (props.highlight) {
            className += ' highlight';
        }
        return (<circle cx={pos.x+r} cy={pos.y-r} r={r} className={className} />);
    }
}

export default Cell;
