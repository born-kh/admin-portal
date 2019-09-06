import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Dashboard from 'layout/Dashboard';
import Users from './Users';

import { withRouter } from 'react-router-dom';
import AccountInfo from './Users/components/AccountInfo';
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
