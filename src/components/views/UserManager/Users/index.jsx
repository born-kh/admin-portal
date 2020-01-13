import React, { Component, Fragment } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PageTitle from 'components/common/PageTitle';

import SearchInput from 'components/common/SearchInput';
import Loader from 'react-loaders';
import { fetchUsers, fetchUsersPending } from 'store/actions/userActions';
import UsersTable from './UsersTable';
import {
  Col,
  Card,
  CardBody,
  CardHeader,
  Row,
  Input,
  FormGroup,
  Button
} from 'reactstrap';
import { DropdownList } from 'react-widgets';
import queryString from 'query-string';
import PropTypes from 'prop-types';
import LoaderOverlay from 'components/common/LoaderOverlay';
import ApplicationTable from '../../PassportManager/SearchAccount/SearchTable';
import { fetchApplicationSearch } from 'store/actions/passportActions';
import { passportAPI } from 'service/api';

const types = ['username', 'phone', 'email', 'accountID'];

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchUserList: [],
      firstName: '',
      lastName: '',
      phoneNumber: '',
      params: {
        search: '',
        type: ''
      }
    };

    this.handleOnOnSubmit = this.handleOnOnSubmit.bind(this);
  }

  async handleOnOnSubmit(event) {
    const {
      search,
      match,
      history,
      fetchUsers,
      fetchUsersPending
    } = this.props;
    const { searchUserList } = this.state;
    const searchList = this.state.searchUserList;

    const { firstName, lastName, phoneNumber } = this.state;
    let name = {
      firstName: firstName,
      lastName: lastName
    };
    let params = {
      name: name,
      phone: phoneNumber
    };

    if (firstName !== '' || lastName !== '' || phoneNumber !== '') {
      try {
        const response = await passportAPI.getApplicationsByName(params);
        console.log(response);
        await response.data.applications.map(application => {
          searchUserList.push({
            type: 'accountID',
            search: application.accountID
          });
        });
        this.props.fetchUsers(searchUserList);
      } catch {
        console.log('error in fetching posts');
      }
    } else {
      if (searchUserList.length > 0) {
        this.props.fetchUsers(searchUserList);
      }
    }
  }

  handleChangeApplicationSearch = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleChange = event => {
    const value = event.target.value;
    const name = event.target.name;
    if (value.length === 0) {
      this.setState({
        params: { type: '', search: '' }
      });
    } else {
      this.setState({
        params: { type: name, search: value }
      });
    }
  };

  onBlurUserInput = event => {
    var searchUserList = this.state.searchUserList;
    const findIndex = this.state.searchUserList.findIndex(
      obj => obj.type === event.target.name
    );
    if (findIndex === -1) {
      searchUserList.push({
        type: event.target.name,
        search: event.target.value
      });
    } else {
      searchUserList[findIndex] = {
        type: event.target.name,
        search: event.target.value
      };
    }
    searchUserList = searchUserList.filter(obj => obj.search !== '');
    this.setState({ searchUserList });
  };

  renderApplicationTable() {
    const { pendingApplication, errorApplication, applications } = this.props;
    console.log(this.props);

    if (pendingApplication) {
      return (
        <div className="text-center">
          <Loader type="ball-scale" />
        </div>
      );
    }
    if (errorApplication) {
      return (
        <div className="widget-content">
          <div className="widget-content-wrapper">
            <div className="widget-content-right ml-0 mr-3">
              <div className="widget-subheading">{errorApplication}</div>
            </div>
          </div>
        </div>
      );
    }

    if (applications.length === 0) {
      return (
        <div className="widget-content">
          <div className="widget-content-wrapper">
            <div className="widget-content-right ml-0 mr-3">
              <div className="widget-subheading">There are no applications</div>
            </div>
          </div>
        </div>
      );
    } else {
      return <ApplicationTable
        applications={applications}
        rows={5}
             />;
    }
  }

  renderUserTable() {
    const { pending, error, users } = this.props;

    if (pending) {
      return (
        <div className="text-center">
          <Loader type="ball-scale" />
        </div>
      );
    }
    if (error) {
      return (
        <div className="widget-content">
          <div className="widget-content-wrapper">
            <div className="widget-content-right ml-0 mr-3">
              <div className="widget-subheading">{error}</div>
            </div>
          </div>
        </div>
      );
    }

    if (users.length === 0) {
      return (
        <div className="widget-content">
          <div className="widget-content-wrapper">
            <div className="widget-content-right ml-0 mr-3">
              <div className="widget-subheading">There are no users</div>
            </div>
          </div>
        </div>
      );
    } else {
      return <UsersTable usersData={users} />;
    }
  }

  render() {
    console.log(this.state);
    return (
      <Fragment>
        <ReactCSSTransitionGroup
          component="div"
          transitionAppear
          transitionAppearTimeout={0}
          transitionEnter={false}
          transitionLeave={false}
          transitionName="TabsAnimation"
        >
          <PageTitle
            heading="User Manager"
            icon="pe-7s-user icon-gradient bg-night-fade"
            subheading=""
          />
          <Col md="12">
            <Card className="main-card mb-3">
              <CardHeader className="card-header-tab">
                Advanced search
              </CardHeader>
              <CardBody>
                <Row>
                  <Col md={2}>
                    <FormGroup>
                      <Input
                        id="usernameID"
                        name="username"
                        onBlur={this.onBlurUserInput}
                        onChange={this.handleOnChange}
                        placeholder="UserName"
                        type="text"
                      />
                    </FormGroup>

                    <FormGroup>
                      <Input
                        id="phoneID"
                        name="phone"
                        onBlur={this.onBlurUserInput}
                        onChange={this.handleOnChange}
                        placeholder="Phone Number"
                        type="text"
                      />
                    </FormGroup>

                    <FormGroup>
                      <Input
                        id="accountID"
                        name="accountID"
                        onBlur={this.onBlurUserInput}
                        onChange={this.handleOnChange}
                        placeholder="Account ID"
                        type="text"
                      />
                    </FormGroup>

                    <FormGroup>
                      <Input
                        id="emailID"
                        name="email"
                        onBlur={this.onBlurUserInput}
                        onChange={this.handleOnChange}
                        placeholder="Email"
                        type="text"
                      />
                    </FormGroup>
                  </Col>
                  <Col md={2}>
                    <FormGroup>
                      <Input
                        id="firstNameID"
                        name="firstName"
                        onChange={this.handleChangeApplicationSearch}
                        placeholder="First Name"
                        type="text"
                      />
                    </FormGroup>

                    <FormGroup>
                      <Input
                        id="lastNameID"
                        name="lastName"
                        onChange={this.handleChangeApplicationSearch}
                        placeholder="Last Name"
                        type="text"
                      />
                    </FormGroup>

                    <FormGroup>
                      <Input
                        id="passportID"
                        name="passportID"
                        onChange={this.handleChangeApplicationSearch}
                        placeholder="Passport ID"
                        type="text"
                      />
                    </FormGroup>
                    <Button
                      className={
                        'border-0 btn-pill btn-wide  btn-transition active'
                      }
                      color="alternate"
                      onClick={this.handleOnOnSubmit}
                      outline
                    >
                      Search
                    </Button>
                  </Col>
                </Row>
                {this.renderUserTable()}
              </CardBody>
            </Card>
          </Col>

          {/* <Col md="12">
            <Card className="main-card mb-3">
              <CardHeader className="card-header-tab">
                <div className="card-header-title font-size-lg text-capitalize font-weight-normal">
                  <SearchInput
                    isActive={false}
                    keyPressed={this.handleOnSubmit}
                    placeholder="Search user"
                  />
                </div>
                <Col md={2}>
                  <DropdownList
                    allowCreate="onFilter"
                    data={types}
                    onChange={value => this.setState({ searchType: value })}
                    onCreate={name => this.handleCreate(name)}
                    textField="name"
                    value={searchType}
                    width="200"
                  />
                </Col>

              
              </CardHeader>

              <CardBody></CardBody>
            </Card>
          </Col> */}
        </ReactCSSTransitionGroup>
      </Fragment>
    );
  }
}

Users.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  users: state.user.users,
  search: state.settings.search,
  pending: state.user.pendingUser,
  error: state.user.errorUser,
  applications: state.passport.applications,
  errorApplication: state.passport.error,
  pendingApplication: state.passport.pending,
  profile: state.auth.profile,
  session: state.auth.session
});

const mapDispatchToProps = dispatch => {
  return {
    fetchApplicationSearch: params => dispatch(fetchApplicationSearch(params)),
    fetchUsers: params => dispatch(fetchUsers(params))
  };
};

const UsersWithRouter = withRouter(Users);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UsersWithRouter);
