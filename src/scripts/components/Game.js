'use strict';

import React from 'react';

import Board from './game/board';
import CurrentPlayer from './game/current-player';

// CSS
require('styles/normalize.css');
require('styles/main.css');

class Game extends React.Component {


    render () {
        var cells = [

            {pos: {col: 0, row: 0}, player: 1},
            {pos: {col: 0, row: 1}, player: 2},

            {pos: {col: 1, row: 0}, player: 1},
            {pos: {col: 2, row: 0}, player: 2},

            {pos: {col: 3, row: 0}, player: 1},
            {pos: {col: 4, row: 0}, player: 2},

            {pos: {col: 5, row: 0}, player: 1},
            {pos: {col: 5, row: 1}, player: 2},

            {pos: {col: 6, row: 0}, player: 2},
            {pos: {col: 6, row: 1}, player: 1}

        ];
        const currentPlayer = 1;

        return (
            <div className='main'>
                <Board cols={7} rows={6} cells={cells}/>
                <CurrentPlayer player={currentPlayer}/>
            </div>
        );
    }
}

export default Game;
