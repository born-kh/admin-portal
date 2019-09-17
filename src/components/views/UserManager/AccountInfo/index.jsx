import React, { Fragment } from 'react';
import PageTitle from 'components/common/PageTitle';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import AccountProfile from './components/AccountProfile';

class AccountInfo extends React.Component {
  render() {
    // console.log(this.props.ownProps.match.params.accountID);
    return (
      <Fragment>
        <PageTitle
          heading=""
          subheading=""
          icon="pe-7s-science icon-gradient bg-happy-itmeo"
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

const WithRouterAccountInfo = withRouter(AccountInfo);
export default connect(mapStateToProps)(WithRouterAccountInfo);
