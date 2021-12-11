import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import { Spinner } from "reactstrap";
import TourManager from "./Index";

const TourUpdateOrCreate = React.lazy(() => import("./TourUpdateOrCreate"));

function TourManagement(props) {
  const match = useRouteMatch();
  return (
    <>
      <Switch>
        <Route exact path={`${match.url}`} component={TourManager} />
        <Route path={`${match.url}/Create`}>
          <TourUpdateOrCreate />
        </Route>
        <Route
          path={`${match.url}/Edit/tourID=:tourId`}
          component={TourUpdateOrCreate}
        />
      </Switch>
    </>
  );
}

TourManagement.propTypes = {};

export default TourManagement;
