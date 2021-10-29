import { unwrapResult } from "@reduxjs/toolkit";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container } from "reactstrap";
import * as yup from "yup";
import { LoginEmp } from "../../Slices/SliceEmployee";
import Header from "../Header/Header";
import LoginAdmin from "../LoginAdmin/Index";
import Sidebar from "../Sidebar/Sidebar";
import "./styles.scss";

// Nguyễn Tấn Hải [24/10/2021] code dựng trang main
function MainLayout(props) {
  const dispatch = useDispatch();
  const [isLogin, setLogin] = useState(false);
  const { loading, dataEmp } = useSelector((state) => state.employee);

  const initialValues = {
    userName: "",
    password: "",
  };
  const validationSchema = yup.object().shape({
    userName: yup.string().required("Username không được để trống!"),
    password: yup.string().required("Password không được để trống!"),
  });

  const handleClickLoginEmp = async (values) => {
    try {
      const actionResult = await dispatch(LoginEmp(values));
      const currentEmp = unwrapResult(actionResult);
      console.log("Login", currentEmp);
      setLogin(true);
    } catch (err) {
      setLogin(false);
    }
  };

  if (!isLogin) {
    return (
      <LoginAdmin
        initialValues={initialValues}
        validationSchema={validationSchema}
        handleLogin={handleClickLoginEmp}
        isLogin={isLogin}
      />
    );
  } else {
    return (
      <>
        <main className="cr-app bg-light">
          <Sidebar />
          <Container fluid className="cr-content">
            <Header />
            <div>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias
              quibusdam aperiam perferendis! Deserunt similique cupiditate unde
              fugit veritatis, possimus culpa consequuntur? Porro temporibus
              maiores doloribus cum a totam velit inventore!
            </div>
          </Container>
        </main>
      </>
    );
  }
}

MainLayout.propTypes = {};

export default MainLayout;
