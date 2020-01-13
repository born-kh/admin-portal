import React from 'react';
import _ from 'lodash';

import ReactJson from 'react-json-view';

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
import { dateFormatter } from 'helpers';

class MessageTable extends React.Component {
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
    const { messagesData, className } = this.props;
    const { modal, req, rowIndex } = this.state;
    if (modal) {
      return (
        <Modal
          className={className}
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
                  ? messagesData[rowIndex].request
                  : messagesData[rowIndex].response
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
    const { messagesData } = this.props;

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
                        Header: 'Ts',
                        accessor: 'ts',
                        Cell: row => dateFormatter(row.value)
                      },
                      {
                        Header: 'Method Name',
                        accessor: 'method',
                        filterable: true
                      },
                      {
                        Header: 'Account ID',
                        accessor: 'account_id'
                      }
                    ]
                  },
                  {
                    columns: [
                      {
                        Header: 'Request',

                        Cell: row => (
                          <div className="d-block w-100 text-center">
                            <Button
                              className="mb-2 mr-2 btn-icon"
                              color="info"
                              onClick={() =>
                                this.handleClickOpenDialog(row.index, true)
                              }
                            >
                              <i className="pe-7s-science btn-icon-wrapper">
                                {' '}
                              </i>
                              Info
                            </Button>
                          </div>
                        )
                      },
                      {
                        Header: 'Response',

                        Cell: row => (
                          <div className="d-block w-100 text-center">
                            <Button
                              className="mb-2 mr-2 btn-icon"
                              color="info"
                              onClick={() =>
                                this.handleClickOpenDialog(row.index, false)
                              }
                            >
                              <i className="pe-7s-science btn-icon-wrapper">
                                {' '}
                              </i>
                              Info
                            </Button>
                          </div>
                        )
                      }
                    ]
                  }
                ]}
                data={messagesData}
                defaultPageSize={10}
              />
              {this.renderDialog()}
            </CardBody>
          </Card>
        </Col>
      </Row>
    );
  }
}

export default MessageTable;
