import React from "react";
import PropTypes from "prop-types";
import Header from "../../../../../components/Header";
import Select from "react-select";
import "./styles.scss";
import TourItem from "../../../../../components/Tours/TourItem";

function TourSearch(props) {
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];
  return (
    <>
      <Header
        boxShadow="rgb(92 149 252) 3px -7px 20px 3px"
        position="sticky"
        background="white"
        color="#1A202C"
        logo="https://storage.googleapis.com/tripi-assets/mytour/icons/icon_logo_mytour.svg"
      />
      <main className="tour-search">
        <div className="container container-padding">
          <div className="row">
            <div className="col-md-3 col-12">
              <div className="tour-search__sidebar-inner">
                <h2>Lọc kết quả tìm kiếm</h2>
                <h3>Tất cả</h3>
                <div className="px-3 py-4">
                  <div className="start-to-stop mb-3">
                    <h5 class="point-start-title s-title">Loại hình tour</h5>
                    <Select options={options} />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-9 col-12">
              <div className="row">{/* do  some thing here */}</div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

TourSearch.propTypes = {};

export default TourSearch;
