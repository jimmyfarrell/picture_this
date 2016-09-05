function game(state = {}, action) {
  switch (action.type) {
    case 'SET_GAME_CODE':
      return Object.assign({}, state, { code: action.gameCode });
    case 'SET_PLAYER':
      return Object.assign({}, state, { player: action.player });
    case 'SET_SOCKET':
      return Object.assign({}, state, { socket: action.socket });
    case 'END_GAME':
      return { cards: 0, code: '', player: '', socket: {} };
    default:
      return state;
  }
}

export default game;
