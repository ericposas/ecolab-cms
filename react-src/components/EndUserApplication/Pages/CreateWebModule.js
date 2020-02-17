import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { mapState, mapDispatch } from '../../../mapStateMapDispatch'
import withAppUserAuth from '../HOC/withAppUserAuth'
import TitleBar from '../UIcomponents/TitleBar'
import Button from '@material-ui/core/Button'
import { ToastContainer, toast } from 'react-toastify'
import axios from 'axios'

class CreateWebModule extends Component {

  state = {
    urlField: this.props.WebModuleSelectedForEdit ? this.props.WebModuleSelectedForEdit.browser_url : ''
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
    const { saveWebModule, updateWebModule, WebModuleSelectedForEdit, getWebModules, history } = this.props
    // do url validation here..
    // console.log(this.props.placement)
    if (this.props.placement == 'edit-webmodule') {
      updateWebModule({ id: WebModuleSelectedForEdit._id, browser_url: this.state.urlField }, () => {
        this.props.displayEditModal(false)
        getWebModules()
      })
      // this.setState({ urlField: '' })
    } else {
      saveWebModule(this.state.urlField, () => history.push('/view-web-modules'))
    }
  }

  render() {
    const grnblue = '#00ffae'
    const { saveWebModule, SavingWebModule, WebModuleSaved, history } = this.props
    return (
      <>
        <ToastContainer/>
        {
          this.props.placement != 'edit-webmodule'
          ?
            <TitleBar title={'Eco Lab Application'} color={grnblue}/>
          : null
        }
        <div className='padding-div-20'>
          {
            this.props.placement != 'edit-webmodule'
            ?
              <>
                <Button
                  style={{ marginRight: '8px' }}
                  variant='contained'
                  color='primary'
                  onClick={() => history.push('/')}>
                    Dashboard
                </Button>
                <Button
                  variant='contained'
                  color='default'
                  onClick={() => history.push('/view-web-modules')}>
                    View Existing Web Modules
                </Button>
                <br/>
                <br/>
              </>
            : null
          }
          <br/>
          {
            this.props.placement != 'edit-webmodule'
            ? <div className='page-title'>Create a Web Module</div>
            : <div className='page-title'>Edit {this.props.WebModuleSelectedForEdit.browser_url}</div>
          }
        {/*<div className='center-float' style={{ width: '80%', height: '400px', borderRadius: '2px' }}>*/}
          <br/>
          <br/>
          <div>Enter URL:</div>
          <input
            type='text'
            style={{ width: this.props.placement == 'edit-webmodule' ? '90%' : '50%', borderRadius: '2px' }}
            onChange={this.handleInput}
            value={this.state.urlField}/>
          <br/>
          <br/>
          {
            this.state.urlField != ''
            ?
              this.props.placement == 'edit-webmodule'
              ? <Button onClick={this.handleSubmit} variant='contained' color='primary'>Update Web Module</Button>
              : <Button onClick={this.handleSubmit} variant='contained' color='primary'>Save Web Module</Button>
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
          {/*
            WebModuleSaved
            ? <div style={{display:'none'}}>
                {toast.success('web module saved!', {
                  autoClose: 2500,
                  position: 'bottom-left'
                })}
              </div>
            : null
          */}
        </div>
      </>
    )
  }

}

export default connect(mapState, mapDispatch)(withRouter(withAppUserAuth(CreateWebModule)))
