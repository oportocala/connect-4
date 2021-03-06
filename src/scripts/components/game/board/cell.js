import React from 'react';
import classNames from 'classnames';
import {Motion, spring} from 'react-motion';

class Cell extends React.Component {

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
        var y = -props.size;
        return (
            <Motion defaultStyle={{y: y}} style={{y: spring(pos.y - r, [120, 17])}}>
                {value => <circle r={r} cx={pos.x + r} cy={value.y} className={className} />}
            </Motion>
        );
    }
}

export default Cell;
