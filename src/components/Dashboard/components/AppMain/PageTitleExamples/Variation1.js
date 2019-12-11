import React, { Component, Fragment } from 'react';

import LaddaButton, { ZOOM_IN } from 'react-ladda';

import { Button, UncontrolledTooltip } from 'reactstrap';

import { toast, Slide } from 'react-toastify';

import { faBatteryThreeQuarters } from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class TitleComponent1 extends Component {
  state = {
    expZoomIn: false
  };

  toggle(name) {
    this.setState({
      [name]: !this.state[name],
      progress: 0.5
    });
  }

  notify22 = () =>
    (this.toastId = toast('You can add whatever element in this section.', {
      transition: Slide,
      closeButton: true,
      autoClose: 5000,
      position: 'bottom-center',
      type: 'default'
    }));

  render() {
    return (
      <Fragment>
        <Button
          className="btn-pill btn-shadow mr-3"
          color="info"
          id="Tooltip-123"
          onClick={this.notify22}
        >
          <FontAwesomeIcon icon={faBatteryThreeQuarters} />
        </Button>
        <UncontrolledTooltip
          placement="left"
          target={'Tooltip-123'}
        >
          Show a Toastify notification example!
        </UncontrolledTooltip>
        <LaddaButton
          className="btn btn-shadow btn-pill btn-focus"
          data-style={ZOOM_IN}
          loading={this.state.expZoomIn}
          onClick={() => this.toggle('expZoomIn')}
        >
          Button Loading
        </LaddaButton>
      </Fragment>
    );
  }
}
