import React, { Component, Fragment } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PageTitle from 'components/common/PageTitle';

import SearchInput from 'components/common/SearchInput';

import { fetchUsers } from 'store/actions/userActions';
import UsersTable from './components/UsersTable';
import Loader from 'react-loaders';
import { Col, Card, CardBody, CardHeader } from 'reactstrap';

import { DropdownList } from 'react-widgets';
import queryString from 'query-string';
import PropTypes from 'prop-types';
import LoaderOverlay from 'components/common/LoaderOverlay';

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

  componentDidMount() {
    const values = queryString.parse(this.props.location.search);

    if (values.q !== undefined) {
      const params = {
        search: values.q,
        type: values.searchType
      };

      this.props.fetchUsers(params);
    }
  }

  handleOnSubmit(event) {
    if (event.key === 'Enter') {
      let search = '?q=' + this.props.search;
      let searchType = '&searchType=' + this.state.searchType;

      this.props.history.push(this.props.match.url + search + searchType);
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
      return <LoaderOverlay />;
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

    if (this.props.users.length === 0) {
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
      return <UsersTable usersData={this.props.users} />;
    }
  }
  render() {
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
            icon="pe-7s-user icon-gradient bg-night-fade"
          />

          <Col md="12">
            <Card className="main-card mb-3">
              <CardHeader className="card-header-tab">
                <div className="card-header-title font-size-lg text-capitalize font-weight-normal">
                  <SearchInput
                    placeholder="Search user"
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

const UsersWithRouter = withRouter(Users);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UsersWithRouter);
