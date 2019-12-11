import React from 'react';
import _ from 'lodash';
import { Link, withRouter } from 'react-router-dom';
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
import 'react-table/react-table.css';

class AccountTable extends React.Component {
  constructor() {
    super();
    this.state = {
      rowIndex: 0,
      req: false,
      modal: false,
      loading: false
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
          className={this.props.className}
          fade={false}
          isOpen={this.state.modal}
          toggle={this.handleClickCloseDialog}
        >
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
    const {
      applications,
      pages,
      handleOnPageChange,
      handleOnPageSizeChange,
      pageSize
    } = this.props;
    console.log(pageSize);

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
                        Header: '№',
                        accessor: 'row',
                        id: 'row',
                        width: 50,

                        Cell: row => (
                          <div className="d-block w-100 text-center">
                            {row.index + 1}
                          </div>
                        )
                      },
                      {
                        Header: 'apllication ID',
                        accessor: 'applicationID'
                      },

                      {
                        Header: 'First Name',
                        accessor: 'firstName'
                      },
                      {
                        Header: 'Last Name',
                        accessor: 'lastName'
                      },
                      {
                        Header: 'Data Time',
                        accessor: 'createdAt',
                        Cell: row => dateFormatter(row.value)
                      },
                      {
                        Header: 'Info',
                        id: 'row',
                        accessor: d => d,

                        Cell: row => (
                          <div className="d-block w-100 text-center">
                            <Link
                              to={
                                this.props.location.pathname +
                                `/${row.value.applicationID}`
                              }
                            >
                              <Button
                                className="mb-2 mr-2 btn-icon"
                                color="info"
                              >
                                Info
                              </Button>
                            </Link>
                          </div>
                        )
                      }
                    ]
                  }
                ]}
                data={applications}
                defaultPageSize={pageSize}
                enabled
                loading={this.props.pending}
                manual
                onPageChange={handleOnPageChange}
                onPageSizeChange={handleOnPageSizeChange}
                pages={pages}
                showPagination
                showPaginationBottom // this would indicate that server side pagination has been
                showPaginationTop={false}
              />
            </CardBody>
          </Card>
        </Col>
      </Row>
    );
  }
}

export default withRouter(AccountTable);
