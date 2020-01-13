import React, { Fragment } from 'react';

import Hamburger from 'react-hamburgers';

import PerfectScrollbar from 'react-perfect-scrollbar';

import Drawer from 'react-motion-drawer';

import DrawerBigExample from './TabsContent/DrawerBigExample';

class HeaderRightDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      openLeft: false,
      openRight: false,
      relativeWidth: false,
      width: 450,
      noTouchOpen: false,
      noTouchClose: false
    };
  }

  render() {
    const { openRight } = this.state;

    return (
      <Fragment>
        <Drawer
          className="drawer-content-wrapper p-0"
          noTouchClose={false}
          noTouchOpen={false}
          onChange={open => this.setState({ openRight: open })}
          open={openRight}
          right
          width={450}
        >
          <PerfectScrollbar>
            <div className="drawer-nav-btn">
              <Hamburger
                active={openRight}
                onClick={() =>
                  this.setState({ openRight: false, openLeft: false })
                }
                type="elastic"
              />
            </div>
            <DrawerBigExample />
          </PerfectScrollbar>
        </Drawer>

        <div className="header-btn-lg">
          <Hamburger
            active={openRight}
            onClick={() =>
              this.setState({ openRight: !openRight, openLeft: false })
            }
            type="elastic"
          />
        </div>
      </Fragment>
    );
  }
}

export default HeaderRightDrawer;
