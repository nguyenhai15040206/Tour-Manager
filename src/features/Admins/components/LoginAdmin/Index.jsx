import { unwrapResult } from "@reduxjs/toolkit";
import { FastField, Form, Formik } from "formik";
import React, { useState } from "react";
import { RiKey2Fill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { Card, Col, Row } from "reactstrap";
import * as yup from "yup";
import InputField from "../../../../CustomFields/InputField/Index";
import { LoginEmp } from "../../Slices/SliceEmployee";
import { PropagateLoader } from "react-spinners";
import { useHistory } from "react-router-dom";
import "./styles.scss";

function LoginAdmin(props) {
  const [checkLogin, setCheckLogin] = useState(true);
  const [timeoutLoading, setTimeoutLoading] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const { loading } = useSelector((state) => state.employee);
  const initialValues = {
    userName: "anhnghia99",
    password: "nghia123",
  };
  const validationSchema = yup.object().shape({
    userName: yup.string().required("Username không được để trống!"),
    password: yup.string().required("Password không được để trống!"),
  });
  const handleClickLogin = (values) => {
    setTimeoutLoading(true);
    setTimeout(() => {
      setTimeoutLoading(false);
      dispatch(LoginEmp(values))
        .then(unwrapResult)
        .then((payload) => {
          setCheckLogin(true);
          localStorage.setItem("accessTokenEmp", JSON.stringify(payload));
          history.push("/admin");
        })
        .catch(() => {
          setCheckLogin(false);
        });
    }, 1500);
  };
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
            {(loading === "loading" || timeoutLoading === true) && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: "15px",
                }}
              >
                <PropagateLoader color={"#3f7db2"} width={5} />
              </div>
            )}

            <h2 className="text-center mb-3">Đăng nhập</h2>
            {!checkLogin && (
              <p className="mb-2 text-danger">
                Sai tên đăng nhập hoặc mật khẩu!
              </p>
            )}
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleClickLogin}
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

export default LoginAdmin;
