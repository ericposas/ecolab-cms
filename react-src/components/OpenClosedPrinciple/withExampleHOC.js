import React, { Component, Fragment } from 'react'
import axios from 'axios'

const withExampleHOC = (ComponentToAddFunctionalityTo) => {

  class ExampleHOC extends Component {

    doSomeServerTask = () => {
      axios.post('/companies/view')
        .then(data => {
          console.log(data)
        })
        .catch(err => console.log(err))
    }

    render() {
      return (
        <ComponentToAddFunctionalityTo
          serverTask={this.doSomeServerTask}
          {...this.props}
        />
      )
    }

  }

  return ExampleHOC

}

export default withExampleHOC
