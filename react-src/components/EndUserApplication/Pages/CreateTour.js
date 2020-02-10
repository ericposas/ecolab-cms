import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { mapState, mapDispatch } from '../../../mapStateMapDispatch'
import withAppUserAuth from '../../HOC/withAppUserAuth'
import TitleBar from '../../UIcomponents/TitleBar'
import axios from 'axios'

class CreateTour extends Component {

  // componentDidMount() { //add auth }

  render() {
    return (
      <>
        
      </>
    )
  }

}

export default connect(mapState, mapDispatch)(withRouter(CreateTour))
