import React, { Fragment, Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Slider from 'react-slick';

import bg1 from 'assets/utils/images/originals/city.jpg';
import bg2 from 'assets/utils/images/originals/citydark.jpg';
import bg3 from 'assets/utils/images/originals/citynights.jpg';

import { Col, Row } from 'reactstrap';
import { login } from 'store/actions/authActions';
import LoginForm from '../../common/LoginForm/LoginForm';
import PERMISSIONS from 'constants';

class Login extends Component {
  handleOnSubmit = formData => {
    let params = {
      username: formData.username,
      password: formData.password
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

    if (this.props.profile_data) {
      return <Redirect to="/user-manager/users" />;
    }

    return (
      <Fragment>
        <div className="h-100">
          <Row className="h-100 no-gutters">
            <Col lg="4" className="d-none d-lg-block">
              <div className="slider-light">
                <Slider {...settings}>
                  <div className="h-100 d-flex justify-content-center align-items-center bg-plum-plate">
                    <div
                      className="slide-img-bg"
                      style={{
                        backgroundImage: 'url(' + bg1 + ')'
                      }}
                    />
                    <div className="slider-content">
                      <h3>Perfect Balance</h3>
                      <p>
                        ArchitectUI is like a dream. Some think it's too good to
                        be true! Extensive collection of unified React Boostrap
                        Components and Elements.
                      </p>
                    </div>
                  </div>
                  <div className="h-100 d-flex justify-content-center align-items-center bg-premium-dark">
                    <div
                      className="slide-img-bg"
                      style={{
                        backgroundImage: 'url(' + bg3 + ')'
                      }}
                    />
                    <div className="slider-content">
                      <h3>Scalable, Modular, Consistent</h3>
                      <p>
                        Easily exclude the components you don't require.
                        Lightweight, consistent Bootstrap based styles across
                        all elements and components
                      </p>
                    </div>
                  </div>
                  <div className="h-100 d-flex justify-content-center align-items-center bg-sunny-morning">
                    <div
                      className="slide-img-bg opacity-6"
                      style={{
                        backgroundImage: 'url(' + bg2 + ')'
                      }}
                    />
                    <div className="slider-content">
                      <h3>Complex, but lightweight</h3>
                      <p>
                        We've included a lot of components that cover almost all
                        use cases for any type of application.
                      </p>
                    </div>
                  </div>
                </Slider>
              </div>
            </Col>
            <Col
              lg="8"
              md="12"
              className="h-100 d-flex bg-white justify-content-center align-items-center">
              <Col lg="9" md="10" sm="12" className="mx-auto app-login-box">
                <div className="app-logo" />
                <h4 className="mb-0">
                  <div>Welcome back,</div>
                  <span>Please sign in to your account.</span>
                </h4>

                <Row className="divider" />
                <LoginForm onSubmit={this.handleOnSubmit} />
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
  profile_data: state.auth.profile_data,
  pending: state.auth.pending,
  isAuth: state.auth.isAuth
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
