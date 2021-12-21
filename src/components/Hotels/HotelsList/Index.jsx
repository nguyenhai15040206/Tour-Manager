import React from "react";
import { Col, Row } from "reactstrap";
import HotelItem from "../HotelItem/Index";
import "./styles.scss";

function HotelsList(props) {
  return (
    <section className="hotel">
      <div className="container">
        <div className="content">
          <div className="content__title">
            <h3>Khách sạn giá tốt chỉ có trên Mytour</h3>
          </div>
          <ul className="content__list">
            <button className="content__item">Hồ Chí minh</button>
            <button className="content__item">Hà Nội</button>
            <button className="content__item">Đà Nẵng</button>
            <button className="content__item">Đà Lạt</button>
            <button className="content__item">Bà Rịa - Vũng Tàu</button>
            <button className="content__item">Nha Trang</button>
            <button className="content__item">Hội An</button>
          </ul>
        </div>
        <Row>
          <Col xl={3} lg={4} sm={6}>
            <HotelItem
              href="index.html"
              image="https://tripi.vn/cdn-cgi/image/width=320/https://storage.googleapis.com/hms_prod/photo/thumb/1616919860706qw/1-0a75c811-715b-4c53-9371-66103da1654c.png"
              sale={5}
              desc="Khác sạn cách ly"
              address="Quận Tân Phú"
              totalPrice="1.148.000đ"
              price="1.092.000đ"
            />
          </Col>
          <Col xl={3} lg={4} sm={6}>
            <HotelItem
              href="index.html"
              image="https://tripi.vn/cdn-cgi/image/width=320/https://storage.googleapis.com/hms_prod/photo/thumb/1616919860706qw/1-0a75c811-715b-4c53-9371-66103da1654c.png"
              sale={5}
              desc="Khác sạn cách ly"
              address="Quận Tân Phú"
              totalPrice="1.148.000đ"
              price="1.092.000đ"
            />
          </Col>
          <Col xl={3} lg={4} sm={12}>
            <HotelItem
              href="index.html"
              image="https://tripi.vn/cdn-cgi/image/width=320/https://storage.googleapis.com/hms_prod/photo/thumb/1616919860706qw/1-0a75c811-715b-4c53-9371-66103da1654c.png"
              sale={5}
              desc="Khác sạn cách ly"
              address="Quận Tân Phú"
              totalPrice="1.148.000đ"
              price="1.092.000đ"
            />
          </Col>
          <Col xl={3} lg={4} sm={12}>
            <HotelItem
              href="index.html"
              image="https://tripi.vn/cdn-cgi/image/width=320/https://storage.googleapis.com/hms_prod/photo/thumb/1616919860706qw/1-0a75c811-715b-4c53-9371-66103da1654c.png"
              sale={5}
              desc="Khác sạn cách ly"
              address="Quận Tân Phú"
              totalPrice="1.148.000đ"
              price="1.092.000đ"
            />
          </Col>
          <Col xl={3} lg={4} sm={12}>
            <HotelItem
              href="index.html"
              image="https://tripi.vn/cdn-cgi/image/width=320/https://storage.googleapis.com/hms_prod/photo/thumb/1616919860706qw/1-0a75c811-715b-4c53-9371-66103da1654c.png"
              sale={5}
              desc="Khác sạn cách ly"
              address="Quận Tân Phú"
              totalPrice="1.148.000đ"
              price="1.092.000đ"
            />
          </Col>
          <Col xl={3} lg={4} sm={12}>
            <HotelItem
              href="index.html"
              image="https://tripi.vn/cdn-cgi/image/width=320/https://storage.googleapis.com/hms_prod/photo/thumb/1616919860706qw/1-0a75c811-715b-4c53-9371-66103da1654c.png"
              sale={5}
              desc="Khác sạn cách ly"
              address="Quận Tân Phú"
              totalPrice="1.148.000đ"
              price="1.092.000đ"
            />
          </Col>
        </Row>

        <div className="hotel__footer">
          <button>Xem tất cả</button>
        </div>
      </div>
    </section>
  );
}

HotelsList.propTypes = {};

export default HotelsList;
