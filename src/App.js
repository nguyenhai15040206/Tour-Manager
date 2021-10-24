import React, { Suspense } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Loading from "./components/Loading/Index";

const MainClient = React.lazy(() =>
  import("./features/Clients/MainClient/Index")
);
const BookingTour = React.lazy(()=>
  import("./features/Clients/BookingTour/Index")
);



function App() {
  return (
    <>
      <Suspense fallback={<Loading loading={true} />}>
        <BrowserRouter>
          <Switch>
            <Redirect exact={true} from="/" to="/my-tour" />
            <Route path="/my-tour" component={MainClient} />
          </Switch>
        </BrowserRouter>
      </Suspense>
    </>
  );
}


export default App;
