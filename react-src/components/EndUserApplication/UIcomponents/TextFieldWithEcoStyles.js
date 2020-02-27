import React from 'react'
import { withStyles, TextField } from '@material-ui/core'

const styles = {
  root: {
    color: 'white',
    borderRadius: 0,
    borderColor: 'white !important',
    fontFamily: 'interstateregular_comp',
    '& input::placeholder': {
      fontFamily: 'interstateregular_comp'
    },
    '& label.Mui-focused': {
      color: 'white',
      fontFamily: 'interstateregular_comp',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'white',
      fontFamily: 'interstateregular_comp',
    },
    '&.MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'white',
        fontFamily: 'interstateregular_comp',
      },
      '&:hover fieldset': {
        borderColor: 'white',
        fontFamily: 'interstateregular_comp',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'white',
        fontFamily: 'interstateregular_comp',
      }
    },
  }
}

const ClassNames = (props) => (
  <TextField
    { ...props }
    style={{
      marginLeft: props.marginleft ? props.marginleft : null,
      marginRight: props.marginright ? props.marginright : null,
    }}
    className={props.classes.root}
    InputProps={{
      className: props.classes.root
    }}
  />
)

export default withStyles(styles)(ClassNames)
