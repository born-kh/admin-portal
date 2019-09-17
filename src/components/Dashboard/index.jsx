import React, { Fragment } from 'react';
import AppHeader from './components/AppHeader';
import AppSidebar from './components/AppSidebar';
import AppFooter from './components/AppFooter';
import ThemeOptions from './components/ThemeOptions';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

class Dashboard extends React.Component {
  render() {
    const { isAuth } = this.props;
    if (!isAuth) {
      return <Redirect to="/" />;
    }
    return (
      <Fragment>
        <ThemeOptions />
        <AppHeader />
        <div className="app-main">
          <AppSidebar />
          <div className="app-main__outer">
            <div className="app-main__inner">{this.props.children}</div>
            <div className="app-wrapper-footer">
              <AppFooter />
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  isAuth: state.auth.isAuth
});

export default connect(mapStateToProps)(Dashboard);
