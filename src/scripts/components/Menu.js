'use strict';

import React from 'react';

import {Link} from 'react-router';

// CSS
require('styles/normalize.css');
require('styles/main.css');

class Menu extends React.Component {
    render () {
        return (
            <div className='main'>
                <div className="menu">
                    <div><img src="images/start_screen_art.svg" width="263" height="263"/></div><br/>
                    <br/>
                    <Link to="/game">Start Game</Link>
                </div>
            </div>
        );
    }
}

export default Menu;
