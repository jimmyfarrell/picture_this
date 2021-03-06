import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actionCreators from '../actions';
import Main from './Main';

function mapStateToProps(state) {
  return {
    gameCode: '',
    messages: state.messages,
    game: {
      code: state.game.code,
      in_progress: state.game.in_progress,
      player: state.game.player,
      socket: state.game.socket
    }
  }
}

function mapDispachToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

const App = connect(mapStateToProps, mapDispachToProps)(Main);

export default App;
