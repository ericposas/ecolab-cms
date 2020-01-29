import { bindActionCreators } from 'redux'
import actions from './actions/ActionCreators'

const mapState = state => state

const mapDispatch = dispatch => bindActionCreators(actions, dispatch)

export {
  mapState,
  mapDispatch
}
