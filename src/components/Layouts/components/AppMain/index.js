import { Route, Redirect } from 'react-router-dom';
import React, { Suspense, lazy, Fragment } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from 'react-loaders';
import PassportManager from 'components/views/PassportManager';
import ApiKeyManager from 'components/views/ApiKeyManager';
import Statistics from 'components/views/Statistics';
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
        <Route component={Login} path={`${process.env.PUBLIC_URL}/login`} />
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
        <Route
          component={TracerManager}
          path={`${process.env.PUBLIC_URL}/tracer-manager`}
        />
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
        <Route
          component={UserManager}
          path={`${process.env.PUBLIC_URL}/user-manager`}
        />
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
        <Route component={PassportManager} path="/passport-manager" />
      </Suspense>

      {/* ApiKey-manager */}
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
        <Route
          component={ApiKeyManager}
          path={`${process.env.PUBLIC_URL}/apikey-manager`}
        />
      </Suspense>

      {/* ApiKey-manager */}
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
        <Route
          component={Statistics}
          path={`${process.env.PUBLIC_URL}/statistics`}
        />
      </Suspense>

      <Route
        exact
        path={`${process.env.PUBLIC_URL}/`}
        render={() => <Redirect to="/login" />}
      />
      <ToastContainer />
    </Fragment>
  );
};

export default AppMain;
