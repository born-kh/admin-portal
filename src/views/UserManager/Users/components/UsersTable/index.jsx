import React, { Fragment } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Icon from 'react-fa';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import ReactJson from 'react-json-view';
import avatar2 from 'assets/utils/images/avatars/2.jpg';
import {
  Row,
  Col,
  Card,
  CardBody,
  Table,
  ButtonGroup,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from 'reactstrap';

import ReactTable from 'react-table';
import DataTable from 'common/DataTable';
import { dateFormatter } from 'helpers';

class UsersTable extends React.Component {
  constructor() {
    super();
    this.state = {
      rowIndex: 0,
      req: false,
      modal: false
    };
    this.handleClickOpenDialog = this.handleClickOpenDialog.bind(this);
    this.handleClickCloseDialog = this.handleClickCloseDialog.bind(this);
  }

  handleClickOpenDialog = (rowIndex, req) => {
    this.setState({
      modal: !this.state.modal,
      req: req,
      rowIndex
    });
  };
  handleClickCloseDialog = () => {
    this.setState({
      modal: !this.state.modal,
      req: false,
      rowIndex: 0
    });
  };

  renderDialog() {
    const { messagesData } = this.props;
    if (this.state.modal) {
      return (
        <Modal
          isOpen={this.state.modal}
          fade={false}
          toggle={this.handleClickCloseDialog}
          className={this.props.className}>
          <ModalHeader toggle={this.handleClickCloseDialog}>
            {this.state.req ? 'Request' : 'Response'}
          </ModalHeader>
          <ModalBody>
            <ReactJson
              src={
                this.state.req
                  ? messagesData[this.state.rowIndex].request
                  : messagesData[this.state.rowIndex].response
              }
            />
          </ModalBody>
          <ModalFooter>
            <Button color="link" onClick={this.handleClickCloseDialog}>
              Cancel
            </Button>
            <Button color="primary" onClick={this.handleClickCloseDialog}>
              Ok
            </Button>
          </ModalFooter>
        </Modal>
      );
    }
  }

  render() {
    const { usersData } = this.props;

    return (
      <Row>
        <Col md="12">
          <Card className="main-card mb-3">
            <CardBody>
              <ReactTable
                data={usersData}
                columns={[
                  {
                    columns: [
                      {
                        Header: 'Full Name',
                        id: 'row',
                        accessor: d => d,

                        Cell: row => (
                          <div>
                            <Link
                              to={`/user-manager/users/${row.value.accountID}`}>
                              <div className="widget-content p-0">
                                <div className="widget-content-wrapper">
                                  <div className="widget-content-left mr-3">
                                    <div className="widget-content-left">
                                      <img
                                        width={52}
                                        className="rounded-circle"
                                        src={
                                          row !== undefined
                                            ? `https://wssdev.nexustls.com/files/file/${row.value.avatar}/medium`
                                            : avatar2
                                        }
                                        alt=""
                                      />
                                    </div>
                                  </div>

                                  <div className="widget-content-left flex2">
                                    <div className="widget-heading">
                                      {row.value.firstName} {row.value.lastName}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </Link>
                          </div>
                        )
                      },
                      {
                        Header: 'User Name',
                        accessor: 'username'
                      },
                      {
                        Header: 'Account ID',
                        accessor: 'accountID'
                      }
                    ]
                  }
                ]}
                defaultPageSize={10}
                className="-striped -highlight"
              />
            </CardBody>
          </Card>
        </Col>
      </Row>
    );
  }
}

export default UsersTable;
