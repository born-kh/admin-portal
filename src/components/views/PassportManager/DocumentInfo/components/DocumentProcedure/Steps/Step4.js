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
import DemoImg from '../../../../../../../assets/utils/images/originals/fence-small.jpg';
import { Table } from 'reactstrap';
import {
  InputGroup,
  InputGroupAddon,
  CardHeader,
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText
} from 'reactstrap';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  AvForm,
  AvGroup,
  AvInput,
  AvFeedback,
  AvRadioGroup,
  AvRadio
} from 'availity-reactstrap-validation';
import { Scrollbars } from 'react-custom-scrollbars';
import DatePicker from 'react-datepicker';
import { dateFormatter } from 'helpers';

export default class WizardStep4 extends React.Component {
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
    const {
      editFieldsDocument,
      handleChangeFields,
      handleChangePageFields
    } = this.props;

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
            <CardBody />
          </Card>
        </Col>
      );
    }
  };

  render() {
    const {
      passportDocuments,
      selfieDocuments,
      editFieldsDocument
    } = this.props;

    return (
      <Fragment>
        <Row>
          <Col md={6}>
            <Card className="main-card mb-3">
              <CardBody>
                <CardTitle>Passport Info </CardTitle>
                <Row>
                  <Col md={6}>
                    <ListGroup>
                      <ListGroupItem>
                        <ListGroupItemHeading>
                          Date Of Birth
                        </ListGroupItemHeading>
                        <ListGroupItemText>
                          {dateFormatter(
                            editFieldsDocument.fields.date_of_birth
                          )}
                        </ListGroupItemText>
                      </ListGroupItem>
                      <ListGroupItem>
                        <ListGroupItemHeading>
                          Expiration Date
                        </ListGroupItemHeading>
                        <ListGroupItemText>
                          {dateFormatter(
                            editFieldsDocument.fields.expiration_date
                          )}
                        </ListGroupItemText>
                      </ListGroupItem>
                      <ListGroupItem>
                        <ListGroupItemHeading>Issue Date</ListGroupItemHeading>
                        <ListGroupItemText>
                          {dateFormatter(editFieldsDocument.fields.issue_date)}
                        </ListGroupItemText>
                      </ListGroupItem>
                      <ListGroupItem>
                        <ListGroupItemHeading>First Name</ListGroupItemHeading>
                        <ListGroupItemText>
                          {editFieldsDocument.fields.first_name}
                        </ListGroupItemText>
                      </ListGroupItem>
                      <ListGroupItem>
                        <ListGroupItemHeading>Last Name</ListGroupItemHeading>
                        <ListGroupItemText>
                          {' '}
                          {editFieldsDocument.fields.last_name}
                        </ListGroupItemText>
                      </ListGroupItem>
                    </ListGroup>
                  </Col>
                  <Col md={6}>
                    <ListGroup>
                      {' '}
                      <ListGroupItem>
                        <ListGroupItemHeading>Nationality</ListGroupItemHeading>
                        <ListGroupItemText>
                          {editFieldsDocument.fields.nationality}
                        </ListGroupItemText>
                      </ListGroupItem>
                      <ListGroupItem>
                        <ListGroupItemHeading>Country</ListGroupItemHeading>
                        <ListGroupItemText>
                          {editFieldsDocument.fields.country}
                        </ListGroupItemText>
                      </ListGroupItem>
                      <ListGroupItem>
                        <ListGroupItemHeading> Number</ListGroupItemHeading>
                        <ListGroupItemText>
                          {' '}
                          {editFieldsDocument.fields.number}
                        </ListGroupItemText>
                      </ListGroupItem>
                      <ListGroupItem>
                        <ListGroupItemHeading>
                          {' '}
                          Personal Number
                        </ListGroupItemHeading>
                        <ListGroupItemText>
                          {' '}
                          {editFieldsDocument.fields.personal_number}
                        </ListGroupItemText>
                      </ListGroupItem>
                      <ListGroupItem>
                        <ListGroupItemHeading>Gender</ListGroupItemHeading>
                        <ListGroupItemText>
                          {' '}
                          {editFieldsDocument.fields.sex}
                        </ListGroupItemText>
                      </ListGroupItem>
                      <ListGroupItem>
                        <ListGroupItemHeading>Type</ListGroupItemHeading>
                        <ListGroupItemText>
                          {' '}
                          {editFieldsDocument.fields.type}
                        </ListGroupItemText>
                      </ListGroupItem>
                    </ListGroup>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>

          <Col lg="6">
            <Card className="main-card mb-3">
              <CardHeader className="card-header-tab">
                <div className="card-header-title font-size-lg text-capitalize font-weight-normal">
                  <i className="header-icon lnr-smartphone mr-3 text-muted opacity-6" />
                  Selfie
                </div>
              </CardHeader>
              <CardBody>
                <div className="text-center">
                  <img
                    alt=""
                    height="400vh"
                    onClick={() =>
                      this.setState({
                        isOpen: true,
                        documentID: this.props.selfieID
                      })
                    }
                    src={`http://10.7.8.129:9004/document/${this.props.selfieID}`}
                    style={{ cursor: 'pointer' }}
                    width="60%"
                  />
                </div>
              </CardBody>
            </Card>
            <Card className="main-card mb-3">
              <CardHeader className="card-header-tab">
                <div className="card-header-title font-size-lg text-capitalize font-weight-normal">
                  <i className="header-icon lnr-smartphone mr-3 text-muted opacity-6" />
                  Passport
                </div>
              </CardHeader>
              <CardBody>
                <div className="text-center">
                  <img
                    alt=""
                    height="400vh"
                    onClick={() =>
                      this.setState({
                        isOpen: true,
                        documentID: this.props.passportID
                      })
                    }
                    src={`http://10.7.8.129:9004/document/${this.props.passportID}`}
                    style={{ cursor: 'pointer' }}
                    width="60%"
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>

        {this.state.isOpen && (
          <Lightbox
            mainSrc={`http://10.7.8.129:9004/document/${this.state.docID}`}
            onCloseRequest={() => this.setState({ isOpen: false })}
          />
        )}
      </Fragment>
    );
  }
}
