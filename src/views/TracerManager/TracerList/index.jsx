import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles} from '@material-ui/core';
import { CircularProgress, Typography, Button} from '@material-ui/core';

import { Dashboard as DashboardLayout } from 'layouts';
import axios from 'axios'
import DateFnsUtils from "@date-io/date-fns"; 
import {

  DateTimePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import styles from './style';
import { SearchInput } from 'components';
import { connect } from 'react-redux'
import {fetchTracers } from 'actions/TracerActions';
import { ErrorsTable } from './components';
import { IconButton } from '@material-ui/core';
import {
  Delete as DeleteIcon
} from '@material-ui/icons';
import { MessagesTable } from './components';
const API_DELETE = 'http://10.7.8.129:8008/delete?account_id=';
var signal = true
class TracerList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      searchType: "username",
      error: null,
      fromDate: new Date(new Date().setDate(-1)),
      toDate: new Date(),

    }
    this.handleChangeFromDate = this.handleChangeFromDate.bind(this);
    this.handleChangeToDate = this.handleChangeToDate.bind(this);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
    this.showErrorTable = this.showErrorTable.bind(this);
    this.showMessageTable = this.showMessageTable.bind(this);
    this.handleDeleteTracers = this.handleDeleteTracers.bind(this);
  };

  handleOnSubmit() {
    console.log("search", this.props.search)
    try {

      const query = this.props.search + "&from_ts=" + this.state.fromDate.toISOString() +
        "&to_ts=" + this.state.toDate.toISOString();
      console.log(query)
      this.props.fetchTracers(query)




      this.setState({ isLoading: true });
      if (signal) {
        this.setState({
          isLoading: false,
        });
      }
    } catch (error) {
      if (signal) {
        this.setState({
          isLoading: false,
          error
        });
      }
    }
  }


  componentDidMount() {
    signal = true;

  }

  componentWillUnmount() {

    signal = false

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
    const ACCOUNT_ID = this.props.accountId;

    axios.get(API_DELETE + ACCOUNT_ID)
      .then(
        (result) => {
          const array = result.data;
          console.log(array);
          this.handleOnSubmit();


        },
        (error) => {
          this.setState({
            error
          });

        }
      )
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


      if (error) {
        return <Typography variant="h6">{JSON.stringify(error)}</Typography>;
      }

      if (this.props.errors.length === 0) {
        return <Typography variant="h6">There are no errors</Typography>;
      }

      return (
        <ErrorsTable
          errors={this.props.errors}
        />
      );

    } else {



      if (error) {
        return <Typography variant="h6">{error}</Typography>;
      }

      if (this.props.errors.length === 0) {
        return <Typography variant="h6">There are no messges</Typography>;
      }

      return (
        <MessagesTable
          messages={this.props.messages}
        />
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

              <DateTimePicker label="From Date" value={this.state.fromDate} onChange={this.handleChangeFromDate} />

              <DateTimePicker label="To Date" value={this.state.fromTo} onChange={this.handleChangeFromTo} />
            </MuiPickersUtilsProvider>

            {errors.length + messages.length > 0 && (
              <IconButton
                className={classes.deleteButton}
                onClick={this.handleDeleteTracers}
              >
                <DeleteIcon />
              </IconButton>
            )}

            <Button
              className={classes.importButton}
              size="small"
              variant="outlined"
              color="secondary"
              disabled={this.state.showTable ? true : false}
              onClick={this.showErrorTable}
            >
              {this.props.errors.length} Errors
          </Button>
            <Button
              className={classes.exportButton}
              size="small"
              variant="outlined"
              color="primary"
              disabled={this.state.showTable ? false : true}
              onClick={this.showMessageTable}
            >
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
              onClick={this.handleOnSubmit}

            >
              Search
            </Button>


          </div>

          <div className={classes.row}>
            <h1>{this.state.showTable ? "Errors" : "Messages"}</h1>



          </div>
          <div className={classes.content}>{this.renderTable()}</div>
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
  search: state.search.search,
  pending: state.tracer.pending,
  error: state.tracer.error

});

const mapDispatchToProps = dispatch => {
  return {
    fetchTracers: query => dispatch(fetchTracers(query))
  };

};

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(TracerList));

