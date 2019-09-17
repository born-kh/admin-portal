import React from 'react';
import Loader from 'react-loaders';

const LoaderOverlay = () => (
  <div className="loader-container">
    <div className="loader-container-inner">
      <div className="text-center">
        <Loader type="ball-pulse-rise" />
      </div>
      <h6 className="mt-5">
        Please wait while we load all the Components examples
        <small>
          Because this is a demonstration we load at once all the Components
          examples. This wouldn't happen in a real live app!
        </small>
      </h6>
    </div>
  </div>
);

export default LoaderOverlay;
