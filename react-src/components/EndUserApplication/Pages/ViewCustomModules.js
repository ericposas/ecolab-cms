import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { mapState, mapDispatch } from '../../../mapStateMapDispatch'
import withAppUserAuth from '../HOC/withAppUserAuth'
import TitleBar from '../UIcomponents/TitleBar'
import { toast, ToastContainer } from 'react-toastify'
import ButtonWithEcoStyles from '../UIcomponents/ButtonWithEcoStyles'
import EcoLabColors from '../Colors/EcoLabColors'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import DeleteConfirmModal from '../Modals/DeleteConfirmModal'
import EditCustomModuleModal from '../Modals/EditCustomModuleModal'
import axios from 'axios'

class ViewCustomModules extends Component {

  state = {
    showDeleteModal: false,
    showEditModal: false
  }

  componentDidMount() {
    const { getCustomModules, checkAppUserAuth, setAppUserData, AppUserData, history } = this.props
    checkAppUserAuth(data => {
      const { auth, fullaccess, peer, name, email } = data.data
      if (!auth) history.push('/login')
      else {
        if (!AppUserData.auth) setAppUserData(auth, fullaccess, peer, name, email)
        getCustomModules()
      }
    })
  }

  displayDeleteModal = value => {
    this.setState({
      showDeleteModal: value
    })
  }

  displayEditModal = value => {
    this.setState({
      showEditModal: value
    })
  }

  handleBackBtnClick = () => {
    this.props.setTourToEdit(null)
    this.props.history.push('/create-custom-module')
  }

  render() {
    const { CustomModules, FetchingCustomModules, DeletingCustomModule, CustomModuleDeleted, history } = this.props
    return (
      <>
        <ToastContainer/>
        <TitleBar title={'Eco Lab Application'}/>
        <div className='padding-div-20'>
          <ButtonWithEcoStyles
            marginright='10px'
            variant='contained'
            textcolor='white'
            backgroundcolor={EcoLabColors.blue}
            onClick={() => history.push('/')}>
              Dashboard
          </ButtonWithEcoStyles>
          <ButtonWithEcoStyles
            variant='contained'
            textcolor='white'
            backgroundcolor={EcoLabColors.green}
            onClick={this.handleBackBtnClick}>
              Upload a Custom Module
          </ButtonWithEcoStyles>
          <br/>
          <br/>
          <div className='section-title'>Custom Modules</div>
          {
            CustomModules && CustomModules.map
            ? <>
                <TransitionGroup>
                  {CustomModules.map(cmod => (
                    <CSSTransition key={cmod._id}
                      appear
                      unmountOnExit
                      in={cmod != null}
                      timeout={500}
                      classNames='item'>
                      <div className='custom-module-in-list'>
                        <div
                          className='custom-module-x-btn'
                          onClick={() => {
                            this.props.setCustomModuleToDelete(cmod._id)
                            this.displayDeleteModal(true)
                          }}>&times;</div>
                      <div className='custom-module-in-list-title'>{cmod.name}</div>
                      <img className='web-module-in-list-edit-icon' src='./img/pencil.svg'/>
                      <br/>
                      <img width='80%' src={cmod.image_url}/>
                      <div
                        className='web-module-in-list-backing'
                        onClick={() => {
                          this.props.setCustomModuleToEdit(cmod)
                          this.displayEditModal(true)
                        }}></div>
                      </div>
                    </CSSTransition>
                  ))}
                </TransitionGroup>
              </>
            : null
          }
        </div>
        <CSSTransition
          appear
          unmountOnExit
          in={this.state.showDeleteModal}
          timeout={500}
          classNames='item'>
          <DeleteConfirmModal type={'custommodule'} displayDeleteModal={this.displayDeleteModal} showDeleteModal={this.state.showDeleteModal}/>
        </CSSTransition>
        <CSSTransition
          appear
          unmountOnExit
          in={this.state.showEditModal}
          timeout={500}
          classNames='item'>
          <EditCustomModuleModal displayEditModal={this.displayEditModal} showEditModal={this.state.showEditModal}/>
        </CSSTransition>
      </>
    )
  }

}

export default connect(mapState, mapDispatch)(withAppUserAuth(withRouter(ViewCustomModules)))
