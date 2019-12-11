import React from 'react';
import { Route } from 'react-router-dom';

import Dashboard from 'components/Dashboard';

import { withRouter } from 'react-router-dom';

import Accounts from './Accounts';
import DocumentInfo from './DocumentInfo';
import SearchAccount from './SearchAccount';
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
        component={DocumentInfo}
        exact
        path={`${match.url}/applications/:applicationID/:procedure?`}
      />
    </Dashboard>
  );
};

export default withRouter(PassportManager);
