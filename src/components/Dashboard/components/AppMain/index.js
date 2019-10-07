import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import React, { Suspense, lazy, Fragment } from 'react';
import Loader from 'react-loaders';

import { ToastContainer } from 'react-toastify';
import PassportManager from 'components/views/PassportManager';
const Login = lazy(() => import('components/views/Login'));
const TracerManager = lazy(() => import('components/views/TracerManager'));
const UserManager = lazy(() => import('components/views/UserManager'));

const AppMain = () => {
  return (
    <Fragment>
      {/* Login */}

      <Suspense
        fallback={
          <div className="loader-container">
            <div className="loader-container-inner">
              <div className="text-center">
                <Loader type="ball-pulse-rise" />
              </div>
              <h6 className="mt-5">
                Please wait while we load all the Components examples
                <small>
                  Because this is a demonstration we load at once all the
                  Components examples. This wouldn't happen in a real live app!
                </small>
              </h6>
            </div>
          </div>
        }>
        <Route path="/login" component={Login} />
      </Suspense>
      {/* Tracer-manager */}
      <Suspense
        fallback={
          <div className="loader-container">
            <div className="loader-container-inner">
              <div className="text-center">
                <Loader type="ball-pulse-rise" />
              </div>
              <h6 className="mt-5">
                Please wait while we load all the Components examples
                <small>
                  Because this is a demonstration we load at once all the
                  Components examples. This wouldn't happen in a real live app!
                </small>
              </h6>
            </div>
          </div>
        }>
        <Route path="/tracer-manager" component={TracerManager} />
      </Suspense>

      {/* Tracer-manager */}
      <Suspense
        fallback={
          <div className="loader-container">
            <div className="loader-container-inner">
              <div className="text-center">
                <Loader type="ball-pulse-rise" />
              </div>
              <h6 className="mt-5">
                Please wait while we load all the Components examples
                <small>
                  Because this is a demonstration we load at once all the
                  Components examples. This wouldn't happen in a real live app!
                </small>
              </h6>
            </div>
          </div>
        }>
        <Route path="/user-manager" component={UserManager} />
      </Suspense>

      {/* Tracer-manager */}
      <Suspense
        fallback={
          <div className="loader-container">
            <div className="loader-container-inner">
              <div className="text-center">
                <Loader type="ball-pulse-rise" />
              </div>
              <h6 className="mt-5">
                Please wait while we load all the Components examples
                <small>
                  Because this is a demonstration we load at once all the
                  Components examples. This wouldn't happen in a real live app!
                </small>
              </h6>
            </div>
          </div>
        }>
        <Route path="/passport-manager" component={PassportManager} />
      </Suspense>

      <Route exact path="/" render={() => <Redirect to="/login" />} />
    </Fragment>
  );
};

export default AppMain;
