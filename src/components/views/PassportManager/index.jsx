import React from 'react';
import { Route } from 'react-router-dom';

import Dashboard from 'components/Layouts';

import { withRouter } from 'react-router-dom';

import Accounts from './Accounts';
import DocumentInfo from './DocumentInfo';
import SearchAccount from './SearchAccount';
import AccountInfo from '../UserManager/AccountInfo';
const PassportManager = ({ match }) => {
  return (
    <Dashboard>
      <Route
        component={Accounts}
        exact
        path={`${match.url}/applications`}
      />
      <Route
        component={SearchAccount}
        exact
        path={`${match.url}/search`}
      />
      <Route
        component={DocumentInfo}
        exact
        path={`${match.url}/search/:applicationID`}
      />
      <Route
        component={AccountInfo}
        exact
        path={`${match.url}/user/:accountID`}
      />
      <Route
        component={DocumentInfo}
        exact
        path={`${match.url}/applications/:applicationID/:procedure?`}
      />
    </Dashboard>
  );
};

export default withRouter(PassportManager);
