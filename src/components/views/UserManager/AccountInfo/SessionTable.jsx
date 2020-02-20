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
  fetchAccountSessions,
  deleteSession
} from 'store/actions/sessionActions';
import Loader from 'react-loaders';
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

    this.handleClickCloseDialog = this.handleClickCloseDialog.bind(this);
    this.handleSessionSuspended = this.handleSessionSuspended.bind(this);
  }

  handleClickOpenDialog = rowIndex => {
    console.log(rowIndex);
    this.setState({
      modalInfo: !this.state.modalInfo,
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
    const sessionID = this.props.sessions[index].meta.sessionID;
    sessionAPI
      .setTracer({ sessionID: sessionID, tracing: !tracer.tracing })
      .then(response => {
        console.log(response);
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

  handleSessionSuspended = (index, suspended) => {
    const sessionID = this.props.sessions[index].meta.sessionID;
    console.log(!suspended);
    sessionAPI
      .suspendSession({
        sessionID: sessionID,
        isSuspended: !suspended
      })
      .then(response => {
        console.log(response);
        if (response.status === 200) {
          this.props.onChangeSuspended({
            index: index,
            isSuspended: !suspended
          });
          toast('Suspended', {
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

  handleRemoveSession = sessionID => {
    console.log(sessionID);
    sessionAPI
      .removeSession({ sessionID: sessionID })
      .then(response => {
        if (response.status === 200) {
          this.props.sessionDelete(sessionID);
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
    const { accountID, fetchGetAccountSessions } = this.props;
    let params = {
      accountID: accountID
    };
    fetchGetAccountSessions(params);
  }

  renderInfoDialog() {
    const { sessions, className } = this.props;
    const { modalInfo, rowIndex } = this.state;

    if (sessions) {
      if (modalInfo) {
        return (
          <Modal
            className={className}
            fade={false}
            isOpen={modalInfo}
          >
            <ModalHeader toggle={this.handleClickCloseDialog}>
              Session Info
            </ModalHeader>
            <ModalBody>
              <ReactJson src={sessions[rowIndex]} />
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
  }

  renderMap() {
    const { modalMap, center } = this.state;

    if (modalMap) {
      return (
        <Modal
          fade={false}
          isOpen={modalMap}
          size="lg"
          style={{ maxWidth: '1600px', width: '80%' }}
          toggle={this.handleClickOpenMap}
        >
          <ModalHeader toggle={this.handleClickCloseMap}>Location</ModalHeader>
          <ModalBody>
            {center ? (
              <GoogleMapsExample center={center} />
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
            <Button
              color="link"
              onClick={this.handleClickCloseMap}
            >
              Cancel
            </Button>
            <Button
              color="primary"
              onClick={this.handleClickCloseMap}
            >
              Ok
            </Button>
          </ModalFooter>
        </Modal>
      );
    }
  }

  render() {
    const { sessions, pending, error } = this.props;
    console.log(sessions);

    if (pending) {
      return (
        <div className="text-center">
          <Loader type="ball-scale" />
        </div>
      );
    }
    if (error) {
      return (
        <div className="widget-content">
          <div className="widget-content-wrapper">
            <div className="widget-content-right ml-0 mr-3">
              <div className="widget-subheading">{error}</div>
            </div>
          </div>
        </div>
      );
    }

    if (sessions.length === 0) {
      return (
        <div className="widget-content">
          <div className="widget-content-wrapper">
            <div className="widget-content-right ml-0 mr-3">
              <div className="widget-subheading">There are no sessions</div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <CardBody>
          <ReactTable
            className="-striped -highlight"
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
                          data-off-label="OFF"
                          data-on-label="ON"
                          onClick={() =>
                            this.handleSetTracing(
                              row.index,
                              sessions[row.index].options
                            )
                          }
                        >
                          <div
                            className={cx('switch-animate', {
                              'switch-on': sessions[row.index].options.tracing,
                              'switch-off': !sessions[row.index].options.tracing
                            })}
                          >
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
                          data-off-label="OFF"
                          data-on-label="ON"
                          onClick={() =>
                            this.handleSessionSuspended(
                              row.index,
                              sessions[row.index].isSuspended
                            )
                          }
                        >
                          <div
                            className={cx('switch-animate', {
                              'switch-on': sessions[row.index].isSuspended,
                              'switch-off': !sessions[row.index].isSuspended
                            })}
                          >
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
                              sessions[row.index].meta.sessionID
                            )
                          }
                        >
                          <i className="pe-7s-trash btn-icon-wrapper" />
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
                          onClick={() => this.handleClickOpenDialog(row.index)}
                        >
                          <i className="pe-7s-science btn-icon-wrapper" />
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
                          onClick={() => this.handleClickOpenMap(row.value)}
                        >
                          <i className="pe-7s-science btn-icon-wrapper" />
                          Location
                        </Button>
                      </div>
                    )
                  }
                ]
              }
            ]}
            data={sessions}
            defaultPageSize={5}
            loading={pending}
          />

          {this.renderMap()}
          {this.renderInfoDialog()}
        </CardBody>
      );
    }
  }
}

SessionTable.propTypes = {
  className: PropTypes.string
};

const mapStateToProps = state => {
  return {
    pending: state.session.pending,
    sessions: state.session.sessions
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchGetAccountSessions: params => dispatch(fetchAccountSessions(params)),
    onChangeTracing: params => dispatch(updateTracing(params)),
    onChangeSuspended: params => dispatch(updateSuspended(params)),
    sessionDelete: sessionID => dispatch(deleteSession(sessionID))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SessionTable);
