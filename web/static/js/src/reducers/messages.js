function messages (state = [], action) {
  switch (action.type) {
    case 'NEW_MESSAGE':
      return [...state, action.message];
    case 'END_GAME':
      return [];
    default:
      return state;
  }
}

export default messages;
