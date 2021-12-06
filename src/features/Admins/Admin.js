import React, { Suspense } from "react";
import { NotificationContainer } from "react-notifications";
import {
  BrowserRouter,
  Redirect,
  Route,
  Switch,
  useRouteMatch,
} from "react-router-dom";
import { Spinner } from "reactstrap";
import MainLayout from "./components/Layout/MainLayout";

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

const LoginAdmin = React.lazy(() =>
  import("../Admins/components/LoginAdmin/Index")
);

function Admin(props) {
  const match = useRouteMatch();
  return (
    <>
      {localStorage.getItem("accessTokenEmp") == null ? (
        <>
          <Redirect from="/admin" to="/admin/login" />
          <Route exact={true} path="/admin/login" component={LoginAdmin} />
        </>
      ) : (
        <>
          <MainLayout>
            <Switch>
              <Suspense fallback={<Spinner color={"secondary"} />}>
                {/* <Redirect from={`${match.url}/login`} to={`${match.url}`} /> */}
                <Route exact path={`${match.url}`} component={TourManager} />
                <Route path={`${match.url}/Employee`} component={Employee} />
                <Route
                  path="/admin/TouristAttraction"
                  component={TouristAttr}
                />
                <Route path={`${match.url}/Province`} component={Province} />
                <Route path={`${match.url}/District`} component={District} />
                <Route path={`${match.url}/Village`} component={Wards} />
                <Route path={`${match.url}/Tourguide`} component={TourGuide} />
              </Suspense>
            </Switch>
          </MainLayout>
          <NotificationContainer />
        </>
      )}
    </>
  );
}

Admin.propTypes = {};

export default Admin;
