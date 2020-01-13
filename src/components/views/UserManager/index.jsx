import React from 'react';
import { Route } from 'react-router-dom';

import Dashboard from 'components/Layouts';
import Users from './Users';

import { withRouter } from 'react-router-dom';
import AccountInfo from './AccountInfo';
import PERMISSIONS from 'constants';
const UserManager = ({ match }) => {
  console.log('User Manager');
  const permissions = JSON.parse(localStorage.getItem(PERMISSIONS));
  console.log(permissions);
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
      {/* <Route
        component={AccountInfo}
        exact
        path={'passport-manager/applications/:accountID'}
      /> */}
    </Dashboard>
  );
};

export default withRouter(UserManager);
