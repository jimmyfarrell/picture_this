function game(state = {}, action) {
  switch (action.type) {
    case 'INCREMENT_CARDS':
      return Object.assign({}, state, { cards: state.cards + 1 });
    case 'SET_GAME_CODE':
      return Object.assign({}, state, { code: action.gameCode });
    case 'SET_PLAYER':
      return Object.assign({}, state, { player: action.player });
    case 'END_GAME':
      return { cards: 0 };
    default:
      return state;
  }
}

export default game;
