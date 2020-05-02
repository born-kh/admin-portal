import React, { Fragment } from 'react';
import { Col, Card, CardBody } from 'reactstrap';
import MultiStep from './Wizard';
import SelfieStep from './Steps/SelfieStep';
import DocumentStep from './Steps/DocumentStep';
import ConfirmStep from './Steps/ConfirmStep';
import { passportAPI } from 'service/api';
import SetGroups from './Steps/SetGroups';
import { connect } from 'react-redux';
import {
  deleteDocument,
  deleteApplication
} from 'store/actions/passportActions';
import { convertMRZDate } from 'helpers/convertMRZDate';

class DocumentProcedure extends React.Component {
  state = {
    documentID: null,
    setID: null,
    checkedGroupStep: false,
    checkedSelfieStep: {},
    checkedPassportStep: {},
    selfieDocuments: [],
    passportDocuments: [],
    setDocuments: [],
    types: [],
    editFieldsDocument: {
      documentID: null,
      fields: {
        country: '',
        date_of_birth: '',
        expiration_date: '',
        sex: '',
        type: '',
        issue_date: '',
        last_name: '',
        first_name: '',
        nationality: '',
        number: '',
        personal_number: ''
      }
    }
  };

  deleteDocument = documentID => {
    passportAPI.deleteDocument({ documentID: documentID }).then(res => {
      if (res.status === 200) {
        this.props.deleteDocument(documentID);

        var passportDocuments = this.state.passportDocuments.filter(
          document => {
            return document.ID !== documentID;
          }
        );

        var selfieDocuments = this.state.selfieDocuments.filter(document => {
          return document.ID !== documentID;
        });
        this.setState({ selfieDocuments, passportDocuments });
      }
    });
  };

  setDocumentSetID = setID => {
    if (setID === '') {
      this.setState({ checkedGroupStep: false });
    } else {
      passportAPI.getDocumentTypes({ setID: setID }).then(response => {
        this.setState({ setID, types: response.data.types });
        this.getSetDocuments(this.props.documents);
      });
    }
  };

  setDocumentSelfieID = selfieID => {
    this.setState({ selfieID });
  };

  setDocumentPassportID = passportID => {
    this.setState({ passportID });
  };

  getSetDocuments = documents => {
    if (this.state.setID) {
      var checkedPassportIndex = -1;
      var setDocuments = documents.filter(document => {
        return document.documenSet.ID === this.state.setID;
      });

      var passportDocuments = setDocuments.filter(document => {
        return document.documentType.typeName !== 'SELFIE_PHOTO';
      });

      var selfieDocuments = setDocuments.filter(document => {
        return document.documentType.typeName === 'SELFIE_PHOTO';
      });
      if (selfieDocuments.length > 0) {
        this.setState({
          checkedSelfieStep: {
            ID: selfieDocuments[0].ID,
            status: selfieDocuments[0].status
          }
        });
      }

      if (passportDocuments.length > 0) {
        this.setState({
          checkedPassportStep: {
            ID: passportDocuments[0].ID,
            status: passportDocuments[0].status
          }
        });
      }

      selfieDocuments.forEach(document => {
        if (
          document.status === 'HUMAN_APPROVED' &&
          document.status === 'HUMAN_REJECTED'
        ) {
          this.setState({
            checkedSelfieStep: { ID: document.ID, status: document.status }
          });
        }
      });

      passportDocuments.forEach((document, index) => {
        if (
          document.status === 'HUMAN_APPROVED' &&
          document.status === 'HUMAN_REJECTED'
        ) {
          checkedPassportIndex = index;
          this.setState({
            checkedPassportStep: { ID: document.ID, status: document.status }
          });
        }
      });

      this.setState({
        passportDocuments,
        selfieDocuments,
        setDocuments,
        checkedGroupStep: true
      });

      if (passportDocuments.length > 0) {
        const filterPassport = passportDocuments.filter(item => {
          return item.recognized;
        });

        var document =
          filterPassport.length > 0 ? filterPassport[0] : passportDocuments[0];
        var fields;
        if (checkedPassportIndex !== -1) {
          document = passportDocuments[checkedPassportIndex];
        }
        var passport = null;
        if (document.recognized && document.recognized.mrz.passport) {
          passport = document.recognized.mrz.passport;
        } else if (document.recognized && document.recognized.mrz.idcard) {
          passport = document.recognized.mrz.idcard;
        }
        console.log(passport, document);
        if (passport) {
          fields = {
            country: passport.country,
            expiration_date: convertMRZDate(passport.expiration_date, 'expiry'),
            date_of_birth: convertMRZDate(passport.date_of_birth, 'dob'),
            sex: passport.sex,
            type: passport.type,
            issue_date: convertMRZDate(passport.expiration_date, 'issue'),
            last_name: passport.surname,
            first_name: passport.names,
            nationality: passport.nationality,
            number: passport.number,
            personal_number: passport.personal_number
          };
        } else {
          fields = this.state.editFieldsDocument.fields;
        }
        this.setState({
          editFieldsDocument: {
            documentID: document.ID,
            fields
          },

          checkedPassportStep: {
            ID: document.ID,
            status: document.status
          }
        });
      }
    }
  };

  handleChangeFields = (val, name) => {
    this.setState({
      editFieldsDocument: {
        ...this.state.editFieldsDocument,
        fields: {
          ...this.state.editFieldsDocument.fields,
          [name]: val
        }
      }
    });
  };

  renderSteps = documents => {
    const {
      checkedPassportStep,
      checkedSelfieStep,
      passportDocuments,
      selfieDocuments,
      editFieldsDocument,
      types
    } = this.state;
    const steps = [
      {
        name: 'Group Set',
        component: (
          <SetGroups
            documents={documents}
            getDocumentSetID={setID => this.setDocumentSetID(setID)}
          />
        )
      },
      {
        name: 'Selfie',
        status: { ...checkedSelfieStep },
        component: (
          <SelfieStep
            checkedPassportStep={checkedPassportStep}
            checkedSelfieStep={checkedSelfieStep}
            deleteDocument={documentID => this.deleteDocument(documentID)}
            passportDocuments={passportDocuments}
            selfieDocuments={selfieDocuments}
            setCheckedDocument={params => this.setCheckedDocument(params)}
          />
        )
      },
      {
        name: 'Passport',
        status: { ...checkedPassportStep },
        component: (
          <DocumentStep
            checkedPassportStep={checkedPassportStep}
            editFieldsDocument={editFieldsDocument}
            handleChangeFields={this.handleChangeFields}
            handleChangePageFields={this.handleChangePageFields}
            passportDocuments={passportDocuments}
            types={types}
          />
        )
      },

      {
        name: 'Confirmed Document',
        component: (
          <ConfirmStep
            checkedPassportStep={checkedPassportStep}
            checkedSelfieStep={checkedSelfieStep}
            editFieldsDocument={editFieldsDocument}
          />
        )
      }
    ];
    return steps;
  };

  setCheckedDocument = params => {
    if (params.selfie) {
      this.setState({
        checkedSelfieStep: {
          ID: params.docID,
          status: params.status
        }
      });
    } else {
      this.setState({
        checkedPassportStep: {
          ID: params.docID,
          status: params.status
        }
      });
    }
  };

  render() {
    const {
      applicationID,
      handleDoneProcedure,
      documents,
      handleGetApplications
    } = this.props;
    const {
      checkedGroupStep,
      documentID,
      editFieldsDocument,
      checkedPassportStep,
      checkedSelfieStep
    } = this.state;

    return (
      <Fragment>
        <Col md="12">
          <Card className="main-card mb-3">
            <CardBody>
              <MultiStep
                accountID={this.props.accountID}
                applicationID={applicationID}
                checkedGroupStep={checkedGroupStep}
                checkedPassportStep={checkedPassportStep}
                checkedSelfieStep={checkedSelfieStep}
                deleteApplication={applicationID =>
                  this.props.deleteApplication(applicationID)
                }
                documentID={editFieldsDocument.documentID}
                editFieldsDocument={editFieldsDocument}
                getDocumentSetID={setID => this.setDocumentSetID(setID)}
                handleDoneProcedure={handleDoneProcedure}
                handleGetApplications={handleGetApplications}
                setCheckedDocument={params => this.setCheckedDocument(params)}
                showNavigation
                steps={this.renderSteps(documents)}
              />
            </CardBody>
          </Card>
        </Col>
      </Fragment>
    );
  }
}
const mapStateToProps = state => {};

const mapDispatchToProps = dispatch => {
  return {
    deleteDocument: documentID => dispatch(deleteDocument(documentID)),
    deleteApplication: applicationID =>
      dispatch(deleteApplication(applicationID))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DocumentProcedure);
