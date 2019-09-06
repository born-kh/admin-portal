import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Col, Row, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import InputForm from 'common/Input';
import { required, maxLengthCreator } from 'utils/validators/validators';
let LoginForm = props => {
  const { handleSubmit, pristine, reset, submitting } = props;

  const maxLength20 = maxLengthCreator(20);
  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Row form>
          <Col md={6}>
            <FormGroup>
              <Label for="exampleEmail">Username</Label>
              <Field
                name="username"
                component={InputForm}
                type="text"
                placeholder="Username here..."
                validate={[required, maxLength20]}
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="examplePassword">Password</Label>
              <Field
                name="password"
                component={InputForm}
                type="password"
                placeholder="Password here..."
                validate={[required]}
              />
            </FormGroup>
          </Col>
        </Row>
        <FormGroup check>
          <Input type="checkbox" name="check" id="exampleCheck" />
          <Label for="exampleCheck" check>
            Keep me logged in
          </Label>
        </FormGroup>
        <Row className="divider" />
        <div className="d-flex align-items-center">
          <div className="ml-auto">
            <a href="javascript:void(0);" className="btn-lg btn btn-link">
              Recover Password
            </a>{' '}
            <Button color="primary" size="lg" disabled={pristine || submitting}>
              Login to Dashboard
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );
};

LoginForm = reduxForm({
  form: 'login'
})(LoginForm);
export default LoginForm;
