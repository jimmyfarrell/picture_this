export function setGameCode(gameCode) {
  return {
    type: 'SET_GAME_CODE',
    gameCode
  };
}

export function setPlayer(player) {
  return {
    type: 'SET_PLAYER',
    player
  };
}

export function setSocket(socket) {
  return {
    type: 'SET_SOCKET',
    socket
  };
}

export function setChannel(channel) {
  return {
    type: 'SET_CHANNEL',
    channel
  };
}

export function endGame() {
  return {
    type: 'END_GAME'
  };
}
