import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { mapState, mapDispatch } from '../../../mapStateMapDispatch'
import withAppUserAuth from '../HOC/withAppUserAuth'
import TitleBar from '../UIcomponents/TitleBar'
import { toast, ToastContainer } from 'react-toastify'
import Button from '@material-ui/core/Button'
import TourInList from '../ListComponents/TourInList'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import DeleteConfirmModal from '../Modals/DeleteConfirmModal'
import EditTourModal from '../Modals/EditTourModal'
import axios from 'axios'

class ViewTours extends Component {

  state = {
    showDeleteModal: false,
    showEditModal: false
  }

  componentDidMount() {
    const { getTours, checkAppUserAuth, setAppUserData, AppUserData, history } = this.props
    checkAppUserAuth(data => {
      console.log(data.data)
      const { auth, fullaccess, peer, name, email } = data.data
      if (!auth) history.push('/login')
      else {
        if (!AppUserData.auth) setAppUserData(auth, fullaccess, peer, name, email)
        getTours()
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
    this.props.history.push('/create-tour')
  }

  render() {
    const { Tours, FetchingTours, DeletingTour, TourDeleted, history } = this.props
    return (
      <>
        <ToastContainer/>
        <TitleBar title={'Eco Lab Application'}/>
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
            onClick={this.handleBackBtnClick}>
              Create a Tour
          </Button>
          <br/>
          <br/>
          <div className='section-title'>Created Tours</div>
          {
            Tours && Tours.map
            ? <>
                <TransitionGroup>
                  {Tours.map(tour => (
                    <CSSTransition key={tour._id}
                      appear
                      unmountOnExit
                      in={tour != null}
                      timeout={500}
                      classNames='item'>
                      <TourInList displayDeleteModal={this.displayDeleteModal} displayEditModal={this.displayEditModal} tour={tour}/>
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
          <DeleteConfirmModal type={'tour'} displayDeleteModal={this.displayDeleteModal} showDeleteModal={this.state.showDeleteModal}/>
        </CSSTransition>
        <CSSTransition
          appear
          unmountOnExit
          in={this.state.showEditModal}
          timeout={500}
          classNames='item'>
          <EditTourModal displayEditModal={this.displayEditModal} showEditModal={this.state.showEditModal}/>
        </CSSTransition>
      </>
    )
  }

}

export default connect(mapState, mapDispatch)(withAppUserAuth(withRouter(ViewTours)))
