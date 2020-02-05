const SavingWebModule = (state = null, action) => {
  switch (action.type) {
    case 'SAVING_WEB_MODULE':
      return action.payload
      break;
    default:
      return state
  }
}

export default SavingWebModule
