import React, { Fragment } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {
  Button,
  Row,
  Col,
  Card,
  CardBody,
  Container,
  CardHeader
} from 'reactstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchDocuments } from 'store/actions/passportActions';
import Info from './Info';
import DocumentList from './DocumentList';
import DocumentProcedure from './DocumentProcedure';
import { history } from 'helpers';
import { fetchUsers } from 'store/actions/userActions';
import AccountProfile from './AccountProfile';

class DocumentInfo extends React.Component {
  constructor() {
    super();
    this.state = {
      startProcedure: false
    };
    this.handleStartProcedure = this.handleStartProcedure.bind(this);
    this.handleDoneProcedure = this.handleDoneProcedure.bind(this);
    this.handleGetApplications = this.handleGetApplications.bind(this);
  }
  componentDidMount() {
    const { fetchDocuments, application, fetchUsers } = this.props;

    fetchDocuments({
      applicationID: application.ID
    });
  }

  handleStartProcedure() {
    this.setState({ startProcedure: true });
  }

  handleDoneProcedure() {
    this.setState({ startProcedure: false });
  }

  handleGetApplications() {
    // if (this.props.applications || this.props.applications.length > 0) {
    //   this.props.history.push(
    //     '/passport-manager/applications/' + this.props.applications[0].ID
    //   );
    // } else {
    this.props.history.push('/passport-manager/applications');
  }
  render() {
    const { startProcedure } = this.state;
    const { application, match, documents, pending } = this.props;
    console.log(application.status, startProcedure, documents);
    if (startProcedure) {
      return (
        <Fragment>
          <ReactCSSTransitionGroup
            component="div"
            transitionAppear
            transitionAppearTimeout={0}
            transitionEnter={false}
            transitionLeave={false}
            transitionName="TabsAnimation"
          >
            <DocumentProcedure
              accountID={application.accountID}
              applicationID={application.ID}
              backUrl={match.url}
              documents={documents}
              handleDoneProcedure={this.handleDoneProcedure}
              handleGetApplications={this.handleGetApplications}
            />
          </ReactCSSTransitionGroup>
        </Fragment>
      );
    }
    return (
      <Fragment>
        <ReactCSSTransitionGroup
          component="div"
          transitionAppear
          transitionAppearTimeout={0}
          transitionEnter={false}
          transitionLeave={false}
          transitionName="TabsAnimation"
        >
          <Container fluid>
            <Row>
              <Col md="12">
                <Card className="main-card mb-3">
                  <CardHeader className="card-header-tab">
                    <div className="card-header-title">
                      <Button
                        className={
                          'border-0 btn-pill btn-wide btn-transition active'
                        }
                        color="alternate"
                        // disabled={
                        //   documents.length === 0 ||
                        //   application.status !== 'PENDING'
                        // }
                        disabled={documents.length === 0}
                        onClick={this.handleStartProcedure}
                        outline
                      >
                        Begin review
                      </Button>
                    </div>
                    <div className="btn-actions-pane-right">
                      Status {'    '}
                      <Button
                        className="mb-2 mr-2 btn-transition"
                        color="alternate"
                        disabled
                        outline
                      >
                        {application.status}
                      </Button>
                    </div>
                  </CardHeader>
                  <CardBody className="main-card mb-3">
                    <Row>
                      <Info application={application} />
                      <DocumentList
                        documents={documents}
                        pending={pending}
                      />
                    </Row>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </ReactCSSTransitionGroup>
      </Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  let id = ownProps.match.params.applicationID;

  return {
    pending: state.passport.pending,
    documents: state.passport.documents,
    application: state.passport.applications.find(
      application => application.ID === id
    ),
    applications: state.passport.applications
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchDocuments: params => dispatch(fetchDocuments(params)),
    fetchUsers: params => dispatch(fetchUsers(params))
  };
};

const WithRouterDocumentInfo = withRouter(DocumentInfo);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WithRouterDocumentInfo);
