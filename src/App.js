import React, { Suspense } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Loading from "./components/Loading/Index";
import "react-notifications/lib/notifications.css";

const MainClient = React.lazy(() =>
  import("./features/Clients/MainClient/Index")
);

const MainAdmin = React.lazy(() => import("./features/Admins/Admin"));

const Booking = React.lazy(() =>
  import("./features/Clients/BookingTour/Index")
);

const NotFound = React.lazy(() => {
  <div>Not found</div>;
});

function App() {
  return (
    <>
      <Suspense fallback={<Loading loading={true} />}>
        <BrowserRouter>
          <Switch>
            <Redirect exact={true} from="/" to="/my-tour" />
            <Route path="/my-tour" component={MainClient} />
            <Route path="/admin" component={MainAdmin} />
            <Route path="/index.html" component={NotFound} />
            <Route path="/bookingtour" component={Booking} />
            {/* <Route path="/my-tour/index.html" component={NotFound} />
            <Redirect from="*" to="/my-tour/index.html" /> */}
          </Switch>
        </BrowserRouter>
      </Suspense>
    </>
  );
}

export default App;
