import React from "react";
import PropTypes from "prop-types";
import Banner from "../../../../components/Banner";
import Introdce from "../../../../components/Introduce";
import TourList from "../../../../components/Tours/TourList";
import HotelsList from "../../../../components/Hotels/HotelsList/Index";
import Destination from "../../../../components/Destination/DestinationList/Index";

function HomePages(props) {
  return (
    <>
      <Banner />
      <Introdce />
      <TourList />
      <HotelsList />
      <Destination />
    </>
  );
}

HomePages.propTypes = {};

export default HomePages;
