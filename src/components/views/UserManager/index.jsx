import React from 'react';
import { Route } from 'react-router-dom';

import Dashboard from 'components/Dashboard';
import Users from './Users';

import { withRouter } from 'react-router-dom';
import AccountInfo from './AccountInfo';
const UserManager = ({ match }) => {
  console.log('ccccs');
  return (
    <Dashboard>
      <Route exact path={`${match.url}/users`} component={Users} />
      <Route
        exact
        path={`${match.url}/users/:accountID`}
        component={AccountInfo}
      />
    </Dashboard>
  );
};

export default withRouter(UserManager);
