import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { mapState, mapDispatch } from '../../../mapStateMapDispatch'
import axios from 'axios'

class TourInList extends Component {

  state = {
    companyEnabled: false
  }

  componentDidMount() {
    axios.get(`/companies/${this.props.tour.company_id}`)
      .then(data => {
        let company = data.data.success
        this.setState({
          companyEnabled: company.enabled
        },
        () => console.log(this.state.companyEnabled))
      })
      .catch(err => console.log(err))
  }

  handleShowDeleteModal = id => {
    this.props.displayDeleteModal(true)
    this.props.setTourToDelete(id)
  }

  handleOnSelect = id => {
    const { getOneTour, displayEditModal } = this.props
    getOneTour(id, () => displayEditModal(true))
  }

  render() {
    const { tour } = this.props
    return (
      <div
        style={{
          opacity: tour.enabled && this.state.companyEnabled ? 1 : 0.35
        }}
        className='tour-in-list'>
        <div
          className='tour-in-list-x-symbol'
          onClick={() => this.handleShowDeleteModal(tour._id)}>&#10006;</div>
        <div className='tour-in-list-title'>{tour.name}</div>
        <div>Company: {tour.company_name}</div>
        <div>Division: {tour.division_name}</div>
        <div>Industry: {tour.industry_name}</div>
        <div>Segment: {tour.segment_name}</div>
        <img className='tour-in-list-edit-icon' src={'./img/pencil.svg'}/>
        <div
          className='tour-in-list-backing'
          onClick={() => this.handleOnSelect(tour._id)}></div>
      </div>
    )
  }

}

export default connect(mapState, mapDispatch)(TourInList)
