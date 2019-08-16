import React from 'react';
import { Route } from 'react-router-dom';
import AccountList from './AccountList';

class PassportManager extends React.Component {
  render() {
    return (
      <>
        <Route exact path="/new-docs" component={AccountList} />
      </>
    );
  }
}

export default PassportManager;
