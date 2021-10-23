import React from "react";
import Banner from "../../../../components/Banner";
import Destination from "../../../../components/Destination/DestinationList/Index";
import HotelsList from "../../../../components/Hotels/HotelsList/Index";
import Introdce from "../../../../components/Introduce";
import TourList from "../../../../components/Tours/TourList";

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
