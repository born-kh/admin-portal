import React from 'react';
import { Route, Switch } from 'react-router-dom';
import TracerList from './TracerList';

import { GET_PERMISSIONS } from 'constants/apiURL';
import { instance } from 'helpers';
import { SESSION_DATA } from 'constants/localStorage';
import { authHeader } from 'helpers/instance';
import Tracers from './Tracers';
import Dashboard from 'layout/Dashboard';

const TracerManager = ({ match }) => {
  return (
    <Dashboard>
      <Route exact path={`${match.url}/tracers`} component={Tracers} />
    </Dashboard>
  );
};

export default TracerManager;
