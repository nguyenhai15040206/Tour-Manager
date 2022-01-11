import React from "react";
import PropTypes from "prop-types";
import { Col, Row } from "reactstrap";
import { Link } from "react-router-dom";

function BookingItem(props) {
  const {
    status,
    totalMoneyBooking,
    BookingID,
    TourName,
    TotalDay,
    DateStart,
    BookingDate,
    Image,
  } = props;
  return (
    <>
      <Row className="booking-by-customer__header">
        <Col xl={4}>
          <img src={`${Image}`} alt="img" />
        </Col>
        <Col xl={8} className="ml-5 booking-by-customer__info">
          <div className="tour-id">
            <i className="fab fa-staylinked"></i>
            <label
              data-toggle="tooltip"
              data-placement="top"
              title="Mã số booking"
            >
              <Link to="">{`${BookingID}`}</Link>
            </label>
          </div>
          <span className="tour--title">{`${TourName}`}</span>
          <Row>
            <Col xl={8}>
              <ul className="tour--info">
                <li>
                  Khởi hành: <span>{`${DateStart}`}</span>
                </li>
                <li>
                  Thời gian: <span>{`${TotalDay}`} ngày</span>
                </li>
                <li>
                  Ngày đặt: <span>{`${BookingDate}`}</span>
                </li>
                <li>
                  Tình trạng: <span style={{ color: "red" }}>{status}</span>
                </li>
                <li>
                  Trị giá booking:{" "}
                  <span style={{ color: "red" }}>
                    {`${totalMoneyBooking}`}đ
                  </span>
                </li>
              </ul>
            </Col>
            <Col xl={4}>
              <ul className="tour--info">
                <li style={{ color: "red", cursor: "pointer" }}>Hủy Booking</li>
                <li style={{ color: "blue", cursor: "pointer" }}>Comment</li>
              </ul>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
}

BookingItem.propTypes = {};

export default BookingItem;
