import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Col, Row, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import InputForm from 'components/common/Input';
import { required, maxLengthCreator } from 'helpers';
let LoginForm = props => {
  const { handleSubmit, pristine, submitting } = props;

  const maxLength20 = maxLengthCreator(20);
  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Row form>
          <Col md={6}>
            <FormGroup>
              <Label for="exampleEmail">Username</Label>
              <Field
                component={InputForm}
                name="username"
                placeholder="Username here..."
                type="text"
                validate={[required, maxLength20]}
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="examplePassword">Password</Label>
              <Field
                component={InputForm}
                name="password"
                placeholder="Password here..."
                type="password"
                validate={[required]}
              />
            </FormGroup>
          </Col>
        </Row>
        <FormGroup check>
          <Input
            id="exampleCheck"
            name="check"
            type="checkbox"
          />
          <Label
            check
            for="exampleCheck"
          >
            Keep me logged in
          </Label>
        </FormGroup>
        <Row className="divider" />
        <div className="d-flex align-items-center">
          <div className="ml-auto">
            <a
              className="btn-lg btn btn-link"
              href="javascript:void(0);"
            >
              Recover Password
            </a>{' '}
            <Button
              color="primary"
              disabled={pristine || submitting}
              size="lg"
            >
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
