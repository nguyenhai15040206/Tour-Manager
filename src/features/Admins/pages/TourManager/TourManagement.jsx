import React from "react";
import { useSelector } from "react-redux";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import Loading from "../../../../components/Loading/Index";
import TourManager from "./Index";

const TourUpdateOrCreate = React.lazy(() => import("./TourUpdateOrCreate"));

function TourManagement(props) {
  const match = useRouteMatch();
  const stateEnumConstant = useSelector((state) => state.enumConstant);
  const stateTourisAtt = useSelector((state) => state.touristAttraction);
  const stateTravelType = useSelector((state) => state?.travelType);
  const stateAddress = useSelector((state) => state.address);
  const stateTour = useSelector((state) => state.tour);
  const stateTourDetails = useSelector((state) => state.tourDetails);
  const stateImagesUpload = useSelector((state) => state?.imagesUpload);
  return (
    <>
      {(stateAddress.loading === "loading" ||
        stateEnumConstant.loading === "loading" ||
        stateImagesUpload.loading === "loading" ||
        stateTravelType.loading === "loading" ||
        stateTour.loading === "loading" ||
        stateTourDetails.loading === "loading" ||
        stateTourisAtt.loading === "loading") && <Loading loading={true} />}
      <Switch>
        <Route exact path={`${match.url}`} component={TourManager} />
        <Route path={`${match.url}/Create`} component={TourUpdateOrCreate} />
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
