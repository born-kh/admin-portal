import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import { Dashboard as DashboardLayout } from 'layouts';
import { AccountProfile } from './components';
import { connect } from 'react-redux';
import { SessionsTable } from './components';
import { PhoneList } from './components';
import { EmailList } from './components';
import { Auth } from './components';
import { BlockTable } from './components';
import { PresenceInfo } from './components';

const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 4
  }
});

class Account extends Component {
  state = { tabIndex: 0 };

  render() {
    const { classes } = this.props;
    return (
      <DashboardLayout title="Account">
        <div className={classes.root}>
          <Grid container spacing={4}>
            <Grid item lg={12} md={6} xl={4} xs={12}>
              <AccountProfile user={this.props.user} />
            </Grid>
            <Grid item lg={3} sm={6} xl={3} xs={12}>
              <Auth
                className={classes.item}
                auth={this.props.user.auth}
                accountID={this.props.user.accountID}
              />
            </Grid>
            <Grid item lg={3} sm={6} xl={3} xs={12}>
              <PhoneList
                className={classes.item}
                phones={this.props.user.phones}
              />
            </Grid>
            <Grid item lg={3} sm={6} xl={2} xs={12}>
              <EmailList
                className={classes.item}
                emails={this.props.user.emails}
              />
            </Grid>
            <Grid item lg={8} md={12} xl={9} xs={12}>
              <SessionsTable accountID={this.props.user.accountID} />
            </Grid>
            <Grid item lg={3} sm={6} xl={3} xs={12}>
              <BlockTable
                className={classes.item}
                emails={this.props.user.emails}
              />
            </Grid>

            <Grid item lg={3} sm={6} xl={3} xs={12}>
              <PresenceInfo
                className={classes.item}
                accountID={this.props.user.accountID}
              />
            </Grid>
          </Grid>
        </div>
      </DashboardLayout>
    );
  }
}

Account.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => {
  let id = ownProps.match.params.accountID;
  return {
    user: state.user.users.find(user => user.accountID === id)
  };
};

export default withStyles(styles)(connect(mapStateToProps)(Account));
