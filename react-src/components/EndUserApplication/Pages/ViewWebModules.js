import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { mapState, mapDispatch } from '../../../mapStateMapDispatch'
import withAppUserAuth from '../HOC/withAppUserAuth'
import TitleBar from '../UIcomponents/TitleBar'
import DeleteConfirmModal from '../Modals/DeleteConfirmModal'
import EditWebModuleModal from '../Modals/EditWebModuleModal'
import { CSSTransition } from 'react-transition-group'
import Button from '@material-ui/core/Button'
import axios from 'axios'

class ViewWebModules extends Component {

  state = {
    showEditModal: false,
    showDeleteModal: false,
  }

  componentDidMount() {
    const { getWebModules, checkAppUserAuth, setAppUserData, AppUserData, history } = this.props
    checkAppUserAuth(data => {
      console.log(data.data)
      const { auth, fullaccess, peer, name, email } = data.data
      if (!auth) history.push('/login')
      else {
        if (!AppUserData.auth) setAppUserData(auth, fullaccess, peer, name, email)
        getWebModules()
      }
    })
  }

  handleDelete = module => {
    const { deleteWebModule, getWebModules } = this.props
    console.log('delete ' + module.browser_url)
    deleteWebModule(module._id, getWebModules)
  }

  displayEditModal = (value) => {
    this.setState({
      showEditModal: value
    })
  }

  displayDeleteModal = (value) => {
    this.setState({
      showDeleteModal: value
    })
  }

  render() {
    const grnblue = '#00ffae'
    const { setWebModuleToDelete, setWebModuleToEdit, WebModules, DeletingWebModule, WebModuleDeleted, history } = this.props
    return (
      <>
        <TitleBar title={'Eco Lab Application'} color={grnblue}/>
        <div className='padding-div-20'>
          <Button
            style={{ marginRight: '8px' }}
            variant='contained'
            color='primary'
            onClick={() => history.push('/')}>
              Dashboard
          </Button>
          <Button
            variant='contained'
            color='secondary'
            onClick={() => {
              setWebModuleToEdit(null)
              history.push('/create-web-module')
            }}>
              Create a Web Module
          </Button>
          <br/>
          <br/>
          <br/>
          <div className='section-title'>Web Modules</div>
        {
          WebModules
          ?
            WebModules.map(module => (
              <Fragment key={module._id}>
                <div className='web-module-in-list'>
                  <div
                    className='x-symbol web-module-x-btn'
                    onClick={() => {
                      setWebModuleToDelete(module._id)
                      this.displayDeleteModal(true)
                    }}>&times;</div>
                  {module.browser_url}
                <img className='web-module-in-list-edit-icon' src='./img/pencil.svg'/>
                <div
                  className='web-module-in-list-backing'
                  onClick={() => {
                    setWebModuleToEdit(module)
                    this.displayEditModal(true)
                  }}></div>
                </div>
              </Fragment>
            ))
          : null
        }
      </div>
        {
          DeletingWebModule
          ? <div className='padding-div-10'>Deleting web module...</div>
          : null
        }
        {
          WebModuleDeleted
          ? <div className='padding-div-10'>Web module deleted!</div>
          : null
        }
        <CSSTransition
          appear
          unmountOnExit
          in={this.state.showDeleteModal}
          timeout={500}
          classNames='item'>
          <DeleteConfirmModal type={'webmodule'} displayDeleteModal={this.displayDeleteModal} showDeleteModal={this.state.showDeleteModal}/>
        </CSSTransition>
        <CSSTransition
          appear
          unmountOnExit
          in={this.state.showEditModal}
          timeout={500}
          classNames='item'>
          <EditWebModuleModal displayEditModal={this.displayEditModal} showEditModal={this.state.showEditModal}/>
        </CSSTransition>
      </>
    )
  }

}

export default connect(mapState, mapDispatch)(withRouter(withAppUserAuth(ViewWebModules)))
