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
const CHOOSE_DIVISION = 'Choose division'
const CHOOSE_INDUSTRY = 'Choose industry'
const CHOOSE_SEGMENT = 'Choose segment'
const dummyDivision = { _id: 74329874923, name: CHOOSE_DIVISION, industries: [] }
const dummyIndustry = { _id: 4872394983278, name: CHOOSE_INDUSTRY, segments: [] }
const dummySegment = { _id: 759729874829, name: CHOOSE_SEGMENT, offerings: [] }

class CreateTour extends Component {

  // componentDidMount() { //add auth }

  componentDidMount() {
    // stagger these so that they load in one after the other async, possibly?
    this.props.getCompanies()
    this.props.getDivisions()
    this.props.getIndustries()
    this.props.getSegments()

  }

  componentDidUpdate() {
    console.log(this.state)
  }

  state = {
    tourName: '',
    tourNameError: true,
    companySelected: CHOOSE_COMPANY,
    divisionSelected: dummyDivision,
    industrySelected: dummyIndustry,
    segmentSelected: dummySegment,

  }

  handleTourSubmit = () => {
    this.props.createTourModule(
      this.state.tourName,
      this.state.companySelected._id,
      this.state.divisionSelected._id,
      this.state.industrySelected._id,
      this.state.segmentSelected._id,
    )
  }

  handleTourNameChange = e => {
    this.setState({
      tourName: e.target.value,
      tourNameError: e.target.value != '' ? false : true
    })
  }

  handleCompanySelector = e => {
    // console.log(e.target.value)
    let companyName = e.target.value
    let company = this.props.Companies.find(c => c.name === companyName)
    if (e.target.value == CREATE_NEW_COMPANY) this.props.history.push('/create-company/create-tour')
    else this.setState({ ...this.state, companySelected: company, divisionSelected: dummyDivision, industrySelected: dummyIndustry, segmentSelected: dummyIndustry })
  }

  handleDivisionSelector = e => {
    let divisionId = e.target.value
    let division = this.props.Divisions.find(d => d._id === divisionId)
    console.log(divisionId, division)
    this.setState({ ...this.state, divisionSelected: division, industrySelected: dummyIndustry, segmentSelected: dummySegment })
    // console.log(division.name)
    // this.setState({ divisionSelected: division.name, industriesOfSelectedDivision: division.industries })
  }

  handleIndustrySelector = e => {
    let industryName = e.target.value
    let industry = this.props.Industries.find(i => i.name === industryName)
    this.setState({ ...this.state, industrySelected: industry, segmentSelected: dummySegment })
    console.log(industry)
  }

  handleSegmentSelector = e => {
    let segmentName = e.target.value
    let segment = this.props.Segments.find(s => s.name.trim() === segmentName)
    this.setState({ ...this.state, segmentSelected: segment })
    console.log(segment)
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
                value={this.state.companySelected ? this.state.companySelected.name : ''}
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
                value={this.state.divisionSelected ?  this.state.divisionSelected.name : ''}
                onChange={this.handleDivisionSelector}>
                <option value={''}>{this.state.divisionSelected ? this.state.divisionSelected.name : ''}</option>
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
            in={this.state.divisionSelected != null && this.state.divisionSelected.name != CHOOSE_DIVISION}
            timeout={500}
            classNames='item'>
            <>
              <div className='section-title'>Choose Industry</div>
              <select
                value={this.state.industrySelected ? this.state.industrySelected.name : ''}
                onChange={this.handleIndustrySelector}>
                <option value={''}>Choose industry</option>
                {
                  this.state.divisionSelected && this.state.divisionSelected.industries
                  ?
                    this.state.divisionSelected.industries.map((industry, idx) => (
                      <option key={`${industry}-${idx}`} value={industry}>{industry}</option>
                    ))
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
            in={this.state.industrySelected != null && this.state.industrySelected.name != CHOOSE_INDUSTRY}
            timeout={500}
            classNames='item'>
            <>
              <div className='section-title'>Choose Segment</div>
              <select
                value={this.state.segmentSelected ? this.state.segmentSelected.name : ''}
                onChange={this.handleSegmentSelector}>
                <option value={''}>Choose segment</option>
                {
                  this.state.industrySelected && this.state.industrySelected.segments
                  ?
                    this.state.industrySelected.segments.map((segment, idx) => (
                      <option key={`${segment}-${idx}`} value={segment}>{segment}</option>
                    ))
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
            in={this.state.divisionSelected != null && this.state.divisionSelected.name != CHOOSE_DIVISION && this.state.segmentSelected != null && this.state.segmentSelected.name != CHOOSE_SEGMENT}
            timeout={500}
            classNames='item'>
            <>
              <Button
                onClick={this.handleTourSubmit}
                variant='contained'
                color='primary'>Create Tour</Button>
            </>
          </CSSTransition>
        </div>
      </>
    )
  }

}

export default connect(mapState, mapDispatch)(withRouter(CreateTour))
