import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FaStar, FaGripfire } from "react-icons/fa";
import imgTourHot from "../../../assets/logo/hot.png";

function TourItem(props) {
  const {
    href,
    image,
    title,
    provinceName,
    dateStart,
    rating,
    unitPrice,
    tourHot,
    travelTypeFamily,
    travelTypeName,
    groupNumber,
    promotion,
    hrefOrder,
  } = props;

  const ratingNumber = (rating) => {
    var indents = [];
    for (let index = 0; index < rating; index++) {
      indents.push(<FaStar key={index} />);
    }
    return indents;
  };
  return (
    <div className="promotion-tour__item">
      <Link to={href} title={title}>
        <img src={image} alt="" />
      </Link>
      {promotion !== 0 && (
        <div className="sale">
          <span className="sale__title">
            <span>{promotion}</span>
          </span>
        </div>
      )}

      <div className="caption">
        {tourHot && (
          <div className="lable-hot">
            <img src={`${imgTourHot}`} alt="" />
          </div>
        )}

        <Link className="title-tour" to={href}>
          {title}
        </Link>
        <div className="rating">{ratingNumber(rating)}</div>
        <div className="travel-type">
          <FaGripfire size={21} /> {travelTypeName}
        </div>
        <div className="localtion">
          <i className="fas fa-flag"></i>
          {provinceName}
        </div>
        <div className="time">
          <i className="far fa-clock"></i>
          {dateStart}
          <a className="fright" href={href}>
            {/* Ngày khác */}
          </a>
        </div>
      </div>
      <div className="bottom">
        <i className="far fa-money-bill-alt"></i>
        <span>{unitPrice}đ</span>
        {travelTypeFamily && (
          <small
            style={{ color: "#2d4271", fontSize: "13px", fontWeight: "400" }}
          >
            /gđ {`${groupNumber}`} khách
          </small>
        )}

        <Link to={hrefOrder} className="text-center btn-datngay">
          ĐẶT NGAY
        </Link>
      </div>
    </div>
  );
}

TourItem.propTypes = {
  href: PropTypes.string,
  hrefOrder: PropTypes.string,
  title: PropTypes.string,
  image: PropTypes.string,
  provinceName: PropTypes.string,
  dateStart: PropTypes.string,
  rating: PropTypes.number,
  unitPrice: PropTypes.string,
  tourHot: PropTypes.bool,
  travelTypeFamily: PropTypes.bool,
  travelTypeName: PropTypes.string,
  groupNumber: PropTypes.number,
  promotion: PropTypes.number,
};

TourItem.defaultProps = {
  hrefOrder: "#",
  href: "#",
  title: "",
  image: "",
  provinceName: "",
  dateStart: "",
  rating: 3,
  unitPrice: "",
  tourHot: false,
  travelTypeFamily: false,
  travelTypeName: "Tour trọn gói",
  groupNumber: 0,
  promotion: 0,
};

export default TourItem;
