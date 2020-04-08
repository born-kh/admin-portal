import React, { Fragment, useState, useEffect } from 'react';
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  InputGroup,
  InputGroupAddon
} from 'reactstrap';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import DatePicker from 'react-datepicker';

const ApiKeyCreate = props => {
  const { apiKeyParams, setApiKeyParams, setCreateKey, createApiKey } = props;
  const { platform, version, enabled, validTo, validFrom } = apiKeyParams;
  const onChangeVersion = e => {
    setApiKeyParams({ ...apiKeyParams, version: e.target.value });
  };

  const onChangePlatform = e => {
    setApiKeyParams({ ...apiKeyParams, platform: e.target.value });
  };

  const onChangeValidFrom = value => {
    setApiKeyParams({
      ...apiKeyParams,
      validFrom: value.toISOString().split('.')[0] + 'Z'
    });
  };

  const onChangeValidTo = value => {
    setApiKeyParams({
      ...apiKeyParams,
      validTo: value.toISOString().split('.')[0] + 'Z'
    });
  };

  const onChangeEnabled = e => {
    setApiKeyParams({ ...apiKeyParams, enabled: e.target.checked });
  };

  const handleSubmit = async () => {
    await createApiKey(apiKeyParams);
    setCreateKey(false);
  };

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
        <Form
          inline
          // onSubmit={handleSubmit}
        >
          <Button
            className="mr-2"
            color="primary"
            onClick={() => setCreateKey(false)}
            outline
          >
            Cancel
          </Button>
          <FormGroup>
            <Label
              className="mr-2"
              for="exampleEmail33"
            >
              version
            </Label>
            <Input
              className="mr-2"
              name="version"
              onChange={onChangeVersion}
              placeholder="Version"
              required
              value={version}
            />
          </FormGroup>
          <FormGroup>
            <Label className="mr-2">Platform</Label>
            <Input
              className="mr-2"
              name="platform"
              onChange={onChangePlatform}
              type="select"
              value={platform}
            >
              <option>android</option>
              <option>ios</option>
              <option>windows</option>
              <option>macOS</option>
              <option>linux</option>
              <option>web</option>
              <option>bot</option>
              <option>unknown</option>
            </Input>
          </FormGroup>

          <FormGroup>
            <Label
              className="mr-2"
              for="examplePassword"
            >
              Valid From
            </Label>
            <InputGroup className="mr-2">
              <InputGroupAddon addonType="prepend">
                <div className="input-group-text">
                  <FontAwesomeIcon icon={faCalendarAlt} />
                </div>
              </InputGroupAddon>
              <DatePicker
                className="form-control"
                onChange={onChangeValidFrom}
                selected={new Date(validFrom)}
              />
            </InputGroup>
          </FormGroup>
          <FormGroup>
            <Label
              className="mr-2"
              for="examplePassword"
            >
              Valid To
            </Label>
            <InputGroup className="mr-2">
              <InputGroupAddon addonType="prepend">
                <div className="input-group-text">
                  <FontAwesomeIcon icon={faCalendarAlt} />
                </div>
              </InputGroupAddon>
              <DatePicker
                className="form-control"
                onChange={onChangeValidTo}
                selected={new Date(validTo)}
              />
            </InputGroup>
          </FormGroup>
          <FormGroup check>
            <Label
              check
              className="mr-2"
            >
              <Input
                checked={enabled}
                onChange={onChangeEnabled}
                type="checkbox"
              />{' '}
              Enabled
            </Label>
          </FormGroup>
          <Button
            className="mr-2"
            color="primary"
            onClick={handleSubmit}
          >
            Save
          </Button>
        </Form>
      </ReactCSSTransitionGroup>
    </Fragment>
  );
};

export default ApiKeyCreate;
