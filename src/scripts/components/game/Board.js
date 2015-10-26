'use strict';

import React from 'react';

import Cell from './board/cell';
import Hole from './board/hole';
import Front from './board/front';

class Board extends React.Component {

    convertPosition (pos, offset = 0) {
        const props = this.props;
        const size = props.cellSize;
        const totalHeight = size * props.rows;

        const x = (pos.col * size) + offset;
        const y = (totalHeight - (pos.row * size)) - offset;

        return {
            x: x,
            y: y
        };
    }

    render () {
        const props = this.props;

        // chips
        const cells = props.cells.map((cell, i) => {
            if (props.winners.indexOf(cell.pos) !== -1) {
                cell.highlight = true;
            }


            return (<Cell
                key={`cell_${i}`} {...cell}
                size={props.cellSize} pos={this.convertPosition(cell.pos)}
                />);
        });

        // holes
        const allCells = [];
        const offset = 10;
        let i, j, pos, index, holeSize = props.cellSize - (offset*2);
        for (i = 0; i< props.cols; i++) {
            for (j = 0; j < props.rows; j++) {
                pos = this.convertPosition({col: i, row: j}, offset);
                index = (i * props.cols) + j;

                allCells.push(<Hole key={`hole_${index}`} size={holeSize} pos={pos}/>);
            }
        }

        // hit area
        var hitAreas = [];
        for (i = 0; i< props.cols; i++) {
            var w = props.cellSize;
            var x = i*w;
            hitAreas.push(<rect key={`hit-area-${i}`} fill="transparent" height="100%"
                                x={x} width={w}
                                onClick={this.props.onColClick.bind(this, i)}
                />);
        }

        return (
            <svg
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                className="board"
                width={props.cellSize * props.cols}
                height={props.cellSize * props.rows}>

                <g className="cells">
                    {cells}
                </g>

                <Front {...props}>
                    {allCells}
                </Front>

                <g className="hit-areas">
                    {hitAreas}
                </g>
            </svg>
        );
    }
}

const pt = React.PropTypes;

Board.propTypes = {
    cols: pt.number.isRequired,
    rows: pt.number.isRequired,
    cellSize: pt.number.isRequired,
    cells: pt.arrayOf(
        pt.shape({
            player: React.PropTypes.number,
            position: React.PropTypes.object
        })
    )
};

Board.defaultProps = {
    rows: 6,
    cols: 7,
    cellSize: 80,
    cells: []
};

export default Board;
