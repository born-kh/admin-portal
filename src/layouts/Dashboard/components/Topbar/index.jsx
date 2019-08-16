import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames';
import compose from 'recompose/compose';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import { IconButton, Toolbar, Typography } from '@material-ui/core';
import {
  Menu as MenuIcon,
  Close as CloseIcon,
  Input as InputIcon
} from '@material-ui/icons';

import styles from './styles';
import { logout } from 'actions/authActions';
import { connect } from 'react-redux';

class Topbar extends Component {
  handleSignOut = () => {
    const { history } = this.props;
    localStorage.setItem('isAuthenticated', false);
    localStorage.removeItem('profile');
    localStorage.removeItem('session');
    this.props.onLogout();
    history.push('/login');
  };
  render() {
    const {
      classes,
      className,
      title,
      isSidebarOpen,
      onToggleSidebar
    } = this.props;
    const rootClassName = classNames(classes.root, className);

    return (
      <Fragment>
        <div className={rootClassName}>
          <Toolbar className={classes.toolbar}>
            <IconButton
              className={classes.menuButton}
              onClick={onToggleSidebar}
              variant="text">
              {isSidebarOpen ? <CloseIcon /> : <MenuIcon />}
            </IconButton>
            <Typography className={classes.title} variant="h4">
              {title}
            </Typography>
            <IconButton
              className={classes.notificationsButton}
              onClick={this.handleShowNotifications}
            />
            <IconButton
              className={classes.signOutButton}
              onClick={this.handleSignOut}>
              <InputIcon />
            </IconButton>
          </Toolbar>
        </div>
      </Fragment>
    );
  }
}

Topbar.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  isSidebarOpen: PropTypes.bool,
  onToggleSidebar: PropTypes.func,
  title: PropTypes.string
};

Topbar.defaultProps = {
  onToggleSidebar: () => {}
};

const mapDispatchToProps = dispatch => {
  return { onLogout: () => dispatch(logout()) };
};

export default compose(
  withRouter,
  withStyles(styles)
)(
  connect(
    null,
    mapDispatchToProps
  )(Topbar)
);
