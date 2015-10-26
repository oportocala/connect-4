import React from 'react';
import {Link} from 'react-router';

class DrawOverlay extends React.Component {

    render () {
        var className =  "overlay " + (this.props.visible ? 'visible':'');
        return (<div className={className}>
            <div><img src="images/draw_title.svg" height="85" /></div>
            <Link to="/" className="replay-btn">
                <img src="images/replay_btn.svg" height="85" />
            </Link>
        </div>);

    }
}

export default DrawOverlay;
