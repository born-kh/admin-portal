import React, { Fragment } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import GoogleMapReact from 'google-map-react';
import { faMapMarker } from '@fortawesome/free-solid-svg-icons';
import { Row, Col, Card, CardBody, CardTitle, Container } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const AnyReactComponent = ({ text }) => (
  <div className="font-icon-wrapper text-success">
    <FontAwesomeIcon
      icon={faMapMarker}
      size="4x"
    />
  </div>
);

class GoogleMapsExample extends React.Component {
  constructor() {
    super();
    this.state = {
      center: null,

      zoom: 11
    };
  }

  render() {
    console.log(this.state.center);

    return (
      <Fragment>
        <ReactCSSTransitionGroup
          component="div"
          transitionAppear
          transitionAppearTimeout={0}
          transitionEnter={false}
          transitionLeave={false}
          transitionName="TabsAnimation"
        >
          <Container fluid>
            <Row>
              <Col md="10">
                <Card className="main-card mb-3">
                  <CardBody>
                    <CardTitle>Basic</CardTitle>
                    <div style={{ height: '100vh', width: '100%' }}>
                      <GoogleMapReact
                        defaultCenter={this.props.center}
                        defaultZoom={this.state.zoom}
                      >
                        <AnyReactComponent
                          lat={this.props.center.lat}
                          lng={this.props.center.lng}
                          // text={this.props.userIP + ' is a private IP address'}
                        />
                      </GoogleMapReact>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </ReactCSSTransitionGroup>
      </Fragment>
    );
  }
}

export default GoogleMapsExample;
