import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { mapState, mapDispatch } from '../../../mapStateMapDispatch'
import withAppUserAuth from '../../HOC/withAppUserAuth'
import TitleBar from '../../UIcomponents/TitleBar'
import { Progress as ProgressBar } from 'reactstrap'
import { ToastContainer, toast } from 'react-toastify'
import Button from '@material-ui/core/Button'
import axios from 'axios'

class FileUpload extends Component {

  state = {
    selectedFile: null,
    loaded: 0
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

  fileSelectHandler = e => {
    this.setState({
      ...this.state,
      selectedFile: e.target.files[0],
      loaded: 0
    })
  }

  uploadHandler = e => {
    const formData = new FormData()
    formData.append('file', this.state.selectedFile)
    axios.post('/testupload', formData, { /* optional params */
        onUploadProgress: evt => {
          this.setState({
            loaded: (evt.loaded / evt.total * 100)
          })
        }
      })
      .then(data => {
        console.log(data)
        toast.success('upload success!')
        this.loadedResetTimer = setTimeout(() => {
          this.setState({
            loaded: 0
          })
        }, 2000)
      })
      .catch(err => {
        toast.error('upload error')
        console.log(err)
      })
  }

  render() {
    const grnblue = '#00ffae'
    return (
      <>
        <TitleBar title='Eco Lab Application' color={grnblue}/>
        <ToastContainer/>
        <form method='post' encType='multipart/form-data'>
          <Button
            variant='contained'
            component='label'>
            Select a File
            <input type='file' onChange={this.fileSelectHandler} style={{ display: 'none' }}/>
          </Button>
        </form>
        <ProgressBar max='100' color='success' value={this.state.loaded}>{Math.round(this.state.loaded, 2)}%</ProgressBar>
        <Button
          variant='contained'
          color='default'
          onClick={this.uploadHandler}>
            Upload {this.state.selectedFile ? this.state.selectedFile.name : null}
          </Button>
      </>
    )
  }

}

export default connect(mapState, mapDispatch)(withRouter(withAppUserAuth(FileUpload)))
