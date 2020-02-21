import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import withAuthCheck from '../HOC/withAuthCheck'
import { mapState, mapDispatch } from '../../../mapStateMapDispatch'
import { toast } from 'react-toastify'
import Button from '@material-ui/core/Button'
import axios from 'axios'

class TitleBar extends Component {

  logout = () => {
    const { history, setAdminData } = this.props
    let toastId = toast('logging you out...', { type: toast.TYPE.WARNING })
    axios.post('/logout')
      .then(data => {
        if (data.data == 'logged out') {
          toast.dismiss(toastId)
          toast.success('logged out', {
            autoClose: 500,
            onClose: () => {
              setAdminData(null, null, null, null, null)
              history.push('/admin')
            }
          })
        }
      })
      .catch(err => console.log(err))
  }

  render () {
    const { AdminData } = this.props
    const logoutAreaStyle = {
      top: 0, right: 0, position: 'absolute',
    }
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
        {
          AdminData && AdminData.auth
          ?
            <div style={logoutAreaStyle}>
              <div className='padding-div-20' style={{ display: 'inline-block', color: '#fff' }}>{AdminData.email}</div>
              <Button onClick={this.logout} variant='contained' style={{ marginRight: '4px' }}>log out</Button>
            </div>
          : null
        }
      </>
    )
  }

}

export default connect(mapState, mapDispatch)(withRouter(TitleBar))
