'use strict';

import React from 'react/addons';

describe('Main', function () {
  let Connect4App, component;

  beforeEach(function () {
    const container = document.createElement('div');
    container.id = 'content';
    document.body.appendChild(container);

    Connect4App = require('components/Connect4App.js');
    component = React.createElement(Connect4App);
  });

  it('should create a new instance of Connect4App', function () {
    expect(component).toBeDefined();
  });
});
