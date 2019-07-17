import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

// Views

import UserManager from './views/UserManager';


import SignUp from './views/SignUp';
import SignIn from './views/SignIn';

import NotFound from './views/NotFound';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import TracerManager from 'views/TracerManager';

export default class Routes extends Component {
 
  render() {
    return (
      <MuiThemeProvider >
      <Switch>
        <Redirect
          exact
          from="/"
          to="/tracers"
        />
        <Route
          component={TracerManager}
          exact
          path="/tracers"
        />
        <Route
          component={UserManager}
      
          path="/users"
        />
        <Route
          component={TracerManager}
          path="/tracers"
        />
        <Route
         
          exact
          path="/typography"
        />
        <Route
  
          exact
          path="/icons"
        />
        <Route
      
          exact
          path="/account"
        />
        <Route
       
          exact
          path="/settings"
        />
        <Route
          component={SignUp}
          exact
          path="/sign-up"
        />
        <Route
          component={SignIn}
          exact
          path="/sign-in"
        />
        <Route
      
          exact
          path="/under-development"
        />
        <Route
          component={NotFound}
          exact
          path="/not-found"
        />
        <Redirect to="/not-found" />
      </Switch>
      </MuiThemeProvider>
    );
  }
}
