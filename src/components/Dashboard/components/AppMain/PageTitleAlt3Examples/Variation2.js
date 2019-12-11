import React, { Component, Fragment } from 'react';

import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  Nav,
  NavItem,
  NavLink,
  Button,
  UncontrolledTooltip
} from 'reactstrap';

import { faStar, faBusinessTime } from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { toast, Slide } from 'react-toastify';

export default class TitleComponent2 extends Component {
  toggle(name) {
    this.setState({
      [name]: !this.state[name],
      progress: 0.5
    });
  }

  notify22 = () =>
    (this.toastId = toast('Another toastify example!!!', {
      transition: Slide,
      closeButton: true,
      autoClose: 5000,
      position: 'bottom-center',
      type: 'success'
    }));

  render() {
    return (
      <Fragment>
        <Button
          className="btn-shadow mr-3"
          color="dark"
          id="Tooltip-123"
          onClick={this.notify22}
        >
          <FontAwesomeIcon icon={faStar} />
        </Button>
        <UncontrolledTooltip
          placement="left"
          target={'Tooltip-123'}
        >
          Show a Toastify notification example!
        </UncontrolledTooltip>
        <UncontrolledDropdown className="d-inline-block">
          <DropdownToggle
            caret
            className="btn-shadow"
            color="info"
          >
            <span className="btn-icon-wrapper pr-2 opacity-7">
              <FontAwesomeIcon icon={faBusinessTime} />
            </span>
            Buttons
          </DropdownToggle>
          <DropdownMenu right>
            <Nav vertical>
              <NavItem>
                <NavLink href="javascript:void(0);">
                  <i className="nav-link-icon lnr-inbox" />
                  <span>Inbox</span>
                  <div className="ml-auto badge badge-pill badge-secondary">
                    86
                  </div>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="javascript:void(0);">
                  <i className="nav-link-icon lnr-book" />
                  <span>Book</span>
                  <div className="ml-auto badge badge-pill badge-danger">5</div>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="javascript:void(0);">
                  <i className="nav-link-icon lnr-picture" />
                  <span>Picture</span>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  disabled
                  href="javascript:void(0);"
                >
                  <i className="nav-link-icon lnr-file-empty" />
                  <span>File Disabled</span>
                </NavLink>
              </NavItem>
            </Nav>
          </DropdownMenu>
        </UncontrolledDropdown>
      </Fragment>
    );
  }
}
