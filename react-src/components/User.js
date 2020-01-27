import React, { Component } from 'react'

class User extends Component {

  render() {
    const { count, deleteUser, user } = this.props
    return (
      <>
        <div
          className={'user-component-container'}
          style={{
            backgroundColor: count % 2 == 0 && count != 0 ? '#ccc' : '#ededed'
          }}>
          {/*
            <div
              className={'user-component-delete-button'}
              onClick={deleteUser}>
                &#10060;
            </div>
          */}
          <input className={'user-component-checkbox'} type='checkbox' value=''/>
          <div
            className={'user-component-details-container'}>
            <div className={'user-component-name'}>{user.name}</div>
            <div className={'user-component-email'}>{user.email}</div>
          </div>
        </div>
        <br/>
      </>
    )
  }

}

export default User
