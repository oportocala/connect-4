'use strict';

import React from 'react';
import {Link} from 'react-router';


class NoMatch extends React.Component {
    render () {
        return (
            <div className='main'>
                <div className="menu">
                    <Link to="/">404 - NOT FOUND!</Link>
                </div>
            </div>
        );
    }
}

export default NoMatch;
