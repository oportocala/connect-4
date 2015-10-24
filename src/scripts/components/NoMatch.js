'use strict';

import React from 'react';
import {Route, Link} from 'react-router';

// CSS
require('styles/normalize.css');
require('styles/main.css');

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
