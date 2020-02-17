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

const FileWidth = 1920
const FileHeight = 1200

class CreateCustomModule extends Component {

  state = {
    customModuleName: '',
    customModuleNameError: true,
    imageLoadedPercent: 0,
    imageUploaded: false,
    imageFilePath: '',
    correctImageDimensions: null,
    skipUpload: false
  }

  componentDidMount() {
    const { checkAppUserAuth, setAppUserData, AppUserData, history } = this.props
    checkAppUserAuth(data => {
      console.log(data.data)
      const { auth, fullaccess, peer, name, email } = data.data
      if (!auth) history.push('/login')
      else {
        if (!AppUserData.auth) setAppUserData(auth, fullaccess, peer, name, email)
      }
    })
  }

  componentWillUnmount() {
    if (this.loadedResetTimer) clearTimeout(this.loadedResetTimer)
    if (this.incorrectImageDimensionsTimer) clearTimeout(this.incorrectImageDimensionsTimer)
    if (this.correctImageDimensionsTimer) clearTimeout(this.correctImageDimensionsTimer)

  }

  handleCustomModuleNameChange = e => {
    this.setState({
      customModuleName: e.target.value,
      customModuleNameError: e.target.value == '' ? true : false,
    })
  }

  getUploadedFileDimensions = file => new Promise((resolve, reject) => {
    try {
      let img = new Image()
      img.onload = () => {
        const width  = img.naturalWidth
        const height = img.naturalHeight
        window.URL.revokeObjectURL(img.src)
        if (width >= FileWidth && height >= FileHeight) {
          console.log('correct dimensions')
          this.setState({ correctImageDimensions: true })
          this.correctImageDimensionsTimer = setTimeout(() => this.setState({ correctImageDimensions: null }))
          return resolve(true)
        } else {
          console.log('wrong dimensions')
          this.setState({ correctImageDimensions: false })
          this.incorrectImageDimensionsTimer = setTimeout(() => this.setState({ correctImageDimensions: null }))
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
                imageLoadedPercent: (evt.loaded / evt.total * 100)
              })
            }
          })
          .then(data => {
            console.log(data)
            toast.success(`uploaded ${file.name} successfully!`)
            this.setState({ imageUploaded: true, imageFilePath: data.data.path })
            this.loadedResetTimer = setTimeout(() => {
              this.setState({ imageLoadedPercent: 0 })
            }, 2000)
          })
          .catch(err => {
            toast.error('error occurred during upload.')
            console.log(err)
          })
        }
      })
  }

  handleSubmit = () => {
    const { saveCustomModule, updateCustomModule, getCustomModules, CustomModuleSelectedForEdit, history } = this.props
    switch (this.props.placement) {
      case 'edit-custom-module':
        // console.log(CustomModuleSelectedForEdit._id)
        updateCustomModule({ id: CustomModuleSelectedForEdit._id, name: this.state.customModuleName, image_url: this.state.imageFilePath }, () => {
          this.props.displayEditModal(false)
          getCustomModules()
        })
        break;
      default:
        saveCustomModule({ name: this.state.customModuleName, image_url: this.state.imageFilePath }, () => {
          history.push('/view-custom-modules')
          console.log('file path saved to db')
      })
    }
  }

  handleViewCustomModulesBtnClick = () => this.props.history.push('/view-custom-modules')

  render() {
    const grnblue = '#00ffae'
    const { history } = this.props
    return (
      <>
        <ToastContainer/>
        {
          this.props.placement != 'edit-custom-module'
          ?
            <>
              <TitleBar title='Eco Lab Application' color={grnblue}/>
            </>
          : null
        }
        <div className='padding-div-20'>
          {
            this.props.placement != 'edit-custom-module'
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
                  onClick={this.handleViewCustomModulesBtnClick}>
                    View Existing Custom Modules
                </Button>
                <br/>
                <br/>
              </>
            : null
          }
          {
            this.props.placement != 'edit-custom-module'
            ? <div className='page-title'>Upload a Custom Module</div>
            : <div className='page-title'>Edit {this.props.CustomModuleSelectedForEdit.name}</div>
          }
          {/*: <div className='page-title'>Edit {this.props.CompanySelectedForEdit ? this.props.CompanySelectedForEdit.name : ''}</div>*/}
          <div className='section-title'>Custom Module Name</div>
          <TextField
            error={this.state.customModuleNameError}
            variant='outlined'
            onChange={this.handleCustomModuleNameChange}
            value={this.state.customModuleName}/><br/><br/>
          <CSSTransition
            appear
            unmountOnExit
            in={this.state.imageFilePath != ''}
            timeout={500}
            classNames='item'>
            <>
              <img style={{ width: '100%' }} src={this.state.imageFilePath}/>
            </>
          </CSSTransition>
          <CSSTransition
            appear
            unmountOnExit
            in={(this.state.customModuleName != '' && this.state.customModuleNameError == false)}
            timeout={500}
            classNames='item'>
              <>
                { this.state.skipUpload == false ? <div className='section-title'>Custom Module (Image file)</div> : null }
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
                </form>
              </>
          </CSSTransition>
          <br/>
          <br/>
          <CSSTransition
            appear
            unmountOnExit
            in={this.state.imageUploaded}
            timeout={500}
            classNames='item'>
              <>
                <Button
                  variant='contained'
                  color='primary'
                  onClick={this.handleSubmit}>
                  Submit Custom Module
                </Button>
              </>
          </CSSTransition>
          {
            this.state.correctImageDimensions == false
            ? <div style={{ display: 'none' }}>
                {toast.error(`Incorrect logo dimensions. Please upload a logo that is at least ${FileWidth}px wide.`, {
                  autoClose: 5000
                })}
              </div>
            : null
          }
          {
            this.props.SavingWebModule
            ? <div style={{ display: 'none' }}>
                {toast.warn(`Saving custom module...`, {
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

export default connect(mapState, mapDispatch)(withAppUserAuth(withRouter(CreateCustomModule)))
