import React from 'react';
import { Route } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import Dashboard from 'components/Layouts';
import ApiKeyComponent from './ApiKeyComponent';

const ApiKeyManager = ({ match }) => {
  return (
    <Dashboard>
      <Route
        component={ApiKeyComponent}
        exact
        path={`${match.url}/apikeys`}
      />
    </Dashboard>
  );
};

export default withRouter(ApiKeyManager);
