import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import React, { Suspense, lazy, Fragment } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from 'react-loaders';
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
        }
      >
        <Route
          component={Login}
          path="/login"
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
        }
      >
        <Route
          component={TracerManager}
          path="/tracer-manager"
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
        }
      >
        <Route
          component={UserManager}
          path="/user-manager"
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
        }
      >
        <Route
          component={PassportManager}
          path="/passport-manager"
        />
      </Suspense>

      <Route
        exact
        path="/"
        render={() => <Redirect to="/login" />}
      />
      <ToastContainer />
    </Fragment>
  );
};

export default AppMain;
