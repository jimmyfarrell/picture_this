function table (state = {}, action) {
  if (action.type === 'INCREMENT_CARDS') {
    return Object.assign({}, state, { cards: state.cards + 1 });
  } else {
    return state;
  }
}

export default table;
