import React, { Component } from 'react';

// Externals
import PropTypes from 'prop-types';
import classNames from 'classnames';

// Material helpers
import { withStyles } from '@material-ui/core';

// Material components
import { Checkbox, Typography, Button } from '@material-ui/core';

// Shared components
import {
  Portlet,
  PortletHeader,
  PortletLabel,
  PortletContent,
  PortletFooter
} from 'components';

// Component styles
import styles from './styles';

class AccountNotifications extends Component {
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
            subtitle="Manage the notifications"
            title="Notifications"
          />
        </PortletHeader>
        <PortletContent noPadding>
          <form className={classes.form}>
            <div className={classes.group}>
              <Typography
                className={classes.groupLabel}
                variant="h6"
              >
                Notifications
              </Typography>
              <div className={classes.field}>
                <Checkbox color="primary" />
                <div>
                  <Typography variant="body1">Remove session</Typography>
                </div>
              </div>
              <div className={classes.field}>
                <Checkbox
                  color="primary"
                  defaultChecked
                />
                <div>
                  <Typography variant="body1">Disconnect session</Typography>
                </div>
              </div>
              <div className={classes.field}>
                <Checkbox
                  color="primary"
                  defaultChecked
                />
                <div>
                  <Typography variant="body1">Set tracing</Typography>
                </div>
              </div>
              <div className={classes.field}>
                <Checkbox
                  color="primary"
                  defaultChecked
                />
                <div>
                  <Typography variant="body1">Phone calls</Typography>
                </div>
              </div>
            </div>
            <div className={classes.group}>
             
            </div>
          </form>
        </PortletContent>
        <PortletFooter className={classes.portletFooter}>
          <Button
            color="primary"
            variant="outlined"
          >
            Save
          </Button>
        </PortletFooter>
      </Portlet>
    );
  }
}

AccountNotifications.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AccountNotifications);
