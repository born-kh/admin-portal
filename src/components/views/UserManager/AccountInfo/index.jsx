import React, { Fragment } from 'react';
import PageTitle from 'components/common/PageTitle';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import AccountProfile from './AccountProfile';
import {
  fetchUsers,
  fetchApplicationsByAccount
} from 'store/actions/userActions';

class AccountInfo extends React.Component {
  render() {
    return (
      <Fragment>
        <PageTitle
          heading=""
          icon="pe-7s-science icon-gradient bg-happy-itmeo"
          subheading=""
        />

        <AccountProfile userInfo={this.props.user} />
      </Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  let id = ownProps.match.params.accountID;

  return {
    user: state.user.users.find(user => user.accountID === id)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchApllicationsByAccount: params =>
      dispatch(fetchApplicationsByAccount(params))
  };
};

const WithRouterAccountInfo = withRouter(AccountInfo);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WithRouterAccountInfo);
