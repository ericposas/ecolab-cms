import React from 'react'
import { withStyles, TextField } from '@material-ui/core'

const styles = {
  root: {
    color: 'white',
    borderColor: 'white !important',
    '& label.Mui-focused': {
      color: 'white'
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'white'
    },
    '&.MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'white'
      },
      '&:hover fieldset': {
        borderColor: 'white'
      },
      '&.Mui-focused fieldset': {
        borderColor: 'white'
      }
    },
    borderRadius: 0,
    borderColor: 'white !important'
  }
}

const ClassNames = (props) => (
  <TextField
    { ...props }
    className={props.classes.root}
    InputProps={{
      className: props.classes.root
    }}
  />
)

export default withStyles(styles)(ClassNames)
