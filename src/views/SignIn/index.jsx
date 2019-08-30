import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import validate from 'validate.js';
import _ from 'underscore';
import { withStyles } from '@material-ui/core';
import {
  Grid,
  Button,
  CircularProgress,
  TextField,
  Typography
} from '@material-ui/core';

import { connect } from 'react-redux';
import styles from './styles';
import schema from './schema';
import { login } from 'actions/authActions';
import { SESSION_DATA } from 'constants/localStorage';

class SignIn extends Component {
  state = {
    values: {
      username: '',
      password: ''
    },
    touched: {
      username: false,
      password: false
    },
    errors: {
      username: null,
      password: null
    },
    isValid: false,
    isLoading: false,
    submitError: null
  };

  handleBack = () => {
    const { history } = this.props;

    history.goBack();
  };

  validateForm = _.debounce(() => {
    const { values } = this.state;

    const newState = { ...this.state };
    const errors = validate(values, schema);

    newState.errors = errors || {};
    newState.isValid = errors ? false : true;

    this.setState(newState);
  }, 300);

  handleFieldChange = (field, value) => {
    const newState = { ...this.state };

    newState.submitError = null;
    newState.touched[field] = true;
    newState.values[field] = value;

    this.setState(newState, this.validateForm);
  };

  handleSignIn = () => {
    const { values } = this.state;
    let params = {
      username: values.username,
      password: values.password
    };
    this.props.handleLogin(params);
  };

  render() {
    const { classes } = this.props;
    const { values, touched, errors, isValid } = this.state;

    const { pending, error, history } = this.props;
    let session_data = JSON.parse(localStorage.getItem(SESSION_DATA));
    if (session_data !== null) {
      history.push('/tracers');
    }

    const showUsernameError = touched.username && errors.username;
    const showPasswordError = touched.password && errors.password;
    return (
      <div className={classes.root}>
        <Grid className={classes.grid} container>
          <Grid className={classes.quoteWrapper} item lg={5}>
            <div className={classes.quote}>
              <div className={classes.quoteInner} />
            </div>
          </Grid>
          <Grid className={classes.content} item lg={7} xs={12}>
            <div className={classes.content}>
              <div className={classes.contentBody}>
                <form className={classes.form}>
                  <Typography className={classes.title} variant="h2">
                    Sign in
                  </Typography>

                  <div className={classes.fields}>
                    <TextField
                      className={classes.textField}
                      label="Username"
                      name="username"
                      onChange={event =>
                        this.handleFieldChange('username', event.target.value)
                      }
                      type="text"
                      value={values.username}
                      variant="outlined"
                    />
                    {showUsernameError && (
                      <Typography
                        className={classes.fieldError}
                        variant="body2">
                        {errors.username[0]}
                      </Typography>
                    )}
                    <TextField
                      className={classes.textField}
                      label="Password"
                      name="password"
                      onChange={event =>
                        this.handleFieldChange('password', event.target.value)
                      }
                      type="password"
                      value={values.password}
                      variant="outlined"
                    />
                    {showPasswordError && (
                      <Typography
                        className={classes.fieldError}
                        variant="body2">
                        {errors.password[0]}
                      </Typography>
                    )}
                  </div>
                  {error && (
                    <Typography className={classes.submitError} variant="body2">
                      {error}
                    </Typography>
                  )}
                  {pending ? (
                    <CircularProgress className={classes.progress} />
                  ) : (
                    <Button
                      className={classes.signInButton}
                      color="primary"
                      disabled={!isValid}
                      onClick={this.handleSignIn}
                      size="large"
                      variant="contained">
                      Login
                    </Button>
                  )}
                </form>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

SignIn.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  error: state.auth.error,
  profile_data: state.auth.profile_data,
  pending: state.auth.pending
});

const mapDispatchToProps = dispatch => {
  return {
    handleLogin: params => dispatch(login(params))
  };
};

export default compose(
  withRouter,
  withStyles(styles)
)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(SignIn)
);
