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
  Table,
  ButtonGroup,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from 'reactstrap';

import ReactTable from 'react-table';
import { dateFormatter } from 'helpers';

class AccountTable extends React.Component {
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
    const { accountData } = this.props;
    console.log('props', this.props);

    return (
      <Row>
        <Col md="12">
          <Card className="main-card mb-3">
            <CardBody>
              <ReactTable
                data={accountData}
                columns={[
                  {
                    columns: [
                      {
                        Header: 'Account ID',
                        accessor: 'account_uuid'
                      },

                      {
                        Header: 'First Name',
                        accessor: 'first_name'
                      },
                      {
                        Header: 'Last Name',
                        accessor: 'last_name'
                      },
                      {
                        Header: 'Data Time',
                        accessor: 'ts',
                        Cell: row => dateFormatter(row.value)
                      },
                      {
                        Header: 'Info',

                        Cell: row => (
                          <div className="d-block w-100 text-center">
                            <Link to={''}>
                              <Button
                                className="mb-2 mr-2 btn-icon"
                                color="info">
                                Info
                              </Button>
                            </Link>
                          </div>
                        )
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

export default withRouter(AccountTable);
