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
  Input,
  Col
} from 'reactstrap';
import { passportAPI } from 'service/api';
import LaddaButton, { ZOOM_IN } from 'react-ladda';
import BlockUi from 'react-block-ui';
import { Loader, Types } from 'react-loaders';
import 'react-image-lightbox/style.css';

import { toast, Bounce } from 'react-toastify';
import { tsMethodSignature } from '@babel/types';
const checkNavState = (currentStep, stepsLength) => {
  if (currentStep > 0 && currentStep < stepsLength - 1) {
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

const getNavStates = (indx, steps, approve) => {
  if (0 === indx && approve === 0) {
    styles = [];
    styles.push('doing');
  } else {
    if (styles.length < 4) {
      for (let i = 0; i < steps.length; i++) {
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
        }
      }
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
  { passport: 'На фотографии документа присутствуют блики.' }
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
      application: false,
      rejectMessage: 'Отсутствует сэлфи пользователя',
      rejectMessageIndex: 0,
      navState: getNavStates(0, this.props.steps, 0)
    };
    this. onClickStep=this. onClickStep.bind(this)
  }

  setNavState = (next, approve) => {
    const { steps } = this.props;
    this.setState({
      navState: getNavStates(next, steps, approve)
    });
    if (next < steps.length) {
      this.setState({ compState: next });
    }
    this.setState(checkNavState(next, steps.length));
  };

  handleKeyDown = evt => {
    if (evt.which === 13) {
      this.next();
    }
  };

  handleOnClick = evt => {
    const { compState } = this.state;
    const { steps } = this.props;
    if (
      evt.currentTarget.value === steps.length - 1 &&
      compState === steps.length - 1
    ) {
      this.setNavState(steps.length);
    } else {
      this.setNavState(evt.currentTarget.value);
    }
  };

  componentDidUpdate(oldProps, oldState) {
    const newProps = this.props;
    const newState = this.state;

    if (oldProps.checkedGroupStep !== newProps.checkedGroupStep) {
      if (!newProps.checkedGroupStep) {
        this.setNavState(0, 0);
      } else {
  
        this.setNavState(1, 1);
      }

      if (oldState.navState !== newState.navState) {
        if (this.state.navState.current === this.props.steps.length - 1) {
          this.setState({ showFinishBtn: true });
        }
      }
    }

    if (oldProps.checkedSelfieStep !== newProps.checkedSelfieStep) {
      if (newProps.checkedSelfieStep.status) {
        if (newProps.checkedSelfieStep.status === 'HUMAN_APPROVED') {
          this.setNavState(this.state.compState + 1, 2);
          if (this.statecheckedStep !== 3) {
            this.setState({ checkedStep: 2 });
          }
        } else if (newProps.checkedSelfieStep.status === 'HUMAN_REJECTED') {
          this.setNavState(this.state.compState + 1, 3);
          if (this.statecheckedStep !== 3) {
            this.setState({ checkedStep: 2 });
          }
        }
      }
    }
    if (oldProps.checkedPassportStep !== newProps.checkedPassportStep) {
      if (newProps.checkedPassportStep.status) {
        if (newProps.checkedPassportStep.status === 'HUMAN_APPROVED') {
          this.setNavState(this.state.compState + 1, 2);
          this.setState({ checkedStep: 3 });
        } else if (newProps.checkedPassportStep.status === 'HUMAN_REJECTED') {
          this.setNavState(this.state.compState + 1, 3);
          this.setState({ checkedStep: 3 });
        }
      }
    }
  }

  setAccountStatus = status => {
    const { applicationID, accountID } = this.props;
    const params = {
      user: accountID,
      applicationID: applicationID,
      status: status
    };

    if (status !== 'APPROVED') {
      params.reason = this.state.rejectMessage;
    }

    this.setState({ blocking: true });
    passportAPI
      .setApplicationStatus(params)
      .then(res => {
        if (res.status === 200) {
          this.setState({ blocking: false });
          toast('Application set status ' + 'success', {
            transition: Bounce,
            closeButton: true,
            autoClose: 5000,
            position: 'top-right',
            type: 'success'
          });
          this.props.handleGetApplications();
        }
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
      modal: false
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
                if (val.selfie) {
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
                return null;
              })}
              <h3>Passport </h3>
              {rejectMessages.map((val, index) => {
                if (val.passport) {
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
                return null;
              })}
              <ListGroupItem
                action
                active={this.state.rejectMessageIndex === -1}
                color="success"
                onClick={() => {
                  this.setState({ rejectMessageIndex: -1 });
                }}
                tag="button"
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
            {this.state.application ? (
              <Button
                color="primary"
                onClick={() => this.setAccountStatus('REJECTED')}
              >
                Ok
              </Button>
            ) : (
              <Button
                color="primary"
                onClick={() => this._setDocumentStatus('HUMAN_REJECTED', 3)}
              >
                Ok
              </Button>
            )}
          </ModalFooter>
        </Modal>
      );
    }
  }

  _setDocumentStatus = status => {
    const {
      accountID,
      checkedSelfieStep,
      checkedPassportStep,
      editFieldsDocument,
      applicationID,
      setCheckedDocument
    } = this.props;
    let approved = status === 'HUMAN_APPROVED';

    var docID = checkedPassportStep.ID;
    if (this.state.checkedStep === 1) {
      docID = checkedSelfieStep.ID;
    }

    var params = {
      documentID: docID,
      user: accountID,
      status: status,
      applicationID: applicationID
    };
    if (approved) {
      params.reason = this.state.rejectMessage;
    }

    if (this.state.checkedStep === 2 && approved) {
      passportAPI
        .setDocumentFields({
          documentID: editFieldsDocument.documentID,
          fields: { passport: editFieldsDocument.fields }
        })
        .then(res => {
 
          if (res.status === 200) {
            passportAPI
              .setDocumentStatus(params)
              .then(res => {
    
                if (res.status === 200) {
         

                  this.setState({
                    blocking: false
                  });
                  setCheckedDocument({
                    status: status,
                    docID: docID,
                    selfie: false
                  });

                  toast('Document set status ' + 'success', {
                    transition: Bounce,
                    closeButton: true,
                    autoClose: 5000,
                    position: 'top-right',
                    type: 'success'
                  });
                } else {
                  this.setState({ blocking: false });
                }
              })
              .catch(error => {
                this.setState({ blocking: false });

                toast('Document set status ' + error.message, {
                  transition: Bounce,
                  closeButton: true,
                  autoClose: 5000,
                  position: 'top-right',
                  type: 'error'
                });
              });
          } else {
            this.handleClickCloseDialog();
            this.setState({ blocking: false });
          }
        })
        .catch(error => {
          this.setState({ bloking: false });
  
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
      passportAPI
        .setDocumentStatus(params)
        .then(res => {
        
          if (res.status === 200) {
  

            this.setState({
              blocking: false
            });
            if (this.state.checkedStep === 1) {
              setCheckedDocument({
                status: status,
                docID: docID,
                selfie: true
              });
            } else {
              setCheckedDocument({
                status: status,
                docID: docID,
                selfie: false
              });
            }
            this.handleClickCloseDialog();
            toast('Document set status ' + 'success', {
              transition: Bounce,
              closeButton: true,
              autoClose: 5000,
              position: 'top-right',
              type: 'success'
            });
          } else {
            this.handleClickCloseDialog();
            this.setState({ blocking: false });
          }
        })
        .catch(error => {
          this.setState({ blocking: false });

          toast('Document set status ' + error.message, {
            transition: Bounce,
            closeButton: true,
            autoClose: 5000,
            position: 'top-right',
            type: 'error'
          });
        });
    }
  };

  previous = () => {
    const { compState } = this.state;
    const { getDocumentSetID } = this.props;
    if (compState !== 1) {
      this.setNavState(compState - 1);
    }
    if (compState === 1) {
      this.setNavState(compState - 1);
      getDocumentSetID('');
    }
  };


  onClickStep= (step) => {
    const { compState } = this.state;

    const { getDocumentSetID } = this.props;
   if(compState!==0){
    if (step=== 0) {
      this.setNavState(step);
      getDocumentSetID('');
    }else{
      this.setNavState(step);
    }
   }
   
  };

  next = () => {
    this.setNavState(this.state.compState + 1);
  };

  getClassName = (className, i) => {
  
    return className + '-' + this.state.navState.styles[i];
  };

  renderSteps = () => {
    const { steps } = this.props;
    return steps.map((s, i) => (
      <li
        className={this.getClassName('form-wizard-step', i)}
        style={i === this.state.navState.current ?{}: {opacity: 0.3}}
        key={i}
        onClick={()=>this.onClickStep(i)}
        value={i}
      >
        <em>{i + 1}</em>
        <span>{steps[i].name}</span>
      </li>
    ));
  };

  render() {
    const { steps, handleDoneProcedure, showNavigation } = this.props;

    const {
      navState,
      rejectMessage,
      checkedStep,
      compState,
      blocking,
      showNextBtn,
      showPreviousBtn
    } = this.state;

  const documentApprovedButton = 
  checkedStep === navState.current &&
  navState.current + 1 !== steps.length &&
  checkedStep !== 3 &&
  styles.indexOf('reject') === -1;

const documentRejectedButton =
  checkedStep === navState.current &&
  navState.current + 1 !== steps.length &&
  checkedStep !== 3;

   
    const applicationApprovedButton =
      checkedStep === 3 &&
      styles.indexOf('reject') === -1 &&
      navState.current === steps.length - 1;
    const applicationRejectedButton =
      checkedStep === 3 && navState.current === steps.length - 1;
   
    return (
      <div onKeyDown={this.handleKeyDown}>
        <Col>
          <Button
            className="btn-shadow float-left btn-wide btn-pill mr-2"
            color="alternate"
            onClick={handleDoneProcedure}
          >
            Overview
          </Button>
        </Col>
        <Col>
          <div style={showNavigation ? {} : { display: 'none' }}>
            <FormGroup>
              <Button
                className="btn-shadow float-left btn-wide btn-pill mr-2"
                color="secondary"
                onClick={this.previous}
                outline
                style={showPreviousBtn ? {} : { display: 'none' }}
              >
                Previous
              </Button>
              <Button
                className="btn-shadow float-left btn-wide btn-pill mr-2"
                color="secondary"
                onClick={this.next}
                outline
                style={showNextBtn ? {} : { display: 'none' }}
              >
                Next
              </Button>
            </FormGroup>
          </div>
        </Col>

        <ol className="forms-wizard">{this.renderSteps()}</ol>
        <BlockUi
          blocking={blocking}
          loader={<Loader
            active
            type={'ball-spin-fade-loader'}
                  />}
          tag="div"
        >
          {steps[compState].component}
        </BlockUi>
        <div className="divider" />
        <div className="clearfix">
          <FormGroup>
            <Button
              className="btn-shadow btn-wide float-right btn-pill  mr-2"
              color="success"
              onClick={() => this.setAccountStatus('APPROVED')}
              size="lg"
              style={applicationApprovedButton ? {} : { display: 'none' }}
            >
              Confirmed Application
            </Button>

            <Button
              className="btn-shadow btn-wide float-right btn-pill  mr-2"
              color="danger"
              onClick={() => this.setState({ modal: true, application: true })}
              size="lg"
              style={applicationRejectedButton ? {} : { display: 'none' }}
            >
              Rejected Application
            </Button>

            <Button
              className="btn btn-shadow float-right btn-pill  mr-2"
              color="success"
              onClick={() => this._setDocumentStatus('HUMAN_APPROVED')}
              style={documentApprovedButton ? {} : { display: 'none' }}
            >
              Approve
            </Button>

            <Button
              className="btn btn-shadow float-right btn-pill  mr-2"
              color="danger"
              onClick={() => this.setState({ modal: true })}
              style={documentRejectedButton ? {} : { display: 'none' }}
            >
              Reject
            </Button>
          </FormGroup>
        </div>
        {this.renderDialog()}
      </div>
    );
  }
}

MultiStep.defaultProps = {
  showNavigation: true
};
