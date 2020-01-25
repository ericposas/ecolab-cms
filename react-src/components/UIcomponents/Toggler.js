import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import withAuthCheck from '../HOC/withAuthCheck'
import { mapState, mapDispatch } from '../../mapStateMapDispatch'
import axios from 'axios'

class Toggler extends Component {

  render () {
    return (
      <>
        <div
          onClick={this.props.clickHandler}
          style={{
            width: '30px',
            height: '12px',
            cursor: 'pointer',
            borderRadius: '10px',
            backgroundColor: this.props.showAdminUsers ? 'lightblue' : 'red'
          }}>
          <div
            style={{
              width: '12px',
              height: '12px',
              borderRadius: '10px',
              backgroundColor: 'white',
              marginLeft: this.props.showAdminUsers ? '18px' : '0px',
            }}>
          </div>
        </div>
      </>
    )
  }

}

export default Toggler
