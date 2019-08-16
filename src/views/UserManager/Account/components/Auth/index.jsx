import React, { Component, Fragment } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import axios from 'axios';
import { withStyles } from '@material-ui/core';
import { Button, TextField, Typography } from '@material-ui/core';

import {
  Portlet,
  PortletHeader,
  PortletLabel,
  PortletContent,
  PortletFooter
} from 'components';
import styles from './styles';
import generator from 'generate-password';
import AdornedButton from 'components/AdornedButton/AdornedButton';
import { USER_MANAGER_IP } from 'constants/ActionType';
class Auth extends Component {
  state = {
    password: '',
    state: false
  };
  handleChangePassword = event => {
    this.setState({ password: event.target.value });
  };

  handleGeneratePassword = event => {
    this.setState({
      password: generator.generate({
        length: 10,
        numbers: true
      })
    });
  };

  handleSetPassword = event => {
    var headers = {
      'Content-Type': 'application/json',
      Authorization: this.props.sessionID
    };
    this.setState({ loading: true });
    axios
      .post(
        USER_MANAGER_IP + '/set/password',
        { password: this.state.password, accountID: this.props.accountID },
        { headers: headers }
      )
      .then(
        result => {
          this.setState({ loading: false });
          if (result.status === 200) {
          }
        },
        error => {
          this.setState({ loading: false });
          console.log(error);
        }
      );
  };

  renderAuth() {
    const { classes, auth } = this.props;
    return (
      <Fragment>
        {auth.map(row => (
          <div className={classes.productDetails}>
            <Typography className={classes.productTitle} variant="subtitle1">
              Has password: {row.hasPassword}
            </Typography>

            <Typography
              className={classes.productTimestamp}
              variant="subtitle2">
              Type: {row.passwordType}
            </Typography>

            <Typography
              className={classes.productTimestamp}
              variant="subtitle2">
              Status: {row.status}
            </Typography>
          </div>
        ))}
      </Fragment>
    );
  }

  render() {
    const { classes, className, ...rest } = this.props;

    const rootClassName = classNames(classes.root, className);

    return (
      <Portlet {...rest} className={rootClassName}>
        <PortletHeader noDivider>
          <PortletLabel title="Auth" />
        </PortletHeader>
        <PortletContent className={classes.portletContent}>
          {this.renderAuth()}
          <TextField
            className={classes.textField}
            label="Password"
            name="password"
            onChange={this.handleChangePassword}
            type="text"
            value={this.state.password}
            variant="outlined"
            margin="dense"
          />
        </PortletContent>
        <PortletFooter>
          <AdornedButton
            loading={this.state.loading}
            className={classes.uploadButton}
            color="primary"
            variant="text"
            onClick={this.handleSetPassword}>
            Change Password
          </AdornedButton>

          <Button variant="text" onClick={this.handleGeneratePassword}>
            Generate Password
          </Button>
        </PortletFooter>
      </Portlet>
    );
  }
}

Auth.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Auth);
