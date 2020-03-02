import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { mapState, mapDispatch } from '../../../mapStateMapDispatch'
import withAppUserAuth from '../HOC/withAppUserAuth'
import TitleBar from '../UIcomponents/TitleBar'
import { ToastContainer, toast } from 'react-toastify'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import { CSSTransition } from 'react-transition-group'
import ButtonWithEcoStyles from '../UIcomponents/ButtonWithEcoStyles'
import TextFieldWithEcoStylesDark from '../UIcomponents/TextFieldWithEcoStylesDark'
import { FormControlLabelCustom, GreenSwitch } from '../UIcomponents/CustomWithStyles'
import EcoLabColors from '../Colors/EcoLabColors'
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

  state = {
    tourName: '',
    tourNameError: true,
    companySelected: CHOOSE_COMPANY,
    divisionSelected: dummyDivision,
    industrySelected: dummyIndustry,
    segmentSelected: dummySegment,
    tourEnabled: (
      (this.props.TourSelectedForEdit && this.props.placement == 'edit-tour')
      ? this.props.TourSelectedForEdit.enabled
      : true
    )
  }

  componentDidMount() {
    const { checkAppUserAuth, setAppUserData, AppUserData, history,
            getCompanies, getDivisions, getIndustries, getSegments } = this.props
    checkAppUserAuth(data => {
      console.log(data.data)
      const { auth, fullaccess, peer, name, email } = data.data
      if (!auth) history.push('/login')
      else {
        if (!AppUserData.auth) {
          setAppUserData(auth, fullaccess, peer, name, email)
        }
        // getCompanies()
        getCompanies(() => {
          getDivisions(() => {
            getIndustries(() => {
              getSegments()
              console.log('getting segments..')
            })
            console.log('getting industries..')
          })
          console.log('getting divisions..')
        })
        console.log('getting companies..')
      }
    })
  }

  componentDidUpdate() {
    console.log(this.state)
  }

  handleTourSubmit = () => {
    switch (this.props.placement) {
      case 'edit-tour':
        this.props.updateTourModule({
          tour_id: this.props.TourSelectedForEdit._id,
          tourName: this.state.tourName,
          company_id: this.state.companySelected._id,
          company_name: this.state.companySelected.name,
          division_id: this.state.divisionSelected._id,
          division_name: this.state.divisionSelected.name,
          industry_id: this.state.industrySelected._id,
          industry_name: this.state.industrySelected.name,
          segment_id: this.state.segmentSelected._id,
          segment_name: this.state.segmentSelected.name,
          enabled: this.state.tourEnabled
        },
        () => {
          // this.props.history.push('/view-tours')
          this.props.displayEditModal(false)
          this.props.getTours()
        })
        break;
      default:
        this.props.createTourModule({
          tourName: this.state.tourName,
          company_id: this.state.companySelected._id,
          company_name: this.state.companySelected.name,
          division_id: this.state.divisionSelected._id,
          division_name: this.state.divisionSelected.name,
          industry_id: this.state.industrySelected._id,
          industry_name: this.state.industrySelected.name,
          segment_id: this.state.segmentSelected._id,
          segment_name: this.state.segmentSelected.name,
        },
        () => {
          this.props.history.push('/view-tours')
        })
    }
  }

  handleTourNameChange = e => {
    this.setState({
      tourName: e.target.value,
      tourNameError: e.target.value != '' ? false : true
    })
  }

  handleCompanySelector = e => {
    let companyName = e.target.value
    let company = this.props.Companies.find(c => c.name === companyName)
    if (e.target.value == CREATE_NEW_COMPANY && this.props.placement != 'edit-tour') {
      this.props.setCompanyToEdit(null)
      this.props.history.push('/create-company/create-tour')
    }
    else this.setState({ ...this.state, companySelected: company, divisionSelected: dummyDivision, industrySelected: dummyIndustry, segmentSelected: dummyIndustry })
  }

  handleDivisionSelector = e => {
    let divisionId = e.target.value
    let division = this.props.Divisions.find(d => d._id === divisionId)
    console.log(divisionId, division)
    this.setState({ ...this.state, divisionSelected: division, industrySelected: dummyIndustry, segmentSelected: dummySegment })
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

  handleViewToursBtnClick = () => {
    this.props.history.push('/view-tours')
  }

  render() {
    const { Companies, Divisions, history } = this.props
    return (
      <>
        <ToastContainer/>
        {
          this.props.placement != 'edit-tour'
          ? <TitleBar title='Eco Lab Application'/>
          : null
        }
        <div className='padding-div-20'>
          {
            this.props.placement != 'edit-tour'
            ?
              <>
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
                  onClick={this.handleViewToursBtnClick}>
                    View Existing Tours
                </ButtonWithEcoStyles>
                <br/>
                <br/>
              </>
            : null
          }
          {
            this.props.placement != 'edit-tour'
            ? <div className='page-title'>Create a Tour</div>
            : <div className='page-title'>Edit {this.props.TourSelectedForEdit ? this.props.TourSelectedForEdit.name : ''}</div>
          }
          {
            this.props.placement == 'edit-tour'
            ? <>
                <FormControlLabelCustom
                  label={this.state.tourEnabled ? 'enabled' : 'disabled'}
                  control={
                    <GreenSwitch
                      checked={this.state.tourEnabled}
                      onChange={() => this.setState({ tourEnabled: !this.state.tourEnabled })}
                      color='default'
                      />
                  }
                />
              </>
            : null
          }
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
                      .concat(Companies).map(company => {
                        if (company.name == CREATE_NEW_COMPANY && this.props.placement == 'edit-tour') {
                          return null
                        } else {
                          return <option key={company._id} value={company.name}>{company.name}</option>
                        }
                    })
                  }
                </>
              : null
            }
          </select>
          <br/>
          <br/>
          <CSSTransition
            appear
            unmountOnExit
            in={this.state.companySelected != '' && this.state.companySelected != CHOOSE_COMPANY}
            timeout={500}
            classNames='item'>
              <>
                <div className='section-title'>Tour Name</div>
                <TextFieldWithEcoStylesDark
                  // label='tour name'
                  error={this.state.tourNameError}
                  variant='outlined'
                  onChange={this.handleTourNameChange}
                  value={this.state.tourName}/>
                <br/>
                <br/>
              </>
          </CSSTransition>
          <CSSTransition
            appear
            unmountOnExit
            in={this.state.tourNameError == false}
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
            in={
              (this.state.divisionSelected != null && this.state.divisionSelected.name != CHOOSE_DIVISION && this.state.segmentSelected != null && this.state.segmentSelected.name != CHOOSE_SEGMENT) ||
              (this.props.TourSelectedForEdit && this.props.placement == 'edit-tour' && this.props.TourSelectedForEdit.enabled != this.state.tourEnabled)
            }
            timeout={500}
            classNames='item'>
            <>
              <ButtonWithEcoStyles
                onClick={this.handleTourSubmit}
                variant='contained'
                textcolor='white'
                backgroundcolor={EcoLabColors.blue}
                >
                {
                  this.props.placement == 'edit-tour'
                  ? 'Update Tour'
                  : 'Create Tour'
                }
              </ButtonWithEcoStyles>
            </>
          </CSSTransition>
        </div>
      </>
    )
  }

}

export default connect(mapState, mapDispatch)(withAppUserAuth(withRouter(CreateTour)))
