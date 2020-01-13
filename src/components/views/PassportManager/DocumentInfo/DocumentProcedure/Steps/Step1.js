import React, { Fragment } from 'react';
import { Button, CustomInput } from 'reactstrap';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import ReactTable from 'react-table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import {
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  Container,
  CardHeader
} from 'reactstrap';
import DemoImg from '../../../../../../assets/utils/images/originals/rejectMessage.png';

export default class WizardStep1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: new Date(),
      isOpen: false,
      checked: false,
      docID: undefined,
      documentID: null
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleCheckbox = this.handleCheckbox.bind(this);
  }

  handleChange(date) {
    this.setState({
      startDate: date
    });
  }
  handleCheckbox = (e, docID) => {
    if (e.target.checked === true) {
      this.setState({ docID });
      this.props.getDocumentID(docID);
    } else {
      this.setState({ docID: undefined });
      this.props.getDocumentID(undefined);
    }
  };

  handleChangeSelfieID = selfieID => {
    this.setState({
      selfieID
    });
    this.props.getDocumentID(selfieID);
  };
  componentDidMount() {
    const {
      selfieDocuments,
      passportDocuments,
      selfieID,
      passportID
    } = this.props;
    this.setState({ selfieID, passportID });

    if (selfieDocuments.length > 0) {
      this.handleChangeSelfieID(selfieDocuments[0].ID);
    }
    if (passportDocuments.length > 0) {
      this.setState({
        passportID: passportDocuments[0].ID
      });
    }
  }
  render() {
    const { selfieDocuments, passportDocuments, deleteDocument } = this.props;
    const { isOpen, selfieID, documentID, passportID } = this.state;
    return (
      <Fragment>
        {isOpen && (
          <Lightbox
            mainSrc={`http://10.7.8.129:9004/document/${documentID}`}
            onCloseRequest={() => this.setState({ isOpen: false })}
          />
        )}
        <Container fluid>
          <Row>
            <Col lg="6">
              <Card className="main-card mb-3">
                <CardHeader className="card-header-tab">
                  <div className="card-header-title font-size-lg text-capitalize font-weight-normal">
                    <i className="header-icon lnr-smartphone mr-3 text-muted opacity-6" />
                    Selfie
                  </div>

                  <div className="btn-actions-pane-right">
                    <Button
                      color="danger"
                      onClick={() => deleteDocument(selfieID)}
                    >
                      Delete
                    </Button>
                  </div>
                </CardHeader>
                <CardBody>
                  <div
                    className="text-center"
                    style={{
                      height: 500,
                      width: '100%'
                    }}
                  >
                    <img
                      alt=""
                      onClick={() =>
                        this.setState({
                          isOpen: true,
                          documentID: selfieID
                        })
                      }
                      src={`http://10.7.8.129:9004/document/${selfieID}`}
                      style={{
                        cursor: 'pointer',
                        'max-width': '100%',
                        'max-height': '100%'
                      }}
                    />
                  </div>
                </CardBody>
              </Card>
            </Col>

            <Col lg="6">
              <Card className="main-card mb-3">
                <CardHeader className="card-header-tab">
                  <div className="card-header-title font-size-lg text-capitalize font-weight-normal">
                    <i className="header-icon lnr-picture mr-3 text-muted opacity-6" />
                    Passport
                  </div>

                  <div className="btn-actions-pane-right">
                    <Button
                      color="danger"
                      onClick={() => deleteDocument(passportID)}
                    >
                      Delete
                    </Button>
                  </div>
                </CardHeader>
                <CardBody>
                  <div
                    className="text-center"
                    style={{
                      height: 500,
                      width: '100%'
                    }}
                  >
                    <img
                      alt=""
                      onClick={() =>
                        this.setState({
                          isOpen: true,
                          documentID: passportID
                        })
                      }
                      src={`http://10.7.8.129:9004/document/${passportID}`}
                      style={{
                        cursor: 'pointer',
                        'max-width': '100%',
                        'max-height': '100%'
                      }}
                    />
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col lg="6">
              <Card className="main-card mb-3">
                <CardBody>
                  <CardTitle>Selfies</CardTitle>
                  <Row>
                    {selfieDocuments.map((row, index) => {
                      return (
                        <Col
                          sm="4"
                          xl="2"
                        >
                          <Button
                            className="btn-icon-vertical mb-3 btn-transition btn-block"
                            color="info"
                            disabled={row.ID === selfieID}
                            onClick={() => this.handleChangeSelfieID(row.ID)}
                            outline
                            style={{
                              height: 80
                            }}
                          >
                            <img
                              alt=""
                              className=""
                              src={`http://10.7.8.129:9004/document/${row.ID}`}
                              style={{
                                'max-width': '100%',
                                'max-height': '100%'
                              }}
                            />
                          </Button>
                        </Col>
                      );
                    })}
                  </Row>
                </CardBody>
              </Card>
            </Col>

            <Col lg="6">
              <Card className="main-card mb-3">
                <CardBody>
                  <CardTitle>Passports</CardTitle>
                  <Row>
                    {passportDocuments.map((row, index) => {
                      return (
                        <Col
                          sm="4"
                          xl="2"
                        >
                          <Button
                            className="btn-icon-vertical mb-3 btn-transition btn-block"
                            color="info"
                            disabled={row.ID === passportID}
                            onClick={() =>
                              this.setState({
                                passportID: row.ID
                              })
                            }
                            outline
                            style={{
                              height: 80
                            }}
                          >
                            <img
                              alt=""
                              src={`http://10.7.8.129:9004/document/${row.ID}`}
                              style={{
                                'max-width': '100%',
                                'max-height': '100%'
                              }}
                            />
                          </Button>
                        </Col>
                      );
                    })}
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </Fragment>
    );
  }
}
