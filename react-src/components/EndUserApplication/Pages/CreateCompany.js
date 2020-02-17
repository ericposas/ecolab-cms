import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { mapState, mapDispatch } from '../../../mapStateMapDispatch'
import withAppUserAuth from '../HOC/withAppUserAuth'
import TitleBar from '../UIcomponents/TitleBar'
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

  // componentDidUpdate(prevProps, prevState) {
  //   const { CompanySelectedForEdit } = this.props
  //   console.log(CompanySelectedForEdit)
  //   if (prevProps.CompanySelectedForEdit != this.props.CompanySelectedForEdit) {
  //     this.setState({
  //       companyName: CompanySelectedForEdit ? CompanySelectedForEdit.name : '',
  //       companyLogoFilePath: CompanySelectedForEdit ? CompanySelectedForEdit.logo_image_url : '',
  //       customerNameFields: CompanySelectedForEdit ? CompanySelectedForEdit.customer_names : [],
  //       noteFieldValue: CompanySelectedForEdit ? CompanySelectedForEdit.notes : ''
  //     })
  //   }
  // }

  componentWillUnmount() {
    if (this.loadedResetTimer) clearTimeout(this.loadedResetTimer)
    if (this.incorrectLogoDimensionsTimer) clearTimeout(this.incorrectLogoDimensionsTimer)
    if (this.correctLogoDimensionsTimer) clearTimeout(this.correctLogoDimensionsTimer)

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
        // return resolve({width, height})
        if (width >= FileWidth) {
          console.log('correct dimensions')
          this.setState({ correctLogoDimensions: true })
          this.correctLogoDimensionsTimer = setTimeout(() => this.setState({ correctLogoDimensions: null }))
          return resolve(true)
        } else {
          console.log('wrong dimensions')
          this.setState({ correctLogoDimensions: false })
          this.incorrectLogoDimensionsTimer = setTimeout(() => this.setState({ correctLogoDimensions: null }))
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
    const { submitCreateCompanyData, updateCompanyData, CompanySelectedForEdit } = this.props
    const { companyName, companyLogoFilePath, customerNameFields, noteFieldValue } = this.state
    switch (this.props.placement) {
      case 'edit-company':
        updateCompanyData({
          id: CompanySelectedForEdit ? CompanySelectedForEdit._id : null,
          name: companyName, logo: companyLogoFilePath,
          customer_names: customerNameFields, notes: noteFieldValue
        },
        () => {
          this.props.displayEditModal(false)
          this.props.getCompanies()
        })
        break;
      default:
        submitCreateCompanyData({
          name: companyName, logo: companyLogoFilePath,
          customer_names: customerNameFields, notes: noteFieldValue
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
    const grnblue = '#00ffae'
    const { SavingCompanyData, CompanyDataSaved, CompanyDataError, history } = this.props
    return (
      <>
        <ToastContainer/>
        {
          this.props.placement != 'edit-company'
          ?
            <>
              <TitleBar title='Eco Lab Application' color={grnblue}/>
            </>
          : null
        }
        <div className='padding-div-20'>
          {
            this.props.placement != 'edit-company'
            ?
              <>
                <Button
                  style={{ marginRight: '8px' }}
                  variant='contained'
                  color='primary'
                  onClick={() => history.push('/')}>Dashboard</Button>
                <Button
                  variant='contained'
                  color='default'
                  onClick={this.handleViewCompaniesBtnClick}>
                    View Existing Companies
                </Button>
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
          <div className='section-title'>Company Name</div>
          <TextField
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
                { this.state.skipUpload == false ? <div className='section-title'>Company Logo</div> : null }
                <form method='post' encType='multipart/form-data'>
                  {
                    this.state.skipUpload == false
                    ?
                      <>
                        <Button
                          style={{ display: 'inline-block' }}
                          variant='contained'
                          component='label'>
                          Select a File
                          <input type='file' onChange={this.handleFileSelect} style={{ display: 'none' }}/>
                        </Button>
                      </>
                    : null
                  }
                  {
                    this.props.placement == 'edit-company' && this.state.skipUpload == false
                    ? <>
                        <Button
                          onClick={() => this.setState({ companyLogoUploaded: true, skipUpload: true }) }
                          style={{ display: 'inline-block', marginLeft: '8px' }}
                          color='secondary'
                          variant='contained'>
                            Skip new logo upload
                        </Button>
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
              {
                this.props.placement != 'edit-company' ? 'Submit' : 'Update Company'
              }
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
          {
            this.state.correctLogoDimensions == false
            ? <div style={{ display: 'none' }}>
                {toast.error(`Incorrect logo dimensions. Please upload a logo that is at least ${FileWidth}px wide.`, {
                  autoClose: 5000
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
