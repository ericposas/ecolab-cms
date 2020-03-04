import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { mapState, mapDispatch } from '../../../mapStateMapDispatch'
import withAppUserAuth from '../HOC/withAppUserAuth'
import TitleBar from '../UIcomponents/TitleBar'
import DeleteConfirmModal from '../Modals/DeleteConfirmModal'
import EditWebModuleModal from '../Modals/EditWebModuleModal'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { toast, ToastContainer } from 'react-toastify'
import Button from '@material-ui/core/Button'
import ButtonWithEcoStyles from '../UIcomponents/ButtonWithEcoStyles'
import TextFieldWithEcoStylesDark from '../UIcomponents/TextFieldWithEcoStylesDark'
import EcoLabColors from '../Colors/EcoLabColors'
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
        <ToastContainer/>
        <TitleBar title={'Eco Lab Application'}/>
        <div className='padding-div-20'>
          <ButtonWithEcoStyles
            style={{ marginRight: '8px' }}
            variant='contained'
            textcolor='white'
            backgroundcolor={EcoLabColors.blue}
            onClick={() => history.push('/')}>
              Dashboard
          </ButtonWithEcoStyles>
          <ButtonWithEcoStyles
            marginleft='10px'
            variant='contained'
            textcolor='white'
            backgroundcolor={EcoLabColors.green}
            onClick={() => {
              setWebModuleToEdit(null)
              history.push('/create-web-module')
            }}>
              Create a Web Module
          </ButtonWithEcoStyles>
          <br/>
          <br/>
          <br/>
          <div className='section-title'>Web Modules</div>
        {
          WebModules
          ?
            <TransitionGroup>
              {
                WebModules.map(module => (
                  <CSSTransition
                    key={module._id}
                    appear
                    unmountOnExit
                    in={module != null}
                    timeout={500}
                    classNames='item'>
                    <div
                      style={{
                        opacity: module.enabled ? 1 : 0.35
                      }}
                      className='web-module-in-list'
                      >
                      <div
                        className='x-symbol web-module-x-btn'
                        onClick={() => {
                          setWebModuleToDelete(module._id)
                          this.displayDeleteModal(true)
                        }}>&#10006;</div>
                      {module.browser_url}
                      <img className='web-module-in-list-edit-icon' src='./img/pencil.svg'/>
                      <div
                        className='web-module-in-list-backing'
                        onClick={() => {
                          setWebModuleToEdit(module)
                          this.displayEditModal(true)
                        }}></div>
                      </div>
                    </CSSTransition>
                  ))
                }
            </TransitionGroup>
          : null
        }
      </div>
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
