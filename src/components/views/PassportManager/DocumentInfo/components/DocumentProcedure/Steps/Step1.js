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

import { Cropper } from 'react-image-cropper';
import { passportAPI } from 'service/api';
export default class WizardStep1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: new Date(),
      isOpen: false,
      checked: false,
      docID: undefined
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
    const { selfieDocuments, passportDocuments } = this.props;
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

    return (
      <Fragment>
        {this.state.isOpen && (
          <Lightbox
            mainSrc={`http://10.7.8.129:9004/document/${this.state.documentID}`}
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
                      onClick={() => deleteDocument(this.state.selfieID)}
                    >
                      Delete
                    </Button>
                  </div>
                </CardHeader>
                <CardBody>
                  <div className="text-center">
                    <img
                      alt=""
                      height="500vh"
                      onClick={() =>
                        this.setState({
                          isOpen: true,
                          documentID: this.state.selfieID
                        })
                      }
                      src={`http://10.7.8.129:9004/document/${this.state.selfieID}`}
                      style={{ cursor: 'pointer' }}
                      width="60%"
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
                      onClick={() => deleteDocument(this.state.passportID)}
                    >
                      Delete
                    </Button>
                  </div>
                </CardHeader>
                <CardBody>
                  <div className="text-center">
                    <img
                      alt=""
                      height="500vh"
                      onClick={() =>
                        this.setState({
                          isOpen: true,
                          documentID: this.state.passportID
                        })
                      }
                      src={`http://10.7.8.129:9004/document/${this.state.passportID}`}
                      style={{ cursor: 'pointer' }}
                      width="60%"
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
                            disabled={row.ID === this.state.selfieID}
                            onClick={() => this.handleChangeSelfieID(row.ID)}
                            outline
                          >
                            <img
                              alt=""
                              className=""
                              height={50}
                              src={`http://10.7.8.129:9004/document/${row.ID}`}
                              style={{ cursor: 'pointer' }}
                              width={80}
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
                            disabled={row.ID === this.state.passportID}
                            onClick={() =>
                              this.setState({
                                passportID: row.ID
                              })
                            }
                            outline
                          >
                            <img
                              alt=""
                              className=""
                              height={50}
                              src={`http://10.7.8.129:9004/document/${row.ID}`}
                              style={{ cursor: 'pointer' }}
                              width={80}
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
