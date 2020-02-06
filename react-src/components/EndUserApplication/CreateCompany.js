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
    customerNameFields: [],

  }

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
                <br/>
                <br/>
              </>
            : null
          }
          {
            this.state.companyLogoUploaded
            ? <>
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
              </>
            : null
          }

        </div>
      </>
    )
  }

}

export default CreateCompany
