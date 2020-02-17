const SavingCustomModule = (state = null, action) => {
  switch (action.type) {
    case 'SAVING_CUSTOM_MODULE':
      return action.payload
      break;
    default:
      return state
  }
}

export default SavingCustomModule
