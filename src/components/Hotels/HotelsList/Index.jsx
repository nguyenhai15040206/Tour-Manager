import React from "react";
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
        <div className="hotel__list">
          <HotelItem
            href="index.html"
            image="https://tripi.vn/cdn-cgi/image/width=320/https://storage.googleapis.com/hms_prod/photo/thumb/1616919860706qw/1-0a75c811-715b-4c53-9371-66103da1654c.png"
            sale={5}
            desc="Khác sạn cách ly"
            address="Quận Tân Phú"
            totalPrice="1.148.000đ"
            price="1.092.000đ"
          />
          <HotelItem
            href="index.html"
            image="https://tripi.vn/cdn-cgi/image/width=320/https://www.googleapis.com/download/storage/v1/b/hotel_image/o/logo%2F4%2F10976.jpg?generation=1563769073064379&alt=media"
            sale={5}
            desc="Khác sạn cách ly"
            address="Quận Tân Phú"
            totalPrice="1.148.000đ"
            price="1.092.000đ"
          />
          <HotelItem
            href="index.html"
            image="https://tripi.vn/cdn-cgi/image/width=320/https://www.googleapis.com/download/storage/v1/b/hotel_image/o/logo%2F4%2F2177977.jpg?generation=1563769181856135&alt=media"
            sale={5}
            desc="Khác sạn cách ly"
            address="Quận Tân Phú"
            totalPrice="1.148.000đ"
            price="1.092.000đ"
          />
          <HotelItem
            href="index.html"
            image="https://tripi.vn/cdn-cgi/image/width=320/https://storage.googleapis.com/hms_prod/photo/thumb/2690wF/155737068.jpg"
            sale={5}
            desc="Khác sạn cách ly"
            address="Quận Tân Phú"
            totalPrice="1.148.000đ"
            price="1.092.000đ"
          />
          <HotelItem
            href="index.html"
            image="https://tripi.vn/cdn-cgi/image/width=320/https://www.googleapis.com/download/storage/v1/b/tourcdn/o/photos%2FLZMU79ZU1Z_%2Ftmp%2Fplaytemp6993685938555950743%2FmultipartBody7101078629708212087asTemporaryFile?generation=1586784963238377&alt=media"
            sale={5}
            desc="Khác sạn cách ly"
            address="Quận Tân Phú"
            totalPrice="1.148.000đ"
            price="1.092.000đ"
          />
          <HotelItem
            href="index.html"
            image="https://tripi.vn/cdn-cgi/image/width=320/https://www.googleapis.com/download/storage/v1/b/hotel_image/o/logo%2F4%2F9195.jpg?generation=1563768994770250&alt=media"
            sale={5}
            desc="Khác sạn cách ly"
            address="Quận Tân Phú"
            totalPrice="1.148.000đ"
            price="1.092.000đ"
          />
          <HotelItem
            href="index.html"
            image="https://tripi.vn/cdn-cgi/image/width=320/https://storage.googleapis.com/hms_prod/photo/thumb/1616919860706qw/1-0a75c811-715b-4c53-9371-66103da1654c.png"
            sale={5}
            desc="Khác sạn cách ly"
            address="Quận Tân Phú"
            totalPrice="1.148.000đ"
            price="1.092.000đ"
          />
          <HotelItem
            href="index.html"
            image="https://tripi.vn/cdn-cgi/image/width=320/https://storage.googleapis.com/hms_prod/photo/thumb/1617031462271TZ/b7z1508151163_khach_san_aem_phan_boi_chau.png"
            sale={5}
            desc="Khác sạn cách ly"
            address="Quận Tân Phú"
            totalPrice="1.148.000đ"
            price="1.092.000đ"
          />
        </div>

        <div className="hotel__footer">
          <button>Xem tất cả</button>
        </div>
      </div>
    </section>
  );
}

HotelsList.propTypes = {};

export default HotelsList;
