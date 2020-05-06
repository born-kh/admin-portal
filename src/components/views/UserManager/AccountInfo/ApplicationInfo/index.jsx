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
import {
  fetchDocuments,
  deleteApplication,
  fetchApplications
} from 'store/actions/passportActions';
import Info from './Info';
import DocumentList from './DocumentList';

import { fetchUsers } from 'store/actions/userActions';
import DocumentProcedure from 'components/views/PassportManager/DocumentInfo/DocumentProcedure';

class ApplicationInfo extends React.Component {
  constructor() {
    super();
    this.state = {
      startProcedure: false,
      page: 0,
      pageSize: 100
    };
    this.handleStartProcedure = this.handleStartProcedure.bind(this);
    this.handleDoneProcedure = this.handleDoneProcedure.bind(this);
    this.handleGetApplications = this.handleGetApplications.bind(this);
  }
  componentDidMount() {
    const { fetchDocuments, application } = this.props;
    if (!application) {
      this.props.history.goBack();
    } else {
      fetchDocuments({
        applicationID: application.ID
      });
    }
  }

  handleStartProcedure() {
    this.setState({ startProcedure: true });
  }

  handleDoneProcedure() {
    this.setState({ startProcedure: false });
  }

  handleGetApplications() {
    var filterApplications = this.props.applications.filter(
      application => application.ID !== this.props.application.ID
    );

    if (filterApplications.length > 0) {
      this.props.history.push(
        `/passport-manager/applications/${filterApplications[0].ID}`
      );
    } else {
    }
  }

  render() {
    const { startProcedure } = this.state;
    const { application, match, documents, errorDoc, pendingDoc } = this.props;

    if (startProcedure && application) {
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
    if (application) {
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
                          disabled={
                            documents.length === 0 ||
                            application.status !== 'PENDING'
                          }
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
                          error={errorDoc}
                          pending={pendingDoc}
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
    } else {
      return <div />;
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  let id = ownProps.match.params.applicationID;

  return {
    pendingDoc: state.passport.pending,
    errorDoc: state.passport.error,
    users: state.user.users,

    pending: state.user.pending,
    error: state.user.error,
    documents: state.passport.documents,
    application: state.user.applications.find(
      application => application.ID === id
    ),
    applications: state.user.applications
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchDocuments: params => dispatch(fetchDocuments(params)),
    fetchUsers: params => dispatch(fetchUsers(params)),
    deleteApplication: applicationID =>
      dispatch(deleteApplication(applicationID)),
    fetchApplications: params => dispatch(fetchApplications(params))
  };
};

const WithRouterApplicationInfo = withRouter(ApplicationInfo);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WithRouterApplicationInfo);
