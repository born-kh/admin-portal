import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Col, Row, Form, FormGroup, Label } from 'reactstrap';
import InputForm from 'components/common/Input';
import { required } from 'helpers';

let LoginForm = props => {
  const { handleSubmit } = props;

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
                validate={required}
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
                validate={required}
              />
            </FormGroup>
          </Col>
        </Row>

        <Row className="divider" />
      </Form>
    </div>
  );
};

LoginForm = reduxForm({
  form: 'login'
})(LoginForm);

const mapStateToProps = state => ({
  error: state.auth.error
});

export default connect(mapStateToProps)(LoginForm);
