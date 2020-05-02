import React from 'react';
import { Route } from 'react-router-dom';

import Dashboard from 'components/Layouts';

import { withRouter } from 'react-router-dom';

import Accounts from './Applications';
import DocumentInfo from './DocumentInfo';

const PassportManager = ({ match }) => {
  return (
    <Dashboard>
      <Route
        component={Accounts}
        exact
        path={`${match.url}/applications`}
      />

      <Route
        component={DocumentInfo}
        exact
        path={`${match.url}/search/:applicationID`}
      />

      <Route
        component={DocumentInfo}
        exact
        path={`${match.url}/applications/:applicationID/`}
      />
    </Dashboard>
  );
};

export default withRouter(PassportManager);
