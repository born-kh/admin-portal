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
import SessionTable from '../SessionTable';
import ReactTable from 'react-table';
import { userAPI } from 'service/api';
import { toast, Bounce } from 'react-toastify';
class AccountProfile extends Component {
  state = {
    password: '',
    loading: false
  };
  renderPhones() {
    const { userInfo } = this.props;
    if (userInfo.phones.length === 0) {
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
    if (userInfo.emails.length === 0) {
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
    if (blockList.length === 0) {
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
        data={blockList}
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
        defaultPageSize={10}
        className="-striped -highlight"
      />
    );
  }

  renderAuth() {
    const { userInfo } = this.props;

    return (
      <ListGroup flush>
        {userInfo.auth.map(row => (
          <div>
            <ListGroupItem>
              <b className="text-dark">Has Password: </b>
              {row.hasPassword == true ? 'true' : 'false'}
            </ListGroupItem>
            <ListGroupItem>
              <b className="text-dark">Type: </b>
              {row.passwordType}
            </ListGroupItem>
            <ListGroupItem>
              <b className="text-dark">Status: </b>
              {row.status}
            </ListGroupItem>
          </div>
        ))}
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
    this.setState({ loading: true });
    let params = {
      password: this.state.password,
      accountID: this.props.userInfo.accountI
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
    console.log(this.props);
    return (
      <Fragment>
        <ReactCSSTransitionGroup
          component="div"
          transitionName="TabsAnimation"
          transitionAppear={true}
          transitionAppearTimeout={0}
          transitionEnter={false}
          transitionLeave={false}>
          <div>
            <Row>
              <Col md="12" lg="6" xl="3">
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
                              src={
                                this.props.userInfo.avatar !== undefined
                                  ? `https://wssdev.nexustls.com/files/file/${this.props.userInfo.avatar}/medium`
                                  : avatar6
                              }
                              alt="Avatar 5"
                            />
                          </div>
                        </div>
                        <div>
                          <h5 className="menu-header-title">
                            {this.props.userInfo.firstName}{' '}
                            {this.props.userInfo.lastName}
                          </h5>
                        </div>
                      </div>
                    </div>
                  </div>
                  <CardBody className="p-0">
                    <ListGroup flush>
                      <ListGroupItem>
                        <b className="text-dark">First Name: </b>
                        {this.props.userInfo.firstName}
                      </ListGroupItem>
                      <ListGroupItem>
                        <b className="text-dark">Last Name: </b>
                        {this.props.userInfo.lastName}
                      </ListGroupItem>
                      <ListGroupItem>
                        <b className="text-dark">User Name: </b>
                        {this.props.userInfo.username}
                      </ListGroupItem>
                      <ListGroupItem>
                        <b className="text-dark">Account ID: </b>
                        {this.props.userInfo.accountID}
                      </ListGroupItem>
                    </ListGroup>
                  </CardBody>
                </Card>
              </Col>

              <Col md="12" lg="6" xl="3">
                <Card className="card-shadow-primary card-border mb-3">
                  <CardHeader> User Auth</CardHeader>
                  <CardBody className="p-0">{this.renderAuth()}</CardBody>

                  <CardFooter className="text-center d-block">
                    <Input
                      className="mb-2"
                      placeholder="password"
                      value={this.state.password}
                      onChange={this.handleChangePassword}
                    />
                    <Button
                      outline
                      className="mr-2 border-0 btn-transition"
                      onClick={this.handleGeneratePassword}
                      color="primary">
                      Generate Password
                    </Button>

                    <LaddaButton
                      className="btn btn-shadow btn-pill btn-focus"
                      loading={this.state.loading}
                      disabled={!this.state.password}
                      onClick={this.handleSetPassword}
                      data-style={ZOOM_IN}>
                      Change password
                    </LaddaButton>
                  </CardFooter>
                </Card>
              </Col>

              <Col md="12" lg="6" xl="3">
                <Card className="card-shadow-primary card-border mb-3">
                  <CardHeader> User Phones</CardHeader>
                  <CardBody className="p-0">{this.renderPhones()}</CardBody>
                </Card>
              </Col>
              <Col md="12" lg="6" xl="3">
                <Card className="card-shadow-primary card-border mb-3">
                  <CardHeader> User Emails</CardHeader>
                  <CardBody className="p-0">{this.renderEmails()}</CardBody>
                </Card>
              </Col>
              <Col md="12" lg="6" xl="9">
                <Card className="card-shadow-primary card-border mb-3">
                  <CardHeader> Session Table</CardHeader>
                  <CardBody className="p-0">
                    <SessionTable accountID={this.props.userInfo.accountID} />
                  </CardBody>
                </Card>
              </Col>

              <Col md="12" lg="6" xl="3">
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

const mapStateToProps = state => {
  return {
    blockList: state.session.blockList
  };
};

export default connect(mapStateToProps)(AccountProfile);
