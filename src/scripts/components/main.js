'use strict';

// Babel polyfills
require("babel/polyfill");

// Import libraries first
import React from 'react';
import { render } from 'react-dom';

import { Router, Route, IndexRoute } from 'react-router';

// Make sure the stores are included
import * as stores from "stores";

// The components
import App from './App';
import Menu from './Menu';
import Game from './Game';
import NoMatch from './NoMatch';

require('./utils/ga');

render((
    <Router>
        <Route path="/" component={App}>
            <IndexRoute component={Menu}/>
            <Route path="game" component={Game}/>
        </Route>

        <Route path="*" component={NoMatch}/>
    </Router>
), document.getElementById('content'));
