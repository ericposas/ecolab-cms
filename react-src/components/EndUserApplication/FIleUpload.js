import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { mapState, mapDispatch } from '../../mapStateMapDispatch'
import withAppUserAuth from '../HOC/withAppUserAuth'
import TitleBar from '../UIcomponents/TitleBar'
import { Progress as ProgressBar } from 'reactstrap'
import axios from 'axios'

class FileUpload extends Component {

  state = {
    selectedFile: null,
    loaded: 0
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
        this.loadedResetTimer = setTimeout(() => {
          this.setState({
            loaded: 0
          })
        }, 2000)
      })
      .catch(err => console.log(err))
  }

  render() {
    const grnblue = '#00ffae'
    return (
      <>
        <TitleBar title='Eco Lab Application' color={grnblue}/>
        <form method='post' encType='multipart/form-data'>
          <input type='file' onChange={this.fileSelectHandler}/>
        </form>
        <ProgressBar max='100' color='success' value={this.state.loaded}>{Math.round(this.state.loaded, 2)}%</ProgressBar>
        <button onClick={this.uploadHandler}>Upload {this.state.selectedFile ? this.state.selectedFile.name : null}</button>
      </>
    )
  }

}

export default FileUpload
