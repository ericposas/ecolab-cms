import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { mapState, mapDispatch } from '../../../mapStateMapDispatch'
import withAppUserAuth from '../../HOC/withAppUserAuth'
import TitleBar from '../../UIcomponents/TitleBar'
import { ToastContainer, toast } from 'react-toastify'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import { CSSTransition } from 'react-transition-group'
import axios from 'axios'

const CHOOSE_COMPANY = 'Choose company'
const CREATE_NEW_COMPANY = '* Create New Company'

class CreateTour extends Component {

  // componentDidMount() { //add auth }

  componentDidMount() {
    this.props.getCompanies()
    this.props.getDivisions()
  }

  state = {
    tourName: '',
    tourNameError: true,
    companySelected: CHOOSE_COMPANY,
    divisionSelected: null,
    // industriesOfSelectedDivision: '',

  }

  handleTourNameChange = e => {
    this.setState({
      tourName: e.target.value,
      tourNameError: e.target.value != '' ? false : true
    })
  }

  handleCompanySelector = e => {
    if (e.target.value == 'Create New Company') this.props.history.push('/create-company/create-tour')
    else this.setState({ companySelected: e.target.value })
  }

  handleDivisionSelector = e => {
    let divisionId = e.target.value
    let division = this.props.Divisions.find(d => d._id === divisionId)
    this.setState({ divisionSelected: division })
    // this.setState({ divisionSelected: division.name, industriesOfSelectedDivision: division.industries })
  }


  render() {
    const grnblue = '#00ffae'
    const { Companies, Divisions, history } = this.props
    return (
      <>
        <ToastContainer/>
        <TitleBar title='Eco Lab Application' color={grnblue}/>
        <div className='padding-div-20'>
          <div className='section-title'>Tour Name</div>
          <TextField
            error={this.state.tourNameError}
            variant='outlined'
            onChange={this.handleTourNameChange}
            value={this.state.tourName}/>
          <br/>
          <br/>
          <CSSTransition
            appear
            unmountOnExit
            in={!this.state.tourNameError}
            timeout={500}
            classNames='item'>
            <>
              <div className='section-title'>Choose Company</div>
              <select
                value={this.state.companySelected}
                onChange={this.handleCompanySelector}>
                {
                  Companies
                  ? <>
                      {
                        [{ _id: 8394032098423098, name: CHOOSE_COMPANY }]
                          .concat({ _id: 38402387589238947, name: CREATE_NEW_COMPANY })
                          .concat(Companies).map(company => (
                            <option key={company._id} value={company.name}>{company.name}</option>
                          )
                        )
                      }
                    </>
                  : null
                }
              </select>
              <br/>
              <br/>
            </>
          </CSSTransition>
          <CSSTransition
            appear
            unmountOnExit
            in={this.state.companySelected != '' && this.state.companySelected != CHOOSE_COMPANY}
            timeout={500}
            classNames='item'>
            <>
              <div className='section-title'>Choose Division</div>
              <select
                value={this.state.industriesOfSelectedDivision}
                onChange={this.handleDivisionSelector}>
                {
                  Divisions
                  ?
                    <>
                      {
                        Divisions.map(division => (
                          <option key={division._id} value={division._id}>{division.name}</option>
                        ))
                      }
                    </>
                  : null
                }
              </select>
              <br/>
              <br/>
            </>
          </CSSTransition>
          <CSSTransition
            appear
            unmountOnExit
            in={this.state.divisionSelected != null}
            timeout={500}
            classNames='item'>
            <>
              <div className='section-title'>Choose Industry</div>
              <select
                value={this.state.industrySelected}
                onChange={this.handleIndustrySelector}>
                {
                  this.state.divisionSelected
                  ?
                    this.state.divisionSelected.industries.map(industry => (
                      <option key={industry} value={industry}>{industry}</option>
                    ))
                  : null
                }
              </select>
            </>
          </CSSTransition>
        </div>
      </>
    )
  }

}

export default connect(mapState, mapDispatch)(withRouter(CreateTour))
