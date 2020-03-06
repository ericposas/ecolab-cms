import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { mapState, mapDispatch } from '../../../mapStateMapDispatch'
import withAppUserAuth from '../HOC/withAppUserAuth'
import TitleBar from '../UIcomponents/TitleBar'
import { Button, TextField } from '@material-ui/core'
import ButtonWithEcoStyles from '../UIcomponents/ButtonWithEcoStyles'
import TextFieldWithEcoStylesDark from '../UIcomponents/TextFieldWithEcoStylesDark'
import EcoLabColors from '../Colors/EcoLabColors'
import { ToastContainer, toast } from 'react-toastify'
import { FormControlLabelCustom, GreenSwitch } from '../UIcomponents/CustomWithStyles'
import validUrl from 'valid-url'
import axios from 'axios'

class CreateWebModule extends Component {

  state = {
    webModuleEnabled: (
      (this.props.WebModuleSelectedForEdit && this.props.placement == 'edit-webmodule')
      ? this.props.WebModuleSelectedForEdit.enabled
      : true
    ),
    nameField: (
      (this.props.WebModuleSelectedForEdit && this.props.placement == 'edit-webmodule')
      ? this.props.WebModuleSelectedForEdit.name
      : ''
    ),
    urlField: (
      (this.props.WebModuleSelectedForEdit && this.props.placement == 'edit-webmodule')
      ? this.props.WebModuleSelectedForEdit.browser_url
      : ''
    )
  }

  componentDidMount() {
    const { checkAppUserAuth, setAppUserData, AppUserData, history } = this.props
    checkAppUserAuth(data => {
      console.log(data.data)
      const { auth, fullaccess, peer, name, email } = data.data
      if (!auth) history.push('/login')
      else {
        if (!AppUserData.auth) setAppUserData(auth, fullaccess, peer, name, email)
        if (this.props.placement != 'edit-webmodule') this.setState({ urlField: '' })
      }
    })
  }

  handleNameInput = e => {
    this.setState({
      ...this.state,
      nameField: e.target.value
    })
  }

  handleUrlInput = e => {
    this.setState({
      ...this.state,
      urlField: e.target.value
    })
  }

  handleSubmit = () => {
    const { saveWebModule, updateWebModule, WebModuleSelectedForEdit, getWebModules, history } = this.props
    if (validUrl.isUri(this.state.urlField)) {
      if (this.props.placement == 'edit-webmodule') {
        updateWebModule({
          id: WebModuleSelectedForEdit._id,
          name: this.state.nameField.trim(),
          browser_url: this.state.urlField.trim(),
          enabled: this.state.webModuleEnabled
        }, () => {
          this.props.displayEditModal(false)
          getWebModules()
        })
      } else {
        saveWebModule({
          name: this.state.nameField.trim(),
          browser_url: this.state.urlField.trim(),
        }, () => history.push('/view-web-modules'))
      }
    } else {
      toast.error('invalid URL - please include full path, e.g. (http://www.google.com)', { autoClose: 3500 })
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
            <TitleBar title={'Eco Lab Application'}/>
          : null
        }
        <div className='padding-div-20'>
          {
            this.props.placement != 'edit-webmodule'
            ?
              <>
                <ButtonWithEcoStyles
                  style={{ marginRight: '8px' }}
                  variant='contained'
                  textcolor='white'
                  backgroundcolor={EcoLabColors.blue}
                  onClick={() => history.push('/')}>
                    Dashboard
                </ButtonWithEcoStyles>
                <ButtonWithEcoStyles
                  marginleft='10px'
                  variant='contained'
                  textcolor='white'
                  backgroundcolor={EcoLabColors.green}
                  onClick={() => history.push('/view-web-modules')}>
                    View Existing Web Modules
                </ButtonWithEcoStyles>
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
          {
            this.props.placement == 'edit-webmodule'
            ? <>
                <FormControlLabelCustom
                  label={this.state.webModuleEnabled ? 'enabled' : 'disabled'}
                  control={
                    <GreenSwitch
                      checked={this.state.webModuleEnabled}
                      onChange={() => this.setState({ webModuleEnabled: !this.state.webModuleEnabled })}
                      color='default'
                      />
                  }
                />
              </>
            : null
          }
          <br/>
          <div className='section-title'>Name:</div>
          <TextFieldWithEcoStylesDark
            variant='outlined'
            style={{ width: this.props.placement == 'edit-webmodule' ? '90%' : '50%', borderRadius: '2px' }}
            onChange={this.handleNameInput}
            value={this.state.nameField}/>
          <br/>
          <br/>
          <div className='section-title'>URL:</div>
          <TextFieldWithEcoStylesDark
            variant='outlined'
            style={{ width: this.props.placement == 'edit-webmodule' ? '90%' : '50%', borderRadius: '2px' }}
            onChange={this.handleUrlInput}
            value={this.state.urlField}/>
          <br/>
          <br/>
          {
            this.state.urlField != '' && this.state.nameField
            ?
              this.props.placement == 'edit-webmodule'
              ? <ButtonWithEcoStyles textcolor='white' backgroundcolor={EcoLabColors.blue} onClick={this.handleSubmit} variant='contained' color='primary'>Update Web Module</ButtonWithEcoStyles>
              : <ButtonWithEcoStyles textcolor='white' backgroundcolor={EcoLabColors.blue} onClick={this.handleSubmit} variant='contained' color='primary'>Save Web Module</ButtonWithEcoStyles>
            : null
          }
        </div>
      </>
    )
  }

}

export default connect(mapState, mapDispatch)(withRouter(withAppUserAuth(CreateWebModule)))
