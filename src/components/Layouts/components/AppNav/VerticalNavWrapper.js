import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';

import MetisMenu from 'react-metismenu';
import { MainNav } from './NavItems';
import RouterLink from 'react-metismenu-router-link';

class Nav extends Component {
  render() {
    return (
      <Fragment>
        <h5 className="app-sidebar__heading">Menu</h5>
        <MetisMenu
          activeLinkFromLocation
          className="vertical-nav-menu"
          classNameStateIcon="pe-7s-angle-down"
          content={MainNav}
          iconNamePrefix=""
          LinkComponent={RouterLink}
        />
      </Fragment>
    );
  }

  isPathActive(path) {
    return this.props.location.pathname.startsWith(path);
  }
}

export default withRouter(Nav);
