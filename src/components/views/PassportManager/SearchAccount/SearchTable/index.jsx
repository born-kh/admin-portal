import React from 'react';
import _ from 'lodash';
import { Link, withRouter } from 'react-router-dom';
import { Row, Col, Card, CardBody, Button } from 'reactstrap';
import ReactTable from 'react-table';
import { dateFormatter } from 'helpers';

class SearchTable extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { searchData } = this.props;

    return (
      <Row>
        <Col md="12">
          <Card className="main-card mb-3">
            <CardBody>
              <ReactTable
                className="-striped -highlight"
                columns={[
                  {
                    columns: [
                      {
                        Header: '№',
                        accessor: 'row',
                        id: 'row',
                        width: 50,

                        Cell: row => (
                          <div className="d-block w-100 text-center">
                            {row.index + 1}
                          </div>
                        )
                      },
                      {
                        Header: 'Account ID',
                        accessor: 'accountID'
                      },

                      {
                        Header: 'Status',
                        accessor: 'status'
                      },
                      {
                        Header: 'Country ISOCode',
                        accessor: 'countryISOCode'
                      },

                      {
                        Header: 'First Name',
                        accessor: 'firstName'
                      },
                      {
                        Header: 'Last Name',
                        accessor: 'lastName'
                      },

                      {
                        Header: 'Created At',
                        accessor: 'createdAt',
                        Cell: row => dateFormatter(row.value)
                      },
                      {
                        Header: 'Updated At',
                        accessor: 'updatedAt',
                        Cell: row => dateFormatter(row.value)
                      },
                      {
                        Header: 'Submitted At',
                        accessor: 'submittedAt',
                        Cell: row => dateFormatter(row.value)
                      }
                    ]
                  }
                ]}
                data={searchData}
                defaultPageSize={10}
                enabled
                manual
                showPagination
                showPaginationBottom // this would indicate that server side pagination has been
                showPaginationTop={false}
              />
            </CardBody>
          </Card>
        </Col>
      </Row>
    );
  }
}

export default withRouter(SearchTable);
