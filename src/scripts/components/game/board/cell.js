'use strict';

import React from 'react';

class Cell extends React.Component {

    render () {
        const props = this.props;
        const pos = props.pos;
        const r = props.size/2;
        const className = "cell player-" + props.player;

        return (<circle cx={pos.x+r} cy={pos.y-r} r={r} className={className} />);
    }
}

export default Cell;
