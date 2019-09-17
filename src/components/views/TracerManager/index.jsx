import React from 'react';
import { Route, withRouter } from 'react-router-dom';

import Tracers from './Tracers';
import Dashboard from 'components/Dashboard';

const TracerManager = ({ match }) => {
  return (
    <Dashboard>
      <Route exact path={`${match.url}/tracers`} component={Tracers} />
    </Dashboard>
  );
};

export default withRouter(TracerManager);
