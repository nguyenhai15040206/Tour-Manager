import React, { Suspense } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Loading from "./components/Loading/Index";
import "react-notifications/lib/notifications.css";

const MainClient = React.lazy(() =>
  import("./features/Clients/MainClient/Index")
);

const MainAdmin = React.lazy(() => import("./features/Admins/Admin"));

const NotFound = React.lazy(() => import("./components/NotFound/Index"));
function App() {
  return (
    <>
      <Suspense fallback={<Loading loading={true} />}>
        <Router>
          <Switch>
            <Redirect exact from="/" to="/my-tour" />
            <Route path="/my-tour" component={MainClient} />
            <Route path="/admin" component={MainAdmin} />
            <Route path="/index.html" component={NotFound} />
            <Route path="*">
              <NotFound />
            </Route>
            {/* <Redirect from="*" to="/my-tour/index.html" /> */}
          </Switch>
        </Router>
      </Suspense>
    </>
  );
}

export default App;
