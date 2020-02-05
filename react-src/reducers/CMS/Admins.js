const Admins = (state = null, action) => {
  switch (action.type) {
    case 'SET_ADMINS':
      return action.payload
      break;
    default:
      return state
  }
}

export default Admins
