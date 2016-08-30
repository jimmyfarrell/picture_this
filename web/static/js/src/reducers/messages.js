export function newMessage (state = [], action) {
  if (action.type === 'NEW_MESSAGE') {
    return [...state, action.message];
  } else {
    return state;
  }
}

export default newMessage;
