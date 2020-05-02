import React from 'react';

import _ from 'lodash';
import { Link, withRouter } from 'react-router-dom';
import ReactJson from 'react-json-view';
import avatar2 from 'assets/utils/images/avatars/2.jpg';
import {
  Row,
  Col,
  Card,
  CardBody,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from 'reactstrap';

import ReactTable from 'react-table';

class UsersTable extends React.Component {
  constructor() {
    super();
    this.state = {
      rowIndex: 0,
      req: false,
      modal: false
    };
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
    const { messagesData, className } = this.props;
    const { modal, req } = this.state;
    if (modal) {
      return (
        <Modal
          fade={false}
          isOpen={modal}
          toggle={this.handleClickCloseDialog}
        >
          <ModalHeader toggle={this.handleClickCloseDialog}>
            {req ? 'Request' : 'Response'}
          </ModalHeader>
          <ModalBody>
            <ReactJson
              src={
                req
                  ? messagesData[this.state.rowIndex].request
                  : messagesData[this.state.rowIndex].response
              }
            />
          </ModalBody>
          <ModalFooter>
            <Button
              color="link"
              onClick={this.handleClickCloseDialog}
            >
              Cancel
            </Button>
            <Button
              color="primary"
              onClick={this.handleClickCloseDialog}
            >
              Ok
            </Button>
          </ModalFooter>
        </Modal>
      );
    }
  }

  render() {
    const { usersData, match } = this.props;
    return (
      <Row>
        <Col md="12">
          <Card className="main-card mb-3">
            <CardBody>
              <ReactTable
                className="-striped -highlight"
                columns={[
                  {
                    columns: [
                      {
                        Header: 'Full Name',
                        id: 'row',
                        accessor: d => d,

                        Cell: row => (
                          <div>
                            <Link to={match.path + `/${row.value.accountID}`}>
                              <div className="widget-content p-0">
                                <div className="widget-content-wrapper">
                                  <div className="widget-content-left mr-3">
                                    <div className="widget-content-left">
                                      <img
                                        alt=""
                                        className="rounded-circle"
                                        src={
                                          row.value.avatar !== undefined
                                            ? `https://wssdev.nexustls.com/files/file/${row.value.avatar}/medium`
                                            : avatar2
                                        }
                                        width={52}
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
                data={usersData}
                defaultPageSize={5}
              />
            </CardBody>
          </Card>
        </Col>
      </Row>
    );
  }
}

export default withRouter(UsersTable);
