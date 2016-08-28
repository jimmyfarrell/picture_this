export function gameId (state = '', action) {
  if (action.type === 'SET_GAME_ID') {
    return action.gameId;
  } else {
    return state;
  }
}

export default gameId;
