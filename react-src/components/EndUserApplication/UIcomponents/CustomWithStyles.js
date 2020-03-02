import React from 'react'
import { green } from '@material-ui/core/colors'
import { withStyles } from '@material-ui/core/styles'
import { FormControlLabel, Switch } from '@material-ui/core'
import EcoLabColors from '../Colors/EcoLabColors'

const greenValue = 500

export const GreenSwitch = withStyles({
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

export const FormControlLabelCustom = withStyles({
  label: {
    fontFamily: 'interstateregular_comp'
  }
})(FormControlLabel)
