import React from "react";
import TourItem from "../TourItem";
import "./styles.scss";

function TourList(props) {
  return (
    <section className="promotion-tour">
      <div className="container">
        <div className="promotion-tour__title">
          <span>Chúng tôi giới thiệu đến bạn</span>
          <h2>TOUR ĐANG HOT</h2>
        </div>
        <div className="promotion-tour__list">
          <TourItem
            title="Du Lịch Sapa: Combo Silk Path Grand Sapa Resort & Spa 5*"
            image="https://benthanhtourist.com/uploads/images/sa-pa/silk-path-grand-sapa/60f6af2eb4a6b.jpg"
            href="/my-tour/tour-details"
          />
          <TourItem
            title="Du Lịch Phan Thiết: Combo Centara Mirage Resort 5* Mũi Né"
            image="https://benthanhtourist.com/uploads/images/phan-thiet/centara-mirage-resort/60a72607d80d6.jpg"
            href="/my-tour/tour-details"
          />
          <TourItem
            title="Du Lịch Miền Bắc: Hà Nội - Sapa - Fansipan - Thị Trấn Mờ Sươ..."
            image="https://benthanhtourist.com/uploads/images/sa-pa/6037736479886.jpg"
            href="/my-tour/tour-details"
          />
          <TourItem
            title="Du Lịch Tây Nguyên: Buôn Ma Thuột - Pleiku - Bảo Tàng Thế Gi..."
            image="https://benthanhtourist.com/uploads/images/buon-me-thuot/60371ca8193ab.jpg"
            href="/my-tour/tour-details"
          />
          <TourItem
            title="Du Lịch Tây Nguyên: Tà Đùng - Buôn Ma Thuột - Bảo Tàng Cà Ph..."
            image="https://benthanhtourist.com/uploads/images/dak-nong/6035e43af3190.jpg"
            href="/my-tour/tour-details"
          />
          <TourItem
            title="Du Lịch Phan Thiết: Combo Centara Mirage Resort 5* Mũi Né"
            image="https://benthanhtourist.com/uploads/images/phan-thiet/centara-mirage-resort/60a72607d80d6.jpg"
            href="/my-tour/tour-details"
          />
        </div>
      </div>
    </section>
  );
}

TourList.propTypes = {};

export default TourList;
