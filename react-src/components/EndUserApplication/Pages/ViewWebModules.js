import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { mapState, mapDispatch } from '../../../mapStateMapDispatch'
import withAppUserAuth from '../HOC/withAppUserAuth'
import TitleBar from '../../CMS/UIcomponents/TitleBar'
import axios from 'axios'

class ViewWebModules extends Component {

  componentDidMount() {
    const { getWebModules, checkAppUserAuth, setAppUserData, AppUserData, history } = this.props
    checkAppUserAuth(data => {
      console.log(data.data)
      const { auth, fullaccess, peer, name, email } = data.data
      if (!auth) history.push('/login')
      else {
        if (!AppUserData.auth) setAppUserData(auth, fullaccess, peer, name, email)
        getWebModules()
      }
    })
  }

  handleDelete = module => {
    const { deleteWebModule, getWebModules } = this.props
    console.log('delete ' + module.browser_url)
    deleteWebModule(module._id, getWebModules)
  }

  render() {
    const grnblue = '#00ffae'
    const { WebModules, DeletingWebModule, WebModuleDeleted } = this.props
    return (
      <>
        <TitleBar title={'Eco Lab Application'} color={grnblue}/>
        {
          WebModules
          ?
            WebModules.map(module => (
              <Fragment key={module._id}>
                <div className='web-module-in-list'>
                  <div
                    className='x-symbol web-module-x-btn'
                    onClick={() => this.handleDelete(module)}>&#10005;</div>
                  {module.browser_url}
                </div>
              </Fragment>
            ))
          : null
        }
        {
          DeletingWebModule
          ? <div>Deleting web module...</div>
          : null
        }
        {
          WebModuleDeleted
          ? <div>Web module deleted!</div>
          : null
        }
      </>
    )
  }

}

export default connect(mapState, mapDispatch)(withRouter(withAppUserAuth(ViewWebModules)))
