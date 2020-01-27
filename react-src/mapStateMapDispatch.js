import { bindActionCreators } from 'redux'
import actions from './actions/ActionCreators'

const mapState = state => {
  const { AdminData, Users, Admins, BulkActionSelectedUsers, BulkActionSelectedAdmins } = state
  return { AdminData, Users, Admins, BulkActionSelectedUsers, BulkActionSelectedAdmins }
}

const mapDispatch = dispatch => bindActionCreators(actions, dispatch)

export {
  mapState,
  mapDispatch
}
