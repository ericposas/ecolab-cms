import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { mapState, mapDispatch } from '../../../mapStateMapDispatch'
import withAppUserAuth from '../HOC/withAppUserAuth'
import TitleBar from '../../CMS/UIcomponents/TitleBar'
import { Progress as ProgressBar } from 'reactstrap'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { ToastContainer, toast } from 'react-toastify'
import { CSSTransition } from 'react-transition-group'
import axios from 'axios'
import uuid from 'uuid'

const FileWidth = 960

class CreateCompany extends Component {

  state = {
    companyName: '',
    companyNameError: true,
    companyLogoLoadedPercent: 0,
    companyLogoUploaded: false,
    companyLogoFilePath: '',
    customerNameFields: [],
    noteFieldValue: '',
    //
    showDeleteModal: false,
    lastPageVisited: null,

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
    // console.log(this.state.companyNameError)
  }

  getUploadedFileDimensions = file => new Promise((resolve, reject) => {
    try {
      let img = new Image()
      img.onload = () => {
        const width  = img.naturalWidth
        const height = img.naturalHeight
        window.URL.revokeObjectURL(img.src)
        // return resolve({width, height})
        if (width >= FileWidth) {
          console.log('correct dimensions')
          return resolve(true)
        } else {
          console.log('wrong dimensions')
          return resolve(false)
        }
      }
      img.src = window.URL.createObjectURL(file)
    } catch (exception) {
      return reject(exception)
    }
  })

  checkMimeType = (file) => {
    const types = ['image/png', 'image/jpeg', 'image/gif']
    if (types.includes(file.type)) {
      console.log(`${file.type} is a valid file type`)
      return true
    } else {
      console.log('incorrect mime type')
      return false
    }
  }

  handleFileSelect = e => {
    let file = e.target.files[0]
    this.getUploadedFileDimensions(file)
      .then(correctDimensions => {
        if (correctDimensions && this.checkMimeType(file)) {
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
    const { submitCreateCompanyData } = this.props
    const { companyName, companyLogoFilePath, customerNameFields, noteFieldValue } = this.state
    submitCreateCompanyData(
      companyName, companyLogoFilePath,
      customerNameFields, noteFieldValue
    )
  }

  handleViewCompaniesBtnClick = () => this.props.history.push('/view-companies')

  render() {
    const grnblue = '#00ffae'
    const { SavingCompanyData, CompanyDataSaved, CompanyDataError, history } = this.props
    return (
      <>
        <ToastContainer/>
        <TitleBar title='Eco Lab Application' color={grnblue}/>
        <div className='padding-div-20'>
          <Button
            variant='contained'
            color='default'
            onClick={this.handleViewCompaniesBtnClick}>
              View Existing Companies
          </Button>
          <br/>
          <br/>
          <div className='section-title'>Company Name</div>
          <TextField
            error={this.state.companyNameError}
            variant='outlined'
            // label='Company name'
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
                <div className='section-title'>Company Logo</div>
                <form method='post' encType='multipart/form-data'>
                  <Button
                    variant='contained'
                    component='label'>
                    Select a File
                    <input type='file' onChange={this.handleFileSelect} style={{ display: 'none' }}/>
                  </Button>
                  <CSSTransition
                    appear
                    unmountOnExit
                    in={this.state.companyLogoLoadedPercent != 0}
                    timeout={500}
                    classNames='item'>
                    <ProgressBar max='100' color='success' value={this.state.companyLogoLoadedPercent}>{Math.round(this.state.companyLogoLoadedPercent, 2)}%</ProgressBar>
                  </CSSTransition>
                </form>
                <br/>
                <br/>
              </>
          </CSSTransition>
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
                {
                  this.state.customerNameFields.map((field, idx) => ((
                    <Fragment key={idx}>
                      <div className='padding-div-10' style={{ display: 'inline-block' }}>
                        <TextField
                          variant='outlined'
                          label={`Customer name ${idx}`}
                          onChange={this.handleCustomerNameEntry(idx)}
                          value={this.state.customerNameFields[idx]}/>
                          <div onClick={this.removeCustomerNameInputBox(idx)} style={{ display: 'inline-block' }}>&#10006;</div>
                      </div>
                    </Fragment>
                  )))
                }
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
              <TextField
                variant='outlined'
                // label='Notes'
                onChange={this.handleNotesEntry}
                value={this.state.noteFieldValue}>
              </TextField>
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
            <Button
              variant='contained'
              color='primary'
              onClick={this.handleSubmit}>
              Submit
            </Button>
          </CSSTransition>
          {
            SavingCompanyData
            ? <div style={{ display: 'none' }}>
                {toast.warn('Attempting to save company data...', {
                  autoClose: 1000
                })}
              </div>
            : null
          }
          {
            CompanyDataSaved
            ? <div style={{ display: 'none' }}>
                {toast.success('Company data saved successfully...', {
                  autoClose: 1000,
                  // onOpen: () => {},
                  onClose: () => history.push('/view-companies')
                })}
              </div>
            : null
          }
          {
            CompanyDataError
            ? <div style={{ display: 'none' }}>
                {toast.error('Error saving company...', {
                  autoClose: 1500
                })}
              </div>
            : null
          }
        </div>
      </>
    )
  }

}

export default connect(mapState, mapDispatch)(withAppUserAuth(withRouter(CreateCompany)))
