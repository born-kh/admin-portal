import React, { Fragment } from 'react';
import { Col, Card, CardBody } from 'reactstrap';
import MultiStep from './Wizard';
import Step1 from './Steps/Step1';
import Step2 from './Steps/Step2';
import Step4 from './Steps/Step4';
import { passportAPI } from 'service/api';
import WizardStepSet from './Steps/Step3';
import { connect } from 'react-redux';
import { deleteDocument } from 'store/actions/passportActions';
import { convertMRZDate } from 'helpers/convertMRZDate';

class DocumentProcedure extends React.Component {
  state = {
    documentID: undefined,
    setID: undefined,
    selfieID: undefined,
    passportID: undefined,
    currentID: 0,
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
    console.log(this.state.setID);
    var setDocuments = documents.filter(document => {
      return document.documenSet.ID === this.state.setID;
    });

    var passportDocuments = setDocuments.filter(document => {
      return document.documentType.typeName !== 'SELFIE_PHOTO';
    });

    var selfieDocuments = setDocuments.filter(document => {
      return document.documentType.typeName === 'SELFIE_PHOTO';
    });

    this.setState({
      passportDocuments,
      selfieDocuments,
      setDocuments
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
          last_name: document.recognized.mrz.names,
          first_name: document.recognized.mrz.surname,
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
        component: (
          <Step1
            deleteDocument={documentID => this.deleteDocument(documentID)}
            documents={documents}
            getDocumentID={documentID => {
              this.setState({ documentID });
            }}
            passportDocuments={this.state.passportDocuments}
            selfieDocuments={this.state.selfieDocuments}
          />
        )
      },
      {
        name: 'Passport',
        component: (
          <Step2
            editFieldsDocument={this.state.editFieldsDocument}
            handleChangeFields={this.handleChangeFields}
            handleChangePageFields={this.handleChangePageFields}
            passportDocuments={this.state.passportDocuments}
            types={this.state.types}
          />
        )
      },

      {
        name: 'Confirmed Document',
        component: (
          <Step4
            editFieldsDocument={this.state.editFieldsDocument}
            passportID={this.state.editFieldsDocument.documentID}
            selfieID={this.state.documentID}
          />
        )
      }
    ];
    return steps;
  };

  render() {
    const { applicationID } = this.props;
    console.log(this.state);

    return (
      <Fragment>
        <Col md="12">
          <Card className="main-card mb-3">
            <CardBody>
              <MultiStep
                accountID={this.props.accountID}
                applicationID={applicationID}
                currentID={this.state.currentID}
                // steps={this.renderStep(this.props.documents)}
                documentID={this.state.documentID}
                editFieldsDocument={this.state.editFieldsDocument}
                getDocumentSetID={setID => this.setDocumentSetID(setID)}
                handleDoneProcedure={this.props.handleDoneProcedure}
                showNavigation
                steps={this.renderSteps(
                  this.props.documents,
                  this.state.setDocuments,
                  this.state.currentID
                )}
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
    deleteDocument: documentID => dispatch(deleteDocument(documentID))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DocumentProcedure);
