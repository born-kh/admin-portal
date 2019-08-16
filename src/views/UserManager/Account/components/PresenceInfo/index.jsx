import React, { Component, Fragment } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import { connect } from 'react-redux';
import { Typography } from '@material-ui/core';
import { Portlet } from 'components';

import styles from './styles';
import { fetchPresenceInfo } from 'actions/presenceInfoActions';

class PresenceInfo extends Component {
  componentDidMount() {
    let params = {
      accountID: this.props.accountID
    };
    this.props.fetchGetPresenceInfo(params, this.props.sessionID);
  }

  renderPresenceInfo() {
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
        {/* <PortletHeader noDivider>
          <PortletLabel
            subtitle={`${this.props.phones.length} in total`}
            title="User phones"
          />
        </PortletHeader>
        <PortletContent className={classes.portletContent}>
          {this.renderPresenceInfo()}
        </PortletContent> */}
      </Portlet>
    );
  }
}

PresenceInfo.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    pending: state.presence.pending,
    varStatus: state.presence.varStatus,
    permaStatus: state.presence.permaStatus,
    activity: state.presence.activity
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchGetPresenceInfo: (params, sessionID) =>
      dispatch(fetchPresenceInfo(params, sessionID))
  };
};

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(PresenceInfo)
);
