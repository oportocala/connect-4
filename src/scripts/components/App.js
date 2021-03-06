"use strict";

import React from 'react';
import {Link} from 'react-router';

// CSS
require('styles/normalize.css');
require('styles/main.css');

class App extends React.Component {

    render() {

        return (
            <div className="inner">
                <Link to="/">
                    <h1><img src="images/title.svg" width="263"/></h1>
                </Link>
                {this.props.children}
            </div>
        );
    }
}

export default App;
