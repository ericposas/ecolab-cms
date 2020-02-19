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
          return resolve(true)
        } else {
          console.log('wrong dimensions')
          toast.error(`Incorrect logo dimensions. Please upload an image that is at least ${FileWidth}px wide and ${FileHeight}px tall.`, {
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
      toast.error('Incorrect file type. Please upload a PNG file.', {
        autoClose: 2500
      })
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
            toast.success(`uploaded ${file.name} successfully!`, { autoClose: 1000 })
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
      case 'edit-custom-module': {
        let toastId = toast(<div>Updating custom module...</div>, { type: toast.TYPE.WARNING, autoClose: 5000 })
        updateCustomModule({ id: CustomModuleSelectedForEdit._id, name: this.state.customModuleName, image_url: this.state.imageFilePath }, () => {
          this.props.displayEditModal(false)
          getCustomModules()
          toast.dismiss(toastId)
        })
      }
        break;
      default: {
        let toastId = toast(<div>Updating custom module...</div>, { type: toast.TYPE.WARNING, autoClose: 5000 })
        saveCustomModule({ name: this.state.customModuleName, image_url: this.state.imageFilePath }, () => {
          history.push('/view-custom-modules')
          toast.dismiss(toastId)
          console.log('file path saved to db')
        })
      }
    }
  }

  handleViewCustomModulesBtnClick = () => this.props.history.push('/view-custom-modules')

  render() {
    const { history } = this.props
    return (
      <>
        <ToastContainer/>
        {
          this.props.placement != 'edit-custom-module'
          ?
            <>
              <TitleBar title='Eco Lab Application'/>
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
          <div className='section-title'>Custom Module Name</div>
          <TextField
            label='module name'
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
        </div>
      </>
    )
  }

}

export default connect(mapState, mapDispatch)(withAppUserAuth(withRouter(CreateCustomModule)))
