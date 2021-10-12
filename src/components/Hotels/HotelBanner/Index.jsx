import React from "react";
import Banner from "../../Banner";
import Destination from "../../Destination/DestinationList/Index";
import Introdce from "../../Introduce";
import TourList from "../../Tours/TourList";
import HotelsList from "../HotelsList/Index";
import "./styles.scss";

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
