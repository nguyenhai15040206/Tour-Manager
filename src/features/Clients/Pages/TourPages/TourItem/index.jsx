import React from "react";
import { FaStar } from "react-icons/fa";
import { BsCart3 } from "react-icons/bs";
import { Link } from "react-router-dom";
import "./styles.scss";

TourItem.propTypes = {};

function TourItem(props) {
  const {
    image,
    rating,
    date,
    numberDate,
    time,
    nameTour,
    locationStart,
    moneyTour,
    quanityCurrent,
    href,
    traveltypeID,
    groupNumber,
    promotion,
  } = props;
  const ratingNumber = (rating) => {
    var indents = [];
    for (let index = 0; index < rating; index++) {
      indents.push(<FaStar key={index} />);
    }
    return indents;
  };
  return (
    <div className="card-tour-item">
      <img className="card-tour-item__img" src={image} alt="not found"></img>
      <div className="card-tour-item__assess">
        <span className="assess__title">{ratingNumber(rating)}</span>
      </div>
      {promotion !== null && (
        <div className="card-tour-item__comment">
          <p className="comment-title">{`${promotion}%`}</p>
        </div>
      )}
      <div className="card-body">
        <div className="card-tour-item__date--time mb-3">
          <p className="title-date-time">
            {date} - {numberDate} - Giờ đi:{time}
          </p>
        </div>
        <div className="card-tour-item__name-tour mb-3">
          <Link to={href}>
            <h3 className="title-name">{nameTour}</h3>
          </Link>
        </div>
        <div className="card-tour-item__location-start mb-3">
          <p className="title-location-start">Nơi khởi hành: {locationStart}</p>
        </div>
        <div className="card-tour-item__money-tour mb-3">
          <p className="title-money-tour">
            {moneyTour}đ{" "}
            {traveltypeID === "8f64fb01-91fe-4850-a004-35cf26a1c1ef" && (
              <span
                style={{
                  fontSize: "13px",
                  fontWeight: "400",
                  color: "#2d4271",
                }}
              >
                /gia đình {groupNumber} khách
              </span>
            )}
          </p>
        </div>
        <div className="card-tour-item__group-btn mb-3">
          <button className="custom-btn-red">
            <BsCart3 className="icon-cart" />
            <span>Đặt ngay</span>
          </button>
          <Link to={href}>
            <button className="custom-btn-out-light">Xem chi tiết</button>
          </Link>
        </div>
      </div>
      <div className="card-footer">
        <div className="card-tour-item__link-assess">
          <p className="link-title">{props.TravelTypeName}</p>
        </div>
        <div className="card-tour-item__number-assess">
          <p className="title-number">Số chỗ còn nhận</p>
          <p className="number">{quanityCurrent}</p>
        </div>
      </div>
    </div>
  );
}

export default TourItem;
