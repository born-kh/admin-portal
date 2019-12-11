import React, { Fragment } from 'react';

import _ from 'lodash';

import ReactJson from 'react-json-view';

import {
  CardBody,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from 'reactstrap';
import PropTypes from 'prop-types';
import { axios } from 'helpers';
import { toast, Bounce } from 'react-toastify';
import ReactTable from 'react-table';
import {
  updateTracing,
  updateSuspended,
  fetchAccountSessions
} from 'store/actions/sessionActions';

import cx from 'classnames';
import { connect } from 'react-redux';
import GoogleMapsExample from 'components/common/GoogleMaps';
import { sessionAPI } from 'service/api';

class SessionTable extends React.Component {
  constructor() {
    super();
    this.state = {
      rowIndex: 0,
      req: false,
      modalMap: false,
      modalInfo: false,
      userIP: '',
      center: null
    };
    this.handleClickOpenDialog = this.handleClickOpenDialog.bind(this);
    this.handleClickCloseDialog = this.handleClickCloseDialog.bind(this);
    this.handleSessionSuspended = this.handleSessionSuspended.bind(this);
  }

  handleClickOpenDialog = (rowIndex, req) => {
    this.setState({
      modalInfo: !this.state.modalInfo,
      req: req,
      rowIndex
    });
  };

  handleClickOpenMap = userIP => {
    axios
      .get(
        'https://api.ipdata.co/' +
          '81.95.133.111' +
          '?api-key=496d90eb53d940c03f6e80a2a2bd80719cd21216b3f29e799fb1ab6d'
      )
      .then(resp => {
        console.log(resp.data);
        if (resp.status === 200) {
          this.setState({
            center: {
              lat: resp.data.latitude,
              lng: resp.data.longitude
            }
          });
        }
      })
      .catch(error => {
        console.log(error.message);
      });
    this.setState({
      modalMap: !this.state.modalMap,
      userIP
    });
  };
  handleClickCloseDialog = () => {
    this.setState({
      modalInfo: !this.state.modalInfo,
      req: false,
      rowIndex: 0
    });
  };
  handleClickCloseMap = () => {
    this.setState({
      modalMap: !this.state.modalMap,
      userIP: null
    });
  };

  handleSetTracing = (index, tracer) => {
    const sessionID = this.props.sessionDataArray[index].metaArray.sessionID;
    sessionAPI
      .setTracer({ sessionID: sessionID, tracing: !tracer.tracing })
      .then(response => {
        if (response.status === 200) {
          if (response.data) {
            let params = {
              index: index,
              tracing: !tracer.tracing
            };
            this.props.onChangeTracing(params);
            toast('success', {
              transition: Bounce,
              closeButton: true,
              autoClose: 5000,
              position: 'bottom-right',
              type: 'success'
            });
          }
        }
      })
      .catch(error => {
        toast(error.message, {
          transition: Bounce,
          closeButton: true,
          autoClose: 5000,
          position: 'bottom-right',
          type: 'error'
        });
      });
  };

  handleSessionSuspended = (suspended, index) => () => {
    const sessionID = this.props.sessionDataArray[index].metaArray.sessionID;

    sessionAPI
      .suspendSession({ sessionID: sessionID, suspend: !suspended })
      .then(response => {
        console.log(response);
        if (response.status === 200) {
          if (response.data) {
            let params = {
              index: index,
              suspended: !suspended
            };
            this.props.onChangeSuspended(params);
            toast('Suspended', {
              transition: Bounce,
              closeButton: true,
              autoClose: 5000,
              position: 'bottom-right',
              type: 'success'
            });
          }
        }
      })
      .catch(error => {
        toast(error.message, {
          transition: Bounce,
          closeButton: true,
          autoClose: 5000,
          position: 'bottom-right',
          type: 'error'
        });
      });
  };

  handleRemoveSession = sessionID => {
    sessionAPI
      .removeSession({ sessionID: sessionID })
      .then(response => {
        if (response.status === 200) {
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
        toast(error.message, {
          transition: Bounce,
          closeButton: true,
          autoClose: 5000,
          position: 'bottom-right',
          type: 'error'
        });
      });
  };

  componentDidMount() {
    let params = {
      accountID: this.props.accountID
    };
    this.props.fetchGetAccountSessions(params);
  }

  renderDialog() {
    const { sessionDataArray } = this.props;
    if (!sessionDataArray) {
      let sessionInfo = {
        metaData: sessionDataArray[this.state.rowIndex].metaArray,
        push: sessionDataArray[this.state.rowIndex].pushArray
      };

      if (this.state.modalInfo) {
        return (
          <Modal
            isOpen={this.state.modalInfo}
            fade={false}
            toggle={this.handleClickCloseDialog}
            className={this.props.className}>
            <ModalHeader toggle={this.handleClickCloseDialog}>
              Session Info
            </ModalHeader>
            <ModalBody>
              <ReactJson src={sessionInfo} />
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
  }

  renderMap() {
    if (this.state.modalMap) {
      return (
        <Modal
          isOpen={this.state.modalMap}
          fade={false}
          toggle={this.handleClickOpenMap}
          size="lg"
          style={{ maxWidth: '1600px', width: '80%' }}>
          <ModalHeader toggle={this.handleClickCloseMap}>Location</ModalHeader>
          <ModalBody>
            {this.state.center ? (
              <GoogleMapsExample center={this.state.center} />
            ) : (
              <div className="dropdown-menu-header">
                <div className="dropdown-menu-header-inner bg-primary">
                  <div className="menu-header-content">
                    <div>
                      <h5 className="menu-header-title">Private IP address</h5>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </ModalBody>
          <ModalFooter>
            <Button color="link" onClick={this.handleClickCloseMap}>
              Cancel
            </Button>
            <Button color="primary" onClick={this.handleClickCloseMap}>
              Ok
            </Button>
          </ModalFooter>
        </Modal>
      );
    }
  }

  render() {
    const { sessionDataArray } = this.props;

    return (
      <CardBody>
        <ReactTable
          data={sessionDataArray}
          columns={[
            {
              columns: [
                {
                  Header: 'Device Name',
                  accessor: 'meta.deviceName'
                },
                {
                  Header: 'Platform',
                  accessor: 'meta.platform'
                },
                {
                  Header: 'IP',
                  accessor: 'meta.ip'
                },
                {
                  Header: 'Session ID',
                  accessor: 'meta.sessionID'
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
                            this.props.sessionDataArray[row.index].opts
                          )
                        }>
                        <div
                          className={cx('switch-animate', {
                            'switch-on': this.props.sessionDataArray[row.index]
                              .opts.tracing,
                            'switch-off': !this.props.sessionDataArray[
                              row.index
                            ].opts.tracing
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
                          this.props.sessionDataArray[row.index].suspended,

                          row.index
                        )}>
                        <div
                          className={cx('switch-animate', {
                            'switch-on': this.props.sessionDataArray[row.index]
                              .suspended,
                            'switch-off': !this.props.sessionDataArray[
                              row.index
                            ].suspended
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
                },

                {
                  Header: 'Location',
                  accessor: 'ip',
                  Cell: row => (
                    <div className="d-block w-100 text-center">
                      <Button
                        className="mb-2 mr-2 btn-icon"
                        color="danger"
                        onClick={() => this.handleClickOpenMap(row.value)}>
                        <i className="pe-7s-science btn-icon-wrapper"></i>
                        Location
                      </Button>
                    </div>
                  )
                }
              ]
            }
          ]}
          defaultPageSize={5}
          className="-striped -highlight"
        />
        {this.renderMap()}
        {this.renderDialog()}
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
    sessionDataArray: state.session.sessionDataArray
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
