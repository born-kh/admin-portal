import React, { Component, Fragment } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PageTitle from 'components/common/PageTitle';

import SearchInput from 'components/common/SearchInput';

import { fetchUsers } from 'store/actions/userActions';
import UsersTable from './components/UsersTable';
import Loader from 'react-loaders';
import {
  Col,
  Card,
  CardBody,
  CardHeader,
  ListGroupItem,
  ListGroup
} from 'reactstrap';

import { DropdownList } from 'react-widgets';
import queryString from 'query-string';
import PropTypes from 'prop-types';
import LoaderOverlay from 'components/common/LoaderOverlay';

const rejectMessages = [
  'Фотография паспорта размытая, невозможно рассмотреть информацию',
  'Отсутствует фотография паспорта',
  'Отсутствует сэлфи пользователя',
  'Отсутствует фотография второй стороны паспорта гражданина Республики Таджикистан',
  'Отсутствует фотография лицевой стороны паспорта гражданина Республики Таджикистан',
  'Загруженный документ не является паспортом гражданина Республики Таджикистан',
  'Паспорт в кадре находится не полностью',
  'Фото паспорта сделано в темном помещении, невозможно различить данные',
  'Фото паспорта сделано не с реального документа а является фотографией скриншота с другого устройства',
  'Фото паспорта является цветной или черно-белой копией',
  'Фото гражданина на паспорте не совпадает с сэлфи пользователя.',
  'Истек срок действия загруженного документа',
  'На фотографии документа присутствуют блики',
  'Сэлфи не является фотографией пользователя, а снимком с фотографии. '
];

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
                    value={this.state.searchType}
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
