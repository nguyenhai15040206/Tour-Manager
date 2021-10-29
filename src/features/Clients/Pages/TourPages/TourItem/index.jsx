import React from "react";
import PropTypes from "prop-types";
import "./styles.scss";
import { BsCart3 } from "react-icons/bs";
import { AiOutlinePlusCircle } from "react-icons/ai";

TourItem.propTypes = {};

function TourItem(props) {
  const {
    image,
    comment,
    assess,
    date,
    numberDate,
    time,
    nameTour,
    locationStart,
    moneyTour,
  } = props;
  return (
    <div className="card-tour-item">
      <img className="card-tour-item__img" src={image} alt="not found"></img>
      <div className="card-tour-item__assess">
        <span className="assess__title">{assess}</span>
        <div className="card-tour-item__comment">
          <p className="comment-title">{comment} nhận xét</p>
        </div>
      </div>
      <div className="card-body">
        <div className="card-tour-item__date--time mb-3">
          <p className="title-date-time">
            {date} - {numberDate} - Giờ đi:{time}
          </p>
        </div>
        <div className="card-tour-item__name-tour mb-3">
          <h3 className="title-name">{nameTour}</h3>
        </div>
        <div className="card-tour-item__location-start mb-3">
          <p className="title-location-start">Nơi khởi hành: {locationStart}</p>
        </div>
        <div className="card-tour-item__money-tour mb-3">
          <p className="title-money-tour">{moneyTour}đ</p>
        </div>
        <div className="card-tour-item__group-btn mb-3">
          <button className="custom-btn-red">
            <BsCart3 className="icon-cart" />
            <span>Đặt ngay</span>
          </button>
          <button className="custom-btn-out-light">Xem chi tiết</button>
        </div>
      </div>
      <div className="card-footer">
        <div className="card-tour-item__link-assess">
          <AiOutlinePlusCircle className="icon-add" />
          <a href="#" className="link-title">
            Thêm vào so sánh
          </a>
        </div>
        <div className="card-tour-item__number-assess">
          <p className="title-number">Số chỗ còn nhận</p>
          <p className="number">9</p>
        </div>
      </div>
    </div>
  );
}

export default TourItem;