import React, { Component, Fragment } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Col } from 'reactstrap';
import Tabs, { TabPane } from 'rc-tabs';
import TabContent from 'rc-tabs/lib/SwipeableTabContent';
import ScrollableInkTabBar from 'rc-tabs/lib/ScrollableInkTabBar';
import { connect } from 'react-redux';
import { fetchTracers } from 'store/actions/tracerActions';
import PageTitle from 'components/common/PageTitle';
import {
  InputGroup,
  InputGroupAddon,
  CardHeader,
  Card,
  CardBody
} from 'reactstrap';

import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import queryString from 'query-string';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import DateTimeRangeContainer from 'react-advanced-datetimerange-picker';
import moment from 'moment';
import SearchInput from 'components/common/SearchInput';
import MessageTable from './MessageTable';
import ErrorTable from './ErrorTable';
import Loader from 'react-loaders';

class Tracers extends Component {
  constructor(props) {
    super(props);

    let now = new Date();
    let start = moment(
      new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0)
    );
    let end = moment(start)
      .add(1, 'days')
      .subtract(1, 'seconds');
    this.state = {
      start: start,
      end: end,
      modal: false
    };

    this.applyCallback = this.applyCallback.bind(this);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
  }

  componentDidMount() {
    const values = queryString.parse(this.props.location.search);

    if (values.q !== undefined) {
      const params = {
        search: values.q,
        fromTS: values.start,
        toTS: values.end
      };

      this.props.fetchTracers(params);
    }
  }

  renderTable() {
    const { pending, error } = this.props;
    if (pending) {
      return (
        <div className="loader-container">
          <div className="loader-container-inner">
            <div className="text-center">
              <Loader
                active
                type="ball-clip-rotate-multiple"
              />
            </div>
            <h6 className="mt-5">
              Please wait while we load all the Components examples
              <small>
                Because this is a demonstration we load at once all the
                Components examples. This wouldn't happen in a real live app!
              </small>
            </h6>
          </div>
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

    return (
      <Tabs
        defaultActiveKey="1"
        renderTabBar={() => <ScrollableInkTabBar />}
        renderTabContent={() => <TabContent />}
      >
        <TabPane
          key="1"
          tab="Messages"
        >
          {this.props.messages.length === 0 ? (
            <div className="widget-content">
              <div className="widget-content-wrapper">
                <div className="widget-content-right ml-0 mr-3">
                  <div className="widget-subheading">There are no messages</div>
                </div>
              </div>
            </div>
          ) : (
            <MessageTable messagesData={this.props.messages} />
          )}
        </TabPane>
        <TabPane
          key="2"
          tab="Errors"
        >
          {this.props.errors.length === 0 ? (
            <div className="widget-content">
              <div className="widget-content-wrapper">
                <div className="widget-content-right ml-0 mr-3">
                  <div className="widget-subheading">There are no errors</div>
                </div>
              </div>
            </div>
          ) : (
            <ErrorTable errorsData={this.props.errors} />
          )}
        </TabPane>
      </Tabs>
    );
  }

  handleOnSubmit(event) {
    if (event.key === 'Enter') {
      let search = '?q=' + this.props.search;
      let fromTs = '&start=' + this.state.start.toISOString();
      let toTs = '&end=' + this.state.end.toISOString();

      this.props.history.push(this.props.match.url + search + fromTs + toTs);
      const params = {
        search: this.props.search,
        fromTS: this.state.start.toISOString(),
        toTS: this.state.end.toISOString()
      };

      this.props.fetchTracers(params);
    }
  }

  applyCallback(startDate, endDate) {
    this.setState({
      start: startDate,
      end: endDate
    });
  }
  render() {
    let now = new Date();
    let start = moment(
      new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0)
    );
    let end = moment(start)
      .add(1, 'days')
      .subtract(1, 'seconds');
    let ranges = {
      'Today Only': [moment(start), moment(end)],
      'Yesterday Only': [
        moment(start).subtract(1, 'days'),
        moment(end).subtract(1, 'days')
      ],
      '3 Days': [moment(start).subtract(3, 'days'), moment(end)]
    };
    let local = {
      format: 'DD-MM-YYYY HH:mm',
      sundayFirst: false
    };
    let maxDate = moment(start).add(24, 'hour');
    console.log(this.props);
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
            heading="Tracers"
            icon="pe-7s-server icon-gradient bg-night-fade"
            subheading=""
          />

          <Col md="12">
            <Card className="card-border he-100">
              <CardHeader>
                <div className="card-header-title font-size-lg text-capitalize font-weight-normal">
                  <SearchInput
                    isActive={false}
                    keyPressed={this.handleOnSubmit}
                    placeholder="Search tracer"
                  />
                </div>

                <DateTimeRangeContainer
                  applyCallback={this.applyCallback}
                  center
                  end={this.state.end}
                  local={local}
                  maxDate={maxDate}
                  ranges={ranges}
                  selected={ranges}
                  start={this.state.start}
                >
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <div className="input-group-text">
                        <FontAwesomeIcon
                          hover
                          icon={faCalendarAlt}
                        />
                      </div>
                    </InputGroupAddon>
                  </InputGroup>
                </DateTimeRangeContainer>
              </CardHeader>
              <CardBody>{this.renderTable()}</CardBody>
            </Card>
          </Col>
        </ReactCSSTransitionGroup>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  errors: state.tracer.errors,
  messages: state.tracer.messages,
  accountId: state.tracer.accountId,
  search: state.settings.search,
  pending: state.tracer.pending,
  error: state.tracer.error,
  session: state.auth.session
});

const mapDispatchToProps = dispatch => {
  return {
    fetchTracers: params => dispatch(fetchTracers(params))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Tracers);
