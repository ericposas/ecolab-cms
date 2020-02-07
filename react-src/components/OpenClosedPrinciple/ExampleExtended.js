import React, { Component, Fragment } from 'react'
import Button from '@material-ui/core/Button'
import withExampleHOC from './withExampleHOC'
import Example from './Example'

class ExampleExtended extends Example {

  doTheThingExtended = () => {
    this.doTheThing(' from the first <Example> component. I am <ExampleExtended> component.')
  }

  logSomeProp = () => console.log(`The value of someProp is: ${this.props.someProp}`)

  render() {
    return (
      <>
        <div className='padding-div-20'>
          {this.renderContent()}
          <br/>
          <Button onClick={this.doTheThingExtended} variant='contained' color='default'>Click me</Button>
          <br/>
          <br/>
          <Button onClick={this.logSomeProp} variant='contained' color='secondary'>Log prop value</Button>
          <br/>
          <br/>
          <Button onClick={this.props.serverTask} variant='contained' color='primary'>Server Task</Button>
        </div>
      </>
    )
  }

}

export default withExampleHOC(ExampleExtended)
