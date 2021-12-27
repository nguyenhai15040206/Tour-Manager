import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Header from "../../../components/Header";
import logo from "../../../assets/logo/icon_logo_mytour.svg";
import { Col, Row, Spinner } from "reactstrap";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import imageDefault from "../../../assets/logo/images.jpg";
import { useSelector } from "react-redux";
import "./styles.scss";

const Profile = React.lazy(() => import("./Profile"));
function Customer(props) {
  //const { children } = props;
  const match = useRouteMatch();
  const { loading, dataCustomerInfo } = useSelector((state) => state.customer);

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
                  <p>{dataCustomerInfo?.customerName}</p>
                  <p>{dataCustomerInfo?.email}</p>
                </div>
              </div>
              <div className="">
                <ul>
                  <li>
                    <a>Thông tin cá nhân</a>
                  </li>
                  <li>
                    <a>Đơn đặt chỗ</a>
                  </li>
                  <li>
                    <a>Tour yêu thích</a>
                  </li>
                </ul>
              </div>
            </div>
          </Col>
          <Col xl={8} lg={6}>
            {/* {loading === "loading" && <Spinner color="primary" />} */}
            <div className="h-profile--right">
              <Switch>
                <Route exact path={match.url} component={Profile} />
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
