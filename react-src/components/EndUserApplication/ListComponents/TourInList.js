import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { mapState, mapDispatch } from '../../../mapStateMapDispatch'

class TourInList extends Component {

  handleShowDeleteModal = id => {
    this.props.displayDeleteModal(true)
    this.props.setTourToDelete(id)
  }

  render() {
    const { tour } = this.props
    return (
      <div className='tour-in-list'>
        <div
          className='tour-in-list-x-symbol'
          onClick={() => this.handleShowDeleteModal(tour._id)}>&times;</div>
        <div className='tour-in-list-title'>{tour.name}</div>
        {/*<img className='tour-in-list-thumbnail' src={}/>*/}
      </div>
    )
  }

}

export default connect(mapState, mapDispatch)(TourInList)
