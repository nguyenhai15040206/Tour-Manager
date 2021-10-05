import React from "react";
import PropTypes from "prop-types";
import "./styles.scss";
import Header from './../../../components/Header/index';

function BookingTour(props) {
  const { assess, id, image, title, date, time, location, check } = props;
  return (
    <>
    
    <div className="main">
      <div className="header">
        <div className="header--img">
          <img src={image}></img>
        </div>
        <div className="header--title">
          <ul className="header--title--review">
            <span className="header--title--radius">
              <li>{assess}</li>
            </span>
            <li>
              <span>Rất tốt</span>
            </li>
            <li>370 Nhận xét </li>
            <li>|</li>
            <li>
              Lượt đi <span>1,3k</span>
            </li>
          </ul>
          <h3>
            <span className="header--title--detail">{title}</span>
          </h3>
          <br />
          <ul className="header--title--info">
            <span className="header--title--ticket">
              <span>
                <i class="gg-tag"></i>
              </span>
              <li>{id}</li>
            </span>
            <li>
              Khởi hành : <span>{date}</span>
            </li>
            <li>
              Thời gian: <span>{time}</span>
            </li>
            <li>
              Nơi khởi hành: <span>{location}</span>
            </li>
            <li>
              Số chỗ còn nhận: <span>{check}</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="container">
        <div className="container--left">
          <h1>
            <span className="title">Tổng quan về chuyến đi</span>
          </h1>
          <form>
            <h3>Thông tin liên lạc</h3>
          </form>
        </div>
        <div className="container--right">
          <h3>Bạn cần hỗ trợ</h3>
        </div>
      </div>
    </div>
    </>
  );
}

BookingTour.propTypes = {
  assess: PropTypes.string,
  id: PropTypes.string,
  image: PropTypes.string,
  title: PropTypes.string,
  date: PropTypes.string,
  time: PropTypes.string,
  location: PropTypes.string,
  check: PropTypes.number,
};

BookingTour.defaultProps = {
  assess: "4.61",
  id: "NDBDI040-002-140521VN",
  image: "https://media.travel.com.vn/tour/tfd_210409053856_946989.jpg",
  title:
    "Hà Nội - Sapa - Hạ Long - Bái Đính - Tràng An - Tuyệt tình cốc ( Tặng vé Tàu hỏa Mường Hoa) - Khách sạn 3*",
  date: "17/11/2021",
  time: "1 ngày",
  location: "Quy Nhơn",
  check: 7,
};

export default BookingTour;
