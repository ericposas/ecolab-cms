import React, { Component } from 'react'
import { FormControlLabel } from '@material-ui/core'

class FormControlLabelInterstateFont extends Component {

  render() {
    const FormControlLabelCustom = withStyles({
      label: {
        fontFamily: 'interstateregular_comp'
      }
    })(FormControlLabel)

    return (
      <FormControlLabel {...this.props}/>
    )
  }

}

export default FormControlLabelInterstateFont
