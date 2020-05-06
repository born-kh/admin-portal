import React, { Fragment, Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Slider from 'react-slick';

import bg1 from 'assets/utils/images/originals/city.jpg';
import bg2 from 'assets/utils/images/originals/citydark.jpg';
import bg3 from 'assets/utils/images/originals/citynights.jpg';
import LaddaButton, { ZOOM_OUT } from 'react-ladda';
import { Col, Row, Alert } from 'reactstrap';
import { login } from 'store/actions/authActions';
import LoginForm from '../../common/LoginForm/LoginForm';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.handleOnSubmit = this.handleOnSubmit.bind(this);

    this._isMounted = false;
  }
  handleOnSubmit = () => {
    const { formData } = this.props;
    let params = {
      username: formData.login.values.username,
      password: formData.login.values.password
    };

    this.props.handleLogin(params);
  };

  render() {
    let settings = {
      dots: true,
      infinite: true,
      speed: 500,
      arrows: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      fade: true,
      initialSlide: 0,
      autoplay: true,
      adaptiveHeight: true
    };
    const { error, isAuth, pending } = this.props;

    if (isAuth) {
      return <Redirect to="/user-manager/users" />;
    }

    return (
      <Fragment>
        <div className="h-100">
          <Row className="h-100 no-gutters">
            <Col
              className="d-none d-lg-block"
              lg="4"
            >
              <div className="slider-light">
                <Slider {...settings}>
                  <div className="h-100 d-flex justify-content-center align-items-center bg-plum-plate">
                    <div
                      className="slide-img-bg"
                      style={{
                        backgroundImage: 'url(' + bg1 + ')'
                      }}
                    />
                    {/* <div className="slider-content">
                      <h3>Perfect Balance</h3>
                      <p>
                        ArchitectUI is like a dream. Some think it's too good to
                        be true! Extensive collection of unified React Boostrap
                        Components and Elements.
                      </p>
                    </div> */}
                  </div>
                  <div className="h-100 d-flex justify-content-center align-items-center bg-premium-dark">
                    <div
                      className="slide-img-bg"
                      style={{
                        backgroundImage: 'url(' + bg3 + ')'
                      }}
                    />
                  </div>
                  <div className="h-100 d-flex justify-content-center align-items-center bg-sunny-morning">
                    <div
                      className="slide-img-bg opacity-6"
                      style={{
                        backgroundImage: 'url(' + bg2 + ')'
                      }}
                    />
                  </div>
                </Slider>
              </div>
            </Col>
            <Col
              className="h-100 d-flex bg-white justify-content-center align-items-center"
              lg="8"
              md="12"
            >
              <Col
                className="mx-auto app-login-box"
                lg="9"
                md="10"
                sm="12"
              >
                <div className="app-logo" />
                <h4 className="mb-0">
                  <div>Welcome back,</div>
                  <span>Please sign in to your account.</span>
                </h4>

                <Row className="divider" />

                <LoginForm />
                {error && <Alert color="danger">{error}</Alert>}

                <div className="d-flex align-items-center">
                  <div className="ml-auto">
                    {/* <a
                      className="btn-lg btn btn-link"
                      // href="javascript:void(0);"
                    >
                      Recover Password
                    </a>{' '} */}
                    <LaddaButton
                      className="mb-2 mr-2 btn btn-alternate"
                      data-style={ZOOM_OUT}
                      loading={pending}
                      onClick={this.handleOnSubmit}
                      type={'submit'}
                    >
                      Login to Dashboard
                    </LaddaButton>
                  </div>
                </div>
              </Col>
            </Col>
          </Row>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  error: state.auth.error,
  pending: state.auth.pending,
  isAuth: state.auth.isAuth,
  formData: state.form
});

const mapDispatchToProps = dispatch => {
  return {
    handleLogin: params => dispatch(login(params))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
