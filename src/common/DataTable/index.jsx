import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { CSVLink } from 'react-csv';
import Loader from 'react-loaders';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Table, Card, CardBody, CardTitle, ButtonGroup } from 'reactstrap';
import Pagination from './Components/Pagination';
import Filter from './Components/Filter';

class DataTable extends Component {
  static propTypes = {
    url: PropTypes.string,
    data: PropTypes.any,
    columns: PropTypes.any,
    columnDefs: PropTypes.arrayOf(
      PropTypes.shape({
        target: PropTypes.arrayOf(PropTypes.number),
        render: PropTypes.func
      })
    ),
    pagination: PropTypes.number,
    sorting: PropTypes.bool,
    searchAble: PropTypes.object
  };
  static defaultProps = {
    data: []
  };

  constructor(props) {
    super(props);

    this.state = {
      columns: this.props.columns,
      sortByDesc: true,
      sortClicked: false,
      isFiltered: false,
      columnDefs: this.props.columnDefs,
      totalData: props.data,
      filteredData: props.data,
      data: props.data,
      totalRecords: props.data.length,
      loading: !!props.data,
      dataLoaded: true
    };
  }

  //   componentDidMount() {
  //     if (this.props.url) {
  //       this.setState({ loading: true }, () => {
  //         axios
  //           .get(this.props.url)
  //           .then(({ data }) => {
  //             this.setState({
  //               totalData: data.rows.data,
  //               filteredData: data.rows.data,
  //               data: data.rows.data,
  //               totalRecords: 50,
  //               loading: false,
  //               dataLoaded: true
  //             });
  //           })
  //           .catch(errors => {
  //             console.log(errors);
  //           });
  //       });
  //     }
  //   }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.data !== prevProps.data) {
      this.setState(
        prev => ({
          ...prev,
          totalData: this.props.data,
          filteredData: this.props.data,
          totalRecords: this.props.data.length
        }),
        () => {
          if (this.props.columnDefs) {
            this.renderColumnDefs();
          }
        }
      );
    }
  }

  render() {
    const { tableData, headerData } = this.calcTableData();
    const { searchAble, pagination } = this.props;
    const {
      loading,
      filteredData,
      totalRecords,
      isFiltered,
      totalData,
      dataLoaded
    } = this.state;

    return (
      <Fragment>
        {loading ? (
          <div className="loader-wrapper d-flex justify-content-center align-items-center w-100">
            <Loader type="ball-clip-rotate-multiple" />
          </div>
        ) : (
          <ReactCSSTransitionGroup
            component="div"
            transitionName="TabsAnimation"
            transitionAppear={true}
            transitionAppearTimeout={0}
            transitionEnter={false}
            transitionLeave={false}>
            <Card className="main-card mb-3 card">
              <CardBody>
                <CardTitle className="mb-3 text-right">
                  <ButtonGroup size="sm">
                    {searchAble && (
                      <Filter
                        request={this.filterRequest}
                        data={totalData}
                        records={totalRecords}
                        keys={searchAble}
                      />
                    )}
                    <CSVLink
                      data={totalData}
                      target="_blank"
                      className="btn-shadow btn btn-dark">
                      Export CSV
                    </CSVLink>
                  </ButtonGroup>
                </CardTitle>
                <Table hover className="mb-0">
                  <thead>
                    <tr>{headerData}</tr>
                  </thead>
                  <tbody>{tableData}</tbody>
                </Table>
                {dataLoaded && pagination && (
                  <Pagination
                    perPage={pagination}
                    data={filteredData}
                    total={totalRecords}
                    request={this.pageRequest}
                    isFiltered={isFiltered}
                  />
                )}
              </CardBody>
            </Card>
          </ReactCSSTransitionGroup>
        )}
      </Fragment>
    );
  }

  renderColumnDefs = () => {
    this.setState({ loading: true });
    const newData = this.state.totalData;
    const columns = this.state.columns;
    this.state.columnDefs.forEach(data => {
      data.target.forEach(idx => {
        newData.forEach((key, i) => {
          if (newData[i][Object.keys(key)[idx]] !== undefined) {
            newData[i][Object.keys(key)[idx]] = data.hasOwnProperty('render')
              ? data.render(Object.values(key)[idx], key)
              : '';
          } else if (newData[i][Object.keys(key)[idx]] === undefined) {
            newData[i][Object.values(columns)[idx]] = data.hasOwnProperty(
              'render'
            )
              ? data.render(key)
              : '';
          }
          // return data.hasOwnProperty('render') ? data.render(Object.values(key)[idx]): '';
        });
      });
    });
    this.setState({
      totalData: newData,
      filteredData: newData,
      data: newData,
      loading: false
    });
  };

  pageRequest = (data = this.state.data) => {
    this.setState({
      data: data,
      isFiltered: false
    });
  };

  filterRequest = (data, totalRecords, isFiltered) => {
    this.setState({
      filteredData: data,
      totalRecords: totalRecords,
      isFiltered: isFiltered,
      data: data
    });
  };

  sortingTable = key => {
    if (this.state.filteredData.length > 0) {
      const data = this.state.sortByDesc
        ? this.state.filteredData.sort((a, b) => (a[key] < b[key] ? 1 : -1))
        : this.state.filteredData.sort((a, b) => (a[key] > b[key] ? 1 : -1));
      this.setState({
        filteredData: data,
        sortByDesc: this.state.sortByDesc !== true,
        sortClicked: !this.state.sortClicked,
        isFiltered: true
      });
    }
  };

  calcTableData = () => {
    const data = {
      tableData: [],
      headerData: []
    };
    if (this.state.data.length > 0) {
      data.headerData = Object.keys(this.state.columns).map((key, idx) =>
        this.props.sorting ? (
          <th
            key={idx}
            onClick={() => this.sortingTable(this.state.columns[key])}>
            {key}
          </th>
        ) : (
          <th key={idx}>{key}</th>
        )
      );
      data.tableData = this.state.data.map(data => (
        <tr key={data.id + Math.random()}>
          {Object.values(this.state.columns).map(key => (
            <td key={key + Math.random()}>{data[key]}</td>
          ))}
        </tr>
      ));
    }
    return data;
  };
}

export default DataTable;
