import React, { Component, Fragment } from 'react'

class Example extends Component {

  doTheThing = (extraMsg) => {
    console.log(`I am doing the thing${extraMsg ? extraMsg : null}`)
  }

  renderContent = () => (
    <div>
      I'm an Example of the Open/Closed principle
    </div>
  )

  render() {
    return (
      <>
        {this.renderContent()}
      </>
    )
  }

}

export default Example
