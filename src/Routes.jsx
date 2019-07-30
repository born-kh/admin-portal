import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';


// Views

import UserManager from './views/UserManager';
import SignIn from './views/SignIn';

import NotFound from './views/NotFound';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import TracerManager from 'views/TracerManager';
import { PrivateRoute } from 'components/PrivateRouter';

export default class Routes extends Component {
 
  render() {
    return (
      <MuiThemeProvider >
      <Switch>
        <Redirect
          exact
          from="/"
          to="/login"
        />
    
       <Route
          component={TracerManager}
      
          path="/tracers"
        />
       <Route
          component={UserManager}
      
          path="/users"
        />
        <Route
          component={UserManager}
      
          path="/users"
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
          component={SignIn}
          exact
          path="/login"
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
