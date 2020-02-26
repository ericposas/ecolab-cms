import React from 'react'
import { withStyles, TextField } from '@material-ui/core'

const styles = {
  root: {
    color: 'black',
    borderColor: 'white !important',
    '& label.Mui-focused': {
      color: 'grey'
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'grey'
    },
    '&.MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'grey'
      },
      '&:hover fieldset': {
        borderColor: 'grey'
      },
      '&.Mui-focused fieldset': {
        borderColor: 'grey'
      }
    },
    borderRadius: 0,
    borderColor: 'grey !important'
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
