import React from "react";
import DestinationItem from "../DestinationItem";
import HCM from "../../../assets/TravelByProvince/hochiminh.jpg";
import HN from "../../../assets/TravelByProvince/hanoi.jpg";
import DaNang from "../../../assets/TravelByProvince/danang.jpg";
import DaLat from "../../../assets/TravelByProvince/da-lat.jpg";
import Hue from "../../../assets/TravelByProvince/hue.jpg";
import VungTau from "../../../assets/TravelByProvince/vung-tau.jpg";
import NhaTrang from "../../../assets/TravelByProvince/nha-trang.jpg";
import HoiAn from "../../../assets/TravelByProvince/hoi-an.jpg";
import HaLong from "../../../assets/TravelByProvince/ha-long.jpg";
import PhuQuoc from "../../../assets/TravelByProvince/phu-quoc.jpg";
import PhanThiet from "../../../assets/TravelByProvince/phan-thiet.jpg";
import LaoCai from "../../../assets/TravelByProvince/sa-pa.jpg";

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
            image={`${HCM}`}
            href="Thành phố Hồ Chí Minh"
          />
          <DestinationItem
            itemIndex={2}
            address="Hà nội"
            image={`${HN}`}
            href="Thành phố Hà Nội"
          />
          <DestinationItem
            itemIndex={3}
            address="Đà Nẵng"
            image={`${DaNang}`}
            href="Thành phố Đà Nẵng"
          />
          <DestinationItem itemIndex={4} address="Đà Lạt" image={`${DaLat}`} />
          <DestinationItem
            itemIndex={5}
            address="Bà Rịa - Vũng Tàu"
            image={`${VungTau}`}
            href="Tỉnh Bà Rịa - Vũng Tàu"
          />
          <DestinationItem
            itemIndex={6}
            address="Nha Trang"
            image={`${NhaTrang}`}
            href="Tỉnh Khánh Hòa"
          />
          <DestinationItem itemIndex={7} address="Hội An" image={`${HoiAn}`} />
          <DestinationItem
            itemIndex={8}
            address="Hạ Long"
            image={`${HaLong}`}
            href="Tỉnh Quảng Ninh"
          />
          <DestinationItem
            itemIndex={9}
            address="Phú Quốc"
            image={`${PhuQuoc}`}
            href="Tỉnh Kiên Giang"
          />
          <DestinationItem
            itemIndex={10}
            address="Mũi Né"
            image={`${PhanThiet}`}
            href="Tỉnh Bình Thuận"
          />
          <DestinationItem
            itemIndex={11}
            address="Lào Cai"
            image={`${LaoCai}`}
            href="Tỉnh Lào Cai"
          />
          <DestinationItem
            itemIndex={12}
            address="Thừa Thiên - Huế"
            image={`${Hue}`}
            href="Tỉnh Thừa Thiên Huế"
          />
        </div>
      </div>
    </section>
  );
}

Destination.propTypes = {};

export default Destination;
