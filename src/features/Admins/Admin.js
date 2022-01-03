import React, { Suspense } from "react";
import { NotificationContainer } from "react-notifications";
import { Redirect, Route, Switch, useRouteMatch } from "react-router-dom";
import { Spinner } from "reactstrap";
import MainLayout from "./components/Layout/MainLayout";
import TourManagement from "../Admins/pages/TourManager/TourManagement";

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

const Transport = React.lazy(() =>
  import("../Admins/pages/TravelCompayTransport/Index")
);

const LoginAdmin = React.lazy(() =>
  import("../Admins/components/LoginAdmin/Index")
);
const BookingManager = React.lazy(() =>
  import("../Admins/pages/BookingManager/Index")
);

const Promotion = React.lazy(() => import("../Admins/pages/Promotion/Index"));
const CustomerManager = React.lazy(() =>
  import("../Admins/pages/CustomerManager/Index")
);

const PermissionManager = React.lazy(() =>
  import("../Admins/pages/Permission/Index")
);

const NewsManager = React.lazy(() =>
  import("../Admins/pages/NewsManager/Index")
);

const DashboardManager = React.lazy(() =>
  import("../Admins/pages/Dashboard/Index")
);

function Admin(props) {
  const match = useRouteMatch();
  return (
    <>
      {localStorage.getItem("accessTokenEmp") === null ? (
        <>
          <Redirect from="/admin" to="/admin/login" />
          <Route exact={true} path="/admin/login" component={LoginAdmin} />
        </>
      ) : (
        <>
          <MainLayout>
            <Suspense fallback={<Spinner color={"secondary"} />}>
              <Switch>
                <Redirect exact from={`/admin`} to="/admin/Dashboard" />
                <Redirect from="/admin/login" to="/admin/Dashboard" />
                <Route
                  path={`${match.url}/Dashboard`}
                  component={DashboardManager}
                />
                <Route
                  path={`${match.url}/TourManager`}
                  component={TourManagement}
                />
                <Route path={`/admin/Employee`} component={Employee} />
                <Route path={`/admin/Promotion`} component={Promotion} />
                <Route
                  path="/admin/TouristAttraction"
                  component={TouristAttr}
                />
                <Route path={`${match.url}/News`} component={NewsManager} />
                <Route
                  path={`${match.url}/Permission`}
                  component={PermissionManager}
                />
                <Route
                  path={`${match.url}/Customer`}
                  component={CustomerManager}
                />
                <Route path={`${match.url}/Province`} component={Province} />
                <Route path={`${match.url}/District`} component={District} />
                <Route path={`${match.url}/Village`} component={Wards} />
                <Route path={`${match.url}/Tourguide`} component={TourGuide} />
                <Route path={`${match.url}/Transport`} component={Transport} />
                <Route
                  path={`${match.url}/BookingManager`}
                  component={BookingManager}
                />
              </Switch>
            </Suspense>
          </MainLayout>
          <NotificationContainer />
        </>
      )}
    </>
  );
}

Admin.propTypes = {};

export default Admin;
