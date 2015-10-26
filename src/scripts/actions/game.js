import Reflux from 'reflux';

var  GameActions = Reflux.createActions([
    'move',
    'playerWon',
    'draw',
    'restart'
]);

export default GameActions;
