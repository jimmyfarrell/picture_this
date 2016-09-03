export function newMessage (message) {
  return {
    type: 'NEW_MESSAGE',
    message
  };
}

export function clearMessages () {
  return {
    type: 'END_GAME'
  }
}
