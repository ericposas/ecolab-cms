import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { mapState, mapDispatch } from '../../../mapStateMapDispatch'

class CompanyInList extends Component {

  handleDelete = id => {
    this.props.deleteCompany(id, () => this.props.getCompanies())
  }
  
  render() {
    const { company } = this.props
    return (
      <div className='company-in-list'>
        <div
          className='company-in-list-x-symbol'
          onClick={() => this.handleDelete(company._id)}>&times;</div>
        <div className='company-in-list-title'>{company.name}</div>
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
      </div>
    )
  }

}

export default connect(mapState, mapDispatch)(CompanyInList)
