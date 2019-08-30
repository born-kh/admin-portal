import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { PROFILE_DATA, SESSION_DATA } from 'constants/localStorage';

export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      localStorage.getItem(SESSION_DATA) ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{ pathname: '/login', state: { from: props.location } }}
        />
      )
    }
  />
);
