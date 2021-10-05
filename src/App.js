import React, { Suspense } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Banner from "./components/Banner";
import ReviewerList from "./components/Customer/CustomerReview/ReviewerList/Index";
import Destination from "./components/Destination/DestinationList/Index";
import Footer from "./components/Footer/Index";
import HotelsList from "./components/Hotels/HotelsList/Index";
import Introdce from "./components/Introduce";
import TourList from "./components/Tours/TourList";
import BookingTour from "./features/Clients/BookingTour/Index";

const HotelBanner = React.lazy(() =>
  import("./components/Hotels/HotelBanner/Index")
);
const TourDetails = React.lazy(() =>
  import("./features/Clients/TourDetails/Index")
);

function App() {
  return (
    <>
      <Suspense fallback={<div className="loadding">Loading</div>}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Banner} />
            <Route path="/khach-san" component={HotelBanner} />
            <Route path="/tour-details" component={TourDetails} />
          </Switch>
        </BrowserRouter>
        <Introdce />
        <TourList />
        <HotelsList />
        <Destination />
        <ReviewerList />
        <Footer />
      </Suspense>
    </>
  );
}


export default App;
