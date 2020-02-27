import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import withAuthCheck from '../HOC/withAuthCheck'
import { mapState, mapDispatch } from '../../../mapStateMapDispatch'
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
            transform: this.props.scale ? `scale(${this.props.scale})` : 'scale(1.0)',
            cursor: 'pointer',
            borderRadius: '10px',
            border: '1px solid #555',
            backgroundColor: this.props.toggleValue ? '#2b95ff' : '#777'
          }}>
          <div
            style={{
              width: '12px',
              height: '12px',
              borderRadius: '10px',
              border: '1px solid #555',
              backgroundColor: 'white',
              marginTop: '-1px',
              marginLeft: this.props.toggleValue ? '18px' : '-2px',
            }}>
          </div>
        </div>
      </>
    )
  }

}

export default Toggler
