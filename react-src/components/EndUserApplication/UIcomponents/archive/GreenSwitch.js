import React, { Component } from 'react'
import { Switch, FormControlLabel } from '@material-ui/core'
import EcoLabColors from '../Colors/EcoLabColors'
import { green } from '@material-ui/core/colors'
import { withStyles } from '@material-ui/core/styles'

class GreenSwitch extends Component {

  render() {
    const greenValue = 500
    const GSwitch = withStyles({
      switchBase: {
        color: '#dfdfdf',
        '&checked': {
          color: EcoLabColors.green
        },
        '&$checked + $track': {
          backgroundColor: green[greenValue]
        }
      },
      checked: {
        color: EcoLabColors.green
      },
      track: {}
    })(Switch)
    const FormControlLabelCustom = withStyles({
      label: {
        fontFamily: 'interstateregular_comp'
      }
    })(FormControlLabel)

    console.log(
      this.props.handleonchange
    );

    return (
      <FormControlLabel
        label={this.props.enabledvalue == 'true' ? 'enabled' : 'disabled'}
        control={
          <GSwitch
            checked={this.props.enabledvalue == 'true' ? true : false}
            onChange={this.props.handleonchange}
            color='default'
            />
        }
      />
    )
  }

}

export default GreenSwitch
