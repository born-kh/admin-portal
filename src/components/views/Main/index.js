import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';
import { withRouter } from 'react-router-dom';
import ReactTimeout from 'react-timeout';
import ResizeDetector from 'react-resize-detector';

import AppMain from '../../Layouts/components/AppMain';
import { logout, checkSessionToken } from 'store/actions/authActions';
import LoaderOverlay from 'components/common/LoaderOverlay';
import Login from '../Login';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      closedSmallerSidebar: false,
      checkingToken: true
    };
  }

  handleLogout = () => {
    this.props.onLogout({
      reason_note: 'User request'
    });
  };

  componentDidMount() {
    this.props.checkSessionToken().then(() => {
      this.setState({ checkingToken: false });
    });
  }

  render() {
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

    if (this.state.checkingToken) {
      return <LoaderOverlay />;
    }

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
              {this.props.isAuth ? <AppMain /> : <Login />}
            </div>
          </Fragment>
        )}
      />
    );
  }
}

const mapStateToProp = state => ({
  isAuth: state.auth.isAuth,
  colorScheme: state.themeOptions.colorScheme,
  enableFixedHeader: state.themeOptions.enableFixedHeader,
  enableMobileMenu: state.themeOptions.enableMobileMenu,
  enableFixedFooter: state.themeOptions.enableFixedFooter,
  enableFixedSidebar: state.themeOptions.enableFixedSidebar,
  enableClosedSidebar: state.themeOptions.enableClosedSidebar,
  enablePageTabsAlt: state.themeOptions.enablePageTabsAlt
});

const mapDispatchToProps = dispatch => {
  return {
    onLogout: params => dispatch(logout(params)),
    checkSessionToken: () => dispatch(checkSessionToken())
  };
};

const TimeOutMain = ReactTimeout(Main);
export default withRouter(
  connect(mapStateToProp, mapDispatchToProps)(TimeOutMain)
);
