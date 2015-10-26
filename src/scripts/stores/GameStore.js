'use strict';

import Reflux from 'reflux';

import GameActions from '../actions/game';
import _ from 'lodash';

const GameStore = Reflux.createStore({
    getInitialState: function() {
        return {
            cols: 7,
            rows: 6,

            cells: [],
            winners: [],

            currentPlayer: 1,

            winnerPlayer: 1,
            winnerVisible: false,
            drawVisible: false
        };
    },

    init: function () {
        this._data = this.getInitialState();

        this.listenTo(GameActions.move, this.onMove);
        this.listenTo(GameActions.playerWon, this.onPlayerWon);
        this.listenTo(GameActions.draw, this.onDraw);
        this.listenTo(GameActions.restart, this.onRestart);
    },

    // static
    checkArray: function (array, numberOf = 4) {
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
    },

    // static
    determineRow (cells, col) {
        var allRows = cells
            .filter( (move) => move.pos.col === col) // get only moves on this column
            .map( (move) => move.pos.row); // get just the row value
        if (allRows.length) {
            return Math.max.apply(Math, allRows) + 1;
        } else {
            return 0;
        }
    },

    // static
    findWinningCombinations: function (cells = [], rows = 6, cols = 7, lastMovePos = false, player = 1) {
        var playerPositions = cells
            .filter( (move) => (move.player === player))
            .map( (move) => move.pos );

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
    },

    // static
    isValidPosition: function (pos, rows) {
        return pos.row < rows;
    },

    // static
    checkDraw: function (cells, rows, cols) {
        return cells.length === rows * cols;
    },

    // static
    getNextPlayer: function (player) {
        return (player === 1) ? 2: 1;
    },

    // HANDLERS
    onDraw: function () {
        this.setState({drawVisible: true});
    },

    onPlayerWon: function (player) {
        this.setState({winnerVisible: true, winnerPlayer: player});
    },

    onRestart: function () {
        this._data = this.getInitialState();
        this.trigger();
    },

    onMove: function (col) {
        var data = this._data;
        var rows = data.rows,
            cols = data.cols;

        var cells = data.cells;
        var currentPlayer = data.currentPlayer;
        var row = this.determineRow(cells, col);
        var pos = {col: col, row: row};

        if (data.winners.length !== 0 ) {
            console.log('winner has been determined');
            return;
        }

        if (!this.isValidPosition(pos, data.rows)) {
            console.log('wuoah woah woah, cannot add anymore');
            return;
        }

        var move = {
            pos: pos,
            player: currentPlayer,
            latest: true
        };

        cells.push(move);
        var winners = [];
        if (cells.length > 4) {
            winners = this.findWinningCombinations(
                cells, rows, cols, pos, currentPlayer
            );

            if (winners.length) {
                GameActions.playerWon(currentPlayer);
            } else {
                if (this.checkDraw(cells, data.rows, data.cols)) {
                    GameActions.draw();
                }
            }
        }

        var self = this;

        // Now animate the thing by removing latest from it on the next tick

        this.setState({
            winners: winners,
            cells: cells,
            currentPlayer: this.getNextPlayer(currentPlayer)
        });
    },

    clearLatest: function (cells) {
        return cells.map( (item) => {
            item.latest = undefined;
            return item;
        });
    },

    setState: function (mergeData) {
        this._data = _.merge(this._data, mergeData);
        this.trigger ();
    },

    getData: function () {
        return this._data;
    }


});

export default GameStore;
