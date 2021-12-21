import React from "react";
import { Col, Row } from "reactstrap";
import DestinationItem from "../DestinationItem";
import "./styles.scss";

function Destination(props) {
  return (
    <section className="destination">
      <div className="container">
        <h3>Địa điểm đến yêu thích</h3>
        <h6>Địa điểm hot nhất do Mytour đề xuất</h6>
        <div className="destination__list">
          <DestinationItem
            itemIndex={1}
            address="Hồ Chí Minh"
            image="https://tripi.vn/cdn-cgi/image/width=640,height=640/https://storage.googleapis.com/tripi-assets/mytour/images/locations/hochiminh.png"
          />
          <DestinationItem
            itemIndex={2}
            address="Hà nội"
            image="https://tripi.vn/cdn-cgi/image/width=640,height=640/https://storage.googleapis.com/tripi-assets/mytour/images/locations/hanoi.png"
          />
          <DestinationItem
            itemIndex={3}
            address="Đà Nẵng"
            image="https://tripi.vn/cdn-cgi/image/width=640,height=640/https://storage.googleapis.com/tripi-assets/mytour/images/locations/danang.png"
          />
          <DestinationItem
            itemIndex={4}
            address="Đà Lạt"
            image="https://tripi.vn/cdn-cgi/image/width=640,height=640/https://storage.googleapis.com/tripi-assets/mytour/images/locations/da-lat.png"
          />
          <DestinationItem
            itemIndex={5}
            address="Bà Rịa - Vũng Tàu"
            image="https://tripi.vn/cdn-cgi/image/width=640,height=640/https://storage.googleapis.com/tripi-assets/mytour/images/locations/vung-tau.png"
          />
          <DestinationItem
            itemIndex={6}
            address="Nha Trang"
            image="https://tripi.vn/cdn-cgi/image/width=640,height=640/https://storage.googleapis.com/tripi-assets/mytour/images/locations/nha-trang.png"
          />
          <DestinationItem
            itemIndex={7}
            address="Nha Trang"
            image="https://tripi.vn/cdn-cgi/image/width=640,height=640/https://storage.googleapis.com/tripi-assets/mytour/images/locations/hoi-an.png"
          />
          <DestinationItem
            itemIndex={8}
            address="Hạ Long"
            image="https://tripi.vn/cdn-cgi/image/width=640,height=640/https://storage.googleapis.com/tripi-assets/mytour/images/locations/ha-long.png"
          />
          <DestinationItem
            itemIndex={9}
            address="Phú Quốc"
            image="https://tripi.vn/cdn-cgi/image/width=640,height=640/https://storage.googleapis.com/tripi-assets/mytour/images/locations/phu-quoc.png"
          />
          <DestinationItem
            itemIndex={10}
            address="Mũi Né"
            image="https://tripi.vn/cdn-cgi/image/width=640,height=640/https://storage.googleapis.com/tripi-assets/mytour/images/locations/phan-thiet.png"
          />
          <DestinationItem
            itemIndex={11}
            address="Lào Cai"
            image="https://tripi.vn/cdn-cgi/image/width=640,height=640/https://storage.googleapis.com/tripi-assets/mytour/images/locations/sa-pa.png"
          />
          <DestinationItem
            itemIndex={12}
            address="Thừa Thiên - Huê"
            image="https://tripi.vn/cdn-cgi/image/width=640,height=640/https://storage.googleapis.com/tripi-assets/mytour/images/locations/hue.png"
          />
        </div>
      </div>
    </section>
  );
}

Destination.propTypes = {};

export default Destination;
