import React from 'react';
import { Route, withRouter } from 'react-router-dom';

import Dashboard from 'components/Layouts';
import Nats from '../Statistics/Nats';

const Statistics = ({ match }) => {
  return (
    <Dashboard>
      <Route component={Nats} exact path={`${match.url}/nats`} />
    </Dashboard>
  );
};

export default withRouter(Statistics);
