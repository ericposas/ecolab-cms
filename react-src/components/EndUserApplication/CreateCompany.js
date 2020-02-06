import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { mapState, mapDispatch } from '../../mapStateMapDispatch'
import withAppUserAuth from '../HOC/withAppUserAuth'
import TitleBar from '../UIcomponents/TitleBar'
import { Progress as ProgressBar } from 'reactstrap'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { ToastContainer, toast } from 'react-toastify'
import axios from 'axios'
import uuid from 'uuid'

class CreateCompany extends Component {

  state = {
    companyName: '',
    companyNameError: true,
    companyLogoLoadedPercent: 0,
    companyLogoUploaded: false,
    // customerNameFieldsCount: 0,
    customerNameFields: {},

  }

  // componentDidMount() {
  //   this.setState({
  //     customerNameFields: {
  //       [uuid()]: ''
  //     }
  //   })
  // }

  componentWillUnmount() {
    if (this.loadedResetTimer) clearTimeout(this.loadedResetTimer)

  }

  handleCompanyNameChange = e => {
    this.setState({
      companyName: e.target.value,
      companyNameError: e.target.value == '' ? true : false,
    })
    console.log(this.state.companyNameError)
  }

  handleFileSelect = e => {
    let file = e.target.files[0]
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
        this.setState({ companyLogoUploaded: true })
        this.loadedResetTimer = setTimeout(() => {
          this.setState({ companyLogoLoadedPercent: 0 })
        }, 2000)
      })
      .catch(err => {
        toast.error('error occurred during upload.')
        console.log(err)
      })
  }

  addCustomerNameInputBox = id => {
    // console.log(Object.keys(this.state.customerNameFields).length-1)
    let _latestKey = uuid()
    this.setState({
      latestKey: _latestKey,
      // customerNameFieldsCount: this.state.customerNameFieldsCount += 1,
      customerNameFields: {
        ...this.state.customerNameFields,
        [_latestKey]: ''
      }
    })
  }

  removeCustomerNameInputBox = id => e => {
    let _customerNameFields = this.state.customerNameFields
    delete _customerNameFields[id]
    this.setState({
      customerNameFields: _customerNameFields
    })
  }

  handleCustomerNameFieldEntry = id => e => {
    console.log(id)
    this.setState({
      ...this.state,
      customerNameFields: {
        ...this.state.customerNameFields,
        [id]: e.target.value
      }
    })
    console.log(this.state)
  }

  render() {
    const grnblue = '#00ffae'
    return (
      <>
        <TitleBar title='Eco Lab Application' color={grnblue}/><br/>
        <ToastContainer/>
        <div className='padding-div-20'>
          <TextField
            error={this.state.companyNameError}
            variant='outlined'
            label='Company name'
            onChange={this.handleCompanyNameChange}
            value={this.state.companyName}/><br/><br/>
          {
            this.state.companyName && this.state.companyNameError == false
            ?
              <>
                <form method='post' encType='multipart/form-data'>
                  <Button
                    variant='contained'
                    component='label'>
                    Select a File
                    <input type='file' onChange={this.handleFileSelect} style={{ display: 'none' }}/>
                    </Button>
                    <ProgressBar max='100' color='success' value={this.state.companyLogoLoadedPercent}>{Math.round(this.state.companyLogoLoadedPercent, 2)}%</ProgressBar>
                </form>
              </>
            : null
          }
          {
            this.state.companyLogoUploaded
            ? <>
                <div onClick={this.addCustomerNameInputBox}>&#8330;</div>
                {
                  Object.keys(this.state.customerNameFields).map((field, idx) => {
                    // let _key = uuid()
                    // console.log(this.state.latestKey)
                    let _key = this.state.latestKey
                    return (
                      <Fragment key={_key}>
                        <input type='text' onChange={this.handleCustomerNameFieldEntry(_key)} value={this.state.customerNameFields[_key]}/>
                        <div className='x-symbol' onClick={this.removeCustomerNameInputBox(_key)}>&#10006;</div>
                      </Fragment>
                    )
                  })
                }
              </>
            : null
          }

        </div>
      </>
    )
  }

}

export default CreateCompany
