import React, { Component } from 'react';

import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core';
import { Avatar, Typography } from '@material-ui/core';
import userPhoto from "assets/images/user.png"
import {
  Portlet, PortletContent, PortletHeader,
  PortletLabel,
} from 'components';
import styles from './styles';

class AccountProfile extends Component {
  render() {
    const { classes, className, ...rest } = this.props;

    const rootClassName = classNames(classes.root, className);

    return (
      <Portlet
        {...rest}
        className={rootClassName}
      >
        <PortletHeader>
          <PortletLabel
            subtitle="The information user"
            title="Profile"
          />
        </PortletHeader>
        <PortletContent>
          <div className={classes.details}>
            <div className={classes.info}>
              <Typography variant="h2">{this.props.user.firstName} {this.props.user.lastName}</Typography>
              <Typography
                className={classes.locationText}
                variant="body1"
              >
                User Name: {this.props.user.username}
              </Typography>
              <Typography
                className={classes.dateText}
                variant="body1"
              >
                Account ID: {this.props.user.accountID}
              </Typography>
            </div>
            <Avatar
              className={classes.avatar}
              src={this.props.user.avatar !== undefined ? `https://wssdev.nexustls.com/files/file/${this.props.user.avatar}/medium` : userPhoto}
            />
          </div>

        </PortletContent>

      </Portlet>
    );
  }
}

AccountProfile.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AccountProfile);
