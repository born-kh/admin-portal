import React, { Fragment } from 'react';
import { Col, Card, CardBody } from 'reactstrap';
import MultiStep from './Wizard';
import Step1 from './Steps/Step1';
import Step2 from './Steps/Step2';
import Step4 from './Steps/Step4';
import { passportAPI } from 'service/api';
import WizardStepSet from './Steps/Step3';
import { connect } from 'react-redux';
import {
  deleteDocument,
  deleteApplication
} from 'store/actions/passportActions';
import { convertMRZDate } from 'helpers/convertMRZDate';

class DocumentProcedure extends React.Component {
  state = {
    documentID: undefined,
    setID: undefined,
    currentID: 0,
    selfieID: null,
    selfie: {
      ID: null,
      status: null
    },
    passport: {
      ID: null,
      status: null
    },
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
  componentDidMount() {
    const { documents } = this.props;
    this.getSetDocuments(documents);
  }

  deleteDocument = documentID => {
    passportAPI.deleteDocument({ documentID: documentID }).then(res => {
      console.log(res);
      if (res.status === 200) {
        this.props.deleteDocument(documentID);
      }
    });
  };

  setDocumentSetID = setID => {
    if (setID === '') {
      this.setState({ currentID: 0 });
    } else {
      passportAPI.getDocumentTypes({ setID: setID }).then(response => {
        this.setState({ setID, types: response.data.types });

        this.setState({ currentID: 1 });
      });
    }

    console.log('setDocument');
  };

  setDocumentSelfieID = selfieID => {
    this.setState({ selfieID });
  };

  setDocumentPassportID = passportID => {
    this.setState({ passportID });
  };

  getSetDocuments = documents => {
    if (this.state.setID) {
      var selfie = {
        ID: null,
        status: null
      };
      var passport = {
        ID: null,
        status: null
      };
      var setDocuments = documents.filter(document => {
        return document.documenSet.ID === this.state.setID;
      });

      var passportDocuments = setDocuments.filter(document => {
        return document.documentType.typeName !== 'SELFIE_PHOTO';
      });

      var selfieDocuments = setDocuments.filter(document => {
        return document.documentType.typeName === 'SELFIE_PHOTO';
      });
      console.log('documents', documents);

      selfieDocuments.map(document => {
        console.log(document);
        if (document.status !== 'NEW' && document.status !== 'ML_DONE') {
          selfie.ID = document.ID;
          selfie.status = document.status;
        }
      });

      passportDocuments.map(document => {
        console.log('passport', passport);
        if (document.status !== 'NEW' && document.status !== 'ML_DONE') {
          console.log('passport', document);
          passport.ID = document.ID;
          passport.status = document.status;
        }
      });

      if (!selfie.ID) {
        console.log('selfie');
        if (selfieDocuments.length > 0) {
          selfie.ID = selfieDocuments[0].ID;
          selfie.status = selfieDocuments[0].status;
        }
      }

      if (!passport.ID) {
        if (passportDocuments.length > 0) {
          passport.ID = passportDocuments[0].ID;
          passport.status = passportDocuments[0].status;
        }
      }

      this.setState({
        passportDocuments,
        selfieDocuments,
        setDocuments,
        selfie,
        passport
      });

      if (passportDocuments.length > 0) {
        const document = passportDocuments[0];
        var fields;
        // if (document.fields) {
        //   // fields = {
        //   //   country: document.fields.passport.country,
        //   //   date_of_birth:
        //   //     new Date(document.fields.passport.date_of_birth)
        //   //       .toISOString()
        //   //       .slice(0, -5) + 'Z',
        //   //   expiration_date:
        //   //     new Date(document.fields.passport.expiration_date)
        //   //       .toISOString()
        //   //       .slice(0, -5) + 'Z',
        //   //   sex: document.fields.passport.sex,
        //   //   type: document.fields.passport.type,
        //   //   issue_date:
        //   //     new Date(document.fields.passport.issue_date)
        //   //       .toISOString()
        //   //       .slice(0, -5) + 'Z',
        //   //   last_name: document.fields.passport.last_name,
        //   //   first_name: document.fields.passport.first_name,
        //   //   nationality: document.fields.passport.nationality,
        //   //   number: document.fields.passport.number,
        //   //   personal_number: document.fields.passport.personal_number
        //   // };
        // } else
        if (document.recognized) {
          console.log(
            convertMRZDate(document.recognized.mrz.expiration_date, 'dob')
          );
          fields = {
            country: document.recognized.mrz.country,
            expiration_date: convertMRZDate(
              document.recognized.mrz.expiration_date,
              'expiry'
            ),
            date_of_birth: convertMRZDate(
              document.recognized.mrz.date_of_birth,
              'dob'
            ),
            sex: document.recognized.mrz.sex,
            type: document.recognized.mrz.type,
            issue_date: convertMRZDate(
              document.recognized.mrz.expiration_date,
              'issue'
            ),
            last_name: document.recognized.mrz.surname,
            first_name: document.recognized.mrz.names,
            nationality: document.recognized.mrz.nationality,
            number: document.recognized.mrz.number,
            personal_number: document.recognized.mrz.personal_number
          };
        } else {
          fields = {
            country: null,
            date_of_birth: null,
            expiration_date: null,
            sex: null,
            type: null,
            issue_date: null,
            last_name: null,
            first_name: null,
            nationality: null,
            number: null,
            personal_number: null
          };
        }
        this.setState({
          editFieldsDocument: {
            documentID: document.ID,
            fields
          }
        });
      }
    }
  };

  componentDidUpdate(oldProps, oldState) {
    const { setID } = this.state;
    const newProps = this.props;
    const newState = this.state;
    if (oldProps.documents !== newProps.documents) {
      this.getSetDocuments(newProps.documents);
    }

    if (oldState.setID !== newState.setID) {
      this.getSetDocuments(oldProps.documents);
    }
  }

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
      passport,
      selfie,
      passportDocuments,
      selfieDocuments,
      editFieldsDocument,
      types
    } = this.state;
    const steps = [
      {
        name: 'Group Set',
        component: (
          <WizardStepSet
            documents={documents}
            getDocumentSetID={setID => this.setDocumentSetID(setID)}
          />
        )
      },
      {
        name: 'Selfie',
        status: { ...selfie },
        component: (
          <Step1
            deleteDocument={documentID => this.deleteDocument(documentID)}
            getDocumentID={selfieID => {
              this.setState({ selfieID });
            }}
            passport={passport}
            passportDocuments={passportDocuments}
            selfie={selfie}
            selfieDocuments={selfieDocuments}
          />
        )
      },
      {
        name: 'Passport',
        status: { ...passport },
        component: (
          <Step2
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
          <Step4
            editFieldsDocument={editFieldsDocument}
            passportID={editFieldsDocument.documentID}
            selfieID={selfie.ID}
          />
        )
      }
    ];
    return steps;
  };

  render() {
    const {
      applicationID,
      handleDoneProcedure,
      documents,
      handleGetApplications
    } = this.props;
    const {
      currentID,
      documentID,
      editFieldsDocument,
      passport,
      selfie
    } = this.state;
    console.log(editFieldsDocument);

    return (
      <Fragment>
        <Col md="12">
          <Card className="main-card mb-3">
            <CardBody>
              <MultiStep
                accountID={this.props.accountID}
                applicationID={applicationID}
                currentID={currentID}
                deleteApplication={applicationID =>
                  this.props.deleteApplication(applicationID)
                }
                documentID={editFieldsDocument.documentID}
                // steps={this.renderStep(this.props.documents)}
                editFieldsDocument={editFieldsDocument}
                getDocumentSetID={setID => this.setDocumentSetID(setID)}
                handleDoneProcedure={handleDoneProcedure}
                handleGetApplications={handleGetApplications}
                passport={passport}
                selfie={selfie}
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
