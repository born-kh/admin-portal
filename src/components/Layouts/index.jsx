import React, { Fragment } from 'react';
import AppHeader from './components/AppHeader';
import AppSidebar from './components/AppSidebar';
//import ThemeOptions from './components/ThemeOptions';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';

class Dashboard extends React.Component {
  render() {
    const { isAuth } = this.props;

    if (!isAuth) {
      return <Redirect to="/" />;
    }
    return (
      <Fragment>
        {/* <ThemeOptions /> */}
        <AppHeader />
        <div className="app-main">
          <AppSidebar />
          <div className="app-main__outer">
            <div className="app-main__inner">{this.props.children}</div>
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  isAuth: state.auth.isAuth
});
const withRouterDashboard = withRouter(Dashboard);

export default connect(mapStateToProps)(withRouterDashboard);
