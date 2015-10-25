import React from 'react';
import {Link} from 'react-router';

class Overlay extends React.Component {

    render () {
        var className =  "overlay " + (this.props.visible ? 'visible':'');
        return (<div className={className}>
            <p className="message">{this.props.message}</p>
            <Link to="/">Restart game</Link>
        </div>);

    }
}

export default Overlay;
