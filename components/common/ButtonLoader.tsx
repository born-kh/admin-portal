import React from 'react'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import { withStyles } from '@material-ui/core'
const styles = {
  root: {
    marginLeft: 5,
  },
}
const SpinnerAdornment = withStyles(styles)((props: any) => (
  <CircularProgress className={props.classes.root} size={20} color={'inherit'} />
))
function ButtonLoader(props: any) {
  const { children, loading, ...rest } = props
  return (
    <Button {...rest}>
      {children}
      {loading && <SpinnerAdornment {...rest} />}
    </Button>
  )
}

export default ButtonLoader
