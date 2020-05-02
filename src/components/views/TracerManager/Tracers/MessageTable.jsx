import React from 'react';
import _ from 'lodash';

import ReactJson from 'react-json-view';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Row, Col, Card, CardBody } from 'reactstrap';
import ReactTable from 'react-table';
import { dateFormatter } from 'helpers';
import matchSorter from 'match-sorter';
class MessageTable extends React.Component {
  constructor() {
    super();
    this.state = {
      rowIndex: 0,
      filtered: [],
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
                        filterable: false,
                        Cell: row => dateFormatter(row.value)
                      },
                      {
                        Header: 'Method Name',
                        id: 'method',

                        accessor: d => {
                          if (d.request) {
                            return d.request.method;
                          } else {
                            return '';
                          }
                        }
                      },
                      {
                        Header: 'Account ID',
                        accessor: 'account_id',
                        filterable: true
                      }
                    ]
                  }
                ]}
                data={messagesData}
                defaultFilterMethod={(filter, row, column) => {
                  const id = filter.pivotId || filter.id;
                  if (typeof filter.value === 'object') {
                    return row[id] !== undefined
                      ? filter.value.indexOf(row[id]) > -1
                      : true;
                  } else {
                    return row[id] !== undefined
                      ? String(row[id]).indexOf(filter.value) > -1
                      : true;
                  }
                }}
                defaultPageSize={15}
                filterable
                SubComponent={row => {
                  let d = row.original;
                  if (d.request) {
                    return (
                      <div style={{ background: '#F0F5F5' }}>
                        <div
                          style={{
                            display: 'flex',
                            'flex-direction': 'column',
                            'margin-left': '100px'
                          }}>
                          <div className="widget-content-right ml-0 mr-3">
                            <div className="widget-subheading text-bold">
                              <b className="text-dark"> method </b>
                            </div>
                            {d.request.method}

                            <div className="divider" />
                          </div>

                          <div className="widget-content-right ml-0 mr-3">
                            <div className="widget-subheading text-bold">
                              <b className="text-dark">id </b>
                            </div>
                            {d.request.id}

                            <div className="divider" />
                          </div>
                          <div className="widget-content-right ml-0 mr-3">
                            <div className="widget-subheading text-bold">
                              <b className="text-dark">version</b>
                            </div>
                            {d.request.version}

                            <div className="divider" />
                          </div>

                          <div className="widget-content-right ml-0 mr-3">
                            <div className="widget-subheading text-bold">
                              <b className="text-dark">metadata</b>
                            </div>
                            {JSON.stringify(d.request.metadata)}

                            <div className="divider" />
                          </div>
                          <div className="widget-content-right ml-0 mr-3">
                            <div className="widget-subheading text-bold">
                              <b className="text-dark">params </b>
                            </div>
                            {JSON.stringify(d.request.params)}

                            <div className="divider" />
                          </div>
                          <div className="widget-content-right ml-0 mr-3">
                            <div className="widget-subheading text-bold">
                              <b className="text-dark">result </b>
                            </div>
                            {JSON.stringify(d.response.result)}

                            <div className="divider" />
                          </div>
                        </div>
                      </div>
                    );
                  } else {
                    return '';
                  }
                }}
              />
            </CardBody>
          </Card>
        </Col>
      </Row>
    );
  }
}

export default MessageTable;
