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
import PropTypes from 'prop-types';
import { instance } from 'helpers';
import { SUSPEND_SESSION, REMOVE_SESSION, SET_TRACER } from 'constants/apiURL';
import ReactTable from 'react-table';
import DataTable from 'common/DataTable';
import { dateFormatter } from 'helpers';
import {
  updateTracing,
  updateSuspended,
  fetchAccountSessions
} from 'actions/sessionActions';

import cx from 'classnames';
import { connect } from 'react-redux';

class SessionTable extends React.Component {
  constructor() {
    super();
    this.state = {
      rowIndex: 0,
      req: false,
      modal: false
    };
    this.handleClickOpenDialog = this.handleClickOpenDialog.bind(this);
    this.handleClickCloseDialog = this.handleClickCloseDialog.bind(this);
    this.handleSessionSuspended = this.handleSessionSuspended.bind(this);
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

  handleSetTracing = (index, tracer) => {
    if (tracer === true) {
      tracer = false;
    } else {
      tracer = true;
    }

    const sessionID = this.props.metaArray[index].sessionID;
    console.log(sessionID);
    instance.post(SET_TRACER, { sessionID: sessionID, tracing: tracer }).then(
      result => {
        if (result.status === 200) {
          if (result.data.result) {
            let params = {
              index: index,
              tracing: tracer
            };
            console.log(result);
            this.props.onChangeTracing(params);
          }
        }
      },
      error => {
        console.log(error);
      }
    );
  };

  handleSessionSuspended = (suspended, index) => () => {
    if (suspended === true) {
      suspended = false;
    } else {
      suspended = true;
    }
    const sessionID = this.props.metaArray[index].sessionID;
    console.log('suspend');
    instance
      .post(SUSPEND_SESSION, { sessionID: sessionID, suspend: suspended })
      .then(
        result => {
          if (result.status === 200) {
            if (result.data) {
              let params = {
                index: index,
                suspended: suspended
              };
              console.log(result);
              this.props.onChangeSuspended(params);
            }
          }
        },
        error => {}
      );
  };

  handleRemoveSession = sessionID => {
    instance.post(REMOVE_SESSION, { sessionID: sessionID }).then(
      result => {
        if (result.status === 200) {
          console.log('remove', result);
        }
      },
      error => {}
    );
  };

  componentDidMount() {
    let params = {
      accountID: this.props.accountID
    };
    this.props.fetchGetAccountSessions(params);
  }

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
    const { metaArray } = this.props;

    return (
      <CardBody>
        <ReactTable
          data={metaArray}
          columns={[
            {
              columns: [
                {
                  Header: 'Device Name',
                  accessor: 'deviceName'
                },
                {
                  Header: 'Platform',
                  accessor: 'platform'
                },
                {
                  Header: 'IP',
                  accessor: 'ip'
                },
                {
                  Header: 'Session ID',
                  accessor: 'sessionID'
                },

                {
                  Header: 'Set Tracing',
                  Cell: row => (
                    <div className="text-center">
                      <div
                        className="switch has-switch mr-2 mb-2 mr-2"
                        data-on-label="ON"
                        data-off-label="OFF"
                        onClick={() =>
                          this.handleSetTracing(
                            row.index,
                            this.props.opts[row.index]
                          )
                        }>
                        <div
                          className={cx('switch-animate', {
                            'switch-on': this.props.opts[row.index].tracing,
                            'switch-off': !this.props.opts[row.index].tracing
                          })}>
                          <input type="checkbox" />
                          <span className="switch-left bg-danger">ON</span>
                          <label>&nbsp;</label>
                          <span className="switch-right bg-danger">OFF</span>
                        </div>
                      </div>
                    </div>
                  )
                },

                {
                  Header: 'Suspend Session',
                  Cell: row => (
                    <div className="text-center">
                      <div
                        className="switch has-switch mr-2 mb-2 mr-2"
                        data-on-label="ON"
                        data-off-label="OFF"
                        onClick={this.handleSessionSuspended(
                          this.props.suspended[row.index],
                          row.index
                        )}>
                        <div
                          className={cx('switch-animate', {
                            'switch-on': this.props.suspended[row.index],
                            'switch-off': !this.props.suspended[row.index]
                          })}>
                          <input type="checkbox" />
                          <span className="switch-left bg-danger">ON</span>
                          <label>&nbsp;</label>
                          <span className="switch-right bg-danger">OFF</span>
                        </div>
                      </div>
                    </div>
                  )
                },

                {
                  Header: 'Remove Session',
                  Cell: row => (
                    <div className="d-block w-100 text-center">
                      <Button
                        className="mb-2 mr-2 btn-icon"
                        color="warning"
                        onClick={() =>
                          this.handleRemoveSession(
                            this.props.metaArray[row.index].sessionID
                          )
                        }>
                        <i className="pe-7s-trash btn-icon-wrapper"></i>
                        Remove
                      </Button>
                    </div>
                  )
                },
                ,
                {
                  Header: 'Detail Info',
                  Cell: row => (
                    <div className="d-block w-100 text-center">
                      <Button
                        className="mb-2 mr-2 btn-icon"
                        color="danger"
                        onClick={() => this.handleClickOpenDialog(row.index)}>
                        <i className="pe-7s-science btn-icon-wrapper"></i>
                        Info
                      </Button>
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
    );
  }
}

SessionTable.propTypes = {
  className: PropTypes.string,
  suspended: PropTypes.array,
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    pending: state.session.pending,
    metaArray: state.session.metaArray,
    opts: state.session.opts,
    pushArray: state.session.pushArray,
    suspended: state.session.suspended
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchGetAccountSessions: params => dispatch(fetchAccountSessions(params)),
    onChangeTracing: params => dispatch(updateTracing(params)),
    onChangeSuspended: params => dispatch(updateSuspended(params))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SessionTable);
