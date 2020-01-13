import React, { Fragment } from 'react';
import cx from 'classnames';

import { connect } from 'react-redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import HeaderLogo from '../AppLogo';

import SearchBox from './Components/SearchBox';
import UserBox from './Components/UserBox';
import { logout } from 'store/actions/authActions';

class Header extends React.Component {
  constructor() {
    super();

    this.handleLogout = this.handleLogout.bind(this);
  }
  handleLogout = () => {
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
          className={cx('app-header', headerBackgroundColor, {
            'header-shadow': enableHeaderShadow
          })}
          component="div"
          transitionAppear
          transitionAppearTimeout={1500}
          transitionEnter={false}
          transitionLeave={false}
          transitionName="HeaderAnimation"
        >
          <HeaderLogo />

          <div
            className={cx('app-header__content', {
              'header-mobile-open': enableMobileMenuSmall
            })}
          >
            <div className="app-header-left">
              <SearchBox />
            </div>
            <div className="app-header-right">
              <UserBox
                handleLogout={this.handleLogout}
                profile_data={this.props.profile_data}
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
