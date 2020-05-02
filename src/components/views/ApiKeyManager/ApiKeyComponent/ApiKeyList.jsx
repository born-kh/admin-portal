import React from 'react';
import ReactTable from 'react-table';
import Loader from 'react-loaders';
import cx from 'classnames';

import { Col, Card, Row, CardBody } from 'reactstrap';

const ApiKeyList = props => {
  const { error, pending, apiKeys } = props.apiKey;

  const handleUpdateApiKey = index => {
    const apiKey = apiKeys[index];
    const params = {
      id: apiKey.id,
      key: apiKey.apiKey,
      scopes: apiKey.scopes,
      validFrom: apiKey.validFrom,
      validTo: apiKey.validTo,
      enabled: !apiKey.enabled,
      cacheExpiration: apiKey.cacheExpiration
    };

    props.updateApiKey(params, index);
  };

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
              Because this is a demonstration we load at once all the Components
              examples. This wouldn't happen in a real live app!
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
                      Header: 'Platform',
                      accessor: 'platform'
                    },
                    {
                      Header: 'Version',
                      accessor: 'version'
                    },
                    {
                      Header: 'Valid From',
                      accessor: 'validFrom'
                    },
                    {
                      Header: 'Valid To',
                      accessor: 'validTo'
                    },
                    {
                      Header: 'Expiration',
                      accessor: 'cacheExpiration'
                    },
                    {
                      Header: 'Key',
                      accessor: 'apiKey'
                    },
                    {
                      Header: 'Enabled',
                      Cell: row => (
                        <div className="text-center">
                          <div
                            className="switch has-switch mr-2 mb-2 mr-2"
                            data-off-label="OFF"
                            data-on-label="ON"
                            onClick={() => handleUpdateApiKey(row.index)}
                          >
                            <div
                              className={cx('switch-animate', {
                                'switch-on': apiKeys[row.index].enabled,
                                'switch-off': !apiKeys[row.index].enabled
                              })}
                            >
                              <input type="checkbox" />
                              <span className="switch-left bg-danger">ON</span>
                              <label>&nbsp;</label>
                              <span className="switch-right bg-danger">
                                OFF
                              </span>
                            </div>
                          </div>
                        </div>
                      )
                    },
                    {
                      Header: 'Created At',
                      accessor: 'createdAt'
                    }
                  ]
                }
              ]}
              data={apiKeys}
              defaultPageSize={10}
            />
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default ApiKeyList;
