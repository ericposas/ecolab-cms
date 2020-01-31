import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import withAuthCheck from '../HOC/withAuthCheck'
import { mapState, mapDispatch } from '../../mapStateMapDispatch'
import axios from 'axios'

class TitleBar extends Component {

  render () {
    return (
      <>
        <div
          className={'ui-title-bar'}
          style={{
            backgroundColor: this.props.color || 'lightblue'
          }}>
          {this.props.title}
        </div>
      </>
    )
  }

}

export default TitleBar
