import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { mapState, mapDispatch } from '../../mapStateMapDispatch'
import withAppUserAuth from '../HOC/withAppUserAuth'
import TitleBar from '../UIcomponents/TitleBar'
import { toast, ToastContainer } from 'react-toastify'
import Button from '@material-ui/core/Button'
import CompanyInList from './ListComponents/CompanyInList'
import axios from 'axios'

class ViewCompanies extends Component {

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
                {Companies.map(company => (
                  <Fragment key={company._id}>
                    <CompanyInList company={company}/>
                  </Fragment>
                ))}
              </>
            : null
          }
        </div>
      </>
    )
  }

}

export default connect(mapState, mapDispatch)(withAppUserAuth(withRouter(ViewCompanies)))
