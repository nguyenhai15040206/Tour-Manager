import { FastField, Form, Formik } from "formik";
import React from "react";
import PropTypes from "prop-types";
import { Card, Col, Row } from "reactstrap";
import InputField from "../../../../CustomFields/InputField/Index";
import "./styles.scss";
import { RiKey2Fill } from "react-icons/ri";

function LoginAdmin(props) {
  const { initialValues, validationSchema, handleLogin, isLogin } = props;

  return (
    <>
      <div className="login-admin__logo">
        <img
          src="https://storage.googleapis.com/tripi-assets/mytour/icons/icon_logo_mytour.svg"
          alt="logo"
        />
      </div>
      <Row className="login-admin">
        <Col md={6} lg={4}>
          <Card body>
            <h2 className="text-center mb-3">Đăng nhập</h2>
            {isLogin && (
              <p className="mb-2 text-danger">
                Sai tên đăng nhập hoặc mật khẩu!
              </p>
            )}
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleLogin}
            >
              {(formikProps) => {
                return (
                  <Form>
                    <FastField
                      name="userName"
                      component={InputField}
                      placeholder="Tên đăng nhập"
                    />
                    <FastField
                      className="mt-2"
                      name="password"
                      component={InputField}
                      placeholder="Mật khẩu"
                      type="password"
                    />

                    <button type="submit" className="mt-3 btn-login-admin">
                      <RiKey2Fill /> Đăng nhập
                    </button>
                  </Form>
                );
              }}
            </Formik>
            <p className="mt-2 ml-5">Quên mật khẩu?</p>
          </Card>
        </Col>
      </Row>
    </>
  );
}

LoginAdmin.propTypes = {
  initialValues: PropTypes.object.isRequired,
  validationSchema: PropTypes.object.isRequired,
  handleLogin: PropTypes.func,
  isLogin: PropTypes.bool,
};

LoginAdmin.defaultProps = {
  handleLogin: null,
  isLogin: false,
};

export default LoginAdmin;
