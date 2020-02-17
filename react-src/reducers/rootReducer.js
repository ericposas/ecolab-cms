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
import WebModuleToDelete from './ApplicationSpecific/WebModuleToDelete'
import UpdatingWebModule from './ApplicationSpecific/UpdatingWebModule'
import WebModuleUpdated from './ApplicationSpecific/WebModuleUpdated'
import WebModuleSelectedForEdit from './ApplicationSpecific/WebModuleSelectedForEdit'
import SavingCompanyData from './ApplicationSpecific/SavingCompanyData'
import CompanyDataSaved from './ApplicationSpecific/CompanyDataSaved'
import CompanyDataError from './ApplicationSpecific/CompanyDataError'
import Companies from './ApplicationSpecific/Companies'
import FetchingCompanies from './ApplicationSpecific/FetchingCompanies'
import DeletingCompany from './ApplicationSpecific/DeletingCompany'
import CompanyDeleted from './ApplicationSpecific/CompanyDeleted'
import CompanyToDelete from './ApplicationSpecific/CompanyToDelete'
import CompanySelectedForEdit from './ApplicationSpecific/CompanySelectedForEdit'
import UpdatingCompany from './ApplicationSpecific/UpdatingCompany'
import CompanyUpdated from './ApplicationSpecific/CompanyUpdated'
import FetchingDivisions from './ApplicationSpecific/FetchingDivisions'
import Divisions from './ApplicationSpecific/Divisions'
import FetchingIndustries from './ApplicationSpecific/FetchingIndustries'
import Industries from './ApplicationSpecific/Industries'
import FetchingSegments from './ApplicationSpecific/FetchingSegments'
import Segments from './ApplicationSpecific/Segments'
import Tours from './ApplicationSpecific/Tours'
import FetchingTours from './ApplicationSpecific/FetchingTours'
import DeletingTour from './ApplicationSpecific/DeletingTour'
import TourDeleted from './ApplicationSpecific/TourDeleted'
import TourToDelete from './ApplicationSpecific/TourToDelete'
import TourSelectedForEdit from './ApplicationSpecific/TourSelectedForEdit'
import UpdatingTour from './ApplicationSpecific/UpdatingTour'
import TourUpdated from './ApplicationSpecific/TourUpdated'
import DeletingCustomModule from './ApplicationSpecific/DeletingCustomModule'
import CustomModuleDeleted from './ApplicationSpecific/CustomModuleDeleted'
import CustomModuleSelectedForEdit from './ApplicationSpecific/CustomModuleSelectedForEdit'
import CustomModuleToDelete from './ApplicationSpecific/CustomModuleToDelete'
import CustomModuleUpdated from './ApplicationSpecific/CustomModuleUpdated'
import FetchingCustomModules from './ApplicationSpecific/FetchingCustomModules'
import RetrievingCustomModule from './ApplicationSpecific/RetrievingCustomModule'
import SavingCustomModule from './ApplicationSpecific/SavingCustomModule'
import UpdatingCustomModule from './ApplicationSpecific/UpdatingCustomModule'
import CustomModules from './ApplicationSpecific/CustomModules'

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
  WebModuleToDelete,
  UpdatingWebModule,
  WebModuleUpdated,
  DeletingWebModule,
  WebModuleSelectedForEdit,
  SavingCompanyData,
  CompanyDataSaved,
  CompanyDataError,
  Companies,
  FetchingCompanies,
  DeletingCompany,
  CompanyDeleted,
  CompanyToDelete,
  CompanySelectedForEdit,
  UpdatingCompany,
  CompanyUpdated,
  FetchingDivisions,
  Divisions,
  FetchingIndustries,
  Industries,
  FetchingSegments,
  Segments,
  Tours,
  FetchingTours,
  DeletingTour,
  TourDeleted,
  TourToDelete,
  TourSelectedForEdit,
  UpdatingTour,
  TourUpdated,
  CustomModules,
  CustomModuleDeleted,
  CustomModuleSelectedForEdit,
  CustomModuleToDelete,
  CustomModuleUpdated,
  FetchingCustomModules,
  RetrievingCustomModule,
  SavingCustomModule,
  UpdatingCustomModule,
  DeletingCustomModule,

})

export default rootReducer
