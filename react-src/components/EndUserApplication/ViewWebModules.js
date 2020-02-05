import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { mapState, mapDispatch } from '../../mapStateMapDispatch'
import withAppUserAuth from '../HOC/withAppUserAuth'
import TitleBar from '../UIcomponents/TitleBar'
import axios from 'axios'

class ViewWebModules extends Component {

  componentDidMount() {
    const { getWebModules } = this.props
    getWebModules()
  }

  render() {
    const { WebModules } = this.props
    return (
      <>
        {
          WebModules
          ?
            WebModules.map(module => (
              <Fragment key={module._id}>
                <div className='web-module-in-list'>
                  {module.browser_url}
                </div>
              </Fragment>
            ))
          : null
        }
      </>
    )
  }

}

export default connect(mapState, mapDispatch)(ViewWebModules)
