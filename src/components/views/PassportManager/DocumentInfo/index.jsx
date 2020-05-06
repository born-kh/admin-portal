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
import DocumentProcedure from './DocumentProcedure';
import { fetchUsers } from 'store/actions/userActions';

import Loader from 'react-loaders';
import ProfileInfo from './ProfileInfo';

class DocumentInfo extends React.Component {
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
    this.handleNextApplication = this.handleNextApplication.bind(this);
  }
  componentDidMount() {
    const { fetchDocuments, application, fetchUsers } = this.props;
    if (!application) {
      this.props.history.push('/passport-manager/applications');
    } else {
      fetchDocuments({
        applicationID: application.ID
      });

      fetchUsers([{ type: 'accountID', search: application.accountID }]);
    }
  }

  handleStartProcedure() {
    this.setState({ startProcedure: true });
  }

  handleDoneProcedure() {
    this.setState({ startProcedure: false });
  }

  componentDidUpdate(oldProps) {
    const { fetchDocuments, application, fetchUsers } = this.props;
    const newProps = this.props;
    if (
      oldProps.match.params.applicationID !==
      newProps.match.params.applicationID
    ) {
      this.handleDoneProcedure();
      fetchDocuments({
        applicationID: application.ID
      });

      fetchUsers([{ type: 'accountID', search: application.accountID }]);
    }
  }

  handleOnFetchApplications() {
    const { page, pageSize } = this.state;

    let params = {
      start: page * 10,
      count: page * 10 + pageSize
    };
    this.props.fetchApplications(params);
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
      this.handleOnFetchApplications();
    }
  }

  handleNextApplication() {
    var filterApplications = this.props.applications.filter(
      application => application.ID !== this.props.application.ID
    );

    if (filterApplications.length > 0) {
      this.props.deleteApplication(this.props.application.ID);
      this.props.history.push(
        `/passport-manager/applications/${filterApplications[0].ID}`
      );
    } else {
      this.handleOnFetchApplications();
    }
  }

  rederProfileInfo() {
    let { users, error, pending } = this.props;
    if (pending) {
      return (
        <div className="text-center">
          <Loader type="ball-scale" />
        </div>
      );
    }
    if (error) {
      return (
        <div className="widget-content">
          <div className="widget-content-wrapper">
            <div className="widget-content-right ml-0 mr-3">
              <div className="widget-subheading">{error}</div>
            </div>
          </div>
        </div>
      );
    }

    if (users.length === 0) {
      return (
        <div className="widget-content">
          <div className="widget-content-wrapper">
            <div className="widget-content-right ml-0 mr-3">
              <div className="widget-subheading">There are no user</div>
            </div>
          </div>
        </div>
      );
    } else {
      return <ProfileInfo userInfo={users[0]} />;
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
                        <Button
                          className={
                            'border-0 btn-pill btn-wide btn-transition active'
                          }
                          color="alternate"
                          onClick={this.handleNextApplication}
                        >
                          Next Application
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
    application: state.passport.applications.find(
      application => application.ID === id
    ),
    applications: state.passport.applications
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

const WithRouterDocumentInfo = withRouter(DocumentInfo);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WithRouterDocumentInfo);
