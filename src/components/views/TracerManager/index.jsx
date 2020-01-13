import React from 'react';
import { Route, withRouter } from 'react-router-dom';

import Tracers from './Tracers';
import Dashboard from 'components/Layouts';

const TracerManager = ({ match }) => {
  return (
    <Dashboard>
      <Route
        component={Tracers}
        exact
        path={`${match.url}/tracers`}
      />
    </Dashboard>
  );
};

export default withRouter(TracerManager);
