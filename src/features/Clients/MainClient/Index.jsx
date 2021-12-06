import React, { useEffect, useState } from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import ReviewerList from "../../../components/Customer/CustomerReview/ReviewerList/Index";
import Footer from "../../../components/Footer/Index";
import Loading from "../../../components/Loading/Index";
import HomePages from "../Pages/HomePages/Index";

const HotelBanner = React.lazy(() =>
  import("../../../components/Hotels/HotelBanner/Index")
);
const TourDetails = React.lazy(() => import("../TourDetails/Index"));
const TourList = React.lazy(() =>
  import("../Pages/TourPages/TourSearch/index")
);

function MainClient(props) {
  const [loading, setLoading] = useState(false);
  const match = useRouteMatch();
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [loading]);
  return (
    <>
      {loading && <Loading loading={true} />}
      <Switch>
        <Route exact path={match.url} component={HomePages} />
        <Route path={`${match.url}/khach-san`} component={HotelBanner} />
        <Route path={`${match.url}/ds-tour`} component={TourList} />
        <Route
          path={`${match.url}/tour-details/tourID=:tourID`}
          component={TourDetails}
        />
      </Switch>
      <ReviewerList />
      <Footer />
    </>
  );
}

MainClient.propTypes = {};

export default MainClient;
