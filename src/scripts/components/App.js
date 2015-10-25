"use strict";

import React from 'react';
import {Link} from 'react-router';


class App extends React.Component {

    render() {

        return (<div>
            <Link to="/">
                <h1><img src="images/title.svg" width="263"/></h1>
            </Link>

            <div className="inner">
                {this.props.children}
            </div>
        </div>);
    }
}

export default App;
