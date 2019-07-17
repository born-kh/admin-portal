import React from 'react'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';

const styles = {
  root: {
    marginLeft: 5
  }
}

const SpinnerAdornment = withStyles(styles)(props => (
  <CircularProgress
    className={props.classes.spinner}
    size={20}
  />
))

const AdornedButton = (props) => {
  const {
    children,
    loading,
    ...rest
  } = props
  return (
    <Button {...rest}>
      {children}
      {loading && <SpinnerAdornment {...rest} />}
    </Button>
  )
}

AdornedButton.defaultProps = {
    loading: false,
    };
  
AdornedButton.propTypes = {
    classes: PropTypes.object.isRequired,
    loading: PropTypes.bool,
  };
  
  export default withStyles(styles)(AdornedButton);

