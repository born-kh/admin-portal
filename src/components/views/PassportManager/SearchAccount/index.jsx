import React, { Component, Fragment } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PageTitle from 'components/common/PageTitle';
import { Row, FormGroup, Input, Button } from 'reactstrap';
import { Col, Card, CardBody, CardHeader } from 'reactstrap';
import PropTypes from 'prop-types';
import LoaderOverlay from 'components/common/LoaderOverlay';
import { fetchApplicationSearch } from 'store/actions/passportActions';
import ApplicationTable from './SearchTable';

class SearchAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: [],
      searchType: 'username',
      firstName: '',
      lastName: '',
      phoneNumber: ''
    };

    this.handleOnSubmit = this.handleOnSubmit.bind(this);
    this.handleOnPageChange = this.handleOnPageChange.bind(this);
    this.handleOnPageSizeChange = this.handleOnPageSizeChange.bind(this);
  }

  handleOnSubmit = () => {
    const { firstName, lastName, phoneNumber } = this.state;
    let name = {
      firstName: firstName,
      lastName: lastName
    };
    let params = {
      name: name,
      phone: phoneNumber
    };
    this.props.fetchApplicationSearch(params);
  };

  handleOnFetch() {
    const { page, pageSize } = this.state;
    let params = {
      start: page * 10,
      count: page * 10 + pageSize
    };
    this.props.fetchApplications(params);
  }
  handleOnPageChange = page => {
    this.setState({ page });
    this.handleOnFetch();
  };
  handleOnPageSizeChange = pageSize => {
    this.setState({ pageSize });
    this.handleOnFetch();
  };

  handleChangeSearch = (e, typeSearch) => {
    const searchtext = e.target.value;
    switch (typeSearch) {
      case 'firstName':
        this.setState({ firstName: searchtext });
        break;
      case 'lastName':
        this.setState({ lastName: searchtext });
        break;
      case 'phoneNumber':
        this.setState({ phoneNumber: searchtext });
        break;
      case 'passportNumber':
        this.setState({ passportNumber: searchtext });
        break;
      case 'DOB':
        this.setState({ DOB: searchtext });
        break;

      default:
        break;
    }
  };

  renderTable() {
    const { pending, error, applications } = this.props;

    if (pending) {
      return <LoaderOverlay />;
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

    if (applications.length === 0) {
      return (
        <div className="widget-content">
          <div className="widget-content-wrapper">
            <div className="widget-content-right ml-0 mr-3">
              <div className="widget-subheading">There are no accounts</div>
            </div>
          </div>
        </div>
      );
    } else {
      return <ApplicationTable
        applications={applications}
        rows={10}
             />;
    }
  }
  render() {
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
          <PageTitle
            heading="Search Account"
            icon="pe-7s-user icon-gradient bg-night-fade"
            subheading=""
          />

          <Col md="12">
            <Card className="main-card mb-3">
              <CardHeader className="card-header-tab">
                Advanced search
              </CardHeader>
              <CardBody>
                <Row>
                  <Col md={2}>
                    <FormGroup>
                      <Input
                        id="exampleCity"
                        name="city"
                        onChange={e => this.handleChangeSearch(e, 'firstName')}
                        placeholder="First Name"
                        type="text"
                      />
                    </FormGroup>
                    <FormGroup>
                      <Input
                        id="exampleCity"
                        name="city"
                        onChange={e => this.handleChangeSearch(e, 'lastName')}
                        placeholder="Last Name"
                        type="text"
                      />
                    </FormGroup>
                    <FormGroup>
                      <Input
                        id="exampleCity"
                        name="city"
                        onChange={e =>
                          this.handleChangeSearch(e, 'phoneNumber')
                        }
                        placeholder="Phone Number"
                        type="text"
                      />
                    </FormGroup>
                  </Col>
                  <Col md={2}>
                    <Button
                      className={
                        'border-0 btn-pill btn-wide  btn-transition active'
                      }
                      color="alternate"
                      onClick={this.handleOnSubmit}
                      outline
                    >
                      Search
                    </Button>
                  </Col>
                </Row>
              </CardBody>
              <div className="divider" />
              {this.renderTable()}
            </Card>
          </Col>
        </ReactCSSTransitionGroup>
      </Fragment>
    );
  }
}

SearchAccount.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  applications: state.passport.applications,
  error: state.passport.error,
  pending: state.passport.pending
});

const mapDispatchToProps = dispatch => {
  return {
    fetchApplicationSearch: params => dispatch(fetchApplicationSearch(params))
  };
};

const SearchAccountWithRouter = withRouter(SearchAccount);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchAccountWithRouter);
