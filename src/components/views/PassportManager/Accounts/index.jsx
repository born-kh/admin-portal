import React, { Component, Fragment } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PageTitle from 'components/common/PageTitle';
import { Col, Card, CardBody, CardHeader } from 'reactstrap';
import PropTypes from 'prop-types';
import LoaderOverlay from 'components/common/LoaderOverlay';
import { fetchApplications } from 'store/actions/passportActions';
import AccountTable from './AccountTable';

class Accounts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: [],
      searchType: 'username',
      page: 0,
      pageSize: 10
    };

    this.handleOnFetch = this.handleOnFetch.bind(this);
    this.handleOnPageChange = this.handleOnPageChange.bind(this);
    this.handleOnPageSizeChange = this.handleOnPageSizeChange.bind(this);
  }

  componentDidMount() {
    this.handleOnFetch();
  }

  handleOnFetch() {
    const { page, pageSize } = this.state;

    let params = {
      start: page * 10,
      count: page * 10 + pageSize
    };
    this.props.fetchApplications(params);
  }
  handleOnPageChange = page => {
    this.setState(
      {
        page
      },
      () => {
        this.handleOnFetch();
      }
    );
  };
  handleOnPageSizeChange = pageSize => {
    this.handleOnFetch();
    this.setState(
      {
        pageSize
      },
      () => {
        this.handleOnFetch();
      }
    );
  };

  renderTable() {
    const { pending, error } = this.props;

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

    if (this.props.applications.length === 0) {
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
      return (
        <AccountTable
          applications={this.props.applications}
          handleOnPageChange={this.handleOnPageChange}
          handleOnPageSizeChange={this.handleOnPageSizeChange}
          pages={this.props.pages}
          pageSize={this.state.pageSize}
        />
      );
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
            heading="New Documents"
            icon="pe-7s-user icon-gradient bg-night-fade"
            subheading=""
          />

          <Col md="12">
            <Card className="main-card mb-3">
              <CardHeader className="card-header-tab" />

              <CardBody>{this.renderTable()}</CardBody>
            </Card>
          </Col>
        </ReactCSSTransitionGroup>
      </Fragment>
    );
  }
}

Accounts.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  applications: state.passport.applications,
  error: state.passport.error,
  pending: state.passport.pending,
  pages: state.passport.pages
});

const mapDispatchToProps = dispatch => {
  return {
    fetchApplications: params => dispatch(fetchApplications(params))
  };
};

const AccountsWithRouter = withRouter(Accounts);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountsWithRouter);
