const Companies = (state = [], action) => {
  switch (action.type) {
    case 'SET_COMPANIES':
      return action.payload
      break;
    default:
      return state
  }
}

export default Companies
