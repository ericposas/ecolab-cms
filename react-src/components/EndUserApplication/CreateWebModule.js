import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { mapState, mapDispatch } from '../../mapStateMapDispatch'
import withAppUserAuth from '../HOC/withAppUserAuth'
import TitleBar from '../UIcomponents/TitleBar'
import axios from 'axios'

class CreateWebModule extends Component {

  state = {
    urlField: ''
  }

  componentWillUnmount() {
    if (window.webModuleSavedTimer) clearTimeout(window.webModuleSavedTimer)

  }

  handleInput = e => {
    this.setState({
      ...this.state,
      urlField: e.target.value
    })
  }

  handleSubmit = () => {
    const { saveWebModule } = this.props
    // do url validation here..
      saveWebModule(this.state.urlField)

  }

  render() {
    const grnblue = '#00ffae'
    const { saveWebModule, SavingWebModule, WebModuleSaved } = this.props
    return (
      <>
        <TitleBar title={'Eco Lab Application'} color={grnblue}/>
        <div className='center-float' style={{ width: '80%', height: '400px', borderRadius: '2px' }}>
          <div style={{ textAlign: 'center', lineHeight: '400px' }}>Enter your URL to save as a module:</div>
          <input
            type='text'
            className='center-float'
            style={{ top: '60px', width: '75%', borderRadius: '2px' }}
            onChange={this.handleInput}
            value={this.state.urlField}/>
          {
            this.state.urlField != ''
            ? <button onClick={this.handleSubmit}>Save Web Module</button>
            : null
          }
          {
            SavingWebModule
            ? <div>Saving web module...</div>
            : null
          }
          {
            WebModuleSaved
            ? <div>Web module saved!</div>
            : null
          }
        </div>
      </>
    )
  }

}

export default connect(mapState, mapDispatch)(CreateWebModule)
