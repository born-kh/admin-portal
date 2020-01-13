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
      application:false ,
      rejectMessage: 'Отсутствует сэлфи пользователя',
      rejectMessageIndex: 0,
      navState: getNavStates(0, this.props.steps, 0)
    };
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
    console.log(newProps)

    if (oldProps.currentID !== newProps.currentID) {
      if (newProps.currentID === 0) {
        this.setNavState(newProps.currentID, 0);
      } else if (newProps.currentID === 1) {
        this.setNavState(newProps.currentID, 1);
        if (newProps.selfie.status === 'HUMAN_APPROVED') {
          console.log(newProps.selfie.status);
          this.setNavState(this.state.compState + 1, 2);
          this.setState({ checkedStep: 2 });
        } else if (newProps.selfie.status === 'HUMAN_CORRECTED') {
          console.log(newProps.selfie.status);
          this.setNavState(this.state.compState + 1, 3);
          this.setState({ checkedStep: 2 });
        } else if (newProps.selfie.status === 'HUMAN_REJECTED') {
          console.log(newProps.selfie.status);
          this.setNavState(this.state.compState + 1, 3);
          this.setState({ checkedStep:2 });
        }

        if (newProps.passport.status === 'HUMAN_APPROVED') {
          console.log(newProps.selfie.status);
          this.setNavState(this.state.compState + 1, 2);
          this.setState({ checkedStep: 3});
        } else if (newProps.passport.status === 'HUMAN_CORRECTED') {
          console.log(newProps.selfie.status);
          this.setNavState(this.state.compState + 1, 3);
          this.setState({ checkedStep: 3});
        } else if (newProps.passport.status === 'HUMAN_REJECTED') {
          console.log(newProps.selfie.status);
          this.setNavState(this.state.compState + 1, 3);
          this.setState({ checkedStep: 3 });
        }
      }
    }

    if (oldState.navState !== newState.navState) {
      if (this.state.navState.current === this.props.steps.length - 1) {
        this.setState({ showFinishBtn: true });
      }
    }
  }

  componentDidMount() {
    const { selfie, passport } = this.props;
    console.log(selfie, passport);
  }

  setAccountStatus = status => {
    const { applicationID } = this.props;
    console.log(applicationID);
    const params = {
      applicationID: applicationID,
      status: status, 
    
    };

    if (status !== "APPROVED") {
      params.reason = this.state.rejectMessage;
    }
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
            {this.state.application?(
              <Button
              color="primary"
              onClick={ () => this.setAccountStatus('REJECTED')}
            >
              Ok
            </Button>
            
            ): (
              <Button
              color="primary"
              onClick={() => this._setDocumentStatus('HUMAN_REJECTED', 3)}
            >
              Ok
            </Button>
            )
              
            }

            
            
           
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
      applicationID,
      selfie
    } = this.props;
    var setFields= false

    this.setState({ blocking: true });
    var docID = documentID;
    if (this.state.checkedStep === 1) {
      docID = selfie.ID;
    }

    var params = {
      documentID: docID,
      user: accountID,
      status: status,
      applicationID: applicationID
    };
    if (styleDocument === 3) {
      params.reason = this.state.rejectMessage;
    }
    if (this.state.checkedStep === 2 && styleDocument === 2) {
      console.log('csdcsd');
      passportAPI
        .setDocumentFields({
          documentID: editFieldsDocument.documentID,
          fields: { passport: editFieldsDocument.fields }
        })
        .then(res => {
          console.log('setDocumentFie', res);
          if (res.status === 200) {
            passportAPI
  .setDocumentStatus(params)
  .then(res => {
    console.log(res);
    if (res.status === 200) {
      console.log('setDocument', res);
     
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
          }else {
            this.handleClickCloseDialog();
            this.setState({ blocking: false });
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
    } else{
      passportAPI
      .setDocumentStatus(params)
      .then(res => {
        console.log(res);
        if (res.status === 200) {
          console.log('setDocument', res);
         
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
        key={i}
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
    console.log(checkedStep, navState.current);

    const documentButton =
      checkedStep <= navState.current &&
      navState.current + 1 !== steps.length &&
      checkedStep !== 3;
    console.log(documentButton);

    return (
      <div onKeyDown={this.handleKeyDown}>
       <Col>
        <Button
          className="btn-shadow float-left btn-wide btn-pill mr-2"
          color="alternate"
          onClick={handleDoneProcedure}
        >
          Previous page
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
            style={
              navState.current + 1 === steps.length && this.state.checkedStep === 3? {} : { display: 'none' }
            }
          >
            Confirmed
          </Button>

        
          <Button
            className="btn-shadow btn-wide float-right btn-pill  mr-2"
            color="danger"
            onClick={() => this.setState({ modal: true, application: true })   }
            size="lg"
            style={
              navState.current + 1 === steps.length && this.state.checkedStep === 3? {} : { display: 'none' }
            }
          >
            Rejected
          </Button>
          <Button
            className="btn btn-shadow float-right btn-pill  mr-2"
            color="success"
            onClick={() => this._setDocumentStatus('HUMAN_APPROVED', 2)}
            style={documentButton ? {} : { display: 'none' }}
          >
            Approve
          </Button>
          
          <Button
            className="btn btn-shadow float-right btn-pill  mr-2"
            color="danger"
            onClick={() => this.setState({ modal: true })}
            style={documentButton ? {} : { display: 'none' }}
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
