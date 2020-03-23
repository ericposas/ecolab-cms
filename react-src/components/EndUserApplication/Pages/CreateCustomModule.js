import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { mapState, mapDispatch } from '../../../mapStateMapDispatch'
import withAppUserAuth from '../HOC/withAppUserAuth'
import TitleBar from '../UIcomponents/TitleBar'
import { Progress as ProgressBar } from 'reactstrap'
import TextFieldWithEcoStylesDark from '../UIcomponents/TextFieldWithEcoStylesDark'
import ButtonWithEcoStyles from '../UIcomponents/ButtonWithEcoStyles'
import { ToastContainer, toast } from 'react-toastify'
import { CSSTransition } from 'react-transition-group'
import EcoLabColors from '../Colors/EcoLabColors'
import { FormControlLabelCustom, GreenSwitch } from '../UIcomponents/CustomWithStyles'
import axios from 'axios'
import uuid from 'uuid'

const FileWidth = 1570
const FileHeight = 1140

class CreateCustomModule extends Component {

  state = {
    customModuleName: (
      this.props.CustomModuleSelectedForEdit && this.props.placement == 'edit-custom-module'
      ? this.props.CustomModuleSelectedForEdit.name
      : ''
    ),
    customModuleNameError: (
      this.props.CustomModuleSelectedForEdit && this.props.placement == 'edit-custom-module'
      ? false
      : true
    ),
    imageLoadedPercent: 0,
    imageUploaded: false,
    imageFilePath: '',
    correctImageDimensions: null,
    skipUpload: false,
    customModuleEnabled: (
      this.props.CustomModuleSelectedForEdit && this.props.placement == 'edit-custom-module'
      ? this.props.CustomModuleSelectedForEdit.enabled
      : true
    )
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
        if (width == FileWidth && height == FileHeight) {
          console.log('correct dimensions')
          return resolve(true)
        } else {
          console.log('wrong dimensions')
          toast.error(`Incorrect image dimensions. Please upload an image that is exactly ${FileWidth}px wide and ${FileHeight}px tall.`, {
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
    console.log('what')
    if (types.includes(file.type)) {
      console.log(`${file.type} is a valid file type`)
      return true
    } else {
      console.log('should work...')
      toast.error('Incorrect file type. Please upload a PNG file.', {
        autoClose: 2500
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
  }

  handleSubmit = () => {
    const { saveCustomModule, updateCustomModule, getCustomModules, CustomModuleSelectedForEdit, history } = this.props
    switch (this.props.placement) {
      case 'edit-custom-module': {
        let toastId = toast(<div>Updating custom module...</div>, { type: toast.TYPE.WARNING, autoClose: 5000 })
        updateCustomModule({
          id: CustomModuleSelectedForEdit._id,
          name: this.state.customModuleName,
          image_url: this.state.imageFilePath,
          enabled: this.state.customModuleEnabled
        }, () => {
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
                <ButtonWithEcoStyles
                  variant='contained'
                  textcolor={'#FFF'}
                  backgroundcolor={EcoLabColors.blue}
                  onClick={() => history.push('/')}>
                    Dashboard
                </ButtonWithEcoStyles>
                <ButtonWithEcoStyles
                  marginleft='10px'
                  textcolor={'#FFF'}
                  backgroundcolor={EcoLabColors.green}
                  variant='contained'
                  onClick={this.handleViewCustomModulesBtnClick}>
                    View Existing Custom Modules
                </ButtonWithEcoStyles>
                <br/>
                <br/>
              </>
            : null
          }
          {
            this.props.placement == 'edit-custom-module'
            ? <>
                <FormControlLabelCustom
                  label={this.state.customModuleEnabled ? 'enabled' : 'disabled'}
                  control={
                    <GreenSwitch
                      checked={this.state.customModuleEnabled}
                      onChange={() => this.setState({ customModuleEnabled: !this.state.customModuleEnabled })}
                      color='default'
                      />
                  }
                />
              </>
            : null
          }
          {
            this.props.placement != 'edit-custom-module'
            ? <>
                <div className='page-title'>Upload a Custom Module</div>
                <div className='section-title'>(Must be a .PNG file @ 1920x1200)</div>
                <br/>
              </>
            : <div className='page-title'>Edit {this.props.CustomModuleSelectedForEdit.name}</div>
          }
          <div className='section-title'>Custom Module Name</div>
          <TextFieldWithEcoStylesDark
            // label='module name'
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
                        <ButtonWithEcoStyles
                          border={true}
                          style={{ display: 'inline-block' }}
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
                </form>
              </>
          </CSSTransition>
          <br/>
          <br/>
          <CSSTransition
            appear
            unmountOnExit
            in={(this.props.CustomModuleSelectedForEdit && this.state.customModuleName != this.props.CustomModuleSelectedForEdit.name) || (this.props.CustomModuleSelectedForEdit && this.state.customModuleEnabled != this.props.CustomModuleSelectedForEdit.enabled) || this.state.imageUploaded}
            timeout={500}
            classNames='item'>
              <>
                <ButtonWithEcoStyles
                  textcolor='white'
                  variant='contained'
                  backgroundcolor={EcoLabColors.blue}
                  onClick={this.handleSubmit}>
                  Submit Custom Module
                </ButtonWithEcoStyles>
              </>
          </CSSTransition>
        </div>
      </>
    )
  }

}

export default connect(mapState, mapDispatch)(withAppUserAuth(withRouter(CreateCustomModule)))
