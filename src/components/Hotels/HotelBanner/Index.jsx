import React from "react";
import PropTypes from "prop-types";
import Banner from "../../Banner";
import "./styles.scss";
import Introdce from "../../Introduce";
import TourList from "../../Tours/TourList";
import HotelsList from "../HotelsList/Index";
import Destination from "../../Destination/DestinationList/Index";

function HotelBanner(props) {
  return (
    <>
      <Banner backgroundImage="https://storage.googleapis.com/tripi-assets/mytour/banner/banner_hotel.jpg" />
      <Introdce />
      <TourList />
      <HotelsList />
      <Destination />
    </>
  );
}

HotelBanner.propTypes = {};

export default HotelBanner;
