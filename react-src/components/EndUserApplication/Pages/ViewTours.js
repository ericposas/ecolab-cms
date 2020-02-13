import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { mapState, mapDispatch } from '../../../mapStateMapDispatch'
import withAppUserAuth from '../../HOC/withAppUserAuth'
import TitleBar from '../../UIcomponents/TitleBar'
import { toast, ToastContainer } from 'react-toastify'
import Button from '@material-ui/core/Button'
import TourInList from '../ListComponents/TourInList'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import DeleteConfirmModal from '../Modals/DeleteConfirmModal'
import axios from 'axios'

class ViewTours extends Component {

  state = {
    showDeleteModal: false
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

  handleBackBtnClick = () => {
    this.props.history.push('/create-tour')
  }

  render() {
    const grnblue = '#00ffae'
    const { Tours, FetchingTours, DeletingTour, TourDeleted, history } = this.props
    return (
      <>
        <ToastContainer/>
        <TitleBar title={'Eco Lab Application'} color={grnblue}/>
        <div className='padding-div-20'>
          <Button
            variant='contained'
            color='primary'
            onClick={this.handleBackBtnClick}>
              Back to Create/Add a Tour
          </Button>
          <br/>
          <br/>
          <div className='section-title'>Tour Modules</div>
          {
            FetchingTours
            ? <div style={{ display: 'none' }}>
                {toast.warn('fetching tour modules...', {
                  autoClose: 500
                })}
              </div>
            : null
          }
          {
            Tours
            ? <>
                <TransitionGroup>
                  {Tours.map(tour => (
                    <CSSTransition key={tour._id}
                      appear
                      unmountOnExit
                      in={tour != null}
                      timeout={500}
                      classNames='item'>
                      <TourInList displayDeleteModal={this.displayDeleteModal} tour={tour}/>
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
      </>
    )
  }

}

export default connect(mapState, mapDispatch)(withAppUserAuth(withRouter(ViewTours)))
