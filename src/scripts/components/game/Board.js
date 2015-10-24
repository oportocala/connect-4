'use strict';

import React from 'react';
import Cell from './board/cell';
import Mask1 from './board/mask';

class Board extends React.Component {

    convertPosition (pos) {
        const props = this.props;
        const size = props.cellSize;
        const totalHeight = size * props.rows;

        const x = (pos.col * size);
        const y = totalHeight - (pos.row * size);
        return {
            x: x,
            y: y
        };
    }

    render () {
        const props = this.props;
        const cells = props.cells.map((cell, i) => {
            return (<Cell key={i} {...cell} size={props.cellSize} pos={this.convertPosition(cell.pos)}/>);
        });
        const allCells = [];
        for (var i = 0; i< props.cols; i++) {
            for (var j = 0; j < props.rows; j++) {
                var pos = {col: i, row: j};
                console.log(pos);
                allCells.push(<Cell key={'cell_'+((i*props.cols) + j)} size={props.cellSize} pos={this.convertPosition(pos)}/>);
            }
        }
        console.log(allCells);
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

                <Mask1 {...props}>
                    <g>
                        {allCells}
                    </g>
                </Mask1>
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
