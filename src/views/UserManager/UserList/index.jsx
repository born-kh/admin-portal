import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Button, TextField } from '@material-ui/core';
import { CircularProgress, Typography } from '@material-ui/core';
import { Dashboard as DashboardLayout } from 'layouts';
import { UsersTable } from './components';
import styles from './style';
import { SearchInput } from 'components';
import { connect } from 'react-redux'
import { fetchUsers } from 'actions/UserActions';

const types = [
  {
    value: 'username',
    label: 'User Name'
  },
  {
    value: 'phone',
    label: 'Phone Number'
  },
  {
    value: 'email',
    label: 'Email Adress'
  },
  {
    value: 'accountID',
    label: 'Account ID'
  }
];

class UserList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      searchType: "username",
      error: null,
      signal: true,
      fromDate: new Date(new Date().setDate(-1)),
      toDate: new Date(),

    }
    this.handleSearchTypeOnChange = this.handleSearchTypeOnChange.bind(this);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
  };

  handleOnSubmit() {


    this.setState({
      isLoading: true,
    })

    console.log("search", this.props.search)
    try {
      let params = {
        search: this.props.search,
        type: this.state.searchType
      }
      this.props.fetchUsers(params);



      this.setState({ isLoading: true });
      if (this.state.signal) {
        this.setState({
          isLoading: false,
        });
      }
    } catch (error) {
      if (this.state.signal) {
        this.setState({
          isLoading: false,
          error
        });
      }
    }
  }


  componentDidMount() {

    this.setState({
      signal: true
    });

  }

  componentWillUnmount() {
    this.setState({
      signal: false
    });
  }


  handleSearchTypeOnChange(event) {
    this.setState({ searchType: event.target.value })
  }



  renderUsers() {
    const { classes, pending, error } = this.props;

    if (pending) {
      return (
        <div className={classes.progressWrapper}>
          <CircularProgress />
        </div>
      );
    }

    if (error) {
      console.log("sdsd", error)
      return <Typography variant="h6">{JSON.stringify(error)}</Typography>;
    }

    if (this.props.users.length === 0) {
      return <Typography variant="h6">There are no users</Typography>;
    }

    return (

      <UsersTable
        users={this.props.users}
      />

    );
  }

  render() {
    const { classes } = this.props;

    return (
      <DashboardLayout title="User  Manager">
        <div className={classes.root}>
          <div className={classes.row}>
            <SearchInput
              className={classes.searchInput}
              placeholder="Search user"
            />
            <TextField
              className={classes.textField}
              label="Select Type"
              margin="dense"
              onChange={this.handleSearchTypeOnChange}
              required
              select
              SelectProps={{ native: true }}
              value={this.state.searchType}
              variant="outlined">
              {types.map(option => (
                <option
                  key={option.value}
                  value={option.value}
                >
                  {option.label}
                </option>
              ))}
            </TextField>
            <Button
              color="primary"
              size="small"
              variant="outlined"
              onClick={this.handleOnSubmit}
            >
              Search
            </Button>


          </div>
          <div className={classes.content}>{this.renderUsers()}</div>
        </div>

      </DashboardLayout>
    );
  }
}

UserList.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  users: state.user.users,
  search: state.search.search,
  pending: state.user.pending,
  error: state.user.error

});

const mapDispatchToProps = dispatch => {
  return {
    fetchUsers: params => dispatch(fetchUsers(params))
  };

};

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(UserList));

