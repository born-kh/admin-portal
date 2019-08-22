import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import { CircularProgress, Typography, Button } from '@material-ui/core';

import { Dashboard as DashboardLayout } from 'layouts';
import DateFnsUtils from '@date-io/date-fns';
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import styles from './style';
import { SearchInput } from 'components';
import { connect } from 'react-redux';
import { fetchTracers } from 'actions/tracerActions';
import { ErrorsTable } from './components';
import { IconButton } from '@material-ui/core';
import { Delete as DeleteIcon } from '@material-ui/icons';
import { MessagesTable } from './components';
import { REMOVE_TRACER } from 'constants/apiURL';
import { instance } from 'helpers';

class TracerList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fromDate: new Date(new Date().setDate(-1)),
      toDate: new Date()
    };
    this.handleChangeFromDate = this.handleChangeFromDate.bind(this);
    this.handleChangeToDate = this.handleChangeToDate.bind(this);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
    this.showErrorTable = this.showErrorTable.bind(this);
    this.showMessageTable = this.showMessageTable.bind(this);
    this.handleDeleteTracers = this.handleDeleteTracers.bind(this);
  }

  handleOnSubmit() {
    const params = {
      search: this.props.search,
      fromTS: this.state.fromDate.toISOString(),
      toTS: this.state.toDate.toISOString()
    };
    this.props.fetchTracers(params);
  }

  handleChangeFromDate(date) {
    this.setState({ fromDate: date });
  }
  handleChangeToDate(date) {
    this.setState({ fromTo: date });
  }

  showErrorTable(e) {
    e.preventDefault();
    this.setState({ showTable: true });
  }

  showMessageTable(e) {
    e.preventDefault();
    this.setState({ showTable: false });
  }

  handleDeleteTracers() {
    const params = {
      accountID: this.props.accountId
    };

    instance.post(REMOVE_TRACER, params).then(
      resp => {
        this.handleOnSubmit();
      },
      error => {
        this.setState({
          error
        });
      }
    );
  }

  renderTable() {
    const { classes, pending, error } = this.props;
    if (pending) {
      return (
        <div className={classes.progressWrapper}>
          <CircularProgress />
        </div>
      );
    }
    if (this.state.showTable) {
      console.log('cscsd');
      if (error) {
        return <Typography variant="h6">{JSON.stringify(error)}</Typography>;
      }

      if (this.props.errors.length === 0) {
        return <Typography variant="h6">There are no errors</Typography>;
      }

      return <ErrorsTable errors={this.props.errors} />;
    } else {
      if (error) {
        return <Typography variant="h6">{error}</Typography>;
      }
      if (this.props.messages.length === 0) {
        return <Typography variant="h6">There are no messages</Typography>;
      }
      return (
        <>
          <MessagesTable messages={this.props.messages} />
        </>
      );
    }
  }

  render() {
    const { classes, errors, messages } = this.props;
    return (
      <DashboardLayout title="Tracer Manager">
        <div className={classes.root}>
          <div className={classes.row}>
            <span className={classes.spacer} />
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <DateTimePicker
                label="From Date"
                value={this.state.fromDate}
                onChange={this.handleChangeFromDate}
              />

              <DateTimePicker
                label="To Date"
                value={this.state.toDate}
                onChange={this.handleChangeToDate}
              />
            </MuiPickersUtilsProvider>

            {errors.length + messages.length > 0 && (
              <IconButton
                className={classes.deleteButton}
                onClick={this.handleDeleteTracers}>
                <DeleteIcon />
              </IconButton>
            )}

            <Button
              className={classes.importButton}
              size="small"
              variant="outlined"
              color="secondary"
              disabled={this.state.showTable ? true : false}
              onClick={this.showErrorTable}>
              {this.props.errors.length} Errors
            </Button>
            <Button
              className={classes.exportButton}
              size="small"
              variant="outlined"
              color="primary"
              disabled={this.state.showTable ? false : true}
              onClick={this.showMessageTable}>
              {this.props.messages.length} Messages
            </Button>
          </div>
          <div className={classes.row}>
            <SearchInput
              className={classes.searchInput}
              placeholder="Search tracer"
            />

            <Button
              color="primary"
              size="small"
              variant="outlined"
              onClick={this.handleOnSubmit}>
              Search
            </Button>
          </div>

          <div className={classes.row}>
            <h1>{this.state.showTable ? 'Errors' : 'Messages'}</h1>
          </div>
          <div className={classes.content}>{this.renderTable()} </div>
        </div>
      </DashboardLayout>
    );
  }
}

TracerList.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.tracer.errors,
  messages: state.tracer.messages,
  accountId: state.tracer.accountId,
  search: state.settings.search,
  pending: state.tracer.pending,
  error: state.tracer.error,
  session: state.auth.session
});

const mapDispatchToProps = dispatch => {
  return {
    fetchTracers: params => dispatch(fetchTracers(params))
  };
};

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(TracerList)
);
