import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { mapState, mapDispatch } from '../../mapStateMapDispatch'
import withAppUserAuth from '../HOC/withAppUserAuth'
import TitleBar from '../UIcomponents/TitleBar'
import { toast, ToastContainer } from 'react-toastify'
import Button from '@material-ui/core/Button'
import CompanyInList from './ListComponents/CompanyInList'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import DeleteConfirmModal from './Modals/DeleteConfirmModal'
import axios from 'axios'

class ViewCompanies extends Component {

  state = {
    showDeleteModal: false
  }

  componentDidMount() {
    const { getCompanies, checkAppUserAuth, setAppUserData, AppUserData, history } = this.props
    checkAppUserAuth(data => {
      console.log(data.data)
      const { auth, fullaccess, peer, name, email } = data.data
      if (!auth) history.push('/login')
      else {
        if (!AppUserData.auth) {
          setAppUserData(auth, fullaccess, peer, name, email)
        }
        getCompanies()
      }
    })
  }

  // componentDidMount() { this.props.getCompanies() }

  displayDeleteModal = value => {
    this.setState({
      showDeleteModal: value
    })
  }

  handleBackBtnClick = () => {
    this.props.history.push('/create-company')
  }

  render() {
    const grnblue = '#00ffae'
    const { Companies, FetchingCompanies, DeletingCompany, CompanyDeleted, history } = this.props
    return (
      <>
        <ToastContainer/>
        <TitleBar title={'Eco Lab Application'} color={grnblue}/>
        <div className='padding-div-20'>
          <Button
            variant='contained'
            color='primary'
            onClick={this.handleBackBtnClick}>
              Back to Create/Add a Company
          </Button>
          <br/>
          <br/>
          <div className='section-title'>Companies</div>
          {
            FetchingCompanies
            ? <div style={{ display: 'none' }}>
                {toast.warn('fetching companies...', {
                  autoClose: 500
                })}
              </div>
            : null
          }
          {
            Companies
            ? <>
                <TransitionGroup>
                  {Companies.map(company => (
                    <CSSTransition key={company._id}
                      appear
                      unmountOnExit
                      in={company != null}
                      timeout={500}
                      classNames='item'>
                      <CompanyInList displayDeleteModal={this.displayDeleteModal} company={company}/>
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
          <DeleteConfirmModal displayDeleteModal={this.displayDeleteModal} showDeleteModal={this.state.showDeleteModal}/>
        </CSSTransition>
      </>
    )
  }

}

export default connect(mapState, mapDispatch)(withAppUserAuth(withRouter(ViewCompanies)))
