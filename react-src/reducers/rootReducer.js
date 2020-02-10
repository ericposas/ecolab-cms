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
import FetchingWebModules from './ApplicationSpecific/FetchingWebModules'
import DeletingWebModule from './ApplicationSpecific/DeletingWebModule'
import WebModuleDeleted from './ApplicationSpecific/WebModuleDeleted'
import WebModules from './ApplicationSpecific/WebModules'
import SavingCompanyData from './ApplicationSpecific/SavingCompanyData'
import CompanyDataSaved from './ApplicationSpecific/CompanyDataSaved'
import CompanyDataError from './ApplicationSpecific/CompanyDataError'
import Companies from './ApplicationSpecific/Companies'
import FetchingCompanies from './ApplicationSpecific/FetchingCompanies'
import DeletingCompany from './ApplicationSpecific/DeletingCompany'
import CompanyDeleted from './ApplicationSpecific/CompanyDeleted'
import CompanyToDelete from './ApplicationSpecific/CompanyToDelete'

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
  FetchingWebModules,
  WebModules,
  WebModuleDeleted,
  DeletingWebModule,
  SavingCompanyData,
  CompanyDataSaved,
  CompanyDataError,
  Companies,
  FetchingCompanies,
  DeletingCompany,
  CompanyDeleted,
  CompanyToDelete,

})

export default rootReducer
