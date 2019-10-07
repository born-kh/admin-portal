import React from 'react';
import { Route } from 'react-router-dom';

import Dashboard from 'components/Dashboard';
import Documents from './Accounts';

import { withRouter } from 'react-router-dom';
import AccountInfo from './AccountInfo';
import Accounts from './Accounts';
const PassportManager = ({ match }) => {
  return (
    <Dashboard>
      <Route exact path={`${match.url}/accounts`} component={Accounts} />
      {/* <Route
        exact
        path={`${match.url}/documents/:accountID`}
        component={DocumentInfo}
      /> */}
    </Dashboard>
  );
};

export default withRouter(PassportManager);
