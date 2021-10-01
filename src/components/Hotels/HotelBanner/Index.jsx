import React from "react";
import PropTypes from "prop-types";
import Banner from "../../Banner";
import "./styles.scss";

function HotelBanner(props) {
  return (
    <>
      <Banner backgroundImage="https://storage.googleapis.com/tripi-assets/mytour/banner/banner_hotel.jpg" />
    </>
  );
}

HotelBanner.propTypes = {};

export default HotelBanner;
