import React from 'react';
import {
  Button,
  FormGroup,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ListGroup,
  ListGroupItem,
 
  Label,
  Input
} from 'reactstrap';
import { passportAPI } from 'service/api';
import LaddaButton, { ZOOM_IN } from 'react-ladda';
import BlockUi from 'react-block-ui';
import { Loader, Types } from 'react-loaders';
import 'react-image-lightbox/style.css';
import { history } from 'helpers';

import { toast, Bounce } from 'react-toastify';
const checkNavState = (currentStep, stepsLength) => {
  if (currentStep > 0 && currentStep < stepsLength - 2) {
    return {
      showPreviousBtn: true,
      showNextBtn: true
    };
  } else if (currentStep === 0) {
    return {
      showPreviousBtn: false,
      showNextBtn: false
    };
  } else {
    return {
      showPreviousBtn: true,
      showNextBtn: false
    };
  }
};
var styles = [];

const getNavStates = (indx, length, approve) => {
  for (let i = 0; i < length; i++) {
    if (i === indx && approve === 1) {
      styles.pop();
      styles.push('done');
      styles.push('doing');
    } else if (i === indx && approve === 2) {
      styles.pop();
      styles.push('done');
      styles.push('doing');
    } else if (i === indx && approve === 3) {
      styles.pop();
      styles.push('reject');
      styles.push('doing');
    } else if (i === indx && approve === 0) {
      styles = [];
      styles.push('doing');
    }
  }

  return { current: indx, styles: styles };
};

const rejectMessages = [
  { selfie: 'Отсутствует сэлфи пользователя' },
  { selfie: 'Фото гражданина на паспорте не совпадает с сэлфи пользователя.' },
  {
    selfie:
      'Сэлфи не является фотографией пользователя, а снимком с фотографии. '
  },
  {
    passport: 'Фотография паспорта размытая, невозможно рассмотреть информацию.'
  },
  { passport: 'Отсутствует фотография паспорта.' },
  
  {
    passport:
      'Отсутствует фотография второй стороны паспорта гражданина Республики Таджикистан.'
  },
  {
    passport:
      'Отсутствует фотография лицевой стороны паспорта гражданина Республики Таджикистан.'
  },
  {
    passport:
      'Загруженный документ не является паспортом гражданина Республики Таджикистан.'
  },
  { passport: 'Паспорт в кадре находится не полностью.' },
  {
    passport:
      'Фото паспорта сделано в темном помещении, невозможно различить данные.'
  },
  {
    passport:
      'Фото паспорта сделано не с реального документа а является фотографией скриншота с другого устройства.'
  },
  { passport: 'Фото паспорта является цветной или черно-белой копией.' },
 
  { passport: 'Истек срок действия загруженного документа.' },
  { passport: 'На фотографии документа присутствуют блики.' },
  
];
export default class MultiStep extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loadingRejected: false,
      loadingMoreInfo: false,
      loadingApproved: false,
      showPreviousBtn: false,
      loadingConfirmed: false,
      blocking: false,
      showNextBtn: false,
      showFinishBtn: false,
      modal: false,
      compState: 0,
      checkedStep: 1,
      rejectMessage: 'Отсутствует сэлфи пользователя',
      rejectMessageIndex: 0,
      navState: getNavStates(0, this.props.steps.length, 0)
    };
  }

  setNavState = (next, approve) => {
    this.setState({
      navState: getNavStates(next, this.props.steps.length, approve)
    });
    if (next < this.props.steps.length) {
      this.setState({ compState: next });
    }
    this.setState(checkNavState(next, this.props.steps.length));
  };

  handleKeyDown = evt => {
    if (evt.which === 13) {
      this.next();
    }
  };

  handleOnClick = evt => {
    if (
      evt.currentTarget.value === this.props.steps.length - 1 &&
      this.state.compState === this.props.steps.length - 1
    ) {
      this.setNavState(this.props.steps.length);
    } else {
      this.setNavState(evt.currentTarget.value);
    }
  };

  componentDidUpdate(oldProps, oldState) {
    const newProps = this.props;
    const newState = this.state;

    if (oldProps.currentID !== newProps.currentID) {
      if (newProps.currentID === 0) {
        this.setNavState(newProps.currentID, 0);
      } else if (newProps.currentID === 1) {
        this.setNavState(newProps.currentID, 1);
      }
    }

    if (oldState.navState !== newState.navState) {
      if (this.state.navState.current === this.props.steps.length - 1) {
        this.setState({ showFinishBtn: true });
      }
    }
  }

  componentDidMount() {
    console.log(this.props.currentID);
  }

  setAccountStatus = status => {
    const { applicationID } = this.props;
    console.log(applicationID);
    const params = {
      applicationID: applicationID,
      status: status
    };
    this.setState({ blocking: true });
    passportAPI
      .setApplicationStatus(params)
      .then(res => {
        console.log(res);
        if (res.status === 200) {
          this.setState({ blocking: false });
          toast('Application set status ' + 'success', {
            transition: Bounce,
            closeButton: true,
            autoClose: 5000,
            position: 'top-right',
            type: 'success'
          });
        }
        this.props.handleDoneProcedure();
      })
      .catch(error => {
        this.setState({ blocking: false });
        toast('Application set status ' + error.message, {
          transition: Bounce,
          closeButton: true,
          autoClose: 5000,
          position: 'top-right',
          type: 'error'
        });
      });
  };

  handleClickCloseDialog = () => {
    this.setState({
      modal: !this.state.modal
    });
  };
  renderDialog() {
    if (this.state.modal) {
      return (
        <Modal
          className={this.props.className}
          fade={false}
          isOpen={this.state.modal}
          size="lg"
          style={{ width: '50%' }}
          toggle={this.handleClickCloseDialog}
        >
          <ModalHeader toggle={this.handleClickCloseDialog}>
            Select Message
          </ModalHeader>
          <ModalBody>
            <ListGroup>
             
              {rejectMessages.map((val, index) => {
                if(val.selfie){
                  return (
                    <ListGroupItem
                      action
                      active={this.state.rejectMessageIndex === index}
                      onClick={() => {
                        this.setState({
                          rejectMessageIndex: index,
                          rejectMessage: val.selfie
                        });
                      }}
                      tag="button"
                    >
                      <b>{index + 1}) </b> {val.selfie}
                    </ListGroupItem>
                  );
                }
                return null
                
              })}
<h3>Passport </h3>
{rejectMessages.map((val, index) => {
                if(val.passport){
                  return (
                    <ListGroupItem
                      action
                      active={this.state.rejectMessageIndex === index}
                      onClick={() => {
                        this.setState({
                          rejectMessageIndex: index,
                          rejectMessage: val.passport
                        });
                      }}
                      tag="button"
                    >
                      <b>{index + 1}) </b> {val.passport}
                    </ListGroupItem>
                  );
                }
                return null
                
              })}
              <ListGroupItem
                action
                active={this.state.rejectMessageIndex === -1}
                onClick={() => {
                  this.setState({ rejectMessageIndex: -1 });
                }}
                tag="button"
                color="success"
              >
                <FormGroup>
                  <Label for="rejectMessage">
                    <b>Message</b>
                  </Label>
                  <Input
                  
                    id="rejectMessage"
                    name="rejectMessage"
                    onChange={e => {
                      this.setState({ rejectMessage: e.target.value });
                    }}
                    type="textarea"
                    value={this.state.rejectMessage}
                  />
                </FormGroup>
              </ListGroupItem>
            </ListGroup>
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
              onClick={() => this._setDocumentStatus('HUMAN_REJECTED', 3)}
            >
              Ok
            </Button>
          </ModalFooter>
        </Modal>
      );
    }
  }

  _setDocumentStatus = (status, styleDocument) => {
    const {
      accountID,
      documentID,
      editFieldsDocument,
      applicationID
    } = this.props;

    this.setState({ blocking: true });

    console.log('csdcsdc', editFieldsDocument);

    var params = {
      documentID: documentID,
      user: accountID,
      status: status,
      applicationID: applicationID
    };
    if (styleDocument === 3) {
      params.reason = this.state.rejectMessage;
    }

    passportAPI
      .setDocumentStatus(params)
      .then(res => {
        console.log(res);
        if (res.status === 200) {
          console.log('setDocument', res);
          if ((this.state.checkedStep === 2, styleDocument === 2)) {
            console.log('csdcsd');
            passportAPI
              .setDocumentFields({
                documentID: editFieldsDocument.documentID,
                fields: { passport: editFieldsDocument.fields }
              })
              .then(res => {
                console.log('setDocumentFie', res);
                if (res.status === 200) {
                  this.setState({
                    blocking: false,
                    checkedStep: this.state.checkedStep + 1
                  });
                  this.handleClickCloseDialog();
                  toast('Document set status ' + 'success', {
                    transition: Bounce,
                    closeButton: true,
                    autoClose: 5000,
                    position: 'top-right',
                    type: 'success'
                  });
                  this.setNavState(this.state.compState + 1, styleDocument);
                }
              })
              .catch(error => {
                this.setState({ bloking: false });
                console.log(error);
                this.handleClickCloseDialog();
                toast('Document set status ' + error.message, {
                  transition: Bounce,
                  closeButton: true,
                  autoClose: 5000,
                  position: 'top-right',
                  type: 'error'
                });
              });
          } else {
            this.setState({
              blocking: false,
              checkedStep: this.state.checkedStep + 1
            });
            this.handleClickCloseDialog();
            toast('Document set status ' + 'success', {
              transition: Bounce,
              closeButton: true,
              autoClose: 5000,
              position: 'top-right',
              type: 'success'
            });
            this.setNavState(this.state.compState + 1, styleDocument);
          }
        } else {
          this.handleClickCloseDialog();
          this.setState({ blocking: false });
        }
      })
      .catch(error => {
        console.log(error);
        this.setState({ blocking: false });
        this.handleClickCloseDialog();
        toast('Document set status ' + error.message, {
          transition: Bounce,
          closeButton: true,
          autoClose: 5000,
          position: 'top-right',
          type: 'error'
        });
      });
  };

  previous = () => {
    if (this.state.compState !== 1) {
      this.setNavState(this.state.compState - 1);
    }
    if (this.state.compState === 1) {
      this.setNavState(this.state.compState - 1);
      this.props.getDocumentSetID('');
    }
  };

  next = () => {
    this.setNavState(this.state.compState + 1);
  };

  getClassName = (className, i) => {
    return className + '-' + this.state.navState.styles[i];
  };

  renderSteps = () => {
    return this.props.steps.map((s, i) => (
      <li
        className={this.getClassName('form-wizard-step', i)}
        key={i}
        value={i}
      >
        <em>{i + 1}</em>
        <span>{this.props.steps[i].name}</span>
      </li>
    ));
  };

  backHandle = () => {
    console.log(this.props.backUrl);
    history.push(this.props.backUrl);
  };

  render() {
    const { steps, currentID, editFieldsDocument } = this.props;
    const { navState, rejectMessage } = this.state;
    console.log(this.state.blocking, editFieldsDocument, rejectMessage);

    return (
      <div onKeyDown={this.handleKeyDown}>
        {this.renderDialog()}
        <Button
          className="btn-shadow float-left btn-wide btn-pill"
          color="alternate"
          onClick={this.props.handleDoneProcedure}
        >
          Previous page
        </Button>

        <FormGroup>
          <Button
            className="btn-shadow btn-wide float-right btn-pill  mr-2"
            color="success"
            onClick={() => this.setAccountStatus('APPROVED')}
            size="lg"
            style={
              navState.current + 1 === steps.length ? {} : { display: 'none' }
            }
          >
            Confirmed
          </Button>

          <Button
            className="btn-shadow btn-wide float-right btn-pill  mr-2"
            color="primary"
            onClick={() => this.setAccountStatus('REQUEST_MORE_DOCUMENTS')}
            size="lg"
            style={
              navState.current + 1 === steps.length ? {} : { display: 'none' }
            }
          >
            Request more docs
          </Button>
          <Button
            className="btn-shadow btn-wide float-right btn-pill  mr-2"
            color="danger"
            onClick={() => this.setAccountStatus('REJECTED')}
            size="lg"
            style={
              navState.current + 1 === steps.length ? {} : { display: 'none' }
            }
          >
            Rejected
          </Button>
          <Button
            className="btn btn-shadow float-right btn-pill  mr-2"
            color="success"
            onClick={() => this._setDocumentStatus('HUMAN_APPROVED', 2)}
            style={
              this.state.checkedStep === navState.current &&
              navState.current + 1 !== steps.length
                ? {}
                : { display: 'none' }
            }
          >
            Approve
          </Button>
          <Button
            className="btn btn-shadow float-right btn-pill  mr-2"
            color="primary"
            onClick={() => this._setDocumentStatus('HUMAN_CORRECTED', 3)}
            style={
              this.state.checkedStep === navState.current &&
              navState.current + 1 !== steps.length
                ? {}
                : { display: 'none' }
            }
          >
            More Info
          </Button>
          <Button
            className="btn btn-shadow float-right btn-pill  mr-2"
            color="danger"
            onClick={() => this.setState({ modal: true })}
            style={
              this.state.checkedStep === navState.current &&
              navState.current + 1 !== steps.length
                ? {}
                : { display: 'none' }
            }
          >
            Reject
          </Button>
        </FormGroup>

        <ol className="forms-wizard">{this.renderSteps()}</ol>
        <BlockUi
          blocking={this.state.blocking}
          loader={<Loader
            active
            type={'ball-spin-fade-loader'}
                  />}
          tag="div"
        >
          {this.props.steps[this.state.compState].component}
        </BlockUi>
        <div className="divider" />
        <div className="clearfix">
          <div style={this.props.showNavigation ? {} : { display: 'none' }}>
            <FormGroup>
              <Button
                className="btn-shadow float-left btn-wide btn-pill"
                color="secondary"
                onClick={this.previous}
                outline
                style={this.state.showPreviousBtn ? {} : { display: 'none' }}
              >
                Previous
              </Button>
              <Button
                className="btn-shadow float-right btn-wide btn-pill"
                color="secondary"
                onClick={this.next}
                outline
                style={this.state.showNextBtn ? {} : { display: 'none' }}
              >
                Next
              </Button>
            </FormGroup>
          </div>
        </div>
      </div>
    );
  }
}

MultiStep.defaultProps = {
  showNavigation: true
};
