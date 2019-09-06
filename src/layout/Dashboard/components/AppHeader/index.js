import React, { Fragment } from 'react';
import cx from 'classnames';

import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import HeaderLogo from '../AppLogo';

import SearchBox from './Components/SearchBox';
import UserBox from './Components/UserBox';
import { logout } from 'actions/authActions';
import { history } from 'helpers/history';
import HeaderRightDrawer from './Components/HeaderRightDrawer';

class Header extends React.Component {
  constructor() {
    super();

    this.handleLogout = this.handleLogout.bind(this);
  }
  handleLogout = () => {
    localStorage.clear();

    let params = {
      reason_note: 'User request'
    };
    this.props.onLogout(params);
  };
  render() {
    let {
      headerBackgroundColor,
      enableMobileMenuSmall,
      enableHeaderShadow
    } = this.props;
    return (
      <Fragment>
        <ReactCSSTransitionGroup
          component="div"
          className={cx('app-header', headerBackgroundColor, {
            'header-shadow': enableHeaderShadow
          })}
          transitionName="HeaderAnimation"
          transitionAppear={true}
          transitionAppearTimeout={1500}
          transitionEnter={false}
          transitionLeave={false}>
          <HeaderLogo />

          <div
            className={cx('app-header__content', {
              'header-mobile-open': enableMobileMenuSmall
            })}>
            <div className="app-header-left">
              <SearchBox />
            </div>
            <div className="app-header-right">
              <UserBox
                profile_data={this.props.profile_data}
                handleLogout={this.handleLogout}
              />
            </div>
          </div>
        </ReactCSSTransitionGroup>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  enableHeaderShadow: state.themeOptions.enableHeaderShadow,
  closedSmallerSidebar: state.themeOptions.closedSmallerSidebar,
  headerBackgroundColor: state.themeOptions.headerBackgroundColor,
  enableMobileMenuSmall: state.themeOptions.enableMobileMenuSmall,
  profile_data: state.auth.profile_data.accounts[0]
});
const mapDispatchToProps = dispatch => {
  return { onLogout: params => dispatch(logout(params)) };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
