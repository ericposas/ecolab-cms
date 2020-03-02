import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { mapState, mapDispatch } from '../../../mapStateMapDispatch'
import withAppUserAuth from '../HOC/withAppUserAuth'
import TitleBar from '../UIcomponents/TitleBar'
import { Progress as ProgressBar } from 'reactstrap'
import { Button, Switch, FormControlLabel } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { green } from '@material-ui/core/colors'
import TextFieldWithEcoStylesDark from '../UIcomponents/TextFieldWithEcoStylesDark'
import ButtonWithEcoStyles from '../UIcomponents/ButtonWithEcoStyles'
import EcoLabColors from '../Colors/EcoLabColors'
import { ToastContainer, toast } from 'react-toastify'
import { CSSTransition } from 'react-transition-group'
import axios from 'axios'
import uuid from 'uuid'

const FileWidth = 960

class CreateCompany extends Component {

  state = {
    companyEnabled: this.props.CompanySelectedForEdit ? this.props.CompanySelectedForEdit.enabled : false,
    companyName: this.props.CompanySelectedForEdit ? this.props.CompanySelectedForEdit.name : '',
    companyNameError: this.props.CompanySelectedForEdit ? false : true,
    companyLogoLoadedPercent: 0,
    companyLogoUploaded: this.props.CompanySelectedForEdit ? true : false,
    companyLogoFilePath: '',
    customerNameFields: this.props.CompanySelectedForEdit ? this.props.CompanySelectedForEdit.customer_names : [],
    noteFieldValue: this.props.CompanySelectedForEdit ? this.props.CompanySelectedForEdit.notes : '',
    showDeleteModal: false,
    lastPageVisited: null,
    skipUpload: false,
    correctLogoDimensions: null
  }

  componentDidMount() {
    const { checkAppUserAuth, setAppUserData, AppUserData, history } = this.props
    checkAppUserAuth(data => {
      console.log(data.data)
      const { auth, fullaccess, peer, name, email } = data.data
      if (!auth) history.push('/login')
      else {
        if (!AppUserData.auth) setAppUserData(auth, fullaccess, peer, name, email)
        this.setState({ lastPageVisited: this.props.match.params.lastLocation })
        console.log(this.props.match.params.lastLocation)
      }
    })
  }

  componentWillUnmount() {
    if (this.loadedResetTimer) clearTimeout(this.loadedResetTimer)
  }

  handleCompanyNameChange = e => {
    this.setState({
      companyName: e.target.value,
      companyNameError: e.target.value == '' ? true : false,
    })
  }

  getUploadedFileDimensions = file => new Promise((resolve, reject) => {
    try {
      let img = new Image()
      img.onload = () => {
        const width  = img.naturalWidth
        const height = img.naturalHeight
        window.URL.revokeObjectURL(img.src)
        if (width >= FileWidth) {
          console.log('correct dimensions')
          return resolve(true)
        } else {
          console.log('wrong dimensions')
          toast.error(`Invalid logo dimensions -- must be at least ${FileWidth}px wide`, {
            autoClose: 5000
          })
          return resolve(false)
        }
      }
      img.src = window.URL.createObjectURL(file)
    } catch (exception) {
      return reject(exception)
    }
  })

  checkMimeType = (file) => {
    const types = ['image/png'] //, 'image/jpeg', 'image/gif']
    if (types.includes(file.type)) {
      console.log(`${file.type} is a valid file type`)
      return true
    } else {
      console.log('incorrect mime type')
      toast.error(`Invalid file type -- must be a .PNG with alpha (transparent background)`, {
        autoClose: 5000
      })
      return false
    }
  }

  handleFileSelect = e => {
    let file = e.target.files[0]
    if (this.checkMimeType(file)) {
      this.getUploadedFileDimensions(file)
      .then(correctDimensions => {
        if (correctDimensions) {
          const formData = new FormData()
          formData.append('file', file)
          axios.post('/upload', formData, {
            onUploadProgress: evt => {
              this.setState({
                companyLogoLoadedPercent: (evt.loaded / evt.total * 100)
              })
            }
          })
          .then(data => {
            console.log(data)
            toast.success(`uploaded ${file.name} successfully!`)
            this.setState({ companyLogoUploaded: true, companyLogoFilePath: data.data.path })
            this.loadedResetTimer = setTimeout(() => {
              this.setState({ companyLogoLoadedPercent: 0 })
            }, 2000)
          })
          .catch(err => {
            toast.error('error occurred during upload.')
            console.log(err)
          })
        }
      })
    }
  }

  addCustomerNameInputBox = () => {
    this.setState({
      customerNameFields: this.state.customerNameFields.concat('')
    })
  }

  removeCustomerNameInputBox = idx => e => {
    this.setState({
      customerNameFields: this.state.customerNameFields.filter((name, i) => i != idx)
    })
  }

  handleCustomerNameEntry = idx => e => {
    this.setState({
      customerNameFields: this.state.customerNameFields.map((name, i) => (
        i == idx ? e.target.value : name
      ))
    })
  }

  handleNotesEntry = e => {
    this.setState({
      noteFieldValue: e.target.value
    })
  }

  handleSubmit = () => {
    const { submitCreateCompanyData, updateCompanyData, CompanySelectedForEdit } = this.props
    const { companyName, companyLogoFilePath, customerNameFields, noteFieldValue } = this.state
    switch (this.props.placement) {
      case 'edit-company':
        updateCompanyData({
          id: CompanySelectedForEdit ? CompanySelectedForEdit._id : null,
          name: companyName.trim(),
          logo: companyLogoFilePath,
          customer_names: customerNameFields.filter(value => value != ''),
          notes: noteFieldValue,
          enabled: this.state.companyEnabled,
        },
        () => {
          this.props.displayEditModal(false)
          this.props.getCompanies()
        })
        break;
      default:
        submitCreateCompanyData({
          name: companyName.trim(),
          logo: companyLogoFilePath,
          customer_names: customerNameFields.filter(value => value != ''),
          notes: noteFieldValue,
          enabled: this.state.companyEnabled,
        },
        () => {
          if (this.props.match.params.lastLocation == 'create-tour') {
            this.props.history.push('/create-tour')
          } else {
            this.props.history.push('/view-companies')
          }
        })
    }
  }

  handleViewCompaniesBtnClick = () => this.props.history.push('/view-companies')

  render() {
    const { SavingCompanyData, CompanyDataSaved, CompanyDataError, history } = this.props
    const greenValue = 500
    const GreenSwitch = withStyles({
      switchBase: {
        color: '#dfdfdf',
        '&checked': {
          color: EcoLabColors.green
        },
        '&$checked + $track': {
          backgroundColor: green[greenValue]
        }
      },
      checked: {
        color: EcoLabColors.green
      },
      track: {}
    })(Switch)

    return (
      <>
        <ToastContainer/>
        {
          this.props.placement != 'edit-company'
          ?
            <>
              <TitleBar title='Eco Lab Application'/>
            </>
          : null
        }
        <div className='padding-div-20'>
          {
            this.props.placement != 'edit-company'
            ?
              <>
                <ButtonWithEcoStyles
                  style={{ marginRight: '8px' }}
                  variant='contained'
                  textcolor='white'
                  marginright='10px'
                  backgroundcolor={EcoLabColors.blue}
                  onClick={() => history.push('/')}>
                    Dashboard
                </ButtonWithEcoStyles>
                <ButtonWithEcoStyles
                  variant='contained'
                  textcolor='white'
                  backgroundcolor={EcoLabColors.green}
                  onClick={this.handleViewCompaniesBtnClick}>
                    View Existing Companies
                </ButtonWithEcoStyles>
                <br/>
                <br/>
              </>
            : null
          }
          {
            this.props.placement != 'edit-company'
            ? <div className='page-title'>Add a Company</div>
            : <div className='page-title'>Edit {this.props.CompanySelectedForEdit ? this.props.CompanySelectedForEdit.name : ''}</div>
          }
          {
            this.props.placement == 'edit-company'
            ? <>
                <FormControlLabel
                  label={this.state.companyEnabled ? 'enabled' : 'disabled'}
                  control={
                    <GreenSwitch
                      checked={this.state.companyEnabled}
                      onChange={() => this.setState({ companyEnabled: !this.state.companyEnabled })}
                      color='default'
                      />
                  }
                />
              </>
            : null
          }
          <div className='section-title'>Company Name</div>
          <TextFieldWithEcoStylesDark
            // label='company'
            error={this.state.companyNameError}
            variant='outlined'
            onChange={this.handleCompanyNameChange}
            value={this.state.companyName}/><br/><br/>
          <CSSTransition
            appear
            unmountOnExit
            in={this.state.companyLogoFilePath != ''}
            timeout={500}
            classNames='item'>
            <>
              <img width={280} src={this.state.companyLogoFilePath}/>
            </>
          </CSSTransition>
          <CSSTransition
            appear
            unmountOnExit
            in={(this.state.companyName != '' && this.state.companyNameError == false)}
            timeout={500}
            classNames='item'>
              <>
                { this.state.skipUpload == false ? <div className='section-title'>Company Logo <span style={{ fontSize: '.85rem' }}>(Must be a .PNG file at least {FileWidth}px wide)</span></div> : null }
                <form method='post' encType='multipart/form-data'>
                  {
                    this.state.skipUpload == false
                    ?
                      <>
                        <ButtonWithEcoStyles
                          diplay='inline-block'
                          variant='contained'
                          component='label'
                          border='true'
                        >
                          Select a File
                          <input type='file' onChange={this.handleFileSelect} style={{ display: 'none' }}/>
                        </ButtonWithEcoStyles>
                      </>
                    : null
                  }
                  {
                    this.props.placement == 'edit-company' && this.state.skipUpload == false
                    ? <>
                        <ButtonWithEcoStyles
                          onClick={() => this.setState({ companyLogoUploaded: true, skipUpload: true }) }
                          style={{ display: 'inline-block', marginLeft: '8px' }}
                          textcolor='white'
                          marginleft='8px'
                          backgroundcolor={EcoLabColors.blue}
                          variant='contained'>
                            Skip new logo upload
                        </ButtonWithEcoStyles>
                        <CSSTransition
                          appear
                          unmountOnExit
                          in={this.state.companyLogoLoadedPercent != 0}
                          timeout={500}
                          classNames='item'>
                          <ProgressBar max='100' color='success' value={this.state.companyLogoLoadedPercent}>{Math.round(this.state.companyLogoLoadedPercent, 2)}%</ProgressBar>
                        </CSSTransition>
                        <br/>
                        <br/>
                      </>
                    : null
                  }
                </form>
              </>
          </CSSTransition>
          <br/>
          <br/>
          <CSSTransition
            appear
            unmountOnExit
            in={this.state.companyLogoUploaded}
            timeout={500}
            classNames='item'
            >
              <>
                <div className='section-title'>Team Members</div>
                <div className='plus-symbol' onClick={this.addCustomerNameInputBox}>
                  <div className='plus-symbol-inner-text'>+</div>
                </div>
                <div style={{ display: 'inline-block', marginLeft: '10px' }}>Add Company Member Names</div>
                <br/>
                <br/>
                <div>
                  {
                    this.state.customerNameFields.map((field, idx) => ((
                      <Fragment key={idx}>
                        <div
                          style={{
                            display: 'inline-block'
                          }}>
                          <div>
                            Customer name {idx}
                          </div>
                          <TextFieldWithEcoStylesDark
                            variant='outlined'
                            // label={`Customer name ${idx}`}
                            onChange={this.handleCustomerNameEntry(idx)}
                            value={this.state.customerNameFields[idx]}/>
                          <div
                            onClick={this.removeCustomerNameInputBox(idx)}
                            style={{
                              display: 'inline-block',
                              marginLeft: '6px',
                              marginRight: '14px',
                              paddingTop: '12px',
                              transform: 'scale(1.35)',
                              cursor: 'pointer'
                            }}>
                            &#10006;
                          </div>
                        </div>
                      </Fragment>
                    )))
                  }
                </div>
                <br/>
                <br/>
                <br/>
              </>
          </CSSTransition>
          <CSSTransition
            appear
            unmountOnExit
            in={this.state.customerNameFields.length > 0 && this.state.customerNameFields[0] != ''}
            timeout={500}
            classNames='item'
            >
            <>
              <div className='section-title'>Additional notes?</div>
              <TextFieldWithEcoStylesDark
                  // label='note'
                  variant='outlined'
                  onChange={this.handleNotesEntry}
                  value={this.state.noteFieldValue}
                />
              <br/>
              <br/>
            </>
          </CSSTransition>
          <CSSTransition
            appear
            unmountOnExit
            in={this.state.customerNameFields.length > 0 && this.state.customerNameFields[0] != ''}
            timeout={500}
            classNames='item'>
            <ButtonWithEcoStyles
              textcolor='white'
              backgroundcolor={EcoLabColors.blue}
              variant='contained'
              onClick={this.handleSubmit}>
              {
                this.props.placement != 'edit-company' ? 'Submit' : 'Update Company'
              }
            </ButtonWithEcoStyles>
          </CSSTransition>
        </div>
      </>
    )
  }

}

export default connect(mapState, mapDispatch)(withAppUserAuth(withRouter(CreateCompany)))
