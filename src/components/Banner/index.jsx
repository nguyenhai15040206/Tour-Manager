import React from "react";
import Header from "../Header";
import PropTypes from "prop-types";
import "./styles.scss";

function Banner(props) {
  const { backgroundImage } = props;
  return (
    <section className="banner">
      <Header />
      <div
        className="banner__slider"
        style={{
          backgroundImage: `url("${backgroundImage}")`,
        }}
      ></div>
      {/* <div className="banner__search-info">
        <div className="container">
          <form action="form-search">
            <select id="chosen-departure" name="departure_place">
              <option defaultValue="1">Xuất phát từ</option>
              <option defaultValue="5">Hà Nội</option>
              <option defaultValue="24">Hải Phòng</option>
              <option defaultValue="36">Đà Nẵng</option>
              <option defaultValue="54">Hồ Chí Minh</option>
              <option defaultValue="63">Cần Thơ</option>
              <option defaultValue="67">Cà Mau</option>
              <option defaultValue="127">Bồ Đào Nha</option>
              <option defaultValue="128">Tây Ban Nha</option>
              <option defaultValue="129"> Bosnia</option>
              <option defaultValue="130">Quy Nhơn</option>
            </select>
            <select id="chosen-search">
              <option defaultValue="1">Tìm theo từ khóa</option>
              <option defaultValue="2">Tìm theo ngày</option>
            </select>
            <input
              id="search-by-text"
              type="textclassName"
              className="form-control"
              placeholder="Nhập thông tin cần tìm..."
              name="title"
            />
            <span id="search-by-date" style={{ display: "none" }}>
              <input
                id="startDateTourFilter"
                data-date-format="DD/MM/YYYY"
                name="start_date"
                type="text"
              />
            </span>
            <button type="submit" className="btn btn-danger">
              TÌM TOUR
            </button>
          </form>
        </div>
      </div> */}
    </section>
  );
}

Banner.propTypes = {
  backgroundImage: PropTypes.string,
};

Banner.defaultProps = {
  backgroundImage:
    "https://storage.googleapis.com/tripi-assets/mytour/banner/home-banner.jpg",
};

export default Banner;
