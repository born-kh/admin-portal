import React from 'react';
import { Route } from 'react-router-dom';

import Dashboard from 'components/Layouts';
import Users from './Users';

import { withRouter } from 'react-router-dom';
import AccountInfo from './AccountInfo';
import PERMISSIONS from 'constants';

import ApplicationInfo from './AccountInfo/ApplicationInfo';
const UserManager = ({ match }) => {
  console.log('User Manager');
  const permissions = JSON.parse(localStorage.getItem(PERMISSIONS));

  return (
    <Dashboard>
      <Route
        component={Users}
        exact
        path={`${match.url}/users`}
      />
      <Route
        component={AccountInfo}
        exact
        path={`${match.url}/users/:accountID`}
        searchPassportManager={false}
      />

      <Route
        component={ApplicationInfo}
        exact
        path={'/user-manager/users/applicaion/:applicationID'}
      />
    </Dashboard>
  );
};

export default withRouter(UserManager);
