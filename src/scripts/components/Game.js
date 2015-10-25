'use strict';

import React from 'react';
import Immutable from 'immutable';

import Board from './game/board';
import CurrentPlayer from './game/current-player';

// CSS
require('styles/normalize.css');
require('styles/main.css');

class Game extends React.Component {


    constructor () {
        super();
        this.state = {
            cells: [

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

            ],

            currentPlayer: 1
        };
    }

    determineRow (col) {
        var allRows = this.state.cells
            .filter( (move) => move.pos.col === col)
            .map( (move) => move.pos.row);

        return Math.max.apply(Math, allRows) + 1;
    }

    getNextPlayer (currentPlayer) {
        return (currentPlayer === 1) ? 2: 1;
    }

    checkWon (cells) {

    }

    checkDraw (cells) {

    }

    onColClick (col) {

        console.log(col, this, 'column was clicked: must: add to cells, check if won, switch player');
        var row = this.determineRow(col);
        console.log('determined row:', row);
        var move = {pos: {col: col, row: row}, player: this.state.currentPlayer};


        this.state.cells.push(move);

        if (this.checkWon(this.state.cells)) {
            console.log('game was won by:', this.state.currentPlayer);
        }

        if (this.checkDraw(this.state.cells)) {
            console.log('game is draw');
        }

        this.setState({cells: this.state.cells, currentPlayer: this.getNextPlayer(this.state.currentPlayer)});
    }

    render () {
        return (

            <div className='main'>
                <Board cols={7} rows={6} cells={this.state.cells} onColClick={this.onColClick.bind(this)}/>
                <CurrentPlayer player={this.state.currentPlayer}/>
            </div>
        );
    }
}

export default Game;
