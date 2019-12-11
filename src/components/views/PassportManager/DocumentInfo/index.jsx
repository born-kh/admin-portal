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
import Info from './components/Info';
import DocumentList from './components/DocumentList';
import DocumentProcedure from './components/DocumentProcedure';
import { history } from 'helpers';

class DocumentInfo extends React.Component {
  constructor() {
    super();
    this.state = {
      startProcedure: false
    };
    this.handleStartProcedure = this.handleStartProcedure.bind(this);
    this.handleDoneProcedure = this.handleDoneProcedure.bind(this);
  }
  componentDidMount() {
    let params = {
      applicationID: this.props.application.applicationID
    };
    this.props.fetchDocuments(params);
  }

  handleStartProcedure() {
    this.setState({ startProcedure: true });
  }

  handleDoneProcedure() {
    this.setState({ startProcedure: false });
  }
  render() {
    const { startProcedure } = this.state;
    console.log(this.props.documents);
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
              accountID={this.props.application.accountID}
              applicationID={this.props.application.applicationID}
              backUrl={this.props.match.url}
              documents={this.props.documents}
              handleDoneProcedure={this.handleDoneProcedure}
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
                        disabled={this.props.documents.length === 0}
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
                        {this.props.application.status}
                      </Button>
                    </div>
                  </CardHeader>
                  <CardBody className="main-card mb-3">
                    <Row>
                      <Info application={this.props.application} />
                      <DocumentList
                        documents={this.props.documents}
                        pending={this.props.pending}
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
      application => application.applicationID === id
    )
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchDocuments: params => dispatch(fetchDocuments(params))
  };
};

const WithRouterDocumentInfo = withRouter(DocumentInfo);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WithRouterDocumentInfo);
