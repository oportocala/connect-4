'use strict';

import Reflux from 'reflux';

import GameActions from '../actions/game';
import _ from 'lodash';
import * as GameLogic from '../game-logic/connect4';

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

    // HANDLERS
    onDraw: function () {
        this.setState({
            drawVisible: true
        });
    },

    onPlayerWon: function (player) {
        this.setState({
            winnerVisible: true,
            winnerPlayer: player
        });
    },

    onRestart: function () {
        this._data = this.getInitialState();
        this.trigger();
    },

    onMove: function (col) {
        var data = this._data;
        var rows = data.rows,
            cols = data.cols,
            cells = data.cells;

        if (data.winners.length !== 0 ) {
            console.log('winner has been determined');
            return;
        }

        var row = GameLogic.determineRow(cells, col);
        var pos = {col: col, row: row};

        if (!GameLogic.isValidPosition(pos, rows)) {
            console.log('wuoah woah woah, cannot add anymore');
            return;
        }

        var currentPlayer = data.currentPlayer;
        var cell = GameLogic.getCell(pos.col, pos.row, currentPlayer);

        cells.push(cell);

        var winners = GameLogic.findWinningCombination(
            cells, rows, cols, pos, currentPlayer
        );

        if (winners.length) {
            GameActions.playerWon(currentPlayer);
        } else {
            if (GameLogic.checkDraw(cells, rows, cols)) {
                GameActions.draw();
            }
        }

        this.setState({
            winners: winners,
            cells: cells,
            currentPlayer: GameLogic.getNextPlayer(currentPlayer)
        });
    },

    setState: function (mergeData) {
        this._data = _.merge(this._data, mergeData);
        this.trigger ();
    },

    // interface to view
    getData: function () {
        return this._data;
    }

});

export default GameStore;
