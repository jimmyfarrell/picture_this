function table (state = {}, action) {
  switch (action.type) {
    case 'INCREMENT_CARDS':
      return Object.assign({}, state, { cards: state.cards + 1 });
    case 'END_GAME':
      return { cards: 0 };
    default:
      return state;
  }
}

export default table;
