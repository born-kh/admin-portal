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
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText
} from 'reactstrap';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Scrollbars } from 'react-custom-scrollbars';
import DatePicker from 'react-datepicker';
import { dateFormatter } from 'helpers';
import { RViewerTrigger, RViewer } from 'react-viewerjs';
import { imageOptions } from 'constants/actionType';
export default class ConfirmStep extends React.Component {
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
      editFieldsDocument,
      checkedSelfieStep,
      checkedPassportStep
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
                        <ListGroupItemText>First Name</ListGroupItemText>
                        <ListGroupItemHeading>
                          {' '}
                          {editFieldsDocument.fields.first_name}
                        </ListGroupItemHeading>
                      </ListGroupItem>
                      <ListGroupItem>
                        <ListGroupItemText>Last Name</ListGroupItemText>
                        <ListGroupItemHeading>
                          {' '}
                          {editFieldsDocument.fields.last_name}
                        </ListGroupItemHeading>
                      </ListGroupItem>
                      <ListGroupItem>
                        <ListGroupItemText>Date Of Birth</ListGroupItemText>
                        <ListGroupItemHeading>
                          {dateFormatter(
                            editFieldsDocument.fields.date_of_birth
                          )}
                        </ListGroupItemHeading>
                      </ListGroupItem>
                      <ListGroupItem>
                        <ListGroupItemText>Expiration Date</ListGroupItemText>
                        <ListGroupItemHeading>
                          {dateFormatter(
                            editFieldsDocument.fields.expiration_date
                          )}
                        </ListGroupItemHeading>
                      </ListGroupItem>
                      <ListGroupItem>
                        <ListGroupItemText>Issue Date</ListGroupItemText>
                        <ListGroupItemHeading>
                          {' '}
                          {dateFormatter(editFieldsDocument.fields.issue_date)}
                        </ListGroupItemHeading>
                      </ListGroupItem>
                    </ListGroup>
                  </Col>
                  <Col md={6}>
                    <ListGroup>
                      {' '}
                      <ListGroupItem>
                        <ListGroupItemText>Nationality</ListGroupItemText>
                        <ListGroupItemHeading>
                          {' '}
                          {editFieldsDocument.fields.nationality}
                        </ListGroupItemHeading>
                      </ListGroupItem>
                      <ListGroupItem>
                        <ListGroupItemText>Country</ListGroupItemText>
                        <ListGroupItemHeading>
                          {' '}
                          {editFieldsDocument.fields.country}
                        </ListGroupItemHeading>
                      </ListGroupItem>
                      <ListGroupItem>
                        <ListGroupItemText> Number</ListGroupItemText>
                        <ListGroupItemHeading>
                          {' '}
                          {editFieldsDocument.fields.number}
                        </ListGroupItemHeading>
                      </ListGroupItem>
                      <ListGroupItem>
                        <ListGroupItemText>Personal Number</ListGroupItemText>
                        <ListGroupItemHeading>
                          {editFieldsDocument.fields.personal_number}
                        </ListGroupItemHeading>
                      </ListGroupItem>
                      <ListGroupItem>
                        <ListGroupItemText> Gender</ListGroupItemText>
                        <ListGroupItemHeading>
                          {' '}
                          {editFieldsDocument.fields.sex}
                        </ListGroupItemHeading>
                      </ListGroupItem>
                      <ListGroupItem>
                        {' '}
                        <ListGroupItemText>Type</ListGroupItemText>
                        <ListGroupItemHeading>
                          {' '}
                          {editFieldsDocument.fields.type}
                        </ListGroupItemHeading>
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
                <div
                  className="text-center"
                  style={{
                    height: 400,
                    width: '100%'
                  }}
                >
                  <RViewer
                    imageUrls={`http://10.7.8.129:9004/document/${checkedSelfieStep.ID}`}
                    options={imageOptions}
                  >
                    <RViewerTrigger>
                      <img
                        src={`http://10.7.8.129:9004/document/${checkedSelfieStep.ID}`}
                        style={{
                          cursor: 'pointer',
                          'max-width': '100%',
                          'max-height': '100%',
                          verticalAlign: 'middle'
                        }}
                      />
                    </RViewerTrigger>
                  </RViewer>
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
                <div
                  className="text-center"
                  style={{
                    height: 400,
                    width: '100%'
                  }}
                >
                  <RViewer
                    imageUrls={`http://10.7.8.129:9004/document/${checkedPassportStep.ID}`}
                    options={imageOptions}
                  >
                    <RViewerTrigger>
                      <img
                        src={`http://10.7.8.129:9004/document/${checkedPassportStep.ID}`}
                        style={{
                          cursor: 'pointer',
                          'max-width': '100%',
                          'max-height': '100%',
                          verticalAlign: 'middle'
                        }}
                      />
                    </RViewerTrigger>
                  </RViewer>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Fragment>
    );
  }
}
