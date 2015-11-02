import expect from 'expect';
import * as Connect4 from "../../../src/scripts/game-logic/connect4";


describe('Connect 4', function () {
    "use strict";

    describe ('winner identification', function () {
        it('should not find where there is nothing to find', function () {
            const winners = Connect4.findWinningCombination([], 6, 7, {}, 1);
            expect(winners).toBeA('array');
            expect(winners.length).toBe(0);
        });

        it('should find winning moves on line', function () {
            const cells = [
                Connect4.getCell(0, 0, 1),
                Connect4.getCell(1, 0, 1),
                Connect4.getCell(2, 0, 1),
                Connect4.getCell(3, 0, 1)

            ];
            const lastPos = cells[cells.length - 1].pos;
            const winners = Connect4.findWinningCombination(cells, 7, 6, lastPos, 1);

            expect(winners).toBeA('array');
            expect(winners.length).toBe(4);
        });

        it('should find winning moves on row', function () {
            const cells = [
                Connect4.getCell(0, 0, 1),
                Connect4.getCell(0, 1, 1),
                Connect4.getCell(0, 2, 1),
                Connect4.getCell(0, 3, 1)
            ];
            const lastPos = cells[cells.length - 1].pos;
            const winners = Connect4.findWinningCombination(cells, 6, 7, lastPos, 1);
            expect(winners).toBeA('array');
            expect(winners.length).toBe(4);
        });

        it('should find winning moves first diagonal', function () {
            const cells = [
                Connect4.getCell(0, 0, 1),
                Connect4.getCell(1, 1, 1),
                Connect4.getCell(2, 2, 1),
                Connect4.getCell(3, 3, 1)
            ];
            const lastPos = cells[cells.length - 1].pos;
            const winners = Connect4.findWinningCombination(cells, 6, 7, lastPos, 1);
            expect(winners).toBeA('array');
            expect(winners.length).toBe(4);
        });

        it('should find winning moves second diagonal', function () {
            const cells = [
                Connect4.getCell(5, 4, 1),
                Connect4.getCell(4, 3, 1),
                Connect4.getCell(3, 2, 1),
                Connect4.getCell(2, 1, 1)
            ];
            const lastPos = cells[cells.length - 1].pos;
            const winners = Connect4.findWinningCombination(cells, 6, 7, lastPos, 1);
            expect(winners).toBeA('array');
            expect(winners.length).toBe(4);
        });
    });

});
