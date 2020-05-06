import React, { Fragment, useState, useEffect } from 'react';

import ApiKeyList from './ApiKeyList';
import ApiKeyCreate from './ApiKeyCreate';
import {
  fetchApiKeys,
  createApiKey,
  updateApikey
} from 'store/actions/apiKeyActions';
import { connect } from 'react-redux';
import { Col, Card, CardHeader, CardBody, Button } from 'reactstrap';
import { axios } from 'helpers';
import { UPDATE_APIKEY_URL } from 'constants/apiURL';
import { toast, Bounce } from 'react-toastify';
const initialApiKeyParams = {
  validFrom: new Date().toISOString().split('.')[0] + 'Z',
  validTo: new Date().toISOString().split('.')[0] + 'Z',
  enabled: true,
  version: '',
  platform: 'ios'
};

const ApiKeyComponent = props => {
  const { fetchApiKeys, apiKey, createApiKey, updateApiKeyAction } = props;
  const [createkey, setCreatekey] = useState(false);
  const [apiKeyParams, setApiKeyParams] = useState(initialApiKeyParams);

  useEffect(() => {
    fetchApiKeys();
  }, [fetchApiKeys]);

  const updateApiKey = (params, index) => {
    axios
      .post(UPDATE_APIKEY_URL, params)
      .then(response => {
        updateApiKeyAction({ index: index, enabled: params.enabled });
        toast('success', {
          transition: Bounce,
          closeButton: true,
          autoClose: 5000,
          position: 'bottom-right',
          type: 'success'
        });
      })
      .catch(error => {
        toast(error.message, {
          transition: Bounce,
          closeButton: true,
          autoClose: 5000,
          position: 'bottom-right',
          type: 'error'
        });
      });
  };

  return (
    <Fragment>
      <Col md="12">
        <Card className="main-card mb-3">
          <CardHeader style={{ height: 80 }}>
            <Button
              className="mb-2 mr-2"
              color="primary"
              onClick={() => setCreatekey(true)}
              style={createkey ? { display: 'none' } : { display: 'block' }}
            >
              Create Key
            </Button>
            {createkey && (
              <ApiKeyCreate
                apiKeyParams={apiKeyParams}
                createApiKey={createApiKey}
                setApiKeyParams={setApiKeyParams}
                setCreateKey={setCreatekey}
              />
            )}
          </CardHeader>
          <CardBody>
            <ApiKeyList
              apiKey={apiKey}
              updateApiKey={updateApiKey}
            />
          </CardBody>
        </Card>
      </Col>
    </Fragment>
  );
};

const mapStateToProps = state => {
  return {
    apiKey: state.apiKey
  };
};
const mapDispatchToProps = dispatch => {
  return {
    fetchApiKeys: () => dispatch(fetchApiKeys()),
    createApiKey: params => dispatch(createApiKey(params)),
    updateApiKeyAction: params => dispatch(updateApikey(params))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ApiKeyComponent);
