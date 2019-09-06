import React, { Component, Fragment } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PageTitle from 'common/PageTitle/index.jsx';

import SearchInput from 'common/SearchInput/index.jsx';

import { fetchUsers } from 'actions/userActions';
import UsersTable from './components/UsersTable';
import Loader from 'react-loaders';
import {
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  FormGroup,
  Label,
  Input,
  CardHeader,
  Container
} from 'reactstrap';

import { DropdownList } from 'react-widgets';

import PropTypes from 'prop-types';

const types = ['username', 'phone', 'email', 'accountID'];

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: [],
      searchType: 'username'
    };

    this.handleOnSubmit = this.handleOnSubmit.bind(this);
  }

  handleOnSubmit(event) {
    if (event.key === 'Enter') {
      let params = {
        search: this.props.search,
        type: this.state.searchType
      };
      this.props.fetchUsers(params);
    }
  }

  renderTable() {
    const { pending, error } = this.props;
    if (pending) {
      return (
        <div className="loader-container">
          <div className="loader-container-inner">
            <div className="text-center">
              <Loader type="ball-clip-rotate-multiple" active />
            </div>
            <h6 className="mt-5">
              Please wait while we load all the Components examples
              <small>
                Because this is a demonstration we load at once all the
                Components examples. This wouldn't happen in a real live app!
              </small>
            </h6>
          </div>
        </div>
      );
    }
    if (error) {
      return (
        <div className="dropdown-menu-header">
          <div className="dropdown-menu-header-inner bg-primary">
            <div className="menu-header-content">
              <div>
                <h5 className="menu-header-title">{JSON.stringify(error)}</h5>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (this.props.users.length === 0) {
      return (
        <div className="dropdown-menu-header">
          <div className="dropdown-menu-header-inner bg-primary">
            <div className="menu-header-content">
              <div>
                <h5 className="menu-header-title">There are no users</h5>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return <UsersTable usersData={this.props.users} />;
    }
  }
  render() {
    console.log('props');
    return (
      <Fragment>
        <ReactCSSTransitionGroup
          component="div"
          transitionName="TabsAnimation"
          transitionAppear={true}
          transitionAppearTimeout={0}
          transitionEnter={false}
          transitionLeave={false}>
          <PageTitle
            heading="User Manager"
            subheading=""
            icon="pe-7s-graph icon-g  radient bg-ripe-malin"
          />

          <Col md="12">
            <Card className="card-border he-100">
              <CardHeader>
                <div className="card-header-title font-size-lg text-capitalize font-weight-normal">
                  <SearchInput
                    placeholder="Search tracer"
                    isActive={false}
                    keyPressed={this.handleOnSubmit}
                  />
                </div>
                <Col md={2}>
                  <DropdownList
                    data={types}
                    value={this.state.searchType}
                    allowCreate="onFilter"
                    onCreate={name => this.handleCreate(name)}
                    onChange={value => this.setState({ searchType: value })}
                    textField="name"
                    width="200"
                  />
                </Col>
              </CardHeader>
              <CardBody>{this.renderTable()}</CardBody>
            </Card>
          </Col>
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

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Users)
);
