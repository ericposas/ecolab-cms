const Tours = (state = [], action) => {
  switch (action.type) {
    case 'SET_TOURS':
      return action.payload
      break;
    default:
      return state
  }
}

export default Tours
