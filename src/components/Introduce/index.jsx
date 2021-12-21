import React from "react";
import { Col, Row } from "reactstrap";
import IntroduceItem from "./item";
import "./styles.scss";

function Introdce(props) {
  return (
    <section className="introduce">
      <div className="container">
        <Row>
          <Col xl={3} lg={6} className="mt-3">
            <IntroduceItem
              image="https://storage.googleapis.com/tripi-assets/mytour/icons/icon_support_247.svg"
              title="Hổ trợ khách hàng 24/7"
              desc="Chat là có, gọi là nghe, không quản đêm hôm, ngày nghỉ và ngày lễ."
            />
          </Col>
          <Col xl={3} lg={6} className="mt-3">
            <IntroduceItem
              image="https://storage.googleapis.com/tripi-assets/mytour/icons/icon_best_price.svg"
              title="Giá tốt sát ngày"
              desc="Cam kết giá tốt nhất khi đặt gần ngày cho chuyến đi của bạn."
            />
          </Col>
          <Col xl={3} lg={6} className="mt-3">
            <IntroduceItem
              image="https://storage.googleapis.com/tripi-assets/mytour/icons/icon_payment.svg"
              title="Thanh toán dễ dàng, đa dạng"
              desc="Bao gồm thêm chuyển khoản ngân hàng và tiền mặt tại cửa hàng."
            />
          </Col>
          <Col xl={3} lg={6} className="mt-3">
            <IntroduceItem
              image="https://storage.googleapis.com/tripi-assets/mytour/icons/icon_total_hotel.svg"
              title="Hơn 8000+ khách sạn dọc Việt Nam"
              desc="Rất nhiều khách sạn cho phép bạn thoải mái lựa chọn, giá cả hợp lý."
            />
          </Col>
        </Row>
      </div>
    </section>
  );
}

Introdce.propTypes = {};

export default Introdce;
