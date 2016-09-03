import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../actions';
import Main from './Main';

function mapStateToProps(state) {
  return {
    gameCode: '',
    messages: state.messages,
    socket: state.socket,
    game: {
      cards: state.game.cards,
      code: state.game.code,
      player: state.game.player
    }
  }
}

function mapDispachToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

const App = connect(mapStateToProps, mapDispachToProps)(Main);

export default App;
