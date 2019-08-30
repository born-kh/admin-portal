import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

// Views

import UserManager from './views/UserManager';
import SignIn from './views/SignIn';

import NotFound from './views/NotFound';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TracerManager from 'views/TracerManager';
import PassportManager from 'views/PassportManager';
import { PrivateRoute } from 'components/PrivateRouter';

export default class Routes extends Component {
  // componentDidMount() {
  //   console.log('primeerr');
  //   const { history } = this.props;
  //   let session_data = JSON.parse(localStorage.getItem('session_data'));
  //   if (session_data) {
  //     var newDate = new Date();
  //     var lastDate = new Date(session_data.expire_ts);

  //     var diff = (lastDate.getTime() - newDate.getTime()) / 1000;
  //     if (diff > session_data.expiration) {
  //       localStorage.setItem('isAuthenticated', false);
  //       localStorage.removeItem('profile');
  //       localStorage.removeItem('session');
  //       history.push('/');
  //     }
  //   }
  // }
  render() {
    console.log('primeerr');
    return (
      <MuiThemeProvider>
        <Switch>
          <Redirect exact from="/" to="/login" />

          <PrivateRoute component={TracerManager} path="/tracers" />
          <PrivateRoute component={UserManager} path="/users" />
          <Route component={PassportManager} path="/new-docs" />

          <Route exact path="/typography" />
          <Route exact path="/icons" />
          <Route exact path="/account" />
          <Route exact path="/settings" />

          <Route component={SignIn} exact path="/login" />
          <Route exact path="/under-development" />
          <Route component={NotFound} exact path="/not-found" />
          <Redirect to="/not-found" />
        </Switch>
      </MuiThemeProvider>
    );
  }
}
