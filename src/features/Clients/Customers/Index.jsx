import React, { useEffect } from "react";
import { FaHeart, FaUserCheck } from "react-icons/fa";
import { SiYourtraveldottv } from "react-icons/si";
import { useSelector } from "react-redux";
import { Link, Redirect, Route, Switch, useRouteMatch } from "react-router-dom";
import { Col, Row, Spinner } from "reactstrap";
import logo from "../../../assets/logo/icon_logo_mytour.svg";
import imageDefault from "../../../assets/logo/images.jpg";
import Header from "../../../components/Header";
import "./styles.scss";

const Profile = React.lazy(() => import("./Profile"));
const BookingByCustomer = React.lazy(() => import("./BookingByCustomer"));
function Customer(props) {
  //const { children } = props;
  const match = useRouteMatch();
  const { loading, dataCustomerInfo } = useSelector((state) => state.customer);
  const stateBooking = useSelector((state) => state?.bookingTour);
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [match]);
  return (
    <>
      <Header
        boxShadow="rgb(92 149 252) 3px -7px 20px 3px"
        position="sticky"
        background="white"
        color="#1A202C"
        logo={`${logo}`}
      />
      <div className="h-profile container" style={{ marginTop: "50px" }}>
        <Row>
          <Col xl={4} lg={6} className="mb-4">
            <div className="h-profile--left">
              <div className="h-profile--left__header">
                <img src={`${imageDefault}`} />
                <div className="info">
                  <p>
                    {
                      JSON.parse(localStorage.getItem("accessTokenCustomer"))
                        ?.data?.customerName
                    }
                  </p>
                  <p>
                    {
                      JSON.parse(localStorage.getItem("accessTokenCustomer"))
                        ?.data?.email
                    }
                  </p>
                </div>
              </div>
              <div className="mt-3">
                <ul>
                  <li>
                    <Link
                      to={`/my-tour/customer/Profile/pID=${
                        JSON.parse(localStorage.getItem("accessTokenCustomer"))
                          ?.data?.customerId
                      }`}
                    >
                      <FaUserCheck /> Thông tin cá nhân
                    </Link>
                  </li>
                  <hr />
                  <li className="mt-1">
                    <Link
                      to={`/my-tour/customer/booking-by-customer/pID=${
                        JSON.parse(localStorage.getItem("accessTokenCustomer"))
                          ?.data?.customerId
                      }`}
                    >
                      <SiYourtraveldottv /> Đơn đặt chỗ
                    </Link>
                  </li>
                  <hr />
                  <li className="mt-1">
                    <Link
                      to={`/my-tour/customer/booking-by-customer/pID=${
                        JSON.parse(localStorage.getItem("accessTokenCustomer"))
                          ?.data?.customerId
                      }`}
                    >
                      <SiYourtraveldottv /> Đăng xuất
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </Col>
          <Col xl={8} lg={6}>
            {(loading === "loading" || stateBooking.loading == "loading") && (
              <Spinner color="primary" />
            )}
            <div className="h-profile--right">
              <Switch>
                <Redirect
                  exact
                  from={`${match.url}`}
                  to={`${match.url}/Profile/pID=${
                    JSON.parse(localStorage.getItem("accessTokenCustomer"))
                      ?.data?.customerId
                  }`}
                />
                <Route
                  exact
                  path={`${match.url}/Profile/pID:pID`}
                  component={Profile}
                />
                <Route
                  path={`${match.url}/booking-by-customer/pID=:pID`}
                  component={BookingByCustomer}
                />
              </Switch>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
}

Customer.propTypes = {};

export default Customer;
