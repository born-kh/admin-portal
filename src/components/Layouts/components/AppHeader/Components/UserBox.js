import React, { Fragment } from 'react';
import {
  DropdownToggle,
  DropdownMenu,
  Button,
  UncontrolledButtonDropdown
} from 'reactstrap';

import { toast, Bounce } from 'react-toastify';

import { faAngleDown } from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import city3 from 'assets/utils/images/dropdown-header/city3.jpg';

class UserBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false
    };
  }

  notify2 = () =>
    (this.toastId = toast(
      'You don\'t have any new items in your calendar for today! Go out and play!',
      {
        transition: Bounce,
        closeButton: true,
        autoClose: 5000,
        position: 'bottom-center',
        type: 'success'
      }
    ));

  render() {
    const { profile_data } = this.props;

    return (
      <Fragment>
        <div className="header-btn-lg pr-0">
          <div className="widget-content p-0">
            <div className="widget-content-wrapper">
              <div className="widget-content-left">
                <UncontrolledButtonDropdown>
                  <DropdownToggle
                    className="p-0"
                    color="link"
                  >
                    <img
                      alt=""
                      className="rounded-circle"
                      src={
                        profile_data.avatar !== undefined
                          ? `https://wssdev.nexustls.com/files/file/${profile_data.avatar}/medium`
                          : ''
                      }
                      width={42}
                    />
                    <FontAwesomeIcon
                      className="ml-2 opacity-8"
                      icon={faAngleDown}
                    />
                  </DropdownToggle>
                  <DropdownMenu
                    className="rm-pointers dropdown-menu-lg"
                    right
                  >
                    <div className="dropdown-menu-header">
                      <div className="dropdown-menu-header-inner bg-info">
                        <div
                          className="menu-header-image opacity-2"
                          style={{
                            backgroundImage: 'url(' + city3 + ')'
                          }}
                        />
                        <div className="menu-header-content text-left">
                          <div className="widget-content p-0">
                            <div className="widget-content-wrapper">
                              <div className="widget-content-left mr-3">
                                <img
                                  alt=""
                                  className="rounded-circle"
                                  src={
                                    profile_data.avatar !== undefined
                                      ? `https://wssdev.nexustls.com/files/file/${profile_data.avatar}/medium`
                                      : ''
                                  }
                                  width={42}
                                />
                              </div>
                              <div className="widget-content-left">
                                <div className="widget-heading">
                                  {profile_data.firstName}{' '}
                                  {profile_data.lastName}
                                </div>
                                <div className="widget-subheading opacity-8">
                                  A short profile description
                                </div>
                              </div>
                              <div className="widget-content-right mr-2">
                                <Button
                                  className="btn-pill btn-shadow btn-shine"
                                  color="focus"
                                  onClick={this.props.handleLogout}
                                >
                                  Logout
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </DropdownMenu>
                </UncontrolledButtonDropdown>
              </div>
              <div className="widget-content-left  ml-3 header-user-info">
                <div className="widget-heading">
                  {profile_data.firstName} {profile_data.lastName}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default UserBox;
