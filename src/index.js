import React from 'react';
import ReactDOM from 'react-dom';

// Service worker
import * as serviceWorker from './serviceWorker';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { history } from 'helpers/history';
import store from 'store/store';
import Main from 'components/views/Main';
import './assets/base.scss';
const rootElement = document.getElementById('root');
console.log(process.env);
const renderApp = Component => {
  ReactDOM.render(
    <Provider store={store}>
      <Router history={history}>
        <Component />
      </Router>
    </Provider>,
    rootElement
  );
};

renderApp(Main);

if (module.hot) {
  module.hot.accept('components/views/Main', () => {
    const NextApp = require('components/views/Main').default;
    renderApp(NextApp);
  });
}

serviceWorker.unregister();
