import React, { Component, Fragment } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PageTitle from 'components/common/PageTitle';
import Loader from 'react-loaders';
import { fetchUsers } from 'store/actions/userActions';
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
import PropTypes from 'prop-types';
import { passportAPI } from 'service/api';

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchUserList: [],

      firstname: '',
      lastname: '',
      phoneNumber: '',
      params: {
        search: '',
        type: ''
      }
    };

    this.handleOnSubmit = this.handleOnSubmit.bind(this);
  }

  async handleOnSubmit(event) {
    const { searchUserList } = this.state;
    var searchAccoountsList = [];

    const { firstname, lastname, phoneNumber } = this.state;
    let name = {
      firstName: firstname,
      lastName: lastname
    };
    let params = {
      name: name,
      phone: phoneNumber
    };

    if (firstname !== '' || lastname !== '' || phoneNumber !== '') {
      const response = await passportAPI.getApplicationsByName(params);
      if ((response.status = 200)) {
        for (let application of response.data.applications) {
          searchAccoountsList.push({
            type: 'accountID',
            search: application.accountID
          });
        }

        searchAccoountsList = searchAccoountsList.concat(searchUserList);
        this.props.fetchUsers(searchAccoountsList);
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
                        name="firstname"
                        onBlur={this.onBlurUserInput}
                        onChange={this.handleChangeApplicationSearch}
                        placeholder="First Name"
                        type="text"
                      />
                    </FormGroup>

                    <FormGroup>
                      <Input
                        id="lastNameID"
                        name="lastname"
                        onBlur={this.onBlurUserInput}
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
                      onClick={this.handleOnSubmit}
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
        </ReactCSSTransitionGroup>
      </Fragment>
    );
  }
}

Users.propTypes = {
  className: PropTypes.string
};

const mapStateToProps = state => ({
  users: state.user.users,
  search: state.settings.search,
  pending: state.user.pending,
  error: state.user.error,
  profile: state.auth.profile,
  session: state.auth.session
});

const mapDispatchToProps = dispatch => {
  return {
    fetchUsers: params => dispatch(fetchUsers(params))
  };
};

const UsersWithRouter = withRouter(Users);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UsersWithRouter);
