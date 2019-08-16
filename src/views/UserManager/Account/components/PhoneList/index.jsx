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

class PhoneList extends Component {
  renderPhones() {
    const { classes, phones } = this.props;
    if (phones.length === 0) {
      return (
        <Typography variant="h6">There are no phones available</Typography>
      );
    }

    return (
      <Fragment>
        {phones.map((phone, i) => (
          <div className={classes.productDetails}>
            <Typography className={classes.productTitle} variant="subtitle1">
              Number: {phone.number}
            </Typography>
            <Typography
              className={classes.productTimestamp}
              variant="subtitle1">
              Type: {phone.type}
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
            subtitle={`${this.props.phones.length} in total`}
            title="User phones"
          />
        </PortletHeader>
        <PortletContent className={classes.portletContent}>
          {this.renderPhones()}
        </PortletContent>
      </Portlet>
    );
  }
}

PhoneList.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PhoneList);
