import React, { Fragment } from 'react';
import PageTitle from 'common/PageTitle';
import { Button } from 'reactstrap';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import { connect } from 'react-redux';

import { Row, Col } from 'reactstrap';
import AccountProfile from './components/AccountProfile';
import SessionTable from './components/SessionTable';

class AccountInfo extends React.Component {
  render() {
    // console.log(this.props.ownProps.match.params.accountID);
    return (
      <Fragment>
        <PageTitle
          heading="Profile Boxes"
          subheading="These boxes are usually for dashboard elements centered around users and profiles."
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

export default connect(mapStateToProps)(AccountInfo);
