import React, { Component, Fragment } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PageTitle from 'components/common/PageTitle';

import SearchInput from 'components/common/SearchInput';

import Loader from 'react-loaders';
import { Col, Card, CardBody, CardHeader } from 'reactstrap';

import { DropdownList } from 'react-widgets';
import queryString from 'query-string';
import PropTypes from 'prop-types';
import LoaderOverlay from 'components/common/LoaderOverlay';
import { fetchAccounts } from 'store/actions/passportActions';
import AccountTable from './AccountTable';

class Accounts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: [],
      searchType: 'username'
    };

    this.handleOnSubmit = this.handleOnSubmit.bind(this);
  }

  componentDidMount() {
    this.props.fetchAccounts('/0/25');
  }

  handleOnSubmit(event) {
    // if (event.key === 'Enter') {
    //   this.props.fetchAccounts(params);
    // }
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

    if (this.props.accounts.length === 0) {
      return (
        <div className="widget-content">
          <div className="widget-content-wrapper">
            <div className="widget-content-right ml-0 mr-3">
              <div className="widget-subheading">There are no accounts</div>
            </div>
          </div>
        </div>
      );
    } else {
      return <AccountTable accountData={this.props.accounts} />;
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
            heading="Passport Manager"
            subheading=""
            icon="pe-7s-user icon-gradient bg-night-fade"
          />

          <Col md="12">
            <Card className="main-card mb-3">
              <CardHeader className="card-header-tab"></CardHeader>

              <CardBody>{this.renderTable()}</CardBody>
            </Card>
          </Col>
        </ReactCSSTransitionGroup>
      </Fragment>
    );
  }
}

Accounts.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  accounts: state.passport.accounts,
  error: state.passport.error,
  pending: state.user.pending
});

const mapDispatchToProps = dispatch => {
  return {
    fetchAccounts: params => dispatch(fetchAccounts(params))
  };
};

const AccountsWithRouter = withRouter(Accounts);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountsWithRouter);
