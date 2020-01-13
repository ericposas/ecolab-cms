import { combineReducers } from 'redux'

const test = (state = 'will test', action) => {
  switch (action.type) {
    case 'test':
      return 'testing'
      break;
    default:
      return state
  }
}

const rootReducer = combineReducers({
  test
})

export default rootReducer
