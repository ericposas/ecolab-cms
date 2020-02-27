import React from 'react'
import { Button, withStyles } from '@material-ui/core'
import EcoLabColors from '../Colors/EcoLabColors'

const styles = {
  root: {
    borderRadius: 0,
    fontSize: '1.25rem',
    fontFamily: 'interstateregular_comp',
  }
}

const ClassNames = props => {
  console.log({...props})
  return (
    <Button
      { ...props }
      className={props.classes.root}
      style={{
        boxShadow: 'none',
        top: props.top ? props.top : 0,
        left: props.left ? props.left : 0,
        right: props.right ? props.right : 0,
        display: props.display ? props.display : 'inline-block',
        position: props.position ? props.position : 'static',
        backgroundColor: props.backgroundcolor ? props.backgroundcolor : '#FFF',
        color: props.textcolor ? props.textcolor : EcoLabColors.grey,
        marginRight: props.marginright ? props.marginright : null,
        marginLeft: props.marginleft ? props.marginleft : null,
        border: props.border == 'true' ? `1px solid ${EcoLabColors.grey}` : 'none'
      }}
      >
      {props.children}
    </Button>
  )
}

export default withStyles(styles)(ClassNames)
