import React, { Component, Fragment } from 'react';

import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import { Typography } from '@material-ui/core';

import {
  Portlet,
  PortletHeader,
  PortletLabel,
  PortletContent
} from 'components';

import styles from './styles';

class EmailList extends Component {
  renderEmails() {
    const { classes, emails } = this.props;

    if (emails.length === 0) {
      return (
        <Typography variant="h6">There are no emails available</Typography>
      );
    }

    return (
      <Fragment>
        {emails.map((email, i) => (
          <div className={classes.productDetails}>
            <Typography className={classes.productTitle} variant="subtitle1">
              Number: {email.email}
            </Typography>
            <Typography
              className={classes.productTimestamp}
              variant="subtitle1">
              Type: {email.type}
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
          <PortletLabel
            subtitle={`${this.props.emails.length} in total`}
            title="User emails"
          />
        </PortletHeader>
        <PortletContent className={classes.portletContent}>
          {this.renderEmails()}
        </PortletContent>
      </Portlet>
    );
  }
}

EmailList.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(EmailList);
