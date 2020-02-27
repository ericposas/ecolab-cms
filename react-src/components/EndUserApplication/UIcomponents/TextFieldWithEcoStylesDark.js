import React from 'react'
import { withStyles, TextField } from '@material-ui/core'

const styles = {
  root: {
    color: 'black',
    borderRadius: 0,
    borderColor: 'grey !important',
    fontFamily: 'interstateregular_comp',
    '& label.Mui-focused': {
      color: 'grey',
      fontFamily: 'interstateregular_comp',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'grey',
      fontFamily: 'interstateregular_comp',
    },
    '&.MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'grey',
        fontFamily: 'interstateregular_comp',
      },
      '&:hover fieldset': {
        borderColor: 'grey',
        fontFamily: 'interstateregular_comp',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'grey',
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
