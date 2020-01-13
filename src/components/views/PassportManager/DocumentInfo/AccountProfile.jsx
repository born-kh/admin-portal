import React, { Component, Fragment } from 'react';

import PropTypes from 'prop-types';
import LaddaButton, { ZOOM_IN } from 'react-ladda';
import avatar6 from 'assets/utils/images/avatars/2.jpg';
import bg1 from 'assets/utils/images/dropdown-header/abstract1.jpg';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  Input
} from 'reactstrap';

import generator from 'generate-password';
import { connect } from 'react-redux';

import ReactTable from 'react-table';
import { userAPI } from 'service/api';
import { toast, Bounce } from 'react-toastify';
import { withRouter } from 'react-router-dom';

class AccountProfile extends Component {
  state = {
    password: '',
    loading: false
  };
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

  renderBlockList() {
    const { blockList } = this.props;
    if (!blockList || blockList.length === 0) {
      return (
        <div className="dropdown-menu-header">
          <div className="dropdown-menu-header-inner bg-primary">
            <div className="menu-header-content">
              <div>
                <div className="widget-subheading">
                  There are no black list available
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <ReactTable
        className="-striped -highlight"
        columns={[
          {
            columns: [
              {
                Header: 'Account ID',
                accessor: 'account_id'
              }
            ]
          }
        ]}
        data={blockList}
        defaultPageSize={10}
      />
    );
  }

  renderAuth() {
    const { userInfo } = this.props;

    return (
      <ListGroup flush>
        <div>
          <ListGroupItem>
            <b className="text-dark">Has Password: </b>
            {userInfo.auth.hasPassword == true ? 'true' : 'false'}
          </ListGroupItem>
          <ListGroupItem>
            <b className="text-dark">Type: </b>
            {userInfo.auth.passwordType}
          </ListGroupItem>
          <ListGroupItem>
            <b className="text-dark">Status: </b>
            {userInfo.auth.status}
          </ListGroupItem>
        </div>
      </ListGroup>
    );
  }

  handleChangePassword = event => {
    this.setState({ password: event.target.value });
  };

  handleGeneratePassword = event => {
    this.setState({
      password: generator.generate({
        length: 10,
        numbers: true
      })
    });
  };

  handleSetPassword = event => {
    const { password, userInfo } = this.props;
    this.setState({ loading: true });
    let params = {
      password: password,
      accountID: userInfo.accountID
    };

    userAPI
      .setPassword(params)
      .then(response => {
        if (response.status === 200) {
          this.setState({ loading: false, password: '' });
          toast('success', {
            transition: Bounce,
            closeButton: true,
            autoClose: 5000,
            position: 'bottom-right',
            type: 'success'
          });
        }
      })
      .catch(error => {
        this.setState({ loading: false, password: '' });
        toast(error.message, {
          transition: Bounce,
          closeButton: true,
          autoClose: 5000,
          position: 'bottom-right',
          type: 'error'
        });
      });
  };

  render() {
    const { userInfo } = this.props;
    const { password, loading } = this.state;
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
                xl="3"
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
                                userInfo.avatar !== undefined
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
                xl="3"
              >
                <Card className="card-shadow-primary card-border mb-3">
                  <CardHeader> User Phones</CardHeader>
                  <CardBody className="p-0">{this.renderPhones()}</CardBody>
                </Card>
              </Col>
              <Col
                lg="6"
                md="12"
                xl="3"
              >
                <Card className="card-shadow-primary card-border mb-3">
                  <CardHeader> User Emails</CardHeader>
                  <CardBody className="p-0">{this.renderEmails()}</CardBody>
                </Card>
              </Col>

              <Col
                lg="6"
                md="12"
                xl="3"
              >
                <Card className="card-shadow-primary card-border mb-3">
                  <CardHeader> Black List</CardHeader>
                  <CardBody className="p-0">{this.renderBlockList()}</CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </ReactCSSTransitionGroup>
      </Fragment>
    );
  }
}

AccountProfile.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

// const mapStateToProps = (state, ownProps) => {
//   let id = ownProps.match.params.accountID;

//   return {
//     user: state.user.users.find(user => user.accountID === id)
//   };
// };

export default AccountProfile;
