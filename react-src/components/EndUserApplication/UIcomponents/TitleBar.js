import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { mapState, mapDispatch } from '../../../mapStateMapDispatch'
import ButtonWithEcoStyles from './ButtonWithEcoStyles'
import EcoLabColors from '../Colors/EcoLabColors'
import { toast } from 'react-toastify'
import axios from 'axios'

class TitleBar extends Component {

  logout = () => {
    const { history, setAppUserData } = this.props
    let toastId = toast('logging you out...', { type: toast.TYPE.WARNING })
    axios.post('/logout')
      .then(data => {
        if (data.data == 'logged out') {
          toast.dismiss(toastId)
          toast.success('logged out', {
            autoClose: 500,
            onClose: () => window.location.reload()
          })
          setAppUserData(null, null, null, null, null)
        }
      })
      .catch(err => console.log(err))
  }

  render () {
    const { AppUserData } = this.props
    const logoutAreaStyle = {
      top: '-8px', right: 0, position: 'absolute',
    }
    return (
      <>
        <div style={{ padding: '4px', backgroundColor: EcoLabColors.blue }}>
          <div
            className={'ui-title-bar'}
            style={{
              color: this.props.textColor || '#fff',
              backgroundColor: this.props.color || EcoLabColors.blue
            }}>
            {/* this.props.title */}
          </div>
          <img
            style={{
              top: '8px',
              left: '8px',
              position: 'absolute'
            }}
            src='./img/Logo_Joint_ECL-NW_Reverse.png'
            width={340}
            />
          {
            AppUserData && AppUserData.auth
            ?
            <div style={logoutAreaStyle}>
              <div className='padding-div-20' style={{ display: 'inline-block', color: '#fff' }}>Welcome {AppUserData ? AppUserData.name : null}</div>
              <ButtonWithEcoStyles marginright='10px' onClick={this.logout} variant='contained' style={{ marginRight: '4px' }}>log out</ButtonWithEcoStyles>
            </div>
            : null
          }
        </div>
      </>
    )
  }

}

export default connect(mapState, mapDispatch)(withRouter(TitleBar))
