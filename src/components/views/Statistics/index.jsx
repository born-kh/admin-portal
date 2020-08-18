import React from 'react';
import { Route, withRouter } from 'react-router-dom';

import Nats from './Nats';
import Dashboard from 'components/Layouts';

const Statistics = ({ match }) => {
  return (
    <Dashboard>
      <Route component={Nats} exact path={`${match.url}/nats`} />
    </Dashboard>
  );
};

export default withRouter(Statistics);
