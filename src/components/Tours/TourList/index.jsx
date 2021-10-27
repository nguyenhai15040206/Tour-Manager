import React, { useEffect, useState } from "react";
import tourApi from "../../../apis/TourApi";
import { formatCash } from "../../../utils/format";
import Loading from "../../Loading/Index";
import TourItem from "../TourItem";
import "./styles.scss";

function TourList(props) {
  const [isTourList, setTourList] = useState([]);
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const response = await tourApi.GetTourTourIsSuggest();
        setTourList(response);
      } catch (err) {
        console.log(err);
      }
    };
    fetchApi();
  }, []);
  return (
    <>
      {!isTourList && <Loading loading={true} />}
      <section className="promotion-tour">
        <div className="container">
          <div className="promotion-tour__title">
            <span>Chúng tôi giới thiệu đến bạn</span>
            <h2>TOUR ĐANG HOT</h2>
          </div>
          <div className="promotion-tour__list">
            {isTourList.map((item, index) => (
              <TourItem
                key={index}
                tourHot={true}
                title={item.tourName}
                image={item.tourImg}
                href={`/my-tour/tour-details/tourID=${item.tourId}`}
                dateStart={item.dateStart.slice(0, 10)}
                provinceName={item.provinceName}
                rating={item.rating}
                unitPrice={formatCash(`${item.adultUnitPrice}`)}
              />
            ))}
            {/* <TourItem
            title="Du Lịch Sapa: Combo Silk Path Grand Sapa Resort & Spa 5*"
            image="https://benthanhtourist.com/uploads/images/sa-pa/silk-path-grand-sapa/60f6af2eb4a6b.jpg"
            href="/my-tour/tour-details"
          /> */}
            {/* <TourItem
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
          /> */}
            {/* <TourItem
            title="Du Lịch Tây Nguyên: Tà Đùng - Buôn Ma Thuột - Bảo Tàng Cà Ph..."
            image="https://benthanhtourist.com/uploads/images/dak-nong/6035e43af3190.jpg"
            href="/my-tour/tour-details"
          /> */}
            {/* <TourItem
              key={15}
              title="Du Lịch Phan Thiết: Combo Centara Mirage Resort 5* Mũi Né"
              image="https://benthanhtourist.com/uploads/images/phan-thiet/centara-mirage-resort/60a72607d80d6.jpg"
              href="/my-tour/tour-details"
              dateStart="2021-10-30"
              provinceName="TP. Hà Nội"
              unitPrice={formatCash("125700000")}
            /> */}
          </div>
        </div>
      </section>
    </>
  );
}

TourList.propTypes = {};

export default TourList;
