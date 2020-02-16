import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { mapState, mapDispatch } from '../../../mapStateMapDispatch'

class CompanyInList extends Component {

  handleShowDeleteModal = id => {
    this.props.displayDeleteModal(true)
    this.props.setCompanyToDelete(id)
  }

  handleOnSelect = id => {
    const { getOneCompany, displayEditModal } = this.props
    getOneCompany(id, () => displayEditModal(true))
  }

  render() {
    const { company } = this.props
    return (
      <div className='company-in-list'>
        <div
          className='company-in-list-x-symbol'
          onClick={() => this.handleShowDeleteModal(company._id)}>&times;</div>
        <div className='company-in-list-title'>{company.name}</div>
        <img className='company-in-list-edit-icon' src={'./img/pencil.svg'}/>
        <div className='company-in-list-customer-names'>
          <ul>
            {
              company.customer_names.map(name => (
                <li key={`${company}-${name}`}>{name}</li>
              ))
            }
          </ul>
        </div>
        <img className='company-in-list-thumbnail' src={company.logo_image_url}/>
        <div className='company-in-list-backing' onClick={() => this.handleOnSelect(company._id)}></div>
      </div>
    )
  }

}

export default connect(mapState, mapDispatch)(CompanyInList)
