import { unwrapResult } from "@reduxjs/toolkit";
import React, { Suspense, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Switch, Route } from "react-router-dom";
import * as yup from "yup";
import Loading from "../../components/Loading/Index";
import MainLayout from "./components/Layout/MainLayout";
import LoginAdmin from "./components/LoginAdmin/Index";
import { LoginEmp } from "./Slices/SliceEmployee";
import { NotificationContainer } from "react-notifications";

const TourManager = React.lazy(() =>
  import("../Admins/pages/TourManager/Index")
);
function Admin(props) {
  const dispatch = useDispatch();
  const [isLogin, setLogin] = useState(false);
  const { loading } = useSelector((state) => state.employee);

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
  // if (!isLogin) {
  //   return (
  //     <>
  //       {/* {loading == "loading" ? <div>loading</div> : <div></div>} */}
  //       <LoginAdmin
  //         initialValues={initialValues}
  //         validationSchema={validationSchema}
  //         handleLogin={handleClickLoginEmp}
  //         isLogin={isLogin}
  //       />
  //     </>
  //   );
  // }
  return (
    <>
      <MainLayout>
        <Switch>
          <Suspense fallback={<Loading loading={true} />}>
            <Route exact={true} path="/admin" component={TourManager} />
          </Suspense>
        </Switch>
      </MainLayout>
      <NotificationContainer />
    </>
  );
}

Admin.propTypes = {};

export default Admin;
