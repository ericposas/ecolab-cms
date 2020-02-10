import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { mapState, mapDispatch } from '../../../mapStateMapDispatch'
import withAppUserAuth from '../../HOC/withAppUserAuth'
import TitleBar from '../../UIcomponents/TitleBar'
import Button from '@material-ui/core/Button'
import { ToastContainer, toast } from 'react-toastify'
import axios from 'axios'

class CreateWebModule extends Component {

  state = {
    urlField: ''
  }

  componentDidMount() {
    const { checkAppUserAuth, setAppUserData, AppUserData, history } = this.props
    checkAppUserAuth(data => {
      console.log(data.data)
      const { auth, fullaccess, peer, name, email } = data.data
      if (!auth) history.push('/login')
      else {
        if (!AppUserData.auth) setAppUserData(auth, fullaccess, peer, name, email)
      }
    })
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
      this.setState({ urlField: '' })
  }

  render() {
    const grnblue = '#00ffae'
    const { saveWebModule, SavingWebModule, WebModuleSaved } = this.props
    return (
      <>
        <TitleBar title={'Eco Lab Application'} color={grnblue}/>
        <ToastContainer/>
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
            ? <Button onClick={this.handleSubmit} variant='contained' color='default'>Save Web Module</Button>
            : null
          }
          {
            SavingWebModule
            ? <div style={{display:'none'}}>
                {toast.success('saving web module..', {
                  autoClose: 500,
                  position: 'bottom-left'
                })}
              </div>
            : null
          }
          {
            WebModuleSaved
            ? <div style={{display:'none'}}>
                {toast.success('web module saved!', {
                  autoClose: 2500,
                  position: 'bottom-left'
                })}
              </div>
            : null
          }
        </div>
      </>
    )
  }

}

export default connect(mapState, mapDispatch)(withRouter(withAppUserAuth(CreateWebModule)))
