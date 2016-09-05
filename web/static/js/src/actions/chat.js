export function newMessage (message) {
  return {
    type: 'NEW_MESSAGE',
    message
  };
}

export function loadMessages (messages) {
  return {
    type: 'LOAD_MESSAGES',
    messages
  };
}
