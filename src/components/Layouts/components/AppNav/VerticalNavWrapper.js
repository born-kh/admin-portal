import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';

import MetisMenu from 'react-metismenu';
import { MainNav } from './NavItems';
import { PERMISSIONS } from 'constants/localStorage';
class Nav extends Component {
  state = {};

  render() {
    let permissions = JSON.parse(localStorage.getItem(PERMISSIONS));

    return (
      <Fragment>
        <h5 className="app-sidebar__heading">Menu</h5>
        <MetisMenu
          activeLinkFromLocation
          className="vertical-nav-menu"
          classNameStateIcon="pe-7s-angle-down"
          content={MainNav}
          iconNamePrefix=""
        />

        {/* <MetisMenu
          activeLinkFromLocation
          className="vertical-nav-menu"
          classNameStateIcon="pe-7s-angle-down"
          content={MainNavvv}
          iconNamePrefix=""
        /> */}
      </Fragment>
    );
  }

  isPathActive(path) {
    return this.props.location.pathname.startsWith(path);
  }
}

export default withRouter(Nav);
