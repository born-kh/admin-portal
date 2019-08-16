import React from 'react';
import { Route } from 'react-router-dom';
import TracerList from './TracerList';

class TracerManager extends React.Component {
  render() {
    return (
      <>
        <Route exact path="/tracers" component={TracerList} />
      </>
    );
  }
}

export default TracerManager;
