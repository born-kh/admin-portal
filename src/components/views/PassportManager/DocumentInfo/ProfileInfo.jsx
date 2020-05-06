import React, { Fragment } from 'react';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Loader from 'react-loaders';
import { fetchApplicationsByAccount } from 'store/actions/userActions';
import ApplicationTable from 'components/views/UserManager/AccountInfo/ApplicationTable';

import avatar6 from 'assets/utils/images/avatars/2.jpg';
import bg1 from 'assets/utils/images/dropdown-header/abstract1.jpg';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {
  Card,
  CardBody,
  CardHeader,
  Row,
  Col,
  ListGroup,
  ListGroupItem
} from 'reactstrap';

class ProfileInfo extends React.Component {
  componentDidMount() {
    this.props.fetchApllicationsByAccount({
      accountID: this.props.userInfo.accountID
    });
  }

  renderPhones() {
    const { userInfo } = this.props;
    if (!userInfo.phones || userInfo.phones.length === 0) {
      return (
        <div className="dropdown-menu-header">
          <div className="dropdown-menu-header-inner bg-primary">
            <div className="menu-header-content">
              <div className="widget-subheading">
                There are no phones available
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <ListGroup flush>
        {userInfo.phones.map((phone, i) => (
          <ListGroupItem>
            <div className="widget-content p-0">
              <div className="widget-content-wrapper">
                <div className="widget-content-left">
                  <div className="widget-heading">
                    <b className="text-dark">Number: </b>
                    {phone.number}
                  </div>
                  <div className="widget-subheading">
                    <b className="text-dark">Type: </b>
                    {phone.type}
                  </div>
                </div>
              </div>
            </div>
          </ListGroupItem>
        ))}
      </ListGroup>
    );
  }

  renderEmails() {
    const { userInfo } = this.props;
    if (!userInfo.emails || userInfo.emails.length === 0) {
      return (
        <div className="dropdown-menu-header">
          <div className="dropdown-menu-header-inner bg-primary">
            <div className="menu-header-content">
              <div>
                <div className="widget-subheading">
                  There are no emails available
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <ListGroup flush>
        {userInfo.emails.map((email, i) => (
          <ListGroupItem>
            <div className="widget-content p-0">
              <div className="widget-content-wrapper">
                <div className="widget-content-left">
                  <div className="widget-heading">
                    <b className="text-dark">Email: </b>
                    {email.email}
                  </div>
                  <div className="widget-subheading">
                    <b className="text-dark">Type: </b>
                    {email.type}
                  </div>
                </div>
              </div>
            </div>
          </ListGroupItem>
        ))}
      </ListGroup>
    );
  }

  renderTable() {
    const { pending, error, applications } = this.props;
    console.log(this.props);

    if (pending) {
      return (
        <div className="text-center">
          <Loader type="ball-scale" />
        </div>
      );
    }
    if (error) {
      return (
        <div className="widget-content">
          <div className="widget-content-wrapper">
            <div className="widget-content-right ml-0 mr-3">
              <div className="widget-subheading">{error}</div>
            </div>
          </div>
        </div>
      );
    }

    if (applications.length === 0) {
      return (
        <div className="widget-content">
          <div className="widget-content-wrapper">
            <div className="widget-content-right ml-0 mr-3">
              <div className="widget-subheading">There are no applications</div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <ApplicationTable
          applications={applications}
          rows={applications.length}
        />
      );
    }
  }
  render() {
    const { userInfo } = this.props;
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
          <div>
            <Row>
              <Col
                lg="6"
                md="12"
                xl="12"
              >
                <Card className="card-shadow-primary card-border mb-3">
                  <CardHeader> Application Table</CardHeader>
                  <CardBody className="p-0">{this.renderTable()}</CardBody>
                </Card>
              </Col>
              <Col
                lg="6"
                md="12"
                xl="4"
              >
                <Card className="card-shadow-primary profile-responsive card-border mb-3">
                  <CardHeader>Profile info</CardHeader>
                  <div className="dropdown-menu-header">
                    <div className="dropdown-menu-header-inner bg-info">
                      <div
                        className="menu-header-image opacity-2"
                        style={{
                          backgroundImage: 'url(' + bg1 + ')'
                        }}
                      />
                      <div className="menu-header-content btn-pane-right">
                        <div className="avatar-icon-wrapper mr-2 avatar-icon-xl">
                          <div className="avatar-icon rounded">
                            <img
                              alt="Avatar 5"
                              src={
                                userInfo && userInfo.avatar !== undefined
                                  ? `https://wssdev.nexustls.com/files/file/${userInfo.avatar}/medium`
                                  : avatar6
                              }
                            />
                          </div>
                        </div>
                        <div>
                          <h5 className="menu-header-title">
                            {userInfo.firstName} {userInfo.lastName}
                          </h5>
                        </div>
                      </div>
                    </div>
                  </div>
                  <CardBody className="p-0">
                    <ListGroup flush>
                      <ListGroupItem>
                        <b className="text-dark">First Name: </b>
                        {userInfo.firstName}
                      </ListGroupItem>
                      <ListGroupItem>
                        <b className="text-dark">Last Name: </b>
                        {userInfo.lastName}
                      </ListGroupItem>
                      <ListGroupItem>
                        <b className="text-dark">User Name: </b>
                        {userInfo.username}
                      </ListGroupItem>
                      <ListGroupItem>
                        <b className="text-dark">Account ID: </b>
                        {userInfo.accountID}
                      </ListGroupItem>
                    </ListGroup>
                  </CardBody>
                </Card>
              </Col>
              <Col
                lg="6"
                md="12"
                xl="4"
              >
                <Card className="card-shadow-primary card-border mb-3">
                  <CardHeader> User Phones</CardHeader>
                  <CardBody className="p-0">{this.renderPhones()}</CardBody>
                </Card>
              </Col>
              <Col
                lg="6"
                md="12"
                xl="4"
              >
                <Card className="card-shadow-primary card-border mb-3">
                  <CardHeader> User Emails</CardHeader>
                  <CardBody className="p-0">{this.renderEmails()}</CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </ReactCSSTransitionGroup>
      </Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    applications: state.user.applications,
    pending: state.user.pendingApplication,
    error: state.user.errorApplication
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchApllicationsByAccount: params =>
      dispatch(fetchApplicationsByAccount(params))
  };
};

const WithRouterProfileInfo = withRouter(ProfileInfo);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WithRouterProfileInfo);
