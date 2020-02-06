import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { mapState, mapDispatch } from '../../mapStateMapDispatch'
import withAppUserAuth from '../HOC/withAppUserAuth'
import TitleBar from '../UIcomponents/TitleBar'
import { Progress as ProgressBar } from 'reactstrap'
import TextField from '@material-ui/core/TextField'
import axios from 'axios'

class CreateCompany extends Component {

  state = {
    companyName: '',
    companyNameValid: true
  }

  handleChange = e => {
    this.setState({
      companyName: e.target.value,
      companyNameValid: e.target.value == '' ? true : false,
    })
    console.log(this.state.companyNameValid)
  }

  render() {
    const grnblue = '#00ffae'
    return (
      <>
        <TitleBar title='Eco Lab Application' color={grnblue}/>
        <TextField
          error={this.state.companyNameValid}
          variant='outlined'
          label='Company name'
          onChange={this.handleChange}
          value={this.state.companyName}/>
      </>
    )
  }

}

export default CreateCompany
