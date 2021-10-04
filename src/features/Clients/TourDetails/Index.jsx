import React from "react";
import PropTypes from "prop-types";
import "./styles.scss";
import Header from "../../../components/Header";
import Banner from "../../../components/Banner/index";

function TourDetails(props) {
  return (
    <>
      <Header
        position="sticky"
        background="white"
        color="#1A202C"
        logo="https://storage.googleapis.com/tripi-assets/mytour/icons/icon_logo_mytour.svg"
      />
      {/* <Banner backgroundImage="https://cdn.vntrip.vn/cam-nang/wp-content/uploads/2018/01/anh1-17.png" /> */}
      <main className="tour-details">
        <div className="container">
          <section className="tour-details__header">
            <div className="tour-details__header--left">
              <div className="tour-id">
                <i className="fab fa-staylinked"></i>
                <label>NDSGN920-001-121121XE-D</label>
              </div>
              <h1 className="tour-name">
                Phan Thiết - Lâu Đài Rượu Vang - Bàu Trắng - Bảo Tàng Làng Chài
                Xưa
              </h1>
              <div className="short-rating">
                <div className="s-rate">
                  <span>9.22</span>
                  <div className="s-comments">
                    <h4>Tuyệt với</h4>
                    <p>358 nhận xét</p>
                  </div>
                </div>
                <div className="sale-price">
                  <p>7,990,000đ</p>
                  <div className="saving"></div>
                </div>
              </div>
            </div>
            <div className="tour-details__header--right">
              <div className="add-cart">
                <a href="index.html" className="add-to-cart">
                  <i class="fas fa-shopping-cart"></i>
                  <label>Đặt ngay</label>
                </a>
              </div>
            </div>
          </section>
          <section className="tour-details__banner"></section>
        </div>
      </main>
    </>
  );
}

TourDetails.propTypes = {};

export default TourDetails;
