import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Row, Col, Card, CardBody, Button } from 'reactstrap';
import ReactTable from 'react-table';
import { dateFormatter } from 'helpers';

class ApplicationTable extends React.Component {
  render() {
    const { applications, rows } = this.props;

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
                        Header: 'Status',
                        accessor: 'status'
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
                        Header: 'Country ISOCode',
                        accessor: 'countryISOCode'
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
                      },
                      {
                        Header: 'Account ID',
                        accessor: 'accountID'
                      },

                      {
                        Header: 'Info',
                        id: 'row',
                        accessor: d => d,

                        Cell: row => (
                          <div className="d-block w-100 text-center">
                            <Link
                              to={
                                '/user-manager/users/applicaion' +
                                `/${row.value.ID}`
                              }
                            >
                              <Button
                                className="mb-2 mr-2 btn-icon"
                                color="info"
                              >
                                Info
                              </Button>
                            </Link>
                          </div>
                        )
                      }
                    ]
                  }
                ]}
                data={applications}
                defaultPageSize={rows}
                enabled
                manual
                showPagination={false}
                // this would indicate that server side pagination has been
                showPaginationTop={false}
              />
            </CardBody>
          </Card>
        </Col>
      </Row>
    );
  }
}

export default withRouter(ApplicationTable);
