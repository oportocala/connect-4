'use strict';

import React from 'react';
import Immutable from 'immutable';

import Board from './game/board';
import WinnerOverlay from './game/winner-overlay';
import DrawOverlay from './game/draw-overlay';
import CurrentPlayer from './game/current-player';

// CSS
require('styles/normalize.css');
require('styles/main.css');

class Game extends React.Component {

    constructor () {
        super();
        this.state = {
            cells: [],
            winners: [],

            currentPlayer: 1,

            winnerPlayer: 1,
            winnerVisible: false,
            drawVisible: false
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

    findWinningCombinations (cells = [], lastMovePos = false, player = 1) {
        if (cells.length < 4) {
            return [];
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

        // Check column
        playerPositions
            .filter( (pos) => pos.col === lastMovePos.col)
            .forEach( (pos) => movesOnColumn[pos.row] = pos);

        // Check rows
        playerPositions
            .filter( (pos) => pos.row === lastMovePos.row)
            .forEach( (pos) => movesOnRow[pos.col] = pos);

        // First diagonal, left-top to right-bottom is determined by addition
        playerPositions
            .filter( (pos) => pos.col + pos.row  === lastMovePos.col + lastMovePos.row)
            .forEach( (pos) => movesOnDiag1[pos.row] = pos);

        // Second diagonal, right-top, left-bottom is determined by subtraction
        playerPositions
            .filter( (pos) => pos.row - pos.col === lastMovePos.row - lastMovePos.col)
            .forEach( (pos) => movesOnDiag2[pos.row] = pos);

        var resultsCol = this.checkArray(movesOnColumn);
        var resultsRow = this.checkArray(movesOnRow);
        var resultsDiag1 = this.checkArray(movesOnDiag1);
        var resultsDiag2 = this.checkArray(movesOnDiag2);

        var ret = [];
        ret = ret.concat(resultsCol, resultsRow, resultsDiag1, resultsDiag2);

        return ret;
    }

    checkArray (array, numberOf = 4) {
        var c = 0;
        var ret = [];
        for(var i=0;i< array.length; i++) {
            if (array[i] !== false) {
                c++;
                ret.push(array[i]);
                if (c === numberOf) {
                    return ret;
                }
            } else {
                c = 0;
                ret = [];
            }
        }

        return [];
    }

    checkDraw (cells = []) {
        return cells.length === this.props.rows * this.props.cols;
    }

    canAddPosition (pos) {
        return this.state.winners.length === 0 && pos.row < this.props.rows;
    }

    onColClick (col, event) {
        var row = this.determineRow(col);
        var pos = {col: col, row: row};

        if (!this.canAddPosition(pos)) {
            console.log('wuoah woah woah, cannot add anymore');
            return;
        }

        var move = {pos: pos, player: this.state.currentPlayer, latest: true};
        this.state.cells.push(move);

        var winners = this.findWinningCombinations(this.state.cells, pos, this.state.currentPlayer);
        if (winners.length) {
            this.setState({winnerVisible: true, winnerPlayer: this.state.currentPlayer});

        } else {
            if (this.checkDraw(this.state.cells)) {
                this.setState({drawVisible: true});
            }
        }

        var self = this;

        // Now animate the thing by removing latest from it on the next tick
        this.setState({
            winners: winners,
            cells: this.state.cells,
            currentPlayer: this.getNextPlayer(this.state.currentPlayer)
        }, () => {
            setTimeout(() => {
                self.setState(self.state.cells.map( (item) => {
                    item.latest = undefined;
                    return item;
                }));
            }, 1);
        });
    }


    render () {
        return (
            <div className='main'>
                <Board winners={this.state.winners} cols={this.props.cols} rows={this.props.rows} cells={this.state.cells} onColClick={this.onColClick.bind(this)}/>
                <CurrentPlayer player={this.state.currentPlayer}/>
                <WinnerOverlay player={this.state.winnerPlayer} visible={this.state.winnerVisible}/>
                <DrawOverlay visible={this.state.drawVisible}/>
            </div>
        );
    }
}

Game.defaultProps = {
    cols: 7,
    rows: 6
};

export default Game;
