import React, { Fragment } from 'react';
import {
  Row,
  Col,
  FormGroup,
  Label,
  Card,
  CardBody,
  CardTitle
} from 'reactstrap';

import { Table } from 'reactstrap';
import {
  InputGroup,
  InputGroupAddon,
  CardHeader,
  Input,
  Container
} from 'reactstrap';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  AvForm,
  AvGroup,
  AvInput,
  AvFeedback
} from 'availity-reactstrap-validation';

import DatePicker from 'react-datepicker';
import { dateFormatter } from 'helpers';

export default class WizardStep1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: new Date(),
      isOpen: false,
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
  handleCheckbox = docID => {
    this.setState({ docID });
  };

  editDocument = () => {
    const { editFieldsDocument } = this.props;

    const document = editFieldsDocument;
    if (document !== undefined) {
      return (
        <Col
          lg="12"
          xl="12"
        >
          <Card className="mb-3">
            <CardHeader className="card-header-tab">
              <div className="card-header-title font-size-lg text-capitalize font-weight-normal">
                {/* <i className="header-icon lnr-shirt mr-3 text-muted opacity-6"></i> */}
                Edit Document
              </div>
            </CardHeader>
            <CardBody>
              <AvForm>
                <Row>
                  <Col md={3} />

                  <Col md={6} />
                </Row>
              </AvForm>
            </CardBody>
          </Card>
        </Col>
      );
    }
  };

  render() {
    const {
      passportDocuments,
      handleChangeFields,
      editFieldsDocument,
      types
    } = this.props;

    const { documentID } = this.state;

    const pageTypes = types[1].pageFields;
    var pageFields = [];
    for (let key in pageTypes) {
      if (pageTypes.hasOwnProperty(key)) {
        pageFields.push(
          <Col md={6}>
            <FormGroup>
              <Label>{key}</Label>
              <Input
                name={key}
                type={'string'}
              />
            </FormGroup>
          </Col>
        );
      }
    }

    return (
      <Fragment>
        {this.state.isOpen && (
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
                    Document Fields
                  </div>
                </CardHeader>
                <CardBody>
                  <AvForm>
                    {editFieldsDocument && (
                      <Row>
                        <Col md={6}>
                          <FormGroup>
                            <Label for="examplePassword">Issue Date</Label>
                            <InputGroup>
                              <InputGroupAddon addonType="prepend">
                                <div className="input-group-text">
                                  <FontAwesomeIcon icon={faCalendarAlt} />
                                </div>
                              </InputGroupAddon>
                              <DatePicker
                                className="form-control"
                                name="issueDate"
                                onChange={val =>
                                  handleChangeFields(
                                    val.toISOString().split('.')[0] + 'Z',
                                    'issue_date'
                                  )
                                }
                                selected={
                                  new Date(editFieldsDocument.fields.issue_date)
                                }
                              />
                            </InputGroup>
                          </FormGroup>
                        </Col>

                        <Col md={6}>
                          <FormGroup>
                            <Label for="exampleEmail">Expiration Date</Label>
                            <InputGroup>
                              <InputGroupAddon addonType="prepend">
                                <div className="input-group-text">
                                  <FontAwesomeIcon icon={faCalendarAlt} />
                                </div>
                              </InputGroupAddon>
                              <DatePicker
                                className="form-control"
                                onChange={val =>
                                  handleChangeFields(
                                    val.toISOString().split('.')[0] + 'Z',
                                    'expiration_date'
                                  )
                                }
                                selected={
                                  new Date(
                                    editFieldsDocument.fields.expiration_date
                                  )
                                }
                              />
                            </InputGroup>
                          </FormGroup>
                        </Col>
                        <Col md={6}>
                          <FormGroup>
                            <Label for="examplePassword">Date Of Birth</Label>
                            <InputGroup>
                              <InputGroupAddon addonType="prepend">
                                <div className="input-group-text">
                                  <FontAwesomeIcon icon={faCalendarAlt} />
                                </div>
                              </InputGroupAddon>
                              <DatePicker
                                className="form-control"
                                onChange={val =>
                                  handleChangeFields(
                                    val.toISOString().split('.')[0] + 'Z',
                                    'date_of_birth'
                                  )
                                }
                                selected={
                                  new Date(
                                    editFieldsDocument.fields.date_of_birth
                                  )
                                }
                              />
                            </InputGroup>
                          </FormGroup>
                        </Col>
                        <Col md={6}>
                          <FormGroup>
                            <AvGroup>
                              <Label for="firstName">First Name</Label>
                              <AvInput
                                id="firstName"
                                name="firstName"
                                onChange={e =>
                                  handleChangeFields(
                                    e.target.value,
                                    'first_name'
                                  )
                                }
                                required
                                value={editFieldsDocument.fields.first_name}
                              />
                              <AvFeedback>This is an error!</AvFeedback>
                            </AvGroup>
                          </FormGroup>
                        </Col>

                        <Col md={6}>
                          <FormGroup>
                            <AvGroup>
                              <Label for="lastName">Last Name</Label>
                              <AvInput
                                id="lastName"
                                name="lastName"
                                onChange={e =>
                                  handleChangeFields(
                                    e.target.value,
                                    'last_name'
                                  )
                                }
                                required
                                value={editFieldsDocument.fields.last_name}
                              />
                              <AvFeedback>This is an error!</AvFeedback>
                            </AvGroup>
                          </FormGroup>
                        </Col>

                        <Col md={6}>
                          <FormGroup>
                            <AvGroup>
                              <Label for="nationality">Nationality</Label>
                              <AvInput
                                id="nationality"
                                name="nationality"
                                onChange={e =>
                                  handleChangeFields(
                                    e.target.value,
                                    'nationality'
                                  )
                                }
                                required
                                value={editFieldsDocument.fields.nationality}
                              />
                              <AvFeedback>This is an error!</AvFeedback>
                            </AvGroup>
                          </FormGroup>
                        </Col>
                        <Col md={6}>
                          <FormGroup>
                            <AvGroup>
                              <Label for="type">Number</Label>
                              <AvInput
                                id="number"
                                name="number"
                                onChange={e =>
                                  handleChangeFields(e.target.value, 'number')
                                }
                                required
                                value={editFieldsDocument.fields.number}
                              />
                              <AvFeedback>This is an error!</AvFeedback>
                            </AvGroup>
                          </FormGroup>
                        </Col>

                        <Col md={6}>
                          <FormGroup>
                            <AvGroup>
                              <Label for="personal_number">
                                Personal number
                              </Label>
                              <AvInput
                                id="personal_number"
                                name="personal_number"
                                onChange={e =>
                                  handleChangeFields(
                                    e.target.value,
                                    'personal_number'
                                  )
                                }
                                required
                                value={
                                  editFieldsDocument.fields.personal_number
                                }
                              />
                              <AvFeedback>This is an error!</AvFeedback>
                            </AvGroup>
                          </FormGroup>
                        </Col>

                        <Col md={6}>
                          <FormGroup>
                            <AvGroup>
                              <Label for="sex">Gender</Label>
                              <AvInput
                                id="sex"
                                name="sex"
                                onChange={e =>
                                  handleChangeFields(e.target.value, 'sex')
                                }
                                required
                                value={editFieldsDocument.fields.sex}
                              />
                              <AvFeedback>This is an error!</AvFeedback>
                            </AvGroup>
                          </FormGroup>
                        </Col>

                        <Col md={6}>
                          <FormGroup>
                            <AvGroup>
                              <Label for="type">Type</Label>
                              <AvInput
                                id="type"
                                name="type"
                                onChange={e =>
                                  handleChangeFields(e.target.value, 'type')
                                }
                                required
                                value={editFieldsDocument.fields.type}
                              />
                              <AvFeedback>This is an error!</AvFeedback>
                            </AvGroup>
                          </FormGroup>
                        </Col>
                      </Row>
                    )}
                  </AvForm>
                </CardBody>
              </Card>
            </Col>

            <Col lg="6">
              <Card className="main-card mb-3">
                <CardHeader className="card-header-tab">
                  <div className="card-header-title font-size-lg text-capitalize font-weight-normal">
                    <i className="header-icon lnr-picture mr-3 text-muted opacity-6" />
                    Document Photo
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
                          documentID: passportDocuments[0].ID
                        })
                      }
                      src={`http://10.7.8.129:9004/document/${passportDocuments[0].ID}`}
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
        </Container>
      </Fragment>
    );
  }
}
