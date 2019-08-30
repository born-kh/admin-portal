import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { ThemeProvider } from '@material-ui/styles';
import theme from './theme';
import 'react-perfect-scrollbar/dist/css/styles.css';
import './assets/scss/index.scss';
import Routes from './Routes';
import { history } from 'helpers/history';

export default class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <BrowserRouter history={history}>
          <Routes />
        </BrowserRouter>
      </ThemeProvider>
    );
  }
}
