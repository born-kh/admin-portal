import React from 'react';
import { Route } from 'react-router-dom';
import TracerList from './TracerList';
import { GET_PERMISSIONS } from 'constants/apiURL';
import { instance } from 'helpers';
import { SESSION_DATA } from 'constants/localStorage';
import { authHeader } from 'helpers/instance';

class TracerManager extends React.Component {
  render() {
    console.log(authHeader());
    return (
      <>
        <Route exact path="/tracers" component={TracerList} />
      </>
    );
  }
}

export default TracerManager;
