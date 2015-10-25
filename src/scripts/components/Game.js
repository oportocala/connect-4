'use strict';

import React from 'react';
import Immutable from 'immutable';

import Board from './game/board';
import Overlay from './game/overlay';
import CurrentPlayer from './game/current-player';

// CSS
require('styles/normalize.css');
require('styles/main.css');

class Game extends React.Component {


    constructor () {
        super();
        this.state = {
            cells: [



            ],

            currentPlayer: 1,

            overlay: {
                visible: false,
                message: ''
            }
        };
    }

    determineRow (col) {
        var allRows = this.state.cells
            .filter( (move) => move.pos.col === col) // get only moves on this column
            .map( (move) => move.pos.row); // get just the row value
        if (allRows.length) {
            return Math.max.apply(Math, allRows) + 1;
        } else {
            return 0;
        }
    }

    getNextPlayer (currentPlayer) {
        return (currentPlayer === 1) ? 2: 1;
    }

    checkWon (cells = [], lastMovePos = false, player = 1) {
        if (cells.length < 4) {
            return false;
        }

        var playerPositions = cells
            .filter( (move) => (move.player === player))
            .map( (move) => move.pos );

        var cols = this.props.cols;
        var rows = this.props.rows;

        var movesOnColumn = Array(rows).fill(false);
        var movesOnRow = Array(cols).fill(false);
        var movesOnDiag1 = Array(Math.max(rows, cols)).fill(false);
        var movesOnDiag2 = Array(Math.max(rows, cols)).fill(false);

        playerPositions
            .filter( (pos) => pos.col === lastMovePos.col)
            .forEach( (pos) => {
                movesOnColumn[pos.row] = true;
            });

        playerPositions
            .filter( (pos) => pos.row === lastMovePos.row)
            .forEach( (pos) => {
                movesOnRow[pos.col] = true;
            });

        // First diagonal, left-top to right-bottom is determined by addition
        playerPositions
            .filter( (pos) => pos.col + pos.row  === lastMovePos.col + lastMovePos.row)
            .forEach( (pos) => {console.log(pos.col, pos.row); movesOnDiag1[pos.row] = true;});

        // Second diagonal, right-top, left-bottom is determined by subtraction
        playerPositions
            .filter( (pos) => pos.row - pos.col === lastMovePos.row - lastMovePos.col)
            .forEach( (pos) => movesOnDiag2[pos.row] = true);

        return this.checkArray(movesOnColumn) || this.checkArray(movesOnRow) ||
            this.checkArray(movesOnDiag1) || this.checkArray(movesOnDiag2);
    }

    checkArray (array, numberOf = 4) {
        var c = 0;
        for(var i=0;i< array.length; i++) {
            if (array[i] === true) {
                c++;
                if (c === numberOf) {
                    return true;
                }
            } else {
                c = 0;
            }
        }

        return false;
    }

    checkDraw (cells = []) {
        return cells.length === this.props.rows * this.props.cols;
    }

    canAddPosition (pos) {
        return pos.row < this.props.rows;
    }

    onColClick (col) {
        var row = this.determineRow(col);

        var pos = {col: col, row: row};

        console.log(pos);

        if (!this.canAddPosition(pos)) {
            console.log('wuoah woah woah, cannot add anymore');
            return;
        }

        var move = {pos: pos, player: this.state.currentPlayer};
        this.state.cells.push(move);

        if (this.checkWon(this.state.cells, pos, this.state.currentPlayer)) {
            this.showOverlay('GAME was won by PLAYER ' + this.state.currentPlayer);
        } else {
            if (this.checkDraw(this.state.cells)) {
                this.showOverlay('GAME was a draw!');
            }
        }

        this.setState({cells: this.state.cells, currentPlayer: this.getNextPlayer(this.state.currentPlayer)});
    }

    showOverlay (message = '') {
        this.setState({
            overlay: {
                message: message,
                visible: true
            }
        });
    }

    render () {
        var overlay = this.state.overlay;
        return (
            <div className='main'>
                <Board cols={this.props.cols} rows={this.props.rows} cells={this.state.cells} onColClick={this.onColClick.bind(this)}/>
                <CurrentPlayer player={this.state.currentPlayer}/>
                <Overlay message={overlay.message} visible={overlay.visible}/>
            </div>
        );
    }
}

Game.defaultProps = {
    cols: 7,
    rows: 6
};

export default Game;
