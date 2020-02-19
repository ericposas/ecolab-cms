import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import withAuthCheck from '../HOC/withAuthCheck'
import { mapState, mapDispatch } from '../../../mapStateMapDispatch'
import axios from 'axios'

class TitleBar extends Component {

  render () {
    return (
      <>
        <div
          className={'ui-title-bar'}
          style={{
            color: this.props.textColor || '#fff',
            backgroundColor: this.props.color || '#000'
          }}>
          {this.props.title}
        </div>
      </>
    )
  }

}

export default TitleBar
