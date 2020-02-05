import { combineReducers } from 'redux'
// CMS side
import Users from './CMS/Users'
import Admins from './CMS/Admins'
import AdminData from './CMS/AdminData'
import AppUserData from './CMS/AppUserData'
import BulkActionSelectedUsers from './CMS/BulkActionSelectedUsers'
import BulkActionSelectedAdmins from './CMS/BulkActionSelectedAdmins'
import SelectedUserForEditing from './CMS/SelectedUserForEditing'
import SelectedAdminForEditing from './CMS/SelectedAdminForEditing'
// Eco Lab Application
import SavingWebModule from './ApplicationSpecific/SavingWebModule'
import WebModuleSaved from './ApplicationSpecific/WebModuleSaved'
import GettingWebModules from './ApplicationSpecific/GettingWebModules'
import WebModules from './ApplicationSpecific/WebModules'

const rootReducer = combineReducers({
  // CMS / User management
  Users,
  Admins,
  AdminData,
  AppUserData,
  BulkActionSelectedUsers,
  BulkActionSelectedAdmins,
  SelectedUserForEditing,
  SelectedAdminForEditing,
  // EcoLab Application
  SavingWebModule,
  WebModuleSaved,
  GettingWebModules,
  WebModules,
  
})

export default rootReducer
