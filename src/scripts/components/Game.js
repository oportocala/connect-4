'use strict';

import React from 'react';
import Immutable from 'immutable';

import Board from './game/board';
import WinnerOverlay from './game/winner-overlay';
import DrawOverlay from './game/draw-overlay';
import CurrentPlayer from './game/current-player';

import GameStore from '../stores/GameStore';
import GameActions from '../actions/game';

// CSS
require('styles/normalize.css');
require('styles/main.css');

class Game extends React.Component {

    constructor () {
        super();
        this.state = GameStore.getData();
    }

    componentDidMount() {
        this.unsubscribe = GameStore.listen( () => {
            this.setState(GameStore.getData());
        });
    }

    componentWillUnmount() {
        this.unsubscribe();
    }


    onColClick (col) {
        GameActions.move(col);
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
