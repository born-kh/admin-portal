import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';
import { withRouter } from 'react-router-dom';
import ReactTimeout from 'react-timeout';
import ResizeDetector from 'react-resize-detector';

import AppMain from '../../Layouts/components/AppMain';
import { SESSION_DATA, SESSION_TOKEN, PROFILE_DATA } from 'constants/index';
import { logout } from 'store/actions/authActions';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      closedSmallerSidebar: false
    };
  }

  componentDidMount() {
    this.checkAuth();
  }
  handleLogout = () => {
    console.log('logout');
    let params = {
      reason_note: 'User request'
    };
    this.props.onLogout(params);
  };
  checkAuth = session_data => {
    if (session_data) {
      var newDate = new Date();
      var lastDate = new Date(session_data.expire_ts);
      var diff = lastDate.getTime() - newDate.getTime();
      console.log(diff);
      if (diff > 0) {
        this.props.setTimeout(this.handleLogout, diff);
      } else {
        this.handleLogout();
      }
    }
  };

  render() {
    let session_data = JSON.parse(localStorage.getItem(SESSION_DATA));
    if (session_data) {
      this.checkAuth(session_data);
    }
    let {
      colorScheme,
      enableFixedHeader,
      enableFixedSidebar,
      enableFixedFooter,
      enableClosedSidebar,
      closedSmallerSidebar,
      enableMobileMenu,
      enablePageTabsAlt
    } = this.props;

    return (
      <ResizeDetector
        handleWidth
        render={({ width }) => (
          <Fragment>
            <div
              className={cx(
                'app-container app-theme-' + colorScheme,
                { 'fixed-header': enableFixedHeader },
                { 'fixed-sidebar': enableFixedSidebar || width < 1250 },
                { 'fixed-footer': enableFixedFooter },
                { 'closed-sidebar': enableClosedSidebar || width < 1250 },
                {
                  'closed-sidebar-mobile': closedSmallerSidebar || width < 1250
                },
                { 'sidebar-mobile-open': enableMobileMenu },
                { 'body-tabs-shadow-btn': enablePageTabsAlt }
              )}
            >
              <AppMain />
            </div>
          </Fragment>
        )}
      />
    );
  }
}

const mapStateToProp = state => ({
  colorScheme: state.themeOptions.colorScheme,
  enableFixedHeader: state.themeOptions.enableFixedHeader,
  enableMobileMenu: state.themeOptions.enableMobileMenu,
  enableFixedFooter: state.themeOptions.enableFixedFooter,
  enableFixedSidebar: state.themeOptions.enableFixedSidebar,
  enableClosedSidebar: state.themeOptions.enableClosedSidebar,
  enablePageTabsAlt: state.themeOptions.enablePageTabsAlt
});

const mapDispatchToProps = dispatch => {
  return { onLogout: params => dispatch(logout(params)) };
};

const TimeOutMain = ReactTimeout(Main);
export default withRouter(
  connect(
    mapStateToProp,
    mapDispatchToProps
  )(TimeOutMain)
);
