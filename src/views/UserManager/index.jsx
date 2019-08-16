import React from 'react';
import { Route } from 'react-router-dom';
import UserList from './UserList';
import Account from './Account';

class UserManager extends React.Component {
  render() {
    return (
      <>
        <Route exact path="/users" component={UserList} />
        <Route path="/users/:accountID" component={Account} />
      </>
    );
  }
}

export default UserManager;
