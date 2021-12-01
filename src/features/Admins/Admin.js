import { unwrapResult } from "@reduxjs/toolkit";
import React, { Suspense, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Switch, Route } from "react-router-dom";
import * as yup from "yup";
import MainLayout from "./components/Layout/MainLayout";
import LoginAdmin from "./components/LoginAdmin/Index";
import { LoginEmp } from "./Slices/SliceEmployee";
import { NotificationContainer } from "react-notifications";
import { Spinner } from "reactstrap";

const TourManager = React.lazy(() =>
  import("../Admins/pages/TourManager/Index")
);
const Employee = React.lazy(() =>
  import("../Admins/pages/EmployeeManager/index")
);
const TouristAttr = React.lazy(() =>
  import("../Admins/pages/TourAttrManager/index.jsx")
);
const Province = React.lazy(() =>
  import("../Admins/pages/ProvinceManager/index")
);
const District = React.lazy(() =>
  import("../Admins/pages/DistrictManager/index")
);
const Wards = React.lazy(() =>
  import("../Admins/pages/WardsManager/index.jsx")
);
const TourGuide = React.lazy(() =>
  import("../Admins/pages/TourGuideManager/index")
);

function Admin(props) {
  const dispatch = useDispatch();
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
    } catch (err) {
      console.log(err);
    }
  };

  // if (!checkLogin) {
  //   console.log(Object.entries(dataEmp).length === 0);
  //   return (
  //     <>
  //       {/* {loading == "loading" ? <div>loading</div> : <div></div>} */}
  //       <LoginAdmin
  //         initialValues={initialValues}
  //         validationSchema={validationSchema}
  //         handleLogin={handleClickLoginEmp}
  //         isLogin={false}
  //       />
  //     </>
  //   );
  // }
  return (
    <>
      <MainLayout>
        <Switch>
          <Suspense fallback={<Spinner color={"secondary"} />}>
            <Route exact={true} path="/admin" component={TourManager} />
            <Route path="/admin/Employee" component={Employee} />
            <Route path="/admin/TouristAttraction" component={TouristAttr} />
            <Route path="/admin/Province" component={Province} />
            <Route path="/admin/District" component={District} />
            <Route path="/admin/Village" component={Wards} />
            <Route path="/admin/Tourguide" component={TourGuide} />
          </Suspense>
        </Switch>
      </MainLayout>
      <NotificationContainer />
    </>
  );
}

Admin.propTypes = {};

export default Admin;
