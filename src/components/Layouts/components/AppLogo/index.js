import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import Hamburger from 'react-hamburgers';
import AppMobileMenu from '../AppMobileMenu';
import {
  setEnableClosedSidebar,
  setEnableMobileMenu,
  setEnableMobileMenuSmall
} from '../../../../store/actions/themeOptionsActions';

class HeaderLogo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      mobile: false,
      activeSecondaryMenuMobile: false
    };
  }

  toggleEnableClosedSidebar = () => {
    let { enableClosedSidebar, setEnableClosedSidebar } = this.props;
    setEnableClosedSidebar(!enableClosedSidebar);
  };

  state = {
    openLeft: false,
    openRight: false,
    relativeWidth: false,
    width: 280,
    noTouchOpen: false,
    noTouchClose: false
  };

  render() {
    let { enableClosedSidebar } = this.props;

    return (
      <Fragment>
        <div className="app-header__logo">
          <div className="logo-src" />

          <div className="header__pane ml-auto">
            <div onClick={this.toggleEnableClosedSidebar}>
              <Hamburger
                active={enableClosedSidebar}
                onClick={() => this.setState({ active: !this.state.active })}
                type="elastic"
              />
            </div>
          </div>
        </div>
        <AppMobileMenu />
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  enableClosedSidebar: state.themeOptions.enableClosedSidebar,
  enableMobileMenu: state.themeOptions.enableMobileMenu,
  enableMobileMenuSmall: state.themeOptions.enableMobileMenuSmall
});

const mapDispatchToProps = dispatch => ({
  setEnableClosedSidebar: enable => dispatch(setEnableClosedSidebar(enable)),
  setEnableMobileMenu: enable => dispatch(setEnableMobileMenu(enable)),
  setEnableMobileMenuSmall: enable => dispatch(setEnableMobileMenuSmall(enable))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HeaderLogo);
