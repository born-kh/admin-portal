import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';

import Nav from '../../../common/Nav';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import PerfectScrollbar from 'react-perfect-scrollbar';
import HeaderLogo from '../AppLogo';

import { setEnableMobileMenu } from '../../../../store/actions/themeOptionsActions';
import { MainNav } from '../AppNav/NavItems';

class AppSidebar extends Component {
  toggleMobileSidebar = () => {
    let { enableMobileMenu, setEnableMobileMenu } = this.props;
    setEnableMobileMenu(!enableMobileMenu);
  };

  render() {
    let {
      backgroundColor,
      enableBackgroundImage,
      enableSidebarShadow,
      backgroundImage,
      backgroundImageOpacity
    } = this.props;

    return (
      <Fragment>
        <div
          className="sidebar-mobile-overlay"
          onClick={this.toggleMobileSidebar}
        />
        <ReactCSSTransitionGroup
          className={cx('app-sidebar', backgroundColor, {
            'sidebar-shadow': enableSidebarShadow
          })}
          component="div"
          transitionAppear
          transitionAppearTimeout={1500}
          transitionEnter={false}
          transitionLeave={false}
          transitionName="SidebarAnimation"
        >
          <HeaderLogo />
          <PerfectScrollbar>
            <div className="app-sidebar__inner">
              <Nav content={MainNav} />
            </div>
          </PerfectScrollbar>
          <div
            className={cx('app-sidebar-bg', backgroundImageOpacity)}
            style={{
              backgroundImage: enableBackgroundImage
                ? 'url(' + backgroundImage + ')'
                : null
            }}
          />
        </ReactCSSTransitionGroup>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  enableBackgroundImage: state.themeOptions.enableBackgroundImage,
  enableSidebarShadow: state.themeOptions.enableSidebarShadow,
  enableMobileMenu: state.themeOptions.enableMobileMenu,
  backgroundColor: state.themeOptions.backgroundColor,
  backgroundImage: state.themeOptions.backgroundImage,
  backgroundImageOpacity: state.themeOptions.backgroundImageOpacity
});

const mapDispatchToProps = dispatch => ({
  setEnableMobileMenu: enable => dispatch(setEnableMobileMenu(enable))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppSidebar);
