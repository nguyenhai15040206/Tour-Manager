import React, { Suspense, useEffect, useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ReviewerList from "./components/Customer/CustomerReview/ReviewerList/Index";
import Footer from "./components/Footer/Index";
import Loading from "./components/Loading/Index";
import HomePages from "./features/Clients/Pages/HomePages/Index";

const HotelBanner = React.lazy(() =>
  import("./components/Hotels/HotelBanner/Index")
);
const TourDetails = React.lazy(() =>
  import("./features/Clients/TourDetails/Index")
);
const BookingTour = React.lazy(()=>
  import("./features/Clients/BookingTour/Index")
);



function App() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 0);
  }, []);
  if (loading) {
    return <Loading loading={loading} />;
  }
  return (
    <>
      <Suspense fallback={<Loading loading={loading} />}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={HomePages} />
            <Route path="/khach-san" component={HotelBanner} />
            <Route path="/tour-details" component={TourDetails} />
            <Route path="/booking-tour" component={BookingTour} />
          </Switch>
        </BrowserRouter>
        <ReviewerList />
        <Footer />
      </Suspense>
    </>
  );
}


export default App;
