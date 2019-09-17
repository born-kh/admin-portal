import React from 'react';

import {
  Card,
  CardBody,
  Row,
  Col,
  CardTitle,
  Form,
  FormGroup,
  Label,
  Input,
  FormFeedback,
  FormText,
  Container
} from 'reactstrap';
let InputForm = ({ input, meta, ...props }) => {
  const hasError = meta.touched && meta.error;
  return (
    <FormGroup>
      <Input {...input} {...props} invalid={hasError ? true : null} />
      {hasError && <FormFeedback>{meta.error}</FormFeedback>}

      <FormText>Example help text that remains unchanged.</FormText>
    </FormGroup>
  );
};

export default InputForm;
