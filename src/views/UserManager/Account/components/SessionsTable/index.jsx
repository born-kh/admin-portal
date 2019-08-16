import React, { Component, Fragment } from 'react';
import classNames from 'classnames';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  fetchAccountSessions,
  updateTracing,
  updateSuspended
} from 'actions/sessionActions';
import { withStyles, Switch } from '@material-ui/core';
import ReactJson from 'react-json-view';
import axios from 'axios';
import {
  Button,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography
} from '@material-ui/core';

import {
  Portlet,
  PortletHeader,
  PortletLabel,
  PortletContent,
  Status
} from 'components';

import styles from './styles';
import { USER_MANAGER_IP } from 'constants/ActionType';

const statusColors = {
  delivered: 'success',
  pending: 'info',
  refund: 'danger'
};

class SessionsTable extends Component {
  state = {
    open: false,
    scroll: 'paper',
    rowIndex: 0,
    metaArray: this.props.metaArray
  };

  handleClickOpen = (scroll, rowIndex) => () => {
    this.setState({ open: true, scroll, rowIndex });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleSetTracing = (sessionID, tracer, index) => () => {
    if (tracer === true) {
      tracer = false;
    } else {
      tracer = true;
    }
    var headers = {
      'Content-Type': 'application/json',
      Authorization: this.props.sessionID
    };

    axios
      .post(
        USER_MANAGER_IP + '/set/tracer',
        { sessionID: sessionID, tracing: tracer },
        { headers: headers }
      )
      .then(
        result => {
          if (result.status === 200) {
            if (result.data.result) {
              let params = {
                index: index,
                tracing: tracer
              };
              this.props.onChangeTracing(params);
            }
          }
        },
        error => {}
      );
  };

  handleSessionSuspended = (sessionID, suspended, index) => () => {
    if (suspended === true) {
      suspended = false;
    } else {
      suspended = true;
    }
    console.log(suspended);
    var headers = {
      Authorization: this.props.sessionID
    };
    console.log(suspended);

    axios
      .post(
        USER_MANAGER_IP + '/suspend/session',
        { sessionID: sessionID, suspend: suspended },
        { headers: headers }
      )
      .then(
        result => {
          if (result.status === 200) {
            if (result.data) {
              console.log(result.data);
              let params = {
                index: index,
                suspended: suspended
              };
              this.props.onChangeSuspended(params);
            }
          }
        },
        error => {}
      );
  };

  handleRemoveSession = sessionID => () => {
    var headers = {
      'Content-Type': 'application/json',
      Authorization: this.props.sessionID
    };

    axios
      .post(
        USER_MANAGER_IP + '/remove/session',
        { sessionID: sessionID },
        { headers: headers }
      )
      .then(
        result => {
          if (result.status === 200) {
            console.log('remove', result);
          }
        },
        error => {}
      );
  };

  // handleSessionSuspend = sessionID => () => {
  //   const headers = {
  //     Authorization: this.props.sessionID
  //   };
  //   console.log(headers);
  //   axios
  //     .post(
  //       USER_MANAGER_IP + '/suspend/session',
  //       { sessionID: sessionID },
  //       { headers: headers }
  //     )
  //     .then(
  //       result => {
  //         if (result.status === 200) {
  //           console.log('disconnect', result);
  //         }
  //       },
  //       error => {}
  //     );
  // };

  componentDidMount() {
    let params = {
      accountID: this.props.accountID
    };
    this.props.fetchGetAccountSessions(params, this.props.sessionID);
  }

  renderDialog() {
    if (this.state.open) {
      return (
        <div>
          <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            scroll={this.state.scroll}
            aria-labelledby="scroll-dialog-title">
            <DialogTitle id="scroll-dialog-title">Session</DialogTitle>
            <DialogContent>
              <DialogContentText>
                <ReactJson
                  iconStyle="circle"
                  indentWidth="4"
                  src={
                    (this.props.metaArray[this.state.rowIndex][
                      'push'
                    ] = this.props.pushArray[this.state.rowIndex])
                  }
                />
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={this.handleClose} color="primary">
                Ok
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      );
    } else {
      return '';
    }
  }

  renderSesiionsTable() {
    const { classes, pending, metaArray } = this.props;
    const showSessions = !pending && metaArray !== undefined;

    console.log('12345', metaArray, this.props.opts);
    if (pending) {
      return (
        <div className={classes.progressWrapper}>
          <CircularProgress />
        </div>
      );
    }

    if (showSessions) {
      if (metaArray.length === 0) {
        return (
          <Typography variant="h6">There are no sessions available</Typography>
        );
      }
    }
    return (
      <Fragment>
        {showSessions && (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="left">Device Name</TableCell>
                <TableCell align="left" sortDirection="desc">
                  Platform
                </TableCell>
                <TableCell align="left">IP</TableCell>
                <TableCell>Session ID</TableCell>
                <TableCell>Set Tracing</TableCell>
                <TableCell>Suspend Session</TableCell>
                <TableCell>Remove Session</TableCell>
                <TableCell>Detail info</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {metaArray.map((session, index) => (
                <TableRow
                  className={classes.tableRow}
                  hover
                  key={session.sessionID}>
                  <TableCell>{session.deviceName}</TableCell>
                  <TableCell className={classes.customerCell}>
                    {session.platform}
                  </TableCell>
                  <TableCell>{session.ip}</TableCell>
                  <TableCell>
                    <div className={classes.statusWrapper}>
                      <Status
                        className={classes.status}
                        color={statusColors[session.status]}
                        size="sm"
                      />
                      {session.sessionID}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Switch
                      checked={this.props.opts[index].tracing}
                      onChange={this.handleSetTracing(
                        session.sessionID,
                        this.props.opts[index].tracing,
                        index
                      )}
                      value={this.props.opts[index].tracing}
                      inputProps={{ 'aria-label': 'primary checkbox' }}
                    />
                  </TableCell>
                  <TableCell>
                    <Switch
                      checked={this.props.suspended[index]}
                      onChange={this.handleSessionSuspended(
                        session.sessionID,
                        this.props.suspended[index],
                        index
                      )}
                      value={this.props.suspended[index]}
                      inputProps={{ 'aria-label': 'primary checkbox' }}
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      size="small"
                      color="secondary"
                      onClick={this.handleSessionSuspended(session.sessionID)}>
                      Remove
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      size="small"
                      color="secondary"
                      onClick={this.handleClickOpen('paper', index)}>
                      Detail info
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Fragment>
    );
  }

  render() {
    const { classes, className } = this.props;
    const rootClassName = classNames(classes.root, className);
    return (
      <Portlet className={rootClassName}>
        <PortletHeader noDivider>
          <PortletLabel title="Sessions" />
        </PortletHeader>
        <PerfectScrollbar>
          <PortletContent className={classes.portletContent}>
            {this.renderSesiionsTable()}
          </PortletContent>
          {this.renderDialog()}
        </PerfectScrollbar>
      </Portlet>
    );
  }
}

SessionsTable.propTypes = {
  className: PropTypes.string,
  suspended: PropTypes.array,
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    pending: state.session.pending,
    metaArray: state.session.metaArray,
    opts: state.session.opts,
    pushArray: state.session.pushArray,
    suspended: state.session.suspended
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchGetAccountSessions: (params, accountID) =>
      dispatch(fetchAccountSessions(params, accountID)),
    onChangeTracing: params => dispatch(updateTracing(params)),
    onChangeSuspended: params => dispatch(updateSuspended(params))
  };
};

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(SessionsTable)
);
