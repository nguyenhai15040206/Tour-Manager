import React, { useEffect, useState } from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import ReviewerList from "../../../components/Customer/CustomerReview/ReviewerList/Index";
import Footer from "../../../components/Footer/Index";
import Loading from "../../../components/Loading/Index";
import HomePages from "../Pages/HomePages/Index";
import { NotificationContainer } from "react-notifications";

const HotelBanner = React.lazy(() =>
  import("../../../components/Hotels/HotelBanner/Index")
);
const TourDetails = React.lazy(() => import("../TourDetails/Index"));
const TourList = React.lazy(() =>
  import("../Pages/TourPages/TourSearch/index")
);
const BookingTour = React.lazy(() => import("../BookingTour/Index"));
const BookingTourDetails = React.lazy(() =>
  import("../BookingTour/BookingDetails")
);

const CustomerPrfile = React.lazy(() =>
  import("../../Clients/Customers/Index")
);

function MainClient(props) {
  const [loading, setLoading] = useState(false);
  const match = useRouteMatch();
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [match]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [loading, match]);
  return (
    <>
      {loading && <Loading loading={true} />}
      <Switch>
        <Route exact path={match.url} component={HomePages} />
        <Route path={`${match.url}/khach-san`} component={HotelBanner} />
        <Route
          path={`${match.url}/danh-sach-tim-kiem-tour/params=:DeFrom/:DeTo/:DateStart/:TotalDays`}
          component={TourList}
        />
        <Route
          path={`${match.url}/customer/pID=:tourID`}
          component={CustomerPrfile}
        />
        <Route
          path={`${match.url}/tour-details/tourID=:tourID`}
          component={TourDetails}
        />
        <Route
          path={`${match.url}/booking-tour/tourID=:tourID`}
          component={BookingTour}
        />
        <Route
          path={`${match.url}/show-customer-for-booking-tour-details/bookingID=:bookingID`}
          component={BookingTourDetails}
        />
      </Switch>
      <div style={{ marginBottom: "100px", marginTop: "48px" }}></div>
      {/* <ReviewerList /> */}
      <Footer />
      <NotificationContainer />
    </>
  );
}

MainClient.propTypes = {};

export default MainClient;
