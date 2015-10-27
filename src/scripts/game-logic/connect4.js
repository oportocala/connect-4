import Immutable from 'immutable';

const num = 4;
export function determineRow (cells, col) {
    "use strict";
    var allRows = cells
        .filter( (move) => move.pos.col === col) // get only moves on this column
        .map( (move) => move.pos.row); // get just the row value

    if (allRows.length) {
        return Math.max.apply(Math, allRows) + 1;
    } else {
        return 0;
    }
}

export function findContStreamOf (array, numberOf = 4) {
    "use strict";
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

export function findWinningCombination (cells = [], rows = 6, cols = 7, lastMovePos = false, player = 1) {
    "use strict";

    if (cells.length < (num * 2) - 1) {
        return [];
    }

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

    var resultsCol = findContStreamOf(movesOnColumn, num);
    var resultsRow = findContStreamOf(movesOnRow, num);
    var resultsDiag1 = findContStreamOf(movesOnDiag1, num);
    var resultsDiag2 = findContStreamOf(movesOnDiag2, num);

    return [].concat(resultsCol, resultsRow, resultsDiag1, resultsDiag2);
}


export function isValidPosition (pos, rows) {
    "use strict";
    return pos.row < rows;
}

export function checkDraw (cells, rows, cols) {
    "use strict";
    return cells.length === rows * cols;
}

export function getNextPlayer (player) {
    "use strict";
    return (player === 1) ? 2 : 1;
}
