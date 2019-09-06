import React, { Component, Fragment } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Col, Row, Button, Form, FormGroup, Label, Input } from 'reactstrap';
// import PageTitle from 'Layout/AppMain/PageTitle';

import Tabs, { TabPane } from 'rc-tabs';
import TabContent from 'rc-tabs/lib/SwipeableTabContent';
import ScrollableInkTabBar from 'rc-tabs/lib/ScrollableInkTabBar';
import { connect } from 'react-redux';
import DateFnsUtils from '@date-io/date-fns';
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';

import { fetchTracers } from 'actions/tracerActions';
import PageTitle from 'common/PageTitle/index.jsx';
import FormDateRangePicker from 'common/FormDateRangePicker/index.jsx';
import {
  InputGroup,
  InputGroupAddon,
  CardHeader,
  Card,
  CardBody
} from 'reactstrap';

import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import DateTimeRangeContainer from 'react-advanced-datetimerange-picker';
import moment from 'moment';
import SearchBox from 'layout/Dashboard/components/AppHeader/Components/SearchBox.js';
import SearchInput from 'common/SearchInput/index.jsx';
import MessageTable from './components/MessageTable';
import ErrorTable from './components/ErrorTable';
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

  renderTable() {
    const { pending, error } = this.props;
    if (pending) {
      return (
        <div className="loader-container">
          <div className="loader-container-inner">
            <div className="text-center">
              <Loader type="ball-clip-rotate-multiple" active />
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
        <div className="dropdown-menu-header">
          <div className="dropdown-menu-header-inner bg-primary">
            <div className="menu-header-content">
              <div>
                <h5 className="menu-header-title">{JSON.stringify(error)}</h5>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <Tabs
        defaultActiveKey="1"
        renderTabBar={() => <ScrollableInkTabBar />}
        renderTabContent={() => <TabContent />}>
        <TabPane tab="Messages" key="1">
          {this.props.messages.length === 0 ? (
            <div className="dropdown-menu-header">
              <div className="dropdown-menu-header-inner bg-primary">
                <div className="menu-header-content">
                  <div>
                    <h5 className="menu-header-title">There are no messages</h5>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <MessageTable messagesData={this.props.messages} />
          )}
        </TabPane>
        <TabPane tab="Errors" key="2">
          {this.props.errors.length === 0 ? (
            <div className="dropdown-menu-header">
              <div className="dropdown-menu-header-inner bg-primary">
                <div className="menu-header-content">
                  <div>
                    <h5 className="menu-header-title">There are no errors</h5>
                  </div>
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
      const params = {
        search: this.props.search,
        fromTS: this.state.start.toISOString(),
        toTS: this.state.end.toISOString()
      };
      console.log(params);
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
    return (
      <Fragment>
        <ReactCSSTransitionGroup
          component="div"
          transitionName="TabsAnimation"
          transitionAppear={true}
          transitionAppearTimeout={0}
          transitionEnter={false}
          transitionLeave={false}>
          <PageTitle
            heading="Tracers"
            subheading=""
            icon="pe-7s-graph icon-g  radient bg-ripe-malin"
          />

          <Col md="12">
            <Card className="card-border he-100">
              <CardHeader>
                <div className="card-header-title font-size-lg text-capitalize font-weight-normal">
                  <SearchInput
                    placeholder="Search tracer"
                    isActive={false}
                    keyPressed={this.handleOnSubmit}
                  />
                </div>

                <DateTimeRangeContainer
                  selected={ranges}
                  ranges={ranges}
                  start={this.state.start}
                  end={this.state.end}
                  local={local}
                  maxDate={maxDate}
                  center={true}
                  applyCallback={this.applyCallback}>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <div className="input-group-text">
                        <FontAwesomeIcon icon={faCalendarAlt} hover={true} />
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
